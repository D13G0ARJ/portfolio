import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '../data/translations'

const SUPPORTED = ['es', 'en']

function getInitialLanguage() {
  const stored = localStorage.getItem('lang')
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
  localStorage.setItem('lang', lang)
  i18n.changeLanguage(lang)
}

export default i18n
