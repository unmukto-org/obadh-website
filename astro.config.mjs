// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

const site = (process.env.SITE_URL ?? 'https://obadh.unmukto.org').replace(/\/$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory' },

  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },

  integrations: [
    // No priority or changefreq: search engines ignore both, and inventing
    // values for fourteen static pages is noise in the file.
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', bn: 'bn' } },
      /* /thanks/ is noindex: it means nothing to anyone who did not arrive by
         pressing the download button, and a sitemap entry for a page that asks
         not to be indexed is two published statements contradicting each
         other. */
      filter: (page) => !page.includes('/404') && !page.includes('/thanks'),

      // The integration emits en and bn but no x-default, while every page's
      // <head> emits all three. Two published statements of the same fact
      // should not differ, so the English URL is added here as well. The links
      // array is shared between the two URLs of a cluster, hence the guard.
      serialize(item) {
        const links = item.links;
        if (!links) return item;
        const english = links.find((link) => link.lang === 'en');
        if (english && !links.some((link) => link.lang === 'x-default')) {
          links.push({ lang: 'x-default', url: english.url });
        }
        return item;
      },
    }),
  ],

  vite: {
    plugins: [tailwind()],
    build: {
      // The site ships four small islands; one bundle each beats a shared chunk graph.
      assetsInlineLimit: 2048,
    },
  },

  image: {
    // Screenshots come from the app repos and are already the right pixels.
    responsiveStyles: true,
  },
});
