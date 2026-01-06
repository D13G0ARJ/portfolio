import { Card, Grid, Tag, Timeline, Typography, theme } from 'antd'
import { ExperimentOutlined, RocketOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph, Text } = Typography

function ExperienceTags({ tags = [], token }) {
  if (!Array.isArray(tags) || tags.length === 0) return null

  return (
    <div className="flex flex-wrap" style={{ marginTop: 12 }}>
      {tags.map((tag) => {
        if (!tag?.label) return null

        if (tag.color) {
          return (
            <Tag key={tag.label} color={tag.color} style={{ marginBottom: 8 }}>
              {tag.label}
            </Tag>
          )
        }

        return (
          <Tag
            key={tag.label}
            bordered
            style={{
              backgroundColor: token.colorBgLayout,
              borderColor: token.colorBorder,
              color: token.colorText,
              fontWeight: 500,
              marginBottom: 8,
            }}
          >
            {tag.label}
          </Tag>
        )
      })}
    </div>
  )
}

function ExperienceCard({ item, token }) {
  return (
    <Card
      variant="outlined"
      hoverable
      className="glass-card"
      style={{
        borderRadius: 16,
      }}
      styles={{
        body: { padding: 16 },
      }}
    >
      <div className="flex flex-col gap-2">
        <Text style={{ fontWeight: 700, color: token.colorPrimary }}>{item.role}</Text>
        <Text style={{ color: token.colorTextSecondary }}>{item.company}</Text>
        <Text style={{ color: token.colorTextSecondary }}>{item.date}</Text>

        <Paragraph style={{ margin: 0, marginTop: 6, color: token.colorText }}>
          {item.description}
        </Paragraph>

        {Array.isArray(item.bullets) && item.bullets.length > 0 && (
          <ul style={{ margin: 0, paddingLeft: 18, color: token.colorTextSecondary }}>
            {item.bullets.map((b) => (
              <li key={b} style={{ marginBottom: 6 }}>
                {b}
              </li>
            ))}
          </ul>
        )}

        <ExperienceTags tags={item.tags} token={token} />
      </div>
    </Card>
  )
}

export default function ExperienceSection() {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const isMobile = !screens.md

  const items = t('experience.items', { returnObjects: true })

  const timelineItems = Array.isArray(items)
    ? items.map((item, idx) => {
        const fromX = isMobile ? -50 : idx % 2 === 0 ? -50 : 50
        const dotIcon = idx === 0 ? <RocketOutlined /> : <ExperimentOutlined />

        const dot = (
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              display: 'grid',
              placeItems: 'center',
              background: token.colorBgContainer,
              border: `1px solid ${token.colorBorder}`,
              color: token.colorPrimary,
              boxShadow: '0 10px 30px rgba(0,0,0,0.10)',
            }}
          >
            {dotIcon}
          </span>
        )

        return {
          label: isMobile ? undefined : item.date,
          dot,
          children: (
            <motion.div
              initial={{ opacity: 0, x: fromX, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: idx * 0.08 }}
            >
              <ExperienceCard item={item} token={token} />
            </motion.div>
          ),
        }
      })
    : []

  return (
    <section id="experience" className="max-w-6xl mx-auto px-4 py-10">
      <div style={{ marginBottom: 16 }}>
        <div className="flex items-center gap-3">
          <RocketOutlined style={{ fontSize: 22, color: token.colorTextSecondary }} />
          <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
            {t('sections.experience')}
          </Title>
        </div>
        <Paragraph style={{ margin: '8px 0 0', color: token.colorTextSecondary, maxWidth: 860 }}>
          {t('experience.subtitle')}
        </Paragraph>
      </div>

      <Timeline className="experience-timeline" mode={isMobile ? 'left' : 'alternate'} items={timelineItems} />
    </section>
  )
}
