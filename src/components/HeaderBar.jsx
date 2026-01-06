import { Space, Switch, Typography, theme } from 'antd'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../i18n/i18n'
import ThemeToggle from './ui/ThemeToggle'

const { Text } = Typography

export default function HeaderBar({ isDark, onThemeChange }) {
  const { i18n, t } = useTranslation()
  const { token } = theme.useToken()

  const isSpanish = i18n.language?.startsWith('es') ?? true

  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: isDark ? 'rgba(3, 3, 3, 0.65)' : 'rgba(241, 239, 236, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: isDark ? `1px solid ${token.colorBorder}` : '1px solid rgba(212, 201, 190, 0.65)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-4 py-3 shadow-sm">
          <Text style={{ color: token.colorText, fontWeight: 600 }}>{t('brand')}</Text>

          <Space size={10} align="center">
            <Switch
              size="small"
              checked={isSpanish}
              onChange={(checked) => setLanguage(checked ? 'es' : 'en')}
              checkedChildren="ES"
              unCheckedChildren="EN"
            />
            <ThemeToggle
              checked={isDark}
              onChange={onThemeChange}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
          </Space>
        </div>
      </div>
    </header>
  )
}
