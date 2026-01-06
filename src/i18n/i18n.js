import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '../data/translations'

const SUPPORTED = ['es', 'en']

function safeGetItem(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignore storage failures (e.g., Safari private mode)
  }
}

function getInitialLanguage() {
  const stored = safeGetItem('lang')
  if (stored && SUPPORTED.includes(stored)) return stored

  const nav = (navigator.language || 'es').slice(0, 2)
  if (SUPPORTED.includes(nav)) return nav

  return 'es'
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
})

export function setLanguage(lang) {
  if (!SUPPORTED.includes(lang)) return
  safeSetItem('lang', lang)
  try {
    document.documentElement.lang = lang
  } catch {
    // no-op
  }
  i18n.changeLanguage(lang)
}

export default i18n
