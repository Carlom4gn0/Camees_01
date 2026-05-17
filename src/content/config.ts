// src/content/config.ts
// Define la forma (schema) de cada colección de contenido.
// Astro usa esto para tipado y validación automática.

import { defineCollection, z } from 'astro:content';

const novedades = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    categoria: z.enum(['exposiciones', 'capacitaciones', 'vinculaciones', 'recursos']),
    fecha: z.string(),
    resumen: z.string(),
    imagen: z.string().optional(),
    publicado: z.boolean().default(true),
  }),
});

export const collections = { novedades };
