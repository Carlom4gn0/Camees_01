// keystatic.config.ts
// Este archivo define toda la estructura del CMS:
// qué campos tiene cada entrada del blog, las categorías, etc.

import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    // 'local' guarda los archivos en tu repositorio de GitHub.
    // Cuando hagas push, Netlify redespliega automáticamente.
    kind: 'local',
  },

  ui: {
    brand: {
      name: 'CAMEES — Panel de contenidos',
    },
  },

  collections: {
    // ─── Colección principal: entradas del blog ───────────────────
    novedades: collection({
      label: 'Novedades / Blog',
      slugField: 'titulo',
      path: 'src/content/novedades/*',
      entryLayout: 'content',

      schema: {
        titulo: fields.slug({
          name: { label: 'Título de la nota' },
          slug: { label: 'URL (se genera solo)', description: 'No hace falta tocarlo' },
        }),

        categoria: fields.select({
          label: 'Categoría',
          description: 'Elegí la categoría que corresponde a esta nota',
          options: [
            { label: '🧵 Exposiciones', value: 'exposiciones' },
            { label: '📚 Capacitaciones', value: 'capacitaciones' },
            { label: '🔗 Vinculaciones', value: 'vinculaciones' },
            { label: '🧰 Recursos', value: 'recursos' },
          ],
          defaultValue: 'exposiciones',
        }),

        fecha: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
        }),

        resumen: fields.text({
          label: 'Resumen / descripción corta',
          description: 'Aparece en la grilla del blog (máx. 160 caracteres)',
          multiline: true,
          validation: { isRequired: true, length: { max: 200 } },
        }),

        imagen: fields.image({
          label: 'Imagen destacada',
          description: 'Foto principal de la nota. Recomendado: 1200×630 px',
          directory: 'public/images/novedades',
          publicPath: '/images/novedades',
        }),

        publicado: fields.checkbox({
          label: 'Publicar nota',
          description: 'Si está desmarcado, la nota no aparece en el sitio',
          defaultValue: true,
        }),

        // El contenido principal (editor de texto enriquecido)
        content: fields.markdoc({
          label: 'Contenido',
          description: 'El cuerpo completo de la nota. Podés agregar texto, títulos, listas, fotos, etc.',
        }),
      },
    }),
  },
});
