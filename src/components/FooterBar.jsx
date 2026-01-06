import { Typography, theme } from 'antd'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

export default function FooterBar() {
  const { t } = useTranslation()
  const { token } = theme.useToken()

  return (
    <footer className="max-w-6xl mx-auto px-4 py-10">
      <div
        className="rounded-2xl px-4 py-4"
        style={{
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <Text type="secondary">{t('footer')}</Text>
      </div>
    </footer>
  )
}
