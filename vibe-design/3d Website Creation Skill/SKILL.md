---
name: 3d-website-builder
description: Build world-class, award-worthy 3D websites using Three.js, WebGL, GSAP, and Lenis. Use this skill when the user asks for immersive 3D websites, interactive WebGL experiences, scroll-driven 3D animations, particle systems, shader effects, or anything that could realistically be submitted to Awwwards, CSS Design Awards, or FWA. Triggers on: "3D website", "WebGL", "Three.js", "immersive experience", "award-winning website", "interactive 3D", "particle effects", "shader", "GSAP scroll", "awwwards-quality". Produces self-contained HTML files or React/Next.js components with full 3D scene setup, animation choreography, and performance optimisation.
---

# 3D Website Builder Skill

This skill produces award-calibre 3D websites. The target benchmark is Awwwards Site of the Day (SOTD), CSS Design Awards (CSSDA), and FWA. Every output must be **unforgettable**, technically disciplined, and usable.

---

## Part 1: The Award-Winner Mindset

Before writing a single line of code, internalise this:

### The Awwwards Scoring Model
Awwwards judges on four weighted criteria. Design these in:

| Criterion | Weight | What Judges Look For |
|---|---|---|
| **Design** | 40% | Typography mastery, colour command, compositional boldness, visual hierarchy |
| **Usability** | 30% | Mobile responsiveness, navigation clarity, load performance, accessible interactions |
| **Creativity** | 20% | Genuine originality — not trends applied, but a concept executed with conviction |
| **Content** | 10% | Writing quality, purposeful copy, narrative clarity |

> **Most sites fail on Usability (30%), not Creativity (20%).** Studios over-invest in visual spectacle and ship broken mobile experiences. Always test on touch devices.

### The "Signature Moment" Rule
Every award-winning site has **one interaction or visual that makes you stop scrolling**. Identify this before building:
- A 3D model that shatters into particles on click
- Text that warps through a displacement shader as you scroll
- An environment that shifts from day to night tied to scroll progress
- A cursor that physically pushes geometry in a scene

Everything else on the page exists to lead toward and away from that moment.

### CSSDA Judging Pillars
CSS Design Awards evaluates on: Animation & storytelling, Creativity, and Usability. The animation criterion means transitions between sections must feel authored — not just "things moving in".

---

## Part 2: Technology Stack

### Core Stack (2025/2026 standard)

```
Three.js          → 3D scenes, geometry, materials, lighting
GSAP + ScrollTrigger → Animation choreography and scroll-driven sequences
Lenis             → Smooth scroll that syncs perfectly with the render loop
GLSL shaders      → Custom visual effects (displacement, noise, distortion)
```

### Framework Decisions

| Project Type | Recommended Stack |
|---|---|
| Self-contained demo / artifact | Vanilla HTML + Three.js CDN + GSAP CDN |
| Production site | Next.js + React Three Fiber + @react-three/drei |
| Ultra-performance | Astro + Three.js + Barba.js (page transitions) |

### CDN Imports for Vanilla HTML
```html
<!-- Three.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<!-- GSAP + Plugins -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<!-- Lenis smooth scroll -->
<script src="https://unpkg.com/@studio-freight/lenis@1.0.42/bundled/lenis.min.js"></script>
```

> **Note:** Three.js r128 is available on Cloudflare CDN. For Claude artifacts, always use r128. Do NOT use THREE.CapsuleGeometry (added in r142). Use CylinderGeometry or SphereGeometry instead.

---

## Part 3: Scene Architecture

### The Render Loop Pattern
Always structure the Three.js scene this way. Order matters.

```javascript
// 1. Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
  canvas: document.getElementById('webgl'),
  antialias: true,
  alpha: true  // transparent background when layering over DOM
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2x for performance
renderer.setSize(window.innerWidth, window.innerHeight);

// 2. Lenis smooth scroll
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// 3. Clock for time-based animation
const clock = new THREE.Clock();

// 4. Render loop — sync everything here
function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();
  
  // Update uniforms (shaders)
  if (material.uniforms) material.uniforms.uTime.value = elapsed;
  
  // Update GSAP (if not using ticker)
  // ScrollTrigger.update(); // already done via lenis.on('scroll')
  
  renderer.render(scene, camera);
}
animate();

// 5. Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
```

### Canvas Layering Strategy
Award-winning sites layer WebGL *behind* the DOM, not instead of it. Typography, buttons, and layout live in HTML. The 3D scene is atmosphere.

