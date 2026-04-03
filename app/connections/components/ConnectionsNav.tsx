'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { ChevronLeft, User } from 'lucide-react'

export default function ConnectionsNav() {
  const user = useQuery(api.users.viewer)

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'max(env(safe-area-inset-top, 0px), 10px) 1rem 10px',
        background: 'linear-gradient(to bottom, rgba(8,8,15,0.92) 0%, rgba(8,8,15,0) 100%)',
        pointerEvents: 'none',
      }}
    >
      {/* Back to home */}
      <Link
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          textDecoration: 'none',
          pointerEvents: 'auto',
          padding: '6px 10px 6px 6px',
          borderRadius: 8,
          background: 'rgba(13,13,26,0.7)',
          border: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        aria-label="Back to Plain Prophecy home"
      >
        <ChevronLeft size={13} style={{ color: '#9A9A8A', flexShrink: 0 }} />
        <span
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 10,
            color: '#C8C8B8',
            letterSpacing: '0.07em',
            whiteSpace: 'nowrap',
          }}
        >
          Plain Prophecy
        </span>
      </Link>

      {/* Auth state */}
      <div style={{ pointerEvents: 'auto' }}>
        {user === undefined ? null : user === null ? (
          <Link
            href="/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: 8,
              background: 'rgba(13,13,26,0.7)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-inter)',
              fontSize: 11,
              color: '#9A9A8A',
            }}
          >
            Sign in
          </Link>
        ) : (
          <Link
            href="/profile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              padding: '4px 10px 4px 4px',
              borderRadius: 8,
              background: 'rgba(13,13,26,0.7)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            aria-label="Go to your profile"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? 'Profile'}
                width={24}
                height={24}
                style={{ borderRadius: '50%', flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'rgba(201,168,76,0.2)',
                  border: '1px solid rgba(201,168,76,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <User size={12} style={{ color: '#C9A84C' }} />
              </div>
            )}
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 11,
                color: '#C8C8B8',
                maxWidth: 80,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {user.name?.split(' ')[0] ?? 'Profile'}
            </span>
          </Link>
        )}
      </div>
    </div>
  )
}
