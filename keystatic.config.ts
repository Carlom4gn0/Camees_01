import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'Carlom4gn0',
      name: 'Camees_01',
    },
  },

  ui: {
    brand: {
      name: 'CAMEES — Panel de contenidos',
    },
  },

  collections: {
    novedades: collection({
      label: 'Novedades / Blog',
      slugField: 'titulo',
      path: 'src/content/novedades/*',
      // .md en lugar de .mdoc — Astro lo lee de forma nativa sin configuración extra
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        titulo: fields.slug({
          name: { label: 'Título de la nota' },
          slug: { label: 'URL (se genera solo)', description: 'No hace falta tocarlo' },
        }),
        categoria: fields.select({
          label: 'Categoría',
          options: [
            { label: '🧵 Exposiciones',   value: 'exposiciones'   },
            { label: '📚 Capacitaciones', value: 'capacitaciones' },
            { label: '🔗 Vinculaciones',  value: 'vinculaciones'  },
            { label: '🧰 Recursos',       value: 'recursos'       },
          ],
          defaultValue: 'exposiciones',
        }),
        fecha: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
        }),
        resumen: fields.text({
          label: 'Resumen / descripción corta',
          multiline: true,
        }),
        imagen: fields.image({
          label: 'Imagen destacada',
          directory: 'public/images/novedades',
          publicPath: '/images/novedades',
        }),
        publicado: fields.checkbox({
          label: 'Publicar nota',
          description: 'Si está desmarcado, la nota no aparece en el sitio',
          defaultValue: true,
        }),
        content: fields.document({
          label: 'Contenido',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/novedades',
            publicPath: '/images/novedades',
          },
        }),
      },
    }),
  },
});