```css
canvas#webgl {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;         /* behind DOM */
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 1;         /* above canvas */
}
```

---

## Part 4: GLSL Shader Recipes

Shaders are the single biggest differentiator. Use ShaderMaterial for custom effects. Always include `uTime` for animation.

### Shader Material Boilerplate
```javascript
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0.0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uTexture: { value: texture },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    
    // Classic Perlin noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }
    
    void main() {
      float noise = snoise(vec3(vUv * 3.0, uTime * 0.3));
      vec3 colour = mix(vec3(0.05, 0.02, 0.1), vec3(0.4, 0.1, 0.6), noise * 0.5 + 0.5);
      gl_FragColor = vec4(colour, 1.0);
    }
  `,
});
```

### Displacement / Warp Shader (for images and planes)
```glsl
// Fragment — distort UV based on noise for image warp effect
uniform sampler2D uTexture;
uniform float uTime;
uniform float uDistortion; // 0.0 = none, 1.0 = full
varying vec2 vUv;

void main() {
  vec2 distortedUv = vUv;
  distortedUv.x += sin(vUv.y * 10.0 + uTime) * 0.02 * uDistortion;
  distortedUv.y += cos(vUv.x * 10.0 + uTime) * 0.02 * uDistortion;
  vec4 colour = texture2D(uTexture, distortedUv);
  gl_FragColor = colour;
}
```

### Fresnel / Rim Light Shader (for glassy/holographic objects)
```glsl
// Vertex
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 worldPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-worldPos.xyz);
  gl_Position = projectionMatrix * worldPos;
}

// Fragment
uniform vec3 uColour;
uniform float uFresnelPower;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float fresnel = pow(1.0 - dot(vNormal, vViewDir), uFresnelPower);
  gl_FragColor = vec4(uColour * fresnel, fresnel);
}
```

---

## Part 5: Particle Systems

Particles are a signature of award-winning sites. Build them with BufferGeometry for performance.

### High-Performance Particle Field
```javascript
function createParticleField(count = 5000) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colours = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const randoms = new Float32Array(count); // for shader variation

  for (let i = 0; i < count; i++) {
    // Spread across a volume
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    
    // Colour gradient (deep purple to cyan)
    colours[i * 3]     = Math.random() * 0.3 + 0.1;
    colours[i * 3 + 1] = Math.random() * 0.2;
    colours[i * 3 + 2] = Math.random() * 0.5 + 0.5;
    
    sizes[i] = Math.random() * 3.0 + 1.0;
    randoms[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colours, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
    vertexShader: `
      attribute float aSize;
      attribute float aRandom;
      uniform float uTime;
      uniform float uPixelRatio;
      
      void main() {
        vec3 pos = position;
        // Breathing / floating motion
        pos.y += sin(uTime * 0.5 + aRandom * 6.28) * 0.3;
        pos.x += cos(uTime * 0.3 + aRandom * 6.28) * 0.2;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
      }
    `,
    fragmentShader: `
      void main() {
        // Circular soft particle
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = length(uv);
        if (dist > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.6);
      }
    `,
    transparent: true,
    depthWrite: false,
    vertexColors: false,
    blending: THREE.AdditiveBlending, // glow effect
  });

  return new THREE.Points(geometry, material);
}
```

### Morphing Particles (shape to shape)
```javascript
// Create two sets of positions, lerp between them via GSAP
const particlesMorph = { progress: 0 };

gsap.to(particlesMorph, {
  progress: 1,
  duration: 2,
  ease: 'power2.inOut',
  onUpdate: () => {
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < count * 3; i++) {
      pos[i] = THREE.MathUtils.lerp(positionsA[i], positionsB[i], particlesMorph.progress);
    }
    geometry.attributes.position.needsUpdate = true;
  }
});
```

---

## Part 6: GSAP Animation Choreography

GSAP is the animation backbone. The difference between good and award-winning is **timing precision and easing selection**.

### Page Load Sequence (Staggered Reveals)
```javascript
// Execute on DOMContentLoaded — NEVER on load (too late)
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.fromTo('.hero-title .line', 
  { yPercent: 110, opacity: 0 },
  { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 }
)
.fromTo('.hero-subtitle',
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.8 },
  '-=0.6'  // overlap previous by 0.6s
)
.fromTo('.hero-cta',
  { opacity: 0, scale: 0.9 },
  { opacity: 1, scale: 1, duration: 0.6 },
  '-=0.4'
);

