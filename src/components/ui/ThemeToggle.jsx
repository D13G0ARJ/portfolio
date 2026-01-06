import { Switch } from 'antd'
import { useMemo, useRef } from 'react'
import { flushSync } from 'react-dom'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
}

function computeFallbackPoint(el) {
  const rect = el?.getBoundingClientRect?.()
  if (!rect) return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

function computeMaxRadius(x, y) {
  const dx = Math.max(x, window.innerWidth - x)
  const dy = Math.max(y, window.innerHeight - y)
  return Math.hypot(dx, dy)
}

export default function ThemeToggle({ checked, onChange, checkedChildren, unCheckedChildren }) {
  const wrapRef = useRef(null)

  const labels = useMemo(() => {
    return {
      checked: checkedChildren ?? 'Dark',
      unchecked: unCheckedChildren ?? 'Light',
    }
  }, [checkedChildren, unCheckedChildren])

  const handleToggle = (event) => {
    const nextChecked = !checked

    const root = document.documentElement

    const point = event?.clientX != null && event?.clientY != null
      ? { x: event.clientX, y: event.clientY }
      : computeFallbackPoint(wrapRef.current)

    const x = point.x
    const y = point.y

    const canViewTransition = typeof document !== 'undefined' && typeof document.startViewTransition === 'function'

    if (!canViewTransition || prefersReducedMotion()) {
      onChange?.(nextChecked)
      return
    }

    const r = computeMaxRadius(x, y)

    root.style.setProperty('--vt-x', `${x}px`)
    root.style.setProperty('--vt-y', `${y}px`)
    root.style.setProperty('--vt-r', `${r}px`)
    root.dataset.vt = nextChecked ? 'dark' : 'light'
    root.classList.add('vt')

    const transition = document.startViewTransition(() => {
      flushSync(() => onChange?.(nextChecked))
    })

    transition.finished.finally(() => {
      root.classList.remove('vt')
      delete root.dataset.vt
    })
  }

  return (
    <span ref={wrapRef}>
      <Switch
        size="small"
        checked={checked}
        onClick={handleToggle}
        checkedChildren={labels.checked}
        unCheckedChildren={labels.unchecked}
      />
    </span>
  )
}
