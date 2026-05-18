// keystatic.config.ts
// Este archivo define toda la estructura del CMS:
// qué campos tiene cada entrada del blog, las categorías, etc.

novedades: collection({
  label: 'Novedades / Blog',
  slugField: 'titulo',
  path: 'src/content/novedades/*',
  format: { contentField: 'content' },  // ← esto le dice que use .mdoc
  entryLayout: 'content',
  schema: {
    titulo: fields.slug({
      name: { label: 'Título de la nota' },
      slug: { label: 'URL (se genera solo)' },
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
      label: 'Resumen',
      multiline: true,
    }),
    imagen: fields.image({
      label: 'Imagen destacada',
      directory: 'public/images/novedades',
      publicPath: '/images/novedades',
    }),
    publicado: fields.checkbox({
      label: 'Publicar nota',
      defaultValue: true,
    }),
    content: fields.markdoc({
      label: 'Contenido',
    }),
  },
}),