// Animate 3D scene in simultaneously
gsap.fromTo(scene.position, 
  { z: -5 },
  { z: 0, duration: 2, ease: 'expo.out' }
);
```

### Scroll-Driven 3D Rotation
```javascript
// Pin a section and rotate the 3D object as user scrolls
ScrollTrigger.create({
  trigger: '#section-3d',
  start: 'top top',
  end: '+=300%',
  pin: true,
  scrub: 1.5, // smooth scrubbing
  onUpdate: (self) => {
    mesh.rotation.y = self.progress * Math.PI * 2;
    mesh.rotation.x = self.progress * Math.PI * 0.3;
    
    // Move camera closer through scroll
    camera.position.z = THREE.MathUtils.lerp(8, 3, self.progress);
  }
});
```

### Text Split Animation (SplitType pattern without plugin)
```javascript
// Manual character split for precise control
function splitText(el) {
  const text = el.textContent;
  el.innerHTML = [...text].map(char => 
    char === ' ' ? ' ' : `<span class="char" style="display:inline-block; overflow:hidden"><span class="char-inner">${char}</span></span>`
  ).join('');
  return el.querySelectorAll('.char-inner');
}

const chars = splitText(document.querySelector('.big-title'));
gsap.fromTo(chars,
  { yPercent: 100 },
  { yPercent: 0, duration: 0.8, stagger: 0.02, ease: 'back.out(1.2)' }
);
```

### Scroll-Triggered Section Reveals
```javascript
gsap.utils.toArray('.reveal-section').forEach(section => {
  gsap.fromTo(section, 
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 40%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});
```

### Cursor-Reactive 3D (Mouse parallax)
```javascript
const mouse = new THREE.Vector2();
const targetMouse = new THREE.Vector2();

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

// In render loop — smooth follow with lerp
function animate() {
  requestAnimationFrame(animate);
  
  // Smooth mouse tracking
  targetMouse.x += (mouse.x - targetMouse.x) * 0.05;
  targetMouse.y += (mouse.y - targetMouse.y) * 0.05;
  
  // Apply to camera or scene
  camera.position.x = targetMouse.x * 0.5;
  camera.position.y = targetMouse.y * 0.3;
  camera.lookAt(scene.position);
  
  renderer.render(scene, camera);
}
```

---

## Part 7: Lighting for Drama

Lighting separates hobbyist Three.js from studio-quality work.

### Award-Winning Lighting Setup
```javascript
// Base ambient — keep it dark for drama
const ambient = new THREE.AmbientLight(0x111122, 0.3);

// Key light — main dramatic source
const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(5, 8, 5);

// Rim light — edge definition, often coloured
const rimLight = new THREE.DirectionalLight(0x4466ff, 0.8);
rimLight.position.set(-5, 2, -5);

// Fill light — soft, often warm
const fillLight = new THREE.PointLight(0xff6633, 0.6, 20);
fillLight.position.set(3, -2, 3);

// Accent light — dramatic pop
const accentLight = new THREE.PointLight(0x9933ff, 1.2, 15);
accentLight.position.set(-3, 5, -3);

scene.add(ambient, keyLight, rimLight, fillLight, accentLight);

// Animate lights subtly
function animateLights(elapsed) {
  accentLight.position.x = Math.sin(elapsed * 0.5) * 4;
  accentLight.position.z = Math.cos(elapsed * 0.5) * 4;
  rimLight.intensity = 0.6 + Math.sin(elapsed * 0.8) * 0.2;
}
```

### Environment Mapping (for realistic reflections)
```javascript
// Use a cube render target for reflections
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
  format: THREE.RGBFormat,
  generateMipmaps: true,
  minFilter: THREE.LinearMipmapLinearFilter,
});
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);
scene.add(cubeCamera);

const refractiveMaterial = new THREE.MeshPhysicalMaterial({
  envMap: cubeRenderTarget.texture,
  roughness: 0.0,
  metalness: 0.0,
  transmission: 1.0,  // glass effect
  thickness: 0.5,
});
```

---

## Part 8: Performance Standards

**Performance is a judging criterion, not an afterthought.** Awwwards usability scores factor in load speed and responsiveness.

### Target Benchmarks
| Metric | Target | Fail Threshold |
|---|---|---|
| First Contentful Paint | < 1.5s | > 3s |
| Time to Interactive | < 3.5s | > 5s |
| Render loop FPS | 60fps desktop | < 30fps mobile |
| Pixel ratio cap | 2x | Never 3x+ |
| Geometry complexity | < 100k triangles visible | > 500k |

### Performance Rules

**Renderer**
```javascript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // NEVER remove this cap
renderer.shadowMap.enabled = false; // disable unless shadows are essential
renderer.powerPreference = 'high-performance';
```

**Geometry**
```javascript
// Reuse geometries — never create new ones in the render loop
const sphereGeom = new THREE.SphereGeometry(1, 32, 32); // not 64,64 unless needed
const instances = new THREE.InstancedMesh(sphereGeom, material, 1000); // for many objects
```

**Textures**
```javascript
// Power-of-two textures only: 512, 1024, 2048
// Always set min filter
texture.minFilter = THREE.LinearMipmapLinearFilter;
texture.generateMipmaps = true;

