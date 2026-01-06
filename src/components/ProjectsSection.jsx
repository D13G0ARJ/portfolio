import { useMemo } from 'react'
import { Alert, Button, Card, Col, Divider, Row, Skeleton, Space, Tag, Typography, theme } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useGitHubProjects } from '../hooks/useGitHubProjects'

const { Title, Paragraph, Text } = Typography

const mainProjects = [
  {
    id: 'main-nexus',
    name: 'Nexus WMS - Enterprise Resource Planning',
    title: {
      es: 'Nexus WMS - Enterprise Resource Planning',
      en: 'Nexus WMS - Enterprise Resource Planning',
    },
    description: {
      es: 'Sistema de Gestión de Almacenes (WMS) multi-sucursal de nivel empresarial. Diseñé una arquitectura híbrida avanzada: 1) Core Transaccional (Laravel 11): gestiona movimientos de inventario atómicos, trazabilidad completa y control de acceso granular. 2) Inteligencia de Datos (Python): microservicio Flask para predicción de demanda. 3) Alto Rendimiento: Jobs y Colas con Redis orquestados en Docker.',
      en: 'Enterprise-grade Multi-branch Warehouse Management System (WMS). Designed an advanced hybrid architecture: 1) Transactional Core (Laravel 11): manages atomic inventory movements, full traceability, and granular access control. 2) Data Intelligence (Python): Flask microservice for demand forecasting. 3) High Performance: Redis Jobs and Queues orchestrated within Docker containers.',
    },
    html_url: 'https://github.com/D13G0ARJ/nexus-wms',
    homepage: null,
    topics: ['Laravel 11', 'Livewire 3', 'Python Microservice', 'Redis/Queues', 'Docker'],
  },
  {
    id: 'main-academic',
    name: 'Sistema de Gestión Académica',
    title: {
      es: 'Sistema de Gestión Académica',
      en: 'Academic Management System',
    },
    description: {
      es: 'Plataforma integral para la administración de recursos universitarios. Diseñé una arquitectura escalable que gestiona relaciones complejas (Docentes-Aulas-Horarios) e implementa algoritmos de validación para prevenir conflictos. Incluye auditoría y seguridad basada en roles.',
      en: 'Comprehensive platform for university resource administration. Designed a scalable architecture managing complex relationships (Teachers-Classrooms-Schedules) and implementing validation algorithms to prevent assignment conflicts in real-time. Includes auditing modules and role-based security.',
    },
    html_url: 'https://github.com/D13G0ARJ/horario-universidad-',
    homepage: '',
    topics: ['Laravel 10', 'MySQL', 'Arquitectura MVC', 'AdminLTE'],
  },
  {
    id: 'main-ingechat',
    name: 'IngeChat 360° - Asistente Inteligente',
    title: {
      es: 'IngeChat 360° - Asistente Inteligente',
      en: 'IngeChat 360° - Intelligent Assistant',
    },
    description: {
      es: 'Aplicación de escritorio moderna para orientación estudiantil. Implementa lógica híbrida de NLP: prioriza base de conocimientos local (JSON) para respuestas inmediatas y conecta con API de Google Gemini para consultas complejas, optimizando latencia.',
      en: 'Modern desktop application for student guidance. Implements hybrid NLP logic: prioritizes a local knowledge base (JSON) for immediate responses and connects with Google Gemini API for complex queries, optimizing token consumption and latency.',
    },
    html_url: 'https://github.com/D13G0ARJ/IngeChatBot360',
    homepage: '',
    topics: ['Python', 'Google Gemini AI', 'CustomTkinter', 'RAG Logic'],
  },
]

function resolveI18nText(value, lang) {
  if (value && typeof value === 'object') {
    if ('es' in value || 'en' in value) {
      return value?.[lang] ?? value?.es ?? value?.en ?? ''
    }
  }
  return value ?? ''
}
function normalizeTopics(topics) {
  if (!Array.isArray(topics)) return []
  return topics.filter(Boolean).slice(0, 8)
}

