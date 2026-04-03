/**
 * CanvasRenderer.ts — Pure TypeScript class, no React.
 * Renders 63,779 Bible cross-reference arcs on an HTML5 Canvas.
 *
 * Architecture: Two-layer composite
 * - OffscreenCanvas (base layer): all arcs at 15% opacity, rendered ONCE at init
 * - Main canvas: composites base + highlighted arcs on each interaction frame
 * - Result: hover/filter only repaints the highlight layer, not all 63k arcs
 *
 * Never instantiate this outside of a useEffect — OffscreenCanvas requires a browser.
 */

import type { CrossReferenceData, FilterState, ArcHit } from '@/types/connections'

// ── Constants ──────────────────────────────────────────────────────────────
const BAR_HEIGHT = 24          // Height of the chapter bar graph at the bottom
const ARC_BASE_OPACITY = 0.15  // Resting opacity of all arcs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ARC_DIM_OPACITY = 0.04  // Opacity of dimmed arcs in filter modes (reserved for future use)
const ARC_HIGHLIGHT_OPACITY = 1.0
const BASE_STROKE_WIDTH = 0.7
const HIGHWAY_STROKE_WIDTH = 1.5
const HIT_RADIUS = 8           // px — snap radius for hover hit testing
const SPATIAL_CELL_SIZE = 40   // px — grid cell size for spatial index

// Colour ramp: violet → teal → gold → white (distance-based)
// Matches Harrison's rainbow while harmonising with Plain Prophecy palette
const COLOUR_RAMP_STOPS = [
  { pos: 0.00, r: 99,  g: 102, b: 241 },  // #6366F1 indigo
  { pos: 0.25, r: 139, g: 92,  b: 246 },  // #8B5CF6 violet
  { pos: 0.50, r: 16,  g: 185, b: 129 },  // #10B981 teal
  { pos: 0.75, r: 201, g: 168, b: 76  },  // #C9A84C gold
  { pos: 1.00, r: 255, g: 255, b: 255 },  // #FFFFFF white
]

// Pre-compute 256-entry colour lookup table: [r, g, b] per entry
function buildColourLUT(): [number, number, number][] {
  const lut: [number, number, number][] = new Array(256)
  for (let i = 0; i < 256; i++) {
    const t = i / 255
    let lo = COLOUR_RAMP_STOPS[0]
    let hi = COLOUR_RAMP_STOPS[COLOUR_RAMP_STOPS.length - 1]
    for (let s = 0; s < COLOUR_RAMP_STOPS.length - 1; s++) {
      if (t >= COLOUR_RAMP_STOPS[s].pos && t <= COLOUR_RAMP_STOPS[s + 1].pos) {
        lo = COLOUR_RAMP_STOPS[s]
        hi = COLOUR_RAMP_STOPS[s + 1]
        break
      }
    }
    const seg = hi.pos - lo.pos
    const f = seg === 0 ? 0 : (t - lo.pos) / seg
    lut[i] = [
      Math.round(lo.r + (hi.r - lo.r) * f),
      Math.round(lo.g + (hi.g - lo.g) * f),
      Math.round(lo.b + (hi.b - lo.b) * f),
    ]
  }
  return lut
}

const COLOUR_LUT = buildColourLUT()

// ── Prophetic-core book indices for Prophecy Highway mode ─────────────────
// OT: Isaiah(22), Jeremiah(23), Ezekiel(25), Daniel(26), Zechariah(37),
//     Malachi(38), Psalms(18), Genesis(0), Joel(28), Amos(29), Micah(32), Habakkuk(34)
// NT: Matthew(39 — ch24), Mark(40 — ch13), Luke(41 — ch21),
//     Revelation(65), Hebrews(57), 1Peter(59), 2Peter(60)
const PROPHETIC_CORE_BOOKS = new Set([0, 18, 22, 23, 25, 26, 28, 29, 32, 34, 37, 38, 39, 40, 41, 57, 59, 60, 65])

// ── Arc geometry stored as flat Float32Array ───────────────────────────────
// Per arc: [x1, x2, peakY, colourIndex]  (4 floats × 63779 arcs = ~1MB)
const FLOATS_PER_ARC = 4
const COLOUR_IDX = 3

export type ArcState = 0 | 1 | 2  // 0=hidden, 1=base, 2=highlighted

