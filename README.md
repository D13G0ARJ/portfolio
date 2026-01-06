# Portfolio — Diego Rodríguez

Portafolio profesional construido como SPA moderna, con énfasis en **UX premium**, **modo claro/oscuro**, **i18n ES/EN** y una sección de proyectos “viva” que combina destacados curados + repositorios desde GitHub.

## Tecnologías utilizadas

### Frontend
- **React**: UI por componentes y renderizado declarativo.
- **Vite**: tooling y bundling moderno para SPA.

### UI / Design System
- **Ant Design (v5)**: componentes base (Card, Button, Tag, Switch, Timeline, Grid, Divider, etc.).
- **@ant-design/icons**: iconografía integrada con AntD.

### Estilos
- **Tailwind CSS**: utilidades para layout, spacing y responsividad.
- **CSS custom + tokens**: refinamientos (glassmorphism, focus-visible, micro-interacciones).
- Tipografía: **Inter** vía Google Fonts.

### Animaciones
- **Framer Motion**: reveal al scroll y micro-interacciones.
- **View Transition API (circular reveal)**: transición avanzada al alternar tema (cuando el navegador lo soporta).

### Internacionalización (i18n)
- **i18next + react-i18next**: traducciones ES/EN con persistencia del idioma.

### Datos (GitHub)
- **GitHub REST API**:
	- `useGitHubProjects`: carga repos recientes con filtrado (excluye destacados, forks poco relevantes, etc.) y soporte de inclusión forzada.
	- `useGitHubProfile`: stats del perfil (repos/followers/following) con cache en `sessionStorage` (TTL) para reducir llamadas.
- **Arquitectura híbrida en Proyectos**:
	- “Destacados” curados (manual) con jerarquía visual.
	- “Otros Experimentos & Repositorios” desde la API.
	- Overrides locales para mejorar copy/tagging cuando GitHub no provee buena descripción.

## Theming (Light/Dark)
- Persistencia en `localStorage`.
- `data-theme` en `<html>` para alternar estilos globales.
- Tokens de AntD configurados en `ConfigProvider` para mantener consistencia con la paleta del proyecto.

## Accesibilidad y UX
- Estados `:focus-visible` para navegación por teclado.
- Controles del header con etiquetas explícitas (Idioma/Tema) para claridad.
- Layout responsive (mobile-first) y cards con alturas consistentes.

## Calidad / Tooling
- **ESLint**: reglas base + plugins recomendados para React Hooks y Fast Refresh.

## Estructura (alto nivel)
- `src/components`: secciones UI (Hero, Skills, Experience, Projects, Footer, Header).
- `src/hooks`: hooks de tema y de datos (`useTheme`, `useGitHubProjects`, `useGitHubProfile`).
- `src/data`: traducciones i18n y data estática.
