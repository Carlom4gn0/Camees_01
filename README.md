# CAMEES – Sitio Web Oficial

Sitio web de la **Cámara de Mujeres Empresarias y Emprendedoras Santafesinas**, construido con [Astro](https://astro.build).

## 🚀 Inicio rápido

### Requisitos
- Node.js 18+
- npm o pnpm

### Instalación

```bash
# 1. Clonar el repo
git clone https://github.com/tu-usuario/camees.git
cd camees

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:4321`

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera el build de producción en `/dist` |
| `npm run preview` | Preview del build de producción |

---

## 📁 Estructura del proyecto

```
camees/
├── public/
│   ├── favicon.svg
│   └── images/          ← Agregar tus imágenes aquí
│       ├── hero-bg.jpg
│       ├── quienes-somos.jpg
│       ├── exposiciones.jpg
│       ├── capacitaciones.jpg
│       ├── vinculaciones.jpg
│       ├── recursos.jpg
│       ├── servicios-emprendedoras.jpg
│       ├── servicios-instituciones.jpg
│       └── blog-1.jpg … blog-6.jpg
│
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── QuienesSomos.astro
│   │   ├── QueHacemos.astro
│   │   ├── Servicios.astro
│   │   ├── Novedades.astro
│   │   ├── Asociate.astro
│   │   ├── Contacto.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
└── package.json
```

---

## 🖼 Imágenes necesarias

Colocá tus imágenes en `public/images/` con estos nombres:

| Archivo | Uso |
|---------|-----|
| `hero-bg.jpg` | Foto principal del hero (recomendado: 1920×1080) |
| `quienes-somos.jpg` | Foto del equipo o evento (recomendado: 800×600) |
| `exposiciones.jpg` | Foto de exposición/feria |
| `capacitaciones.jpg` | Foto de taller/capacitación |
| `vinculaciones.jpg` | Foto de reunión/vinculación |
| `recursos.jpg` | Foto ilustrativa de recursos |
| `servicios-emprendedoras.jpg` | Foto para card de servicios |
| `servicios-instituciones.jpg` | Foto para card de instituciones |
| `blog-1.jpg` … `blog-6.jpg` | Fotos para las notas del blog |

> Las imágenes se pueden obtener del Facebook oficial de CAMEES:
> https://www.facebook.com/camaramujeresemprendedorassantafesinas/photos

---

## ✏️ Cómo editar el contenido

### Textos principales
Cada componente tiene su contenido hardcodeado. Para editar:
- **Hero**: `src/components/Hero.astro` → texto del ticker y eslogan
- **Quiénes somos**: `src/components/QuienesSomos.astro` → historia, misión, visión, valores, alianzas
- **Qué hacemos**: `src/components/QueHacemos.astro` → array `categories` al inicio del archivo
- **Servicios**: `src/components/Servicios.astro` → listas de servicios
- **Blog**: `src/components/Novedades.astro` → array `posts` (reemplazar con Content Collections de Astro para producción)

### Contacto y formularios
- Los formularios usan `mailto:` como fallback. Para un backend real, reemplazar con un servicio como [Resend](https://resend.com), [Formspree](https://formspree.io) o [EmailJS](https://emailjs.com).
- Email actual: `camaramujeresemprendedoras@gmail.com`
- WhatsApp: actualizar el número en `Asociate.astro` y `Contacto.astro` (`https://wa.me/549XXXXXXXXXX`)

---

## 🚀 Deploy en Vercel

1. Subir el proyecto a GitHub
2. Conectar el repositorio en [vercel.com](https://vercel.com)
3. Framework preset: **Astro** (Vercel lo detecta automáticamente)
4. Click en **Deploy**

Alternativamente, con Vercel CLI:
```bash
npm i -g vercel
vercel
```

---

## 🎨 Paleta de colores

| Variable | Color | Uso |
|---------|-------|-----|
| `--pink` | `#e91e8c` | Color principal |
| `--pink-light` | `#f472b6` | Acentos y hovers |
| `--pink-pale` | `#fce7f3` | Fondos suaves |
| `--pink-dark` | `#be185d` | Texto destacado |

---

## 📬 Soporte

Para consultas sobre el sitio, escribir a: **camaramujeresemprendedoras@gmail.com**
