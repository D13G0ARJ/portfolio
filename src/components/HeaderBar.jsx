import { Divider, Space, Switch, Typography, theme } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../i18n/i18n'
import ThemeToggle from './ui/ThemeToggle'

const { Text } = Typography

export default function HeaderBar({ isDark, onThemeChange }) {
  const { i18n, t } = useTranslation()
  const { token } = theme.useToken()

  const isSpanish = i18n.language?.startsWith('es') ?? true

  const labelClassName = `hidden sm:inline text-sm font-medium mr-2 ${isDark ? 'text-cream' : 'text-deep'}`

  return (
    <header
      className={
        `sticky top-0 z-50 w-full relative isolate pointer-events-auto transform-gpu backdrop-blur-md shadow-sm ` +
        (isDark ? 'bg-night/70 border-b border-taupe/25' : 'bg-cream/80 border-b border-taupe/60')
      }
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
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
              <span className={labelClassName}>Idioma</span>
              <Switch
                size="small"
                aria-label="Idioma"
                checked={isSpanish}
                onChange={(checked) => setLanguage(checked ? 'es' : 'en')}
                onClick={() => setLanguage(isSpanish ? 'en' : 'es')}
                style={{ touchAction: 'manipulation' }}
                checkedChildren="ES"
                unCheckedChildren="EN"
              />
            </div>

            <div className="flex items-center px-2 py-2 -mx-2 -my-2 rounded-md pointer-events-auto">
              <span className={labelClassName}>Tema</span>
              <ThemeToggle
                checked={isDark}
                onChange={onThemeChange}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
            </div>
          </Space>
        </div>
      </div>
    </header>
  )
}