export class CanvasRenderer {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private offscreen: OffscreenCanvas | null = null
  private offCtx: OffscreenCanvasRenderingContext2D | null = null

  private dpr = 1
  private cssWidth = 0
  private cssHeight = 0
  private bottomY = 0  // y-coordinate of the arc baseline (canvas bottom minus bar area)

  private arcGeometry: Float32Array | null = null
  private filteredArcs: Uint8Array | null = null
  private arcCount = 0

  // Spatial index: cell key → array of arc indices
  private spatialGrid = new Map<number, number[]>()

  private data: CrossReferenceData | null = null
  private filterState: FilterState = { mode: 'base' }
  private christThreadPulse = 0  // for animation
  private rafId: number | null = null
  private isChristThreadActive = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2D context')
    this.ctx = ctx
  }

  // ── Initialise with loaded data ──────────────────────────────────────────
  init(data: CrossReferenceData): void {
    this.data = data
    this.arcCount = data.refs.length

    // Size the canvas to its CSS dimensions
    const rect = this.canvas.getBoundingClientRect()
    this.dpr = window.devicePixelRatio || 1
    this.cssWidth = rect.width
    this.cssHeight = rect.height
    this._sizeCanvas(rect.width, rect.height)

    // Pre-compute arc geometry
    this._buildGeometry()

    // Build spatial grid for hit-testing
    this._buildSpatialGrid()

    // Render base layer to offscreen
    this._renderBaseLayer()

    // Composite onto main canvas
    this._renderHighlightLayer()
  }

  // ── Resize handler ───────────────────────────────────────────────────────
  resize(cssWidth: number, cssHeight: number): void {
    if (!this.data) return
    if (cssWidth <= 0 || cssHeight <= 0) return
    this.cssWidth = cssWidth
    this.cssHeight = cssHeight
    this._sizeCanvas(cssWidth, cssHeight)
    this._buildGeometry()
    this._buildSpatialGrid()
    this._renderBaseLayer()
    this._renderHighlightLayer()
  }

  // ── Apply a filter state ─────────────────────────────────────────────────
  setFilter(filter: FilterState): void {
    this.filterState = filter
    this.isChristThreadActive = filter.mode === 'christThread'

    if (!this.filteredArcs || !this.data) return

    const refs = this.data.refs
    const books = this.data.books
    const fa = this.filteredArcs

    switch (filter.mode) {
      case 'base':
        fa.fill(1)
        break

      case 'verse': {
        const vi = filter.verseIndex!
        fa.fill(0)
        for (let i = 0; i < refs.length; i++) {
          if (refs[i][0] === vi || refs[i][1] === vi) fa[i] = 2
        }
        break
      }

      case 'christThread': {
        const indices = new Set(filter.arcIndices ?? [])
        for (let i = 0; i < refs.length; i++) {
          fa[i] = indices.has(i) ? 2 : 0
        }
        break
      }

      case 'prophecyHighway': {
        fa.fill(0)
        for (let i = 0; i < refs.length; i++) {
          const fromBook = this._getBookIndex(refs[i][0])
          const toBook = this._getBookIndex(refs[i][1])
          if (PROPHETIC_CORE_BOOKS.has(fromBook) && PROPHETIC_CORE_BOOKS.has(toBook)) {
            fa[i] = 2
          }
        }
        break
      }

      case 'bookDna': {
        const bookIdx = filter.bookIndex!
        const bk = books[bookIdx]
        if (!bk) { fa.fill(1); break }
        fa.fill(0)
        for (let i = 0; i < refs.length; i++) {
          const fromBook = this._getBookIndex(refs[i][0])
          const toBook = this._getBookIndex(refs[i][1])
          if (fromBook === bookIdx || toBook === bookIdx) fa[i] = 2
        }
        break
      }

      case 'path': {
        const indices = new Set(filter.arcIndices ?? [])
        for (let i = 0; i < refs.length; i++) {
          fa[i] = indices.has(i) ? 2 : 0
        }
        break
      }
    }

    // Start pulse animation for Christ Thread, stop otherwise
    if (this.isChristThreadActive) {
      this._startPulse()
    } else {
      this._stopPulse()
      this._renderHighlightLayer()
    }
  }

  // ── Hit test: find the nearest arc within HIT_RADIUS ────────────────────
  hitTest(cssX: number, cssY: number): ArcHit | null {
    if (!this.arcGeometry || !this.data) return null

    const geo = this.arcGeometry
    const refs = this.data.refs
    const bottomY = this.bottomY

    // Query spatial grid
    const cellX = Math.floor(cssX / SPATIAL_CELL_SIZE)
    const cellY = Math.floor(cssY / SPATIAL_CELL_SIZE)

    let bestDist = HIT_RADIUS * HIT_RADIUS
    let bestIdx = -1

    // Check a 3×3 neighbourhood of grid cells
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const cellKey = (cellX + dx) * 10000 + (cellY + dy)
        const candidates = this.spatialGrid.get(cellKey)
        if (!candidates) continue
        for (const idx of candidates) {
          const base = idx * FLOATS_PER_ARC
          const x1 = geo[base]
          const x2 = geo[base + 1]
          const peakY = geo[base + 2]
          const dist2 = this._pointToBezierDist2(cssX, cssY, x1, bottomY, x2, bottomY, (x1 + x2) / 2, peakY)
          if (dist2 < bestDist) {
            bestDist = dist2
            bestIdx = idx
          }
        }
      }
    }

    if (bestIdx === -1) return null

    return {
      arcIndex: bestIdx,
      fromVerseIndex: refs[bestIdx][0],
      toVerseIndex: refs[bestIdx][1],
      votes: refs[bestIdx][2],
    }
  }

  // ── Update hover highlight ───────────────────────────────────────────────
  setHoveredArc(arcIdx: number | null): void {
    if (this.isChristThreadActive) return  // pulse handles animation
    this._renderHighlightLayer(arcIdx ?? undefined)
  }

  // ── Destroy ──────────────────────────────────────────────────────────────
  destroy(): void {
    this._stopPulse()
    this.data = null
    this.arcGeometry = null
    this.filteredArcs = null
    this.spatialGrid.clear()
    this.offscreen = null
    this.offCtx = null
  }

  // ── Private: size canvas to CSS dimensions × DPR ────────────────────────
  private _sizeCanvas(cssW: number, cssH: number): void {
    const w = Math.round(cssW * this.dpr)
    const h = Math.round(cssH * this.dpr)
    this.canvas.width = w
    this.canvas.height = h
    this.ctx.scale(this.dpr, this.dpr)
    this.bottomY = cssH - BAR_HEIGHT
    // Re-create offscreen
    try {
      this.offscreen = new OffscreenCanvas(w, h)
      const c = this.offscreen.getContext('2d')
      if (!c) throw new Error()
      this.offCtx = c as unknown as OffscreenCanvasRenderingContext2D
    } catch {
      this.offscreen = null
      this.offCtx = null
    }
  }

  // ── Private: build flat arc geometry ────────────────────────────────────
  private _buildGeometry(): void {
    if (!this.data) return
    const { refs, chapters } = this.data
    const TOTAL_CHAPTERS = chapters.length
    const n = refs.length
    this.arcGeometry = new Float32Array(n * FLOATS_PER_ARC)
    this.filteredArcs = new Uint8Array(n).fill(1)  // all base by default

    const W = this.cssWidth
    const H = this.bottomY

    for (let i = 0; i < n; i++) {
      const [fromV, toV] = refs[i]

      // Map verse indices to x-positions via cumulative chapter verse starts
      const x1 = this._verseToX(fromV, W)
      const x2 = this._verseToX(toV, W)

      // Arc peak height: half the horizontal distance, capped at canvas height
      const span = Math.abs(x2 - x1)
      const peakY = H - Math.min(span * 0.45, H * 0.92)

      // Colour index based on span distance fraction
      const fromChapter = this._verseToChapter(fromV)
      const toChapter = this._verseToChapter(toV)
      const dist = Math.abs(toChapter - fromChapter) / TOTAL_CHAPTERS
      const colourIndex = Math.min(255, Math.floor(dist * 255))

      const base = i * FLOATS_PER_ARC
      this.arcGeometry[base]     = x1
      this.arcGeometry[base + 1] = x2
      this.arcGeometry[base + 2] = peakY
      this.arcGeometry[base + 3] = colourIndex
    }
  }

  // ── Private: build spatial grid for hit-testing ──────────────────────────
  private _buildSpatialGrid(): void {
    if (!this.arcGeometry) return
    this.spatialGrid.clear()
    const geo = this.arcGeometry
    const bottomY = this.bottomY
    const n = this.arcCount

    for (let i = 0; i < n; i++) {
      const base = i * FLOATS_PER_ARC
      const x1 = geo[base]
      const x2 = geo[base + 1]
      const peakY = geo[base + 2]

      const minX = Math.min(x1, x2)
      const maxX = Math.max(x1, x2)
      const minY = peakY
      const maxY = bottomY

      const cellX1 = Math.floor(minX / SPATIAL_CELL_SIZE)
      const cellX2 = Math.floor(maxX / SPATIAL_CELL_SIZE)
      const cellY1 = Math.floor(minY / SPATIAL_CELL_SIZE)
      const cellY2 = Math.floor(maxY / SPATIAL_CELL_SIZE)

      for (let cx = cellX1; cx <= cellX2; cx++) {
        for (let cy = cellY1; cy <= cellY2; cy++) {
          const key = cx * 10000 + cy
          let arr = this.spatialGrid.get(key)
          if (!arr) { arr = []; this.spatialGrid.set(key, arr) }
          arr.push(i)
        }
      }
    }
  }

  // ── Private: render all arcs to OffscreenCanvas (base layer) ─────────────
  private _renderBaseLayer(): void {
    if (!this.arcGeometry || !this.data) return

    const target = this.offCtx || this.ctx
    const W = this.cssWidth
    const H = this.cssHeight

    if (this.offCtx) {
      // Scale offscreen canvas for DPR
      this.offCtx.scale(this.dpr, this.dpr)
    }

    target.clearRect(0, 0, W, H)
    target.fillStyle = '#08080F'
    target.fillRect(0, 0, W, H)

    // Draw chapter bar graph at bottom
    this._drawBarGraph(target as CanvasRenderingContext2D)

    // Draw all arcs at base opacity
    target.globalAlpha = ARC_BASE_OPACITY
    target.lineWidth = BASE_STROKE_WIDTH

    const geo = this.arcGeometry
    const bottomY = this.bottomY
    const n = this.arcCount

    // Draw arcs grouped by colour bucket to minimise strokeStyle changes
    // Build colour groups
    type ColourGroup = { colour: string; arcs: number[] }
    const groups: Map<number, ColourGroup> = new Map()

    for (let i = 0; i < n; i++) {
      const cIdx = Math.round(geo[i * FLOATS_PER_ARC + COLOUR_IDX])
      if (!groups.has(cIdx)) {
        const [r, g, b] = COLOUR_LUT[cIdx]
        groups.set(cIdx, { colour: `rgb(${r},${g},${b})`, arcs: [] })
      }
      groups.get(cIdx)!.arcs.push(i)
    }

    for (const { colour, arcs } of groups.values()) {
      target.strokeStyle = colour
      target.beginPath()
      for (const i of arcs) {
        const base = i * FLOATS_PER_ARC
        const x1 = geo[base]
        const x2 = geo[base + 1]
        const peakY = geo[base + 2]
        const midX = (x1 + x2) / 2
        target.moveTo(x1, bottomY)
        target.quadraticCurveTo(midX, peakY, x2, bottomY)
      }
      target.stroke()
    }

    target.globalAlpha = 1.0

    // Draw OT/NT divider
    this._drawOTNTDivider(target as CanvasRenderingContext2D)
  }

  // ── Private: composite base + highlighted arcs ───────────────────────────
  private _renderHighlightLayer(hoveredArcIdx?: number): void {
    if (!this.arcGeometry || !this.filteredArcs) return

    const ctx = this.ctx
    const W = this.cssWidth
    const H = this.cssHeight

    ctx.clearRect(0, 0, W, H)

    // Composite base layer
    if (this.offscreen && this.offscreen.width > 0 && this.offscreen.height > 0) {
      // Draw offscreen (DPR-scaled) onto main canvas at CSS size
      ctx.drawImage(this.offscreen as unknown as CanvasImageSource, 0, 0, W * this.dpr, H * this.dpr, 0, 0, W, H)
    } else {
      // Fallback: re-draw base
      this._renderBaseLayer()
    }

    const geo = this.arcGeometry
    const fa = this.filteredArcs
    const bottomY = this.bottomY
    const isFiltered = this.filterState.mode !== 'base'

    // In filter modes, overlay a dimming rectangle over the base
    if (isFiltered) {
      ctx.fillStyle = '#08080F'
      ctx.globalAlpha = 0.82
      ctx.fillRect(0, 0, W, H)
      ctx.globalAlpha = 1.0

      // Redraw bar graph on top
      this._drawBarGraph(ctx)
    }

    // Draw highlighted arcs
    const isHighway = this.filterState.mode === 'prophecyHighway'
    const strokeW = isHighway ? HIGHWAY_STROKE_WIDTH : BASE_STROKE_WIDTH

    // Build highlighted arc groups
    type HL = { colour: string; arcs: number[] }
    const hlGroups: Map<number, HL> = new Map()
    const n = this.arcCount

    for (let i = 0; i < n; i++) {
      if (fa[i] !== 2) continue
      const cIdx = Math.round(geo[i * FLOATS_PER_ARC + COLOUR_IDX])
      if (!hlGroups.has(cIdx)) {
        const [r, g, b] = COLOUR_LUT[cIdx]
        const colour = this.filterState.mode === 'christThread'
          ? `rgb(240,208,128)` // #F0D080 gold for Christ Thread
          : `rgb(${r},${g},${b})`
        hlGroups.set(cIdx, { colour, arcs: [] })
      }
      hlGroups.get(cIdx)!.arcs.push(i)
    }

    const hlOpacity = this.filterState.mode === 'christThread'
      ? 0.7 + 0.3 * Math.sin(this.christThreadPulse)  // pulsing
      : ARC_HIGHLIGHT_OPACITY

    // Christ Thread glow
    if (this.filterState.mode === 'christThread') {
      ctx.shadowColor = '#F0D080'
      ctx.shadowBlur = 4
    }

    ctx.globalAlpha = hlOpacity
    ctx.lineWidth = strokeW

    for (const { colour, arcs } of hlGroups.values()) {
      ctx.strokeStyle = colour
      ctx.beginPath()
      for (const i of arcs) {
        const base = i * FLOATS_PER_ARC
        const x1 = geo[base]
        const x2 = geo[base + 1]
        const peakY = geo[base + 2]
        ctx.moveTo(x1, bottomY)
        ctx.quadraticCurveTo((x1 + x2) / 2, peakY, x2, bottomY)
      }
      ctx.stroke()
    }

    ctx.shadowBlur = 0
    ctx.globalAlpha = 1.0

    // Hovered arc: single bright overlay
    if (hoveredArcIdx !== undefined && hoveredArcIdx >= 0) {
      const base = hoveredArcIdx * FLOATS_PER_ARC
      const x1 = geo[base]
      const x2 = geo[base + 1]
      const peakY = geo[base + 2]
      const cIdx = Math.round(geo[base + COLOUR_IDX])
      const [r, g, b] = COLOUR_LUT[cIdx]

      ctx.globalAlpha = 1.0
      ctx.lineWidth = 2.0
      ctx.strokeStyle = `rgb(${r},${g},${b})`
      ctx.shadowColor = `rgba(${r},${g},${b},0.6)`
      ctx.shadowBlur = 6
      ctx.beginPath()
      ctx.moveTo(x1, bottomY)
      ctx.quadraticCurveTo((x1 + x2) / 2, peakY, x2, bottomY)
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    this._drawOTNTDivider(ctx)
  }

  // ── Private: draw chapter bar graph ─────────────────────────────────────
  private _drawBarGraph(ctx: CanvasRenderingContext2D): void {
    if (!this.data) return
    const { chapters } = this.data
    const W = this.cssWidth
    const H = this.cssHeight
    const totalVerses = chapters[chapters.length - 1].verseStart + chapters[chapters.length - 1].verseCount

    for (let i = 0; i < chapters.length; i++) {
      const ch = chapters[i]
      const x = (ch.verseStart / totalVerses) * W
      const w = Math.max(1, (ch.verseCount / totalVerses) * W)
      ctx.fillStyle = i % 2 === 0 ? '#1A1A2E' : '#0F0F1A'
      ctx.fillRect(x, H - BAR_HEIGHT, w, BAR_HEIGHT)
    }
  }

  // ── Private: draw OT/NT divider ─────────────────────────────────────────
  private _drawOTNTDivider(ctx: CanvasRenderingContext2D): void {
    if (!this.data) return
    const books = this.data.books
    // Matthew is book index 39 — NT start
    const mattBook = books[39]
    if (!mattBook) return
    const chapters = this.data.chapters
    const totalVerses = chapters[chapters.length - 1].verseStart + chapters[chapters.length - 1].verseCount
    const x = (mattBook.verseStart / totalVerses) * this.cssWidth

    ctx.save()
    ctx.globalAlpha = 0.7
    ctx.strokeStyle = '#C9A84C'
    ctx.lineWidth = 1
    ctx.shadowColor = '#C9A84C'
    ctx.shadowBlur = 4
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, this.bottomY)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.shadowBlur = 0
    ctx.restore()
  }

  // ── Private: Christ Thread pulse animation ───────────────────────────────
  private _startPulse(): void {
    if (this.rafId !== null) return
    const step = () => {
      this.christThreadPulse += 0.025
      this._renderHighlightLayer()
      this.rafId = requestAnimationFrame(step)
    }
    this.rafId = requestAnimationFrame(step)
  }

  private _stopPulse(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
    this.christThreadPulse = 0
  }

  // ── Private: verse index → x position ───────────────────────────────────
  private _verseToX(verseIndex: number, canvasWidth: number): number {
    if (!this.data) return 0
    const chapters = this.data.chapters
    const totalVerses = chapters[chapters.length - 1].verseStart + chapters[chapters.length - 1].verseCount
    return (verseIndex / totalVerses) * canvasWidth
  }

  // ── Private: verse index → chapter index ────────────────────────────────
  private _verseToChapter(verseIndex: number): number {
    if (!this.data) return 0
    const chapters = this.data.chapters
    let lo = 0, hi = chapters.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (chapters[mid].verseStart <= verseIndex) lo = mid
      else hi = mid - 1
    }
    return chapters[lo].chapterStart
  }

  // ── Private: verse index → book index ───────────────────────────────────
  private _getBookIndex(verseIndex: number): number {
    if (!this.data) return 0
    const books = this.data.books
    let lo = 0, hi = books.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (books[mid].verseStart <= verseIndex) lo = mid
      else hi = mid - 1
    }
    return lo
  }

  // ── Private: squared distance from point to quadratic Bézier ─────────────
  // Samples N points along the curve and returns minimum squared distance.
  private _pointToBezierDist2(
    px: number, py: number,
    x0: number, y0: number,
    x2: number, y2: number,
    cx: number, cy: number
  ): number {
    const SAMPLES = 20
    let minDist2 = Infinity
    for (let i = 0; i <= SAMPLES; i++) {
      const t = i / SAMPLES
      const mt = 1 - t
      const bx = mt * mt * x0 + 2 * mt * t * cx + t * t * x2
      const by = mt * mt * y0 + 2 * mt * t * cy + t * t * y2
      const dx = px - bx
      const dy = py - by
      const d2 = dx * dx + dy * dy
      if (d2 < minDist2) minDist2 = d2
    }
    return minDist2
  }

  // ── Public: resolve OSIS refs to arc indices (for Christ Thread / paths) ──
  resolveOsisToArcIndices(
    pairs: { from: string; to: string }[],
    osisToIndex: Map<string, number>
  ): number[] {
    if (!this.data) return []
    const refs = this.data.refs
    const indices: number[] = []
    const refMap = new Map<string, number>()

    for (let i = 0; i < refs.length; i++) {
      const key = `${refs[i][0]}-${refs[i][1]}`
      refMap.set(key, i)
      refMap.set(`${refs[i][1]}-${refs[i][0]}`, i)  // bidirectional
    }

    for (const { from, to } of pairs) {
      const fromIdx = osisToIndex.get(from)
      const toIdx = osisToIndex.get(to)
      if (fromIdx === undefined || toIdx === undefined) continue
      const key = `${fromIdx}-${toIdx}`
      const arcIdx = refMap.get(key)
      if (arcIdx !== undefined) indices.push(arcIdx)
    }

    return indices
  }

  // ── Public: build OSIS → verse index map from loaded data ────────────────
  buildOsisIndexMap(): Map<string, number> {
    if (!this.data) return new Map()
    const map = new Map<string, number>()
    const { books, chapters } = this.data

    for (const ch of chapters) {
      const bookAbbr = books[ch.book].abbr
      for (let v = 1; v <= ch.verseCount; v++) {
        map.set(`${bookAbbr}.${ch.chapter}.${v}`, ch.verseStart + v - 1)
      }
    }
    return map
  }
}