function formatRepoTitle(name) {
  const raw = String(name || '')
  const spaced = raw.replace(/[-_]+/g, ' ').trim()
  if (!spaced) return raw
  return spaced
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function truncate(text, max = 100) {
  const str = String(text || '').trim()
  if (str.length <= max) return str
  return `${str.slice(0, max - 1)}…`
}

export default function ProjectsSection({ username = 'D13G0ARJ', isDark = false }) {
  const { t, i18n } = useTranslation()
  const { token } = theme.useToken()

  const lang = useMemo(() => {
    return (i18n.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'
  }, [i18n.language])

  const featuredUrls = useMemo(() => mainProjects.map((p) => p.html_url).filter(Boolean), [])
  const forcedRepoNames = useMemo(() => ['mining-supervisor-scheduler'], [])
  const { repos: apiRepos, loading, error } = useGitHubProjects({
    username,
    excludeUrls: featuredUrls,
    forceIncludeNames: forcedRepoNames,
  })

  const tagStyle = useMemo(() => {
    return {
      backgroundColor: isDark ? 'rgba(212, 201, 190, 0.08)' : token.colorBgLayout,
      borderColor: isDark ? 'rgba(212, 201, 190, 0.28)' : token.colorBorder,
      color: token.colorText,
      fontWeight: 500,
      marginBottom: 8,
    }
  }, [isDark, token])

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

  const mergedProjects = useMemo(() => {
    return [...mainProjects, ...(Array.isArray(apiRepos) ? apiRepos : [])]
  }, [apiRepos])

  const projectsForRender = useMemo(() => {
    const repoOverrides = {
      'nexus-wms': {
        topics: [
          'Laravel 11',
          'Livewire 3',
          'MySQL 8',
          'Redis',
          'Docker',
          'RBAC',
          'Queues',
          'Flask (Microservice)',
        ],
        description: {
          es: 'Warehouse Management System multi-sucursal, diseñado para demostrar arquitectura empresarial en Laravel. Implementa RBAC granular (Spatie Permission), transacciones atómicas de inventario, importaciones masivas asíncronas con colas/Redis, reportes PDF en background y base para microservicio Flask de analítica predictiva, todo containerizado con Docker.',
          en: 'Multi-branch Warehouse Management System built to showcase enterprise Laravel architecture. Includes granular RBAC (Spatie Permission), atomic inventory transactions, async bulk imports with queues/Redis, background PDF reporting, and a foundation for a Flask microservice for predictive analytics—fully containerized with Docker.',
        },
      },
      'mining-supervisor-scheduler': {
        topics: ['React 18', 'Algoritmos', 'Scheduling', 'Modelo N×M', 'Vite'],
        description: {
          es: "Motor de planificación algorítmica para asignación de turnos bajo restricciones estrictas (regla N×M). Incluye validaciones en tiempo real y lógica de autocorrección para garantizar continuidad operativa.",
          en: 'Algorithmic scheduling engine for shift assignment under strict constraints (N×M rule). Includes real-time validations and self-correction logic to ensure operational continuity.',
        },
      },
    }

    return mergedProjects.map((repo) => {
      const key = (repo?.name || '').toLowerCase()
      const override = repoOverrides[key]
      const base = { ...repo }

      const nextTopics = override && Array.isArray(override.topics) ? override.topics : repo.topics
      const nextDescription = override?.description
        ? resolveI18nText(override.description, lang)
        : resolveI18nText(repo.description, lang)
      const nextTitle = resolveI18nText(repo.title, lang) || repo.name

      return {
        ...base,
        name: nextTitle,
        description: nextDescription,
        topics: nextTopics,
      }
    })
  }, [lang, mergedProjects])

  const lastPushedAt = useMemo(() => {
    if (!Array.isArray(apiRepos) || apiRepos.length === 0) return null
    const max = apiRepos.reduce((acc, r) => {
      const ts = new Date(r?.updated_at || 0).getTime()
      return ts > acc ? ts : acc
    }, 0)
    return max ? new Date(max) : null
  }, [apiRepos])

  const formattedLastPush = useMemo(() => {
    if (!lastPushedAt) return ''
    try {
      return new Intl.DateTimeFormat(i18n.language || 'es', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      }).format(lastPushedAt)
    } catch {
      return lastPushedAt.toISOString().slice(0, 10)
    }
  }, [i18n.language, lastPushedAt])

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-3">
              <CodeOutlined style={{ fontSize: 22, color: token.colorTextSecondary }} />
              <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
                {t('sections.projects')}
              </Title>
            </div>
            <Paragraph style={{ margin: '8px 0 0', color: token.colorTextSecondary }}>
              {t('projects.subtitle')}
            </Paragraph>
          </div>
          <Text type="secondary">github.com/{username}</Text>
        </div>

        <Space size={8} wrap style={{ marginBottom: 14 }}>
          <Tag style={pillStyle} bordered>
            {t('projects.summary.featured')}: {mainProjects.length}
          </Tag>
          <Tag style={pillStyle} bordered>
            {t('projects.summary.total')}: {projectsForRender.length}
          </Tag>
          {formattedLastPush && (
            <Tag style={pillStyle} bordered>
              {t('projects.summary.lastPush')}: {formattedLastPush}
            </Tag>
          )}
        </Space>
      </motion.div>

      {loading && (
        <div>
          <Paragraph style={{ color: token.colorTextSecondary }}>{t('projects.loading')}</Paragraph>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Card
                key={idx}
                style={{ borderRadius: 16 }}
                styles={{ body: { padding: 16 } }}
              >
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            ))}
          </div>
        </div>
      )}

      {!loading && error && (
        <Alert
          type="error"
          showIcon
          message={t('projects.error')}
          description={String(error?.message || error)}
        />
      )}

      {!loading && apiRepos.length === 0 && !error && (
        <Alert type="info" showIcon message={t('projects.empty')} />
      )}

      {(mainProjects.length > 0 || (!loading && apiRepos.length > 0)) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 1) Destacados */}
          <Row gutter={[16, 16]} align="stretch">
            {projectsForRender.slice(0, mainProjects.length).map((repo, index) => {
              const topics = normalizeTopics(repo.topics)
              const hasDemo = Boolean(repo.homepage)

              const isFeaturedMain = index === 0
              const colProps = {
                xs: 24,
                md: isFeaturedMain ? 24 : 12,
                lg: isFeaturedMain ? 24 : 12,
              }

              return (
                <Col key={repo.id} {...colProps} className="flex">
                  <Card
                    title={repo.name}
                    hoverable
                    className="glass-card lift-card h-full flex flex-col"
                    variant="outlined"
                    style={{
                      borderRadius: 16,
                      flex: 1,
                      width: '100%',
                      height: '100%',
                    }}
                    styles={{
                      header: { borderColor: token.colorBorder },
                      body: { display: 'flex', flexDirection: 'column', gap: 12, flex: 1 },
                    }}
                  >
                    <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
                      {repo.description || ''}
                    </Paragraph>

                    {topics.length > 0 && (
                      <Space wrap>
                        {topics.slice(0, 8).map((topic) => (
                          <Tag key={topic} style={tagStyle}>
                            {topic}
                          </Tag>
                        ))}
                      </Space>
                    )}

                    <Space wrap className="mt-auto" style={{ paddingTop: 8 }}>
                      <Button type="primary" href={repo.html_url} target="_blank" rel="noreferrer">
                        {t('projects.viewCode')}
                      </Button>
                      {hasDemo && (
                        <Button href={repo.homepage} target="_blank" rel="noreferrer">
                          {t('projects.demo')}
                        </Button>
                      )}
                    </Space>
                  </Card>
                </Col>
              )
            })}
          </Row>

          {/* 2) Divisor */}
          <Divider plain orientation="left" style={{ margin: '18px 0 14px' }}>
            <span style={{ color: token.colorTextSecondary, fontWeight: 600 }}>
              {t('projects.otherSection')}
            </span>
          </Divider>

          {/* 3) Automáticos */}
          <Row gutter={[16, 16]} align="stretch">
            {projectsForRender.slice(mainProjects.length).map((repo) => {
              const title = formatRepoTitle(repo.name)
              const description = truncate(repo.description, 100)

              const topics = normalizeTopics(repo.topics)
              const inferredTags = topics.length > 0 ? topics : [repo.language].filter(Boolean)
              const hasDemo = Boolean(repo.homepage)

              return (
                <Col key={repo.id} xs={24} md={12} lg={8} className="flex">
                  <Card
                    title={title}
                    hoverable
                    className="glass-card lift-card h-full flex flex-col"
                    variant="outlined"
                    style={{
                      borderRadius: 16,
                      flex: 1,
                      width: '100%',
                      height: '100%',
                    }}
                    styles={{
                      header: { borderColor: token.colorBorder },
                      body: { display: 'flex', flexDirection: 'column', gap: 12, flex: 1 },
                    }}
                  >
                    <Paragraph style={{ margin: 0, color: token.colorTextSecondary }}>
                      {description}
                    </Paragraph>

                    {inferredTags.length > 0 && (
                      <Space wrap>
                        {inferredTags.slice(0, 8).map((topic) => (
                          <Tag key={topic} style={tagStyle}>
                            {topic}
                          </Tag>
                        ))}
                      </Space>
                    )}

                    <Space wrap className="mt-auto" style={{ paddingTop: 8 }}>
                      <Button type="primary" href={repo.html_url} target="_blank" rel="noreferrer">
                        {t('projects.viewCode')}
                      </Button>
                      {hasDemo && (
                        <Button href={repo.homepage} target="_blank" rel="noreferrer">
                          {t('projects.demo')}
                        </Button>
                      )}
                    </Space>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </motion.div>
      )}
    </section>
  )
}
