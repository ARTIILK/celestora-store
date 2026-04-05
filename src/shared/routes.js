import { z } from 'zod';
import { siteConfigSchema, categorySchema, productSchema } from './schema';

export const api = {
  config: {
    site: {
      method: 'GET',
      path: '/api/config/site',
      responses: {
        200: siteConfigSchema,
      },
    },
    categories: {
      method: 'GET',
      path: '/api/config/categories',
      responses: {
        200: z.array(categorySchema),
      },
    },
    products: {
      method: 'GET',
      path: '/api/config/products',
      responses: {
        200: z.array(productSchema),
      },
    },
  },
};

export function buildUrl(path, params) {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