// Dispose unused textures
function cleanup() {
  geometry.dispose();
  material.dispose();
  texture.dispose();
}
```

**Mobile Detection**
```javascript
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;

const particleCount = isMobile ? 1000 : 5000;
const geometryDetail = isMobile ? 16 : 64;
```

**Progressive Loading Pattern**
```javascript
// Show content immediately, load 3D assets in background
document.querySelector('.hero-text').style.opacity = '1'; // text loads instantly

const loader = new THREE.TextureLoader();
loader.load('/model-texture.jpg', (texture) => {
  // Only initialise heavy 3D once loaded
  initHeavy3DScene(texture);
});
```

---

## Part 9: Aesthetic Directions for Award Work

Choose one direction and commit to it completely. These are the archetypes that win.

### 1. Dark Luxury (most common winner aesthetic)
- Background: near-black (#050508, #0a0a0f)
- Accents: single saturated colour (electric blue, acid green, or gold)
- 3D: glossy or refractive materials, strong rim lighting
- Typography: large serif display font + mono body
- Motion: slow, deliberate, cinematic

### 2. Organic / Natural
- Background: warm off-whites, earthy tones
- 3D: organic fluid geometry (metaballs, cloth sim via shaders)
- Lighting: warm soft fill, dappled shadow via shader
- Typography: humanist sans or elegant serif
- Motion: fluid, physics-like, breath-paced

### 3. Brutalist Digital
- Background: pure white or pure black
- Typography: oversized, overlapping, rule-breaking
- 3D: raw geometry, no smoothing, deliberately crude materials
- Motion: abrupt, snappy, unexpected
- Colour: single accent used violently

### 4. Sci-Fi / Technical
- Background: deep navy or black
- Grid overlays, scanlines, data readouts
- 3D: wireframe, holographic materials, particle data streams
- Typography: mono or technical sans
- Motion: precise, mechanical, timed like a UI state change

### 5. Experimental / Art
- No rules — but total internal consistency
- Often wins Developer SOTD or FWA
- Requires a genuine concept driving every decision

---

## Part 10: Signature Effects Library

Copy and adapt these for the signature moment of any build.

### Floating Blob / Organic Form
```javascript
// Animate a sphere into an organic blob using vertex shader
const blobMesh = new THREE.Mesh(
  new THREE.SphereGeometry(2, 128, 128),
  new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uDistort: { value: 0.4 } },
    vertexShader: `
      uniform float uTime;
      uniform float uDistort;
      varying vec3 vNormal;
      
      // Simple noise (replace with full snoise for quality)
      float hash(vec3 p) {
        p = fract(p * vec3(443.8975, 397.2973, 491.1871));
        p += dot(p.zxy, p.yxz + 19.19);
        return fract(p.x * p.y * p.z);
      }
      
      void main() {
        vNormal = normal;
        vec3 pos = position;
        float noise = hash(pos + uTime * 0.3) * uDistort;
        pos += normal * noise;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vNormal;
      void main() {
        vec3 col = mix(vec3(0.2, 0.0, 0.5), vec3(0.0, 0.6, 1.0), vNormal.y * 0.5 + 0.5);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  })
);
```

### Scroll-Driven Camera Path (Cinematic)
```javascript
// Define camera path as a CatmullRomCurve
const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(5, 2, 5),
  new THREE.Vector3(0, 4, 0),
  new THREE.Vector3(-5, 2, 5),
  new THREE.Vector3(0, 0, 10),
]);

ScrollTrigger.create({
  trigger: '.journey-section',
  start: 'top top',
  end: '+=500%',
  pin: true,
  scrub: 2,
  onUpdate: (self) => {
    const point = cameraPath.getPointAt(self.progress);
    camera.position.copy(point);
    camera.lookAt(0, 0, 0);
  }
});
```

