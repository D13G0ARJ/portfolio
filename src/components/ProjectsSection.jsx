import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Row, Skeleton, Space, Tag, Typography, theme } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const { Title, Paragraph, Text } = Typography

const mainProjects = [
  {
    id: 'main-academic',
    name: 'Sistema de Gestión Académica',
    description:
      'Plataforma integral para la administración de recursos universitarios. Diseñé una arquitectura escalable que gestiona relaciones complejas (Docentes-Aulas-Horarios) e implementa algoritmos de validación para prevenir conflictos de asignación en tiempo real. Incluye módulos de auditoría, seguridad basada en roles y gestión de respaldos.',
    html_url: 'https://github.com/D13G0ARJ/horario-universidad-',
    homepage: '',
    topics: ['Laravel 10', 'MySQL', 'Arquitectura MVC', 'AdminLTE'],
  },
  {
    id: 'main-ingechat',
    name: 'IngeChat 360° - Asistente Inteligente',
    description:
      'Aplicación de escritorio moderna para orientación estudiantil. Implementa una lógica híbrida de procesamiento de lenguaje natural: prioriza una base de conocimientos local (JSON) para respuestas inmediatas y conecta con la API de Google Gemini para consultas complejas, optimizando el consumo de tokens y la latencia.',
    html_url: 'https://github.com/D13G0ARJ/IngeChatBot360',
    homepage: '',
    topics: ['Python', 'Google Gemini AI', 'CustomTkinter', 'RAG Logic'],
  },
  {
    id: 'main-mining',
    name: 'Mining Shift Algorithm (N x M)',
    description:
      "Motor de planificación algorítmica de alta complejidad. Diseñé una estrategia jerárquica de 3 niveles (Ancla, Relevo Matemático y Agente Inteligente con 'Lookahead') para resolver la asignación de turnos bajo restricciones estrictas (Regla N x M). El sistema ejecuta validaciones en tiempo real y autocorrección de personal, garantizando la continuidad operativa sin fallos.",
    html_url: 'https://github.com/D13G0ARJ/mining-supervisor-scheduler',
    homepage: '',
    topics: ['React 18', 'Lógica Pura', 'Modelo Matemático', 'Vite'],
  },
]

function isDetailedDescription(desc) {
  if (!desc) return false
  const trimmed = desc.trim()
  return trimmed.length >= 30
}

function normalizeTopics(topics) {
  if (!Array.isArray(topics)) return []
  return topics.filter(Boolean).slice(0, 8)
}

function shouldShowRepo(repo) {
  const hasGoodDescription = isDetailedDescription(repo.description)
  const hasStars = (repo.stargazers_count || 0) > 0
  return hasGoodDescription || hasStars
}

function sortRepos(a, b) {
  const aPushed = new Date(a.pushed_at || 0).getTime()
  const bPushed = new Date(b.pushed_at || 0).getTime()
  if (bPushed !== aPushed) return bPushed - aPushed

  const aStars = a.stargazers_count || 0
  const bStars = b.stargazers_count || 0
  if (bStars !== aStars) return bStars - aStars

  return (a.name || '').localeCompare(b.name || '')
}

export default function ProjectsSection({ username = 'D13G0ARJ', isDark = false }) {
  const { t, i18n } = useTranslation()
  const { token } = theme.useToken()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`
        const res = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })

        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`)
        }

        const data = await res.json()
        if (cancelled) return

        const filtered = Array.isArray(data) ? data.filter(shouldShowRepo).sort(sortRepos) : []
        setRepos(filtered)
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [username])

  const tagStyle = useMemo(() => {
    return {
      backgroundColor: isDark ? 'rgba(212, 201, 190, 0.08)' : token.colorBgLayout,
      borderColor: isDark ? 'rgba(212, 201, 190, 0.28)' : token.colorBorder,
      color: token.colorText,
      fontWeight: 500,
      marginBottom: 8,
    }
  }, [isDark, token])

  const mergedProjects = useMemo(() => {
    const mainUrls = new Set(mainProjects.map((p) => p.html_url))
    const mainNames = new Set(mainProjects.map((p) => (p.name || '').toLowerCase()))

    const rest = (Array.isArray(repos) ? repos : []).filter((r) => {
      if (!r) return false
      if (r.html_url && mainUrls.has(r.html_url)) return false
      if ((r.name || '').toLowerCase() && mainNames.has((r.name || '').toLowerCase())) return false
      return true
    })

    return [...mainProjects, ...rest]
  }, [repos])

  const projectsForRender = useMemo(() => {
    const lang = (i18n.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'

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
    }

    return mergedProjects.map((repo) => {
      const key = (repo?.name || '').toLowerCase()
      const override = repoOverrides[key]
      if (!override) return repo

      return {
        ...repo,
        description: override.description?.[lang] ?? repo.description,
        topics: Array.isArray(override.topics) ? override.topics : repo.topics,
      }
    })
  }, [i18n.language, mergedProjects])

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-end justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <CodeOutlined style={{ fontSize: 22, color: token.colorTextSecondary }} />
            <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
              {t('sections.projects')}
            </Title>
          </div>
          <Text type="secondary">github.com/{username}</Text>
        </div>
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

      {!loading && mergedProjects.length === 0 && (
        <Alert type="info" showIcon message={t('projects.empty')} />
      )}

      {!loading && mergedProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Row gutter={[16, 16]} align="stretch">
            {projectsForRender.map((repo, index) => {
              const topics = normalizeTopics(repo.topics)
              const hasDemo = Boolean(repo.homepage)

              const isFeatured = index < 3
              const isFeaturedMain = index === 0

              const colProps = isFeatured
                ? {
                    xs: 24,
                    md: isFeaturedMain ? 24 : 12,
                    lg: isFeaturedMain ? 24 : 12,
                  }
                : {
                    xs: 24,
                    md: 12,
                    lg: 8,
                  }

              return (
                <Col key={repo.id} {...colProps}>
                  <Card
                    title={repo.name}
                    hoverable
                    className="glass-card lift-card"
                    bordered
                    style={{
                      borderRadius: 16,
                      display: 'flex',
                      flexDirection: 'column',
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

                    <Space wrap style={{ marginTop: 'auto', paddingTop: 8 }}>
                      <Button type="primary" href={repo.html_url} target="_blank" rel="noreferrer">
                        {t('projects.viewCode')}
                      </Button>
                      <Button
                        disabled={!hasDemo}
                        href={hasDemo ? repo.homepage : undefined}
                        target={hasDemo ? '_blank' : undefined}
                        rel={hasDemo ? 'noreferrer' : undefined}
                      >
                        {t('projects.demo')}
                      </Button>
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
