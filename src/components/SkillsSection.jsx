import { Card, Tag, Typography, theme } from 'antd'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { skillsCategories } from '../data/skills'

const { Title } = Typography

function SkillTag({ label, isDark }) {
  const { token } = theme.useToken()

  const style = {
    backgroundColor: isDark ? 'rgba(212, 201, 190, 0.08)' : token.colorBgLayout,
    borderColor: isDark ? 'rgba(212, 201, 190, 0.28)' : token.colorBorder,
    color: token.colorText,
    fontWeight: 500,
    marginInlineEnd: 8,
    marginBottom: 8,
  }

  return (
    <Tag style={style} bordered>
      {label}
    </Tag>
  )
}

export default function SkillsSection({ isDark = false }) {
  const { t } = useTranslation()
  const { token } = theme.useToken()

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
          {t('sections.skills')}
        </Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillsCategories.map((cat, idx) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22, delay: idx * 0.06 }}
          >
            <Card
              title={t(`skills.${cat.key}`)}
              bordered
              className="glass-card"
              style={{
                borderRadius: 16,
              }}
              styles={{
                header: {
                  borderColor: token.colorBorder,
                },
              }}
            >
              <div className="flex flex-wrap">
                {cat.items.map((item) => (
                  <SkillTag key={item} label={item} isDark={isDark} />
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
