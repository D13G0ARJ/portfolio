import { Button, Divider, Drawer, Grid, Menu, Space, Switch, Typography, theme } from 'antd'
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

  const [drawerOpen, setDrawerOpen] = useState(false)
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
    setDrawerOpen(false)
  }

  const applyLanguage = (lang) => {
    const now = Date.now()
    const last = lastLangChangeRef.current
    if (last.lang === lang && now - last.at < 600) return
    lastLangChangeRef.current = { lang, at: now }
    setLanguage(lang)
  }

  const drawerBg = token.colorBgBase

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
                <Button
                  type="text"
                  aria-label="Menu"
                  icon={<MenuOutlined />}
                  onClick={() => setDrawerOpen(true)}
                  style={{ color: token.colorText }}
                />
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

      <Drawer
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={t('brand')}
        styles={{
          header: { background: drawerBg, borderBottom: `1px solid ${token.colorBorder}` },
          body: { background: drawerBg, padding: 12 },
        }}
      >
        <Menu
          mode="inline"
          selectable={false}
          style={{ background: drawerBg, color: token.colorText, fontFamily: token.fontFamily }}
          selectedKeys={[activeKey]}
          items={navItems.map((item) => ({ key: item.href, label: item.label, icon: item.icon }))}
          onClick={({ key }) => handleNavClick(undefined, key)}
        />
      </Drawer>
    </header>
  )
}
