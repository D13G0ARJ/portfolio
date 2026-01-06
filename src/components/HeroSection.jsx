import { Button, Space, Tag, Typography, theme } from 'antd'
import { GithubOutlined, LinkedinOutlined, MailOutlined, WhatsAppOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph, Text } = Typography

export default function HeroSection() {
  const { t } = useTranslation()
  const { token } = theme.useToken()

  const pillStyle = {
    backgroundColor: token.colorBgLayout,
    borderColor: token.colorBorder,
    color: token.colorText,
    fontWeight: 600,
    marginInlineEnd: 0,
    marginBottom: 0,
    paddingInline: 10,
  }

  return (
    <section id="home" className="max-w-6xl mx-auto px-4 pt-14 pb-6 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <Title level={1} style={{ marginTop: 0, marginBottom: 10, color: token.colorTextHeading }}>
          {t('hero.h1')}
        </Title>

        <Title
          level={2}
          style={{
            marginTop: 0,
            marginBottom: 14,
            color: token.colorText,
            fontWeight: 600,
          }}
        >
          {t('hero.h2')}
        </Title>

        <Paragraph style={{ marginTop: 0, color: token.colorTextSecondary, fontSize: 16, lineHeight: 1.7 }}>
          {t('hero.lead')}
        </Paragraph>

        <Paragraph style={{ margin: '10px 0 0', color: token.colorTextSecondary }}>
          {t('hero.micro')}
        </Paragraph>

        <Space size={8} wrap style={{ marginTop: 10 }}>
          <Tag style={pillStyle} bordered>
            {t('hero.pills.arch')}
          </Tag>
          <Tag style={pillStyle} bordered>
            {t('hero.pills.ops')}
          </Tag>
          <Tag style={pillStyle} bordered>
            {t('hero.pills.delivery')}
          </Tag>
        </Space>

        <div className="hero-cta flex flex-wrap gap-3 mt-6">
          <Button
            type="primary"
            icon={<MailOutlined />}
            href="mailto:rodrijime34@gmail.com"
          >
            {t('hero.cta.contact')}
          </Button>
          <Button
            icon={<WhatsAppOutlined />}
            href="https://wa.me/584149023516"
            target="_blank"
            rel="noreferrer"
          >
            {t('hero.cta.whatsapp')}
          </Button>
          <Button
            icon={<LinkedinOutlined />}
            href="https://www.linkedin.com/in/d13g0arj"
            target="_blank"
            rel="noreferrer"
          >
            {t('hero.cta.linkedin')}
          </Button>
          <Button
            icon={<GithubOutlined />}
            href="https://github.com/D13G0ARJ"
            target="_blank"
            rel="noreferrer"
          >
            {t('hero.cta.github')}
          </Button>
          <Text type="secondary" style={{ alignSelf: 'center' }}>
            rodrijime34@gmail.com
          </Text>
        </div>
      </motion.div>
    </section>
  )
}
