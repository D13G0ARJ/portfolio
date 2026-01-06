import { ConfigProvider, theme as antdTheme } from 'antd'
import { useTheme } from './hooks/useTheme'
import HeaderBar from './components/HeaderBar'
import HeroSection from './components/HeroSection'
import TechMarquee from './components/TechMarquee'
import ValueProposition from './components/ValueProposition'
import SkillsSection from './components/SkillsSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import FooterBar from './components/FooterBar'

function App() {
  const { isDark, setTheme } = useTheme()

  const baseTokens = {
    colorPrimary: '#123458',
    colorInfo: '#123458',
    colorSuccess: '#123458',
    colorWarning: '#D4C9BE',
    colorError: '#123458',
    colorBgBase: isDark ? '#030303' : '#F1EFEC',
    colorBgLayout: isDark ? '#030303' : '#F1EFEC',
    colorTextBase: isDark ? '#F1EFEC' : '#123458',
    colorText: isDark ? '#F1EFEC' : '#123458',
    colorTextHeading: isDark ? '#F1EFEC' : '#123458',
    colorBorder: isDark ? 'rgba(212, 201, 190, 0.25)' : '#D4C9BE',
    borderRadius: 14,
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  }

  return (
    <ConfigProvider
      theme={{
        token: baseTokens,
        algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <div style={{ minHeight: '100vh' }}>
        <HeaderBar
          isDark={isDark}
          onThemeChange={(nextDark) => setTheme(nextDark ? 'dark' : 'light')}
        />
        <main>
          <HeroSection />
          <SkillsSection isDark={isDark} />
          <TechMarquee />
          <ExperienceSection />
          <ValueProposition isDark={isDark} />
          <ProjectsSection isDark={isDark} />
        </main>
        <FooterBar />
      </div>
    </ConfigProvider>
  )
}

export default App
