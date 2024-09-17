import { createReader } from '@keystatic/core/reader';
import config from '../keystatic.config';

export const reader = createReader('src/content', config);

export const getSiteSettings = async () => {
  return await reader.singletons.siteSettings.read();
};