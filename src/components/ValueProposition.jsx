import { Card, Col, Row, Typography, theme } from 'antd'
import {
  BuildOutlined,
  GlobalOutlined,
  RiseOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph } = Typography

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function ValueCard({ icon, title, text, token }) {
  return (
    <motion.div variants={cardVariants} whileHover="hover" className="h-full">
      <Card variant="borderless" className="value-card h-full">
        <div className="flex flex-col items-center text-center gap-3">
          <motion.span
            variants={{ hover: { rotate: -6, scale: 1.1 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            style={{
              width: 56,
              height: 56,
              borderRadius: 999,
              display: 'grid',
              placeItems: 'center',
              background: token.colorBgContainer,
              border: `1px solid ${token.colorBorder}`,
              color: token.colorPrimary,
            }}
          >
            {icon}
          </motion.span>

          <Title level={4} style={{ margin: 0, color: token.colorTextHeading }}>
            {title}
          </Title>
          <Paragraph style={{ margin: 0, color: token.colorTextSecondary, lineHeight: 1.7 }}>
            {text}
          </Paragraph>
        </div>
      </Card>
    </motion.div>
  )
}

export default function ValueProposition({ isDark = false }) {
  const { t } = useTranslation()
  const { token } = theme.useToken()

  const sectionBg = isDark ? 'rgba(212, 201, 190, 0.06)' : '#F9F7F5'

  const cards = [
    {
      key: 'architecture',
      icon: <BuildOutlined style={{ fontSize: 22 }} />,
    },
    {
      key: 'ops',
      icon: <SafetyCertificateOutlined style={{ fontSize: 22 }} />,
    },
    {
      key: 'async',
      icon: <GlobalOutlined style={{ fontSize: 22 }} />,
    },
    {
      key: 'business',
      icon: <RiseOutlined style={{ fontSize: 22 }} />,
    },
  ]

  return (
    <section id="why-me" className="scroll-mt-24" style={{ background: sectionBg }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <Title level={2} style={{ marginTop: 0, marginBottom: 8, color: token.colorTextHeading }}>
            {t('value.title')}
          </Title>
          <Paragraph style={{ marginTop: 0, marginBottom: 0, color: token.colorTextSecondary, fontSize: 16 }}>
            {t('value.subtitle')}
          </Paragraph>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          style={{ marginTop: 22 }}
        >
          <Row gutter={[16, 16]}>
            {cards.map((c) => (
              <Col key={c.key} xs={24} sm={12} lg={6}>
                <ValueCard
                  icon={c.icon}
                  title={t(`value.cards.${c.key}.title`)}
                  text={t(`value.cards.${c.key}.text`)}
                  token={token}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      </div>
    </section>
  )
}
