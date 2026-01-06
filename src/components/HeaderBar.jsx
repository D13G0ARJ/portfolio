import { Divider, Space, Switch, Typography, theme } from 'antd'
import { useTranslation } from 'react-i18next'
import { setLanguage } from '../i18n/i18n'
import ThemeToggle from './ui/ThemeToggle'

const { Text } = Typography

export default function HeaderBar({ isDark, onThemeChange }) {
  const { i18n, t } = useTranslation()
  const { token } = theme.useToken()

  const isEnglish = i18n.language?.startsWith('en')

  return (
    <header className="max-w-6xl mx-auto px-4 pt-6">
      <div
        className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3"
        style={{
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <Text style={{ color: token.colorText, fontWeight: 600 }}>{t('brand')}</Text>

        <Space split={<Divider type="vertical" style={{ borderColor: token.colorBorder }} />} wrap>
          <Space>
            <Text type="secondary">{t('toggles.lang')}</Text>
            <Switch
              checked={isEnglish}
              onChange={(checked) => setLanguage(checked ? 'en' : 'es')}
              checkedChildren="EN"
              unCheckedChildren="ES"
            />
          </Space>

          <Space>
            <Text type="secondary">{t('toggles.theme')}</Text>
            <ThemeToggle
              checked={isDark}
              onChange={onThemeChange}
              checkedLabel={t('toggles.dark')}
              uncheckedLabel={t('toggles.light')}
            />
          </Space>
        </Space>
      </div>
    </header>
  )
}
