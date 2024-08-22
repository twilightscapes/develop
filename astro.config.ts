import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import fs from "fs";
import rehypeExternalLinks from "rehype-external-links";
import remarkUnwrapImages from "remark-unwrap-images";
import { expressiveCodeOptions } from "./src/site.config";
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import AstroPWA from '@vite-pwa/astro';
import markdoc from "@astrojs/markdoc";
import keystatic from '@keystatic/astro';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["webmention.io"]
  },
  integrations: [expressiveCode(expressiveCodeOptions), icon(), tailwind({
    applyBaseStyles: false
  }), sitemap(), mdx(), react(), keystatic(), AstroPWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.svg', 'robots.txt'],
    manifest: {
      name: 'Dog Poopers',
      short_name: 'Dog Poopers',
      description: 'We Pick Up The Poop!',
      theme_color: '#15683e',
      start_url: '/map',
      background_color: '#15683e',
      display: 'standalone',
      icons: [{
        src: '192x192.png',
        sizes: '192x192',
        type: 'image/png'
      }, {
        src: '512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }]
    }
  }), markdoc()],
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, {
      rel: ["nofollow", "noopener", "noreferrer"],
      target: "_blank"
    }]],
    remarkPlugins: [remarkUnwrapImages, remarkReadingTime],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""]
      }
    }
  },
  output: 'hybrid',
  prefetch: true,
  site: "https://dogpoopers.com",
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    },
	plugins: [rawFonts([".ttf", ".woff"])],
  },
  adapter: netlify()
});

function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}