import { theme } from 'antd'
import { motion } from 'framer-motion'
import {
  SiAngular,
  SiDocker,
  SiGit,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPlesk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si'

function IconBadge({ title, children }) {
  return (
    <div className="tech-icon shrink-0" title={title} aria-label={title}>
      {children}
    </div>
  )
}

const TECH = [
  { name: 'Laravel', Icon: SiLaravel, color: '#FF2D20' },
  { name: 'PHP 8', Icon: SiPhp, color: '#777BB4' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#339933' },
  { name: 'Angular', Icon: SiAngular, color: '#DD0031' },
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'MySQL', Icon: SiMysql, color: '#4479A1' },
  { name: 'PostgreSQL', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { name: 'Git', Icon: SiGit, color: '#F05032' },
  { name: 'Linux', Icon: SiLinux, color: '#FCC624' },
  { name: 'Plesk', Icon: SiPlesk, color: '#52BBE6' },
]

function TechRow(props) {

  return (
    <div className="flex items-center gap-10 pr-10" {...props}>
      {TECH.map(({ name, Icon, color }) => (
        <IconBadge key={name} title={name}>
          <Icon
            className="h-12 w-12 text-5xl grayscale opacity-60 transition-all duration-200 ease-out hover:opacity-100 hover:grayscale-0 hover:scale-110"
            style={{ color }}
            aria-hidden="true"
          />
        </IconBadge>
      ))}
    </div>
  )
}

export default function TechMarquee() {
  const { token } = theme.useToken()

  return (
    <section className="max-w-6xl mx-auto px-4 pb-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl overflow-hidden"
        style={{
          border: `1px solid ${token.colorBorder}`,
          background: token.colorBgContainer,
        }}
      >
        <div className="tech-mask py-6">
          <div className="group relative overflow-hidden">
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              <TechRow />
              <TechRow aria-hidden="true" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
