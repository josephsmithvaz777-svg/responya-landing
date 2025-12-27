# 🚀 Responya - Sitio Web con Astro.js

Sitio web profesional de Responya convertido a **Astro.js** con componentes reutilizables, optimización automática y efectos visuales premium.

## ✨ Características

- ⚡ **Ultra rápido** - Astro genera HTML estático optimizado
- 🎨 **Diseño moderno** - Efectos glass morphism y bordes neón
- 📦 **Componentes reutilizables** - Arquitectura modular y mantenible
- 🎭 **Animaciones suaves** - Transiciones y efectos visuales premium
- 📱 **Responsive** - Diseño adaptable a todos los dispositivos
- 🎯 **SEO optimizado** - Meta tags y estructura semántica
- 🔧 **Tailwind CSS** - Estilos utilitarios con configuración personalizada

## 🛠️ Tecnologías

- **Astro 5.16** - Framework web moderno
- **Tailwind CSS 4** - Framework CSS utilitario
- **TypeScript** - Tipado estático opcional
- **Google Fonts** - Inter + Material Symbols

## 📁 Estructura del Proyecto

```
responya-astro/
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navegación principal
│   │   ├── Hero.astro             # Sección hero con video
│   │   ├── Card.astro             # Card reutilizable (About)
│   │   ├── ServiceCard.astro      # Card de servicios
│   │   └── Footer.astro           # Pie de página
│   ├── layouts/
│   │   └── Layout.astro           # Layout principal
│   ├── pages/
│   │   └── index.astro            # Página principal
│   └── styles/
│       └── global.css             # Estilos globales
├── public/                        # Archivos estáticos
├── tailwind.config.mjs            # Configuración Tailwind
├── astro.config.mjs               # Configuración Astro
└── package.json
```

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🎨 Componentes

### Card Component
```astro
<Card 
  title="Título"
  icon="icon_name"
  color="purple|cyan|pink|blue|fuchsia|indigo"
  delay="0.2s"
  description="Descripción..."
/>
```

### ServiceCard Component
```astro
<ServiceCard 
  title="Servicio"
  icon="icon_name"
  color="blue|fuchsia|indigo|purple"
  delay="0.1s"
  description="Descripción..."
/>
```

## 🎯 Efectos Visuales

- **Bordes Neón**: 6 colores personalizables (purple, cyan, pink, blue, fuchsia, indigo)
- **Glass Morphism**: Efecto de cristal con blur
- **Shimmer Effect**: Brillo que atraviesa las cards al hover
- **Glow Pulse**: Resplandor pulsante de fondo
- **Parallax**: Movimiento de elementos con el mouse
- **Scroll Animations**: Animaciones al hacer scroll

## 📊 Rendimiento

| Métrica | HTML Original | Astro.js |
|---------|---------------|----------|
| Tamaño inicial | ~45KB | ~20KB |
| JavaScript | ~300KB (CDN) | ~50KB |
| Tiempo de carga | ~1.5s | ~0.5s |
| SEO Score | Bueno | Excelente |

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Sube la carpeta dist/
```

### Cloudflare Pages
```bash
npm run build
# Conecta tu repositorio Git
```

## 🎨 Personalización

### Colores
Edita `tailwind.config.mjs`:
```js
colors: {
  'primary': '#d946ef',
  'secondary': '#06b6d4',
  // ...
}
```

### Animaciones
Edita `src/styles/global.css`:
```css
@keyframes custom-animation {
  /* ... */
}
```

## 📝 Notas

- El servidor de desarrollo corre en `http://localhost:4321`
- Los cambios se reflejan automáticamente (HMR)
- Los estilos están en `src/styles/global.css`
- Las fuentes se cargan desde Google Fonts

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

© 2024 Responya by Joseph Vazquez. Todos los derechos reservados.

## 🆘 Soporte

Para soporte, contacta a través de:
- WhatsApp: [Enlace en el sitio]
- Email: info@responya.com

---

**Desarrollado con ❤️ usando Astro.js**
