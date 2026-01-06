import { Space, Tag, Typography, theme } from 'antd'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useGitHubProfile } from '../hooks/useGitHubProfile'

const { Text } = Typography

export default function FooterBar({ isDark = false }) {
  const { t } = useTranslation()
  const { token } = theme.useToken()

  const username = 'D13G0ARJ'
  const { profile, loading, error } = useGitHubProfile({ username })

  const pillStyle = useMemo(() => {
    return {
      backgroundColor: isDark ? 'rgba(212, 201, 190, 0.08)' : token.colorBgLayout,
      borderColor: isDark ? 'rgba(212, 201, 190, 0.28)' : token.colorBorder,
      color: token.colorText,
      fontWeight: 600,
      marginInlineEnd: 0,
      marginBottom: 0,
      paddingInline: 10,
    }
  }, [isDark, token])

  return (
    <footer className="max-w-6xl mx-auto px-4 py-10">
      <div
        className="rounded-2xl px-4 py-4"
        style={{
          background: token.colorBgContainer,
          border: `1px solid ${token.colorBorder}`,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Text style={{ fontWeight: 600, color: token.colorText }}>{t('footerStats.title')}</Text>
            <div style={{ marginTop: 6 }}>
              <Text style={{ color: token.colorTextSecondary, fontWeight: 500 }}>
                {t('footerStats.subtitle')}
              </Text>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              style={{
                color: token.colorText,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              github.com/{username}
            </a>

            {loading ? (
              <Text style={{ color: token.colorTextSecondary }}>{t('footerStats.loading')}</Text>
            ) : error || !profile ? (
              <Text style={{ color: token.colorTextSecondary, fontWeight: 500 }}>
                {t('footerStats.unavailable')}
              </Text>
            ) : (
              <Space size={8} wrap>
                <Tag style={pillStyle} bordered>
                  {t('footerStats.repos')}: {profile.public_repos ?? 0}
                </Tag>
                <Tag style={pillStyle} bordered>
                  {t('footerStats.followers')}: {profile.followers ?? 0}
                </Tag>
                <Tag style={pillStyle} bordered>
                  {t('footerStats.following')}: {profile.following ?? 0}
                </Tag>
              </Space>
            )}
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Text style={{ color: token.colorTextSecondary }}>{t('footer')}</Text>
        </div>
      </div>
    </footer>
  )
}
