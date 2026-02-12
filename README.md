# 📊 Content Analytics Dashboard

Dashboard de análisis de canales de YouTube construido con React, TypeScript y la API de YouTube Data v3. Visualiza estadísticas en tiempo real de cualquier canal de YouTube con gráficos interactivos y modo oscuro.

## ✨ Características

- 🔍 **Búsqueda de canales** - Encuentra cualquier canal de YouTube
- 📈 **Gráficos interactivos** - Visualización de vistas, engagement y evolución temporal
- 🌐 **Soporte i18n** - Traducción completa ES/EN con detección automática
- 🌓 **Modo oscuro** - Interfaz adaptable con tema claro/oscuro
- 📱 **Responsive** - Diseño adaptativo para móvil, tablet y desktop
- ⚡ **Rendimiento optimizado** - Carga rápida y experiencia fluida
- 🎨 **UI moderna** - Interfaz limpia y profesional con Tailwind CSS

## 🚀 Demo

[Ver demo en vivo](https://tu-deploy-url.vercel.app) _(Próximamente)_

## 🛠️ Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Estilos utility-first
- **Recharts** - Gráficos interactivos
- **Zustand** - Gestión de estado
- **YouTube Data API v3** - Datos en tiempo real
- **Lucide React** - Iconos

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn
- API Key de YouTube Data API v3

## 🔑 Obtener API Key de YouTube

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **YouTube Data API v3**
4. Ve a "Credenciales" → "Crear credenciales" → "Clave de API"
5. Copia tu API key

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sergiram/content-dashboard.git
cd content-dashboard

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local y añade tu API key:
# VITE_YOUTUBE_API_KEY=tu_api_key_aqui

# Iniciar servidor de desarrollo
npm run dev
```

## 📦 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:5173)
npm run build    # Build de producción
npm run preview  # Preview del build de producción
npm run lint     # Ejecutar ESLint
```

## 🎯 Uso

1. **Buscar canal**: Haz clic en "Buscar canal" e introduce el nombre del canal
2. **Ver estadísticas**: Selecciona un canal de los resultados
3. **Explorar datos**: Visualiza suscriptores, vistas totales, videos y gráficos
4. **Cambiar canal**: Usa "Cambiar canal" para buscar otro canal
5. **Modo oscuro**: Alterna entre tema claro y oscuro con el botón 🌙/☀️

## 📊 Gráficos Disponibles

- **Views por vídeo** - Comparativa de vistas entre videos
- **Evolución de Vistas** - Tendencia temporal de visualizaciones
- **Interacción** - Análisis de likes vs comentarios

## 🌐 Despliegue

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sergiram/content-dashboard)

1. Conecta tu repositorio de GitHub
2. Añade la variable de entorno `VITE_YOUTUBE_API_KEY`
3. Deploy automático ✅

### Netlify

1. Conecta tu repositorio
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Añade `VITE_YOUTUBE_API_KEY` en Environment Variables

## 🏗️ Estructura del Proyecto

```
content-dashboard/
├── src/
│   ├── components/
│   │   ├── charts/          # Componentes de gráficos
│   │   ├── layout/          # Header y layout
│   │   └── ui/              # Componentes UI reutilizables
│   ├── pages/               # Páginas principales
│   ├── services/            # API de YouTube
│   ├── store/               # Estado global (Zustand)
│   ├── types/               # Tipos TypeScript
│   └── utils/               # Utilidades y helpers
├── .env.local               # Variables de entorno (no incluido)
└── package.json
```

## 🔒 Seguridad

- ✅ API key almacenada en `.env.local` (no versionada)
- ✅ Variables de entorno con prefijo `VITE_` para seguridad
- ✅ `.gitignore` configurado correctamente

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Sergio Ramón Sánchez**

- GitHub: [@sergiram](https://github.com/sergiram)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/sergio-ramon-sanchez-204618129/)

## 🙏 Agradecimientos

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

⭐ Si este proyecto te resultó útil, considera darle una estrella en GitHub
