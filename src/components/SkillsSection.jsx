import {
  AppstoreOutlined,
  BranchesOutlined,
  CodeOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { Card, Space, Tag, Typography, theme } from 'antd'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { skillsCategories } from '../data/skills'

const { Title, Paragraph } = Typography

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

  const categoriesCount = skillsCategories.length
  const techCount = skillsCategories.reduce((sum, cat) => sum + (cat.items?.length || 0), 0)
  const coreStack = ['Laravel', 'Angular', 'React']

  const pillStyle = {
    backgroundColor: isDark ? 'rgba(212, 201, 190, 0.08)' : token.colorBgLayout,
    borderColor: isDark ? 'rgba(212, 201, 190, 0.28)' : token.colorBorder,
    color: token.colorText,
    fontWeight: 600,
    marginInlineEnd: 0,
    marginBottom: 0,
    paddingInline: 10,
  }

  const iconByKey = {
    languages: CodeOutlined,
    frameworks: ToolOutlined,
    web: AppstoreOutlined,
    dbDevops: DatabaseOutlined,
    data: LineChartOutlined,
    versioning: BranchesOutlined,
  }

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
              {t('sections.skills')}
            </Title>
            <Paragraph style={{ margin: '6px 0 0', color: token.colorTextSecondary }}>
              {t('skills.subtitle')}
            </Paragraph>
          </div>

          <Space size={8} wrap>
            <Tag style={pillStyle} bordered>
              <ToolOutlined style={{ marginRight: 6 }} />
              {techCount} {t('skills.summary.tech')}
            </Tag>
            <Tag style={pillStyle} bordered>
              <AppstoreOutlined style={{ marginRight: 6 }} />
              {categoriesCount} {t('skills.summary.categories')}
            </Tag>
            <Tag style={pillStyle} bordered>
              <CodeOutlined style={{ marginRight: 6 }} />
              {t('skills.summary.core')}: {coreStack.join(' · ')}
            </Tag>
          </Space>
        </div>
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
              title={
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const Icon = iconByKey[cat.key]
                      return Icon ? <Icon style={{ color: token.colorTextSecondary }} /> : null
                    })()}
                    <span>{t(`skills.${cat.key}`)}</span>
                  </div>
                </div>
              }
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
