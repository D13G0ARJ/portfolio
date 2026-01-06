import { Button, Divider, Grid, Popover, Space, Switch, Typography, theme } from 'antd'
import {
  InfoCircleOutlined,
  MenuOutlined,
  MoonOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SunOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useRef, useState } from 'react'
import { setLanguage } from '../i18n/i18n'
import ThemeToggle from './ui/ThemeToggle'

const { Text } = Typography

export default function HeaderBar({ isDark, onThemeChange }) {
  const { i18n, t } = useTranslation()
  const { token } = theme.useToken()
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeKey, setActiveKey] = useState('#home')
  const lastLangChangeRef = useRef({ lang: null, at: 0 })

  const isSpanish = i18n.language?.startsWith('es') ?? true

  const labelClassName = `hidden sm:inline text-sm font-medium mr-2 ${isDark ? 'text-cream' : 'text-deep'}`

  const navItems = useMemo(() => {
    return [
      { href: '#home', label: t('nav.home'), icon: <SafetyCertificateOutlined /> },
      { href: '#skills', label: t('nav.skills'), icon: <ToolOutlined /> },
      { href: '#experience', label: t('nav.experience'), icon: <RocketOutlined /> },
      { href: '#projects', label: t('nav.projects'), icon: <MenuOutlined /> },
      { href: '#why-me', label: t('nav.about'), icon: <InfoCircleOutlined /> },
    ]
  }, [t])

  useEffect(() => {
    const getKeyFromHash = () => {
      const hash = window.location.hash
      const exists = navItems.some((it) => it.href === hash)
      return exists ? hash : '#home'
    }

    setActiveKey(getKeyFromHash())

    const onHashChange = () => setActiveKey(getKeyFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [navItems])

  const handleNavClick = (e, href) => {
    const id = String(href || '').replace('#', '')
    if (!id) return

    const el = document.getElementById(id)
    if (!el) return

    e?.preventDefault?.()

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })

    try {
      history.replaceState(null, '', `#${id}`)
    } catch {
      // no-op
    }

    setActiveKey(`#${id}`)
    setMobileMenuOpen(false)
  }

  const applyLanguage = (lang) => {
    const now = Date.now()
    const last = lastLangChangeRef.current
    if (last.lang === lang && now - last.at < 600) return
    lastLangChangeRef.current = { lang, at: now }
    setLanguage(lang)
  }

  const floatingBg = token.colorBgBase

  const mobileMenuContent = (
    <div
      className="w-48 flex flex-col gap-1"
      style={{ background: floatingBg, fontFamily: token.fontFamily }}
    >
      {navItems.map((item) => {
        const isActive = item.href === activeKey
        return (
          <button
            key={item.href}
            type="button"
            onClick={() => handleNavClick(undefined, item.href)}
            className={
              'w-full flex items-center gap-3 text-left py-3 px-4 transition-colors ' +
              (isActive
                ? isDark
                  ? 'bg-taupe/10 text-cream'
                  : 'bg-taupe/20 text-deep'
                : isDark
                  ? 'text-cream/85 hover:bg-taupe/10 hover:text-cream'
                  : 'text-deep/80 hover:bg-taupe/20 hover:text-deep')
            }
            style={{ touchAction: 'manipulation' }}
          >
            <span style={{ color: token.colorTextSecondary, display: 'grid', placeItems: 'center' }}>
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        )
      })}
    </div>
  )

  return (
    <header
      className={
        `sticky top-0 z-50 w-full relative isolate pointer-events-auto transform-gpu backdrop-blur-md shadow-sm ` +
        (isDark ? 'bg-night/70 border-b border-taupe/25' : 'bg-cream/80 border-b border-taupe/60')
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center justify-between gap-4">
            <Text style={{ color: token.colorText, fontWeight: 600 }}>{t('brand')}</Text>

            <Space
              align="center"
              split={<Divider type="vertical" style={{ borderColor: token.colorBorder }} />}
              size={12}
              className="relative z-50 pointer-events-auto"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="flex items-center px-2 py-2 -mx-2 -my-2 rounded-md pointer-events-auto">
                <span className={labelClassName}>{t('toggles.lang')}</span>
                <Switch
                  size="small"
                  aria-label={t('toggles.lang')}
                  checked={isSpanish}
                  onChange={(checked) => applyLanguage(checked ? 'es' : 'en')}
                  style={{ touchAction: 'manipulation' }}
                  checkedChildren="ES"
                  unCheckedChildren="EN"
                />
              </div>

              <div className="flex items-center px-2 py-2 -mx-2 -my-2 rounded-md pointer-events-auto">
                <span className={labelClassName}>{t('toggles.theme')}</span>
                <ThemeToggle
                  checked={isDark}
                  onChange={onThemeChange}
                  checkedChildren={<MoonOutlined />}
                  unCheckedChildren={<SunOutlined />}
                />
              </div>

              {isMobile && (
                <Popover
                  trigger="click"
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                  open={mobileMenuOpen}
                  onOpenChange={setMobileMenuOpen}
                  content={mobileMenuContent}
                  overlayInnerStyle={{ padding: 0, borderRadius: 12, overflow: 'hidden' }}
                  overlayStyle={{ borderRadius: 12 }}
                >
                  <Button
                    type="text"
                    aria-label="Menu"
                    icon={<MenuOutlined />}
                    style={{ color: token.colorText }}
                  />
                </Popover>
              )}
            </Space>
          </div>

          {!isMobile && (
            <nav className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={
                    `text-sm font-medium px-2 py-1 rounded-md transition-colors ` +
                    (isDark
                      ? 'text-cream/85 hover:text-cream hover:bg-taupe/10'
                      : 'text-deep/80 hover:text-deep hover:bg-taupe/20')
                  }
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

    </header>
  )
}