### Image Hover Distortion (DOM + WebGL)
```javascript
// Match a Three.js plane to a DOM image, apply warp shader on hover
const domImage = document.querySelector('.featured-image');
const rect = domImage.getBoundingClientRect();

// Convert DOM position to Three.js world coordinates
const x = (rect.left / window.innerWidth) * 2 - 1;
const y = -(rect.top / window.innerHeight) * 2 + 1;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(rect.width / window.innerWidth * 2, rect.height / window.innerHeight * 2),
  distortionMaterial
);
plane.position.set(x + rect.width / window.innerWidth, y - rect.height / window.innerHeight, 0);
scene.add(plane);
domImage.style.opacity = '0'; // hide DOM image, show WebGL version

// Hover state
domImage.addEventListener('mouseenter', () => {
  gsap.to(distortionMaterial.uniforms.uDistortion, { value: 1.0, duration: 0.5 });
});
domImage.addEventListener('mouseleave', () => {
  gsap.to(distortionMaterial.uniforms.uDistortion, { value: 0.0, duration: 0.8 });
});
```

### Custom Cursor (signature on award sites)
```javascript
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let cursorX = 0, cursorY = 0;
let dotX = 0, dotY = 0;

window.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
});

function updateCursor() {
  // Dot follows immediately
  dotX = cursorX;
  dotY = cursorY;
  
  // Ring follows with lag
  // (Use GSAP for this in production)
  gsap.to(cursor, { 
    x: cursorX - 20, 
    y: cursorY - 20, 
    duration: 0.5, 
    ease: 'power2.out' 
  });
  gsap.set(cursorDot, { x: dotX - 4, y: dotY - 4 });
  
  requestAnimationFrame(updateCursor);
}
updateCursor();

// Magnetic hover effect on buttons
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursor, { scale: 2.5, duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursor, { scale: 1, duration: 0.3 });
  });
});
```

---

## Part 11: The Loading Screen

Award sites always have a considered loader. It buys time for assets and sets the tone.

```javascript
// Minimum display time: 1.5s. Maximum: 3s.
const loaderTimeline = gsap.timeline();

// Animate count up
const counter = { val: 0 };
gsap.to(counter, {
  val: 100,
  duration: 2,
  ease: 'power1.inOut',
  onUpdate: () => {
    document.querySelector('.loader-count').textContent = 
      Math.round(counter.val).toString().padStart(3, '0');
  }
});

// Reveal site after load
window.addEventListener('load', () => {
  gsap.to('.loader', {
    yPercent: -100,
    duration: 1.2,
    ease: 'expo.inOut',
    delay: 0.5,
    onComplete: () => {
      document.querySelector('.loader').style.display = 'none';
      // Trigger hero animations now
      initHeroAnimations();
    }
  });
});
```

---

## Part 12: Checklist Before Delivery

Run through this before presenting any 3D website build.

### Technical
- [ ] Pixel ratio capped at `Math.min(devicePixelRatio, 2)`
- [ ] Resize handler implemented for camera and renderer
- [ ] No geometry or material creation inside the render loop
- [ ] `depthWrite: false` on transparent/additive materials
- [ ] Mobile particle count reduced
- [ ] All ScrollTrigger instances use `scrub` (not instant jumps)
- [ ] Lenis is initialised and connected to GSAP ticker

### Aesthetic
- [ ] One clear "signature moment" defined and executed
- [ ] Typography is distinctive — not Inter, Roboto, or system-ui
- [ ] Colour palette is deliberate — max 3 colours + black/white
- [ ] Loading screen exists and sets the tone
- [ ] Custom cursor exists (desktop only — hide on touch)
- [ ] Section transitions feel authored, not accidental

### Award Criteria
- [ ] Design (40%): Strong visual hierarchy, intentional layout, bold typography
- [ ] Usability (30%): Works on mobile, navigation is clear, load time acceptable
- [ ] Creativity (20%): One thing that has NOT been done the same way before
- [ ] Content (10%): Copy is sharp and purposeful

---

## Part 13: Self-Contained HTML Template

