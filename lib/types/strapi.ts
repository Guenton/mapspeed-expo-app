/** STRAPI - Format for Strapi Errors */
export type StrapiErrorFormat = {
  statusCode: number;
  error: string;
  data?: string;
  message?: string;
};