Use this as the starting point for standalone HTML artifacts. Replace the scene content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Site Title</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <!-- Choose a distinctive font — NOT Inter -->
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Space+Mono&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --bg: #06060a;
      --fg: #f0ede6;
      --accent: #7b4fff;
      --mono: 'Space Mono', monospace;
      --serif: 'Cormorant Garamond', serif;
    }
    
    html { background: var(--bg); color: var(--fg); }
    body { overflow-x: hidden; }
    
    canvas#webgl {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 0;
      pointer-events: none;
    }
    
    .content { position: relative; z-index: 1; }
    
    /* Custom cursor */
    .cursor {
      position: fixed;
      width: 40px; height: 40px;
      border: 1px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: border-color 0.3s;
    }
    .cursor-dot {
      position: fixed;
      width: 6px; height: 6px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
    }
    @media (hover: none) { .cursor, .cursor-dot { display: none; } }
    
    /* Loader */
    .loader {
      position: fixed;
      inset: 0;
      background: var(--bg);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .loader-count {
      font-family: var(--mono);
      font-size: clamp(3rem, 10vw, 8rem);
      color: var(--accent);
      letter-spacing: -0.05em;
    }
    
    /* Hero */
    .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .hero-title {
      font-family: var(--serif);
      font-size: clamp(4rem, 12vw, 12rem);
      font-weight: 300;
      line-height: 0.9;
      letter-spacing: -0.03em;
      text-align: center;
      overflow: hidden;
    }
    .hero-title .line { display: block; overflow: hidden; }
    .hero-title .line-inner { display: block; transform: translateY(110%); }
  </style>
</head>
<body>

  <!-- Loader -->
  <div class="loader">
    <span class="loader-count">000</span>
  </div>
  
  <!-- Custom cursor -->
  <div class="cursor"></div>
  <div class="cursor-dot"></div>
  
  <!-- WebGL Canvas -->
  <canvas id="webgl"></canvas>
  
  <!-- Content -->
  <div class="content">
    <section class="hero">
      <h1 class="hero-title">
        <span class="line"><span class="line-inner">The</span></span>
        <span class="line"><span class="line-inner">Future</span></span>
        <span class="line"><span class="line-inner">Is Here</span></span>
      </h1>
    </section>
    <!-- Add more sections -->
  </div>

  <!-- Scripts -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  
  <script>
    gsap.registerPlugin(ScrollTrigger);

    // ── Scene Setup ──────────────────────────────────
    const canvas = document.getElementById('webgl');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ── ADD YOUR SCENE OBJECTS HERE ──────────────────
    // Example: simple glowing sphere
    const geo = new THREE.SphereGeometry(1.5, 64, 64);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x7b4fff,
      emissive: 0x3300aa,
      emissiveIntensity: 0.3,
      roughness: 0.1,
      metalness: 0.8,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    const pointLight = new THREE.PointLight(0x7b4fff, 2, 20);
    pointLight.position.set(3, 3, 3);
    scene.add(ambientLight, pointLight);

    // ── Clock ────────────────────────────────────────
    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();

    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // ── Render Loop ──────────────────────────────────
    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      
      // Mouse follow
      targetMouse.x += (mouse.x - targetMouse.x) * 0.05;
      targetMouse.y += (mouse.y - targetMouse.y) * 0.05;
      mesh.rotation.y = elapsed * 0.3 + targetMouse.x * 0.5;
      mesh.rotation.x = targetMouse.y * 0.3;
      
      renderer.render(scene, camera);
    }
    animate();

    // ── Resize ───────────────────────────────────────
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // ── Custom Cursor ────────────────────────────────
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
      gsap.set(cursorDot, { x: e.clientX, y: e.clientY });
    });

    // ── Loader ───────────────────────────────────────
    const counter = { val: 0 };
    gsap.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        document.querySelector('.loader-count').textContent = 
          Math.round(counter.val).toString().padStart(3, '0');
      }
    });

    window.addEventListener('load', () => {
      gsap.to('.loader', {
        yPercent: -100,
        duration: 1,
        ease: 'expo.inOut',
        delay: 0.3,
        onComplete: () => {
          // Hero reveal
          gsap.to('.hero-title .line-inner', {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power3.out',
          });
        }
      });
    });
  </script>
</body>
</html>
```

---

## Quick Reference: Easing Guide

| Feeling | Easing |
|---|---|
| Cinematic, weighty | `expo.out`, `expo.inOut` |
| Smooth, natural | `power2.out`, `power3.out` |
| Springy, playful | `back.out(1.7)`, `elastic.out(1, 0.4)` |
| Mechanical, precise | `power4.inOut` |
| Scrub animations | `none` (linear, controlled by scroll position) |

---

*This skill targets Awwwards SOTD, CSS Design Awards, and FWA. The bar is: first-time visitors should stop and say "how did they do that?"*
