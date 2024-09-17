
<h1 align="center">
  Astro Pirate
</h1>

Astro Pirate is built with the Astro framework. Use it to create an easy-to-use blogs or websites.



## Key Features

- Astro v4 Fast 🚀
- TailwindCSS Utility classes
- Accessible, semantic HTML markup
- Responsive & SEO-friendly
- Dark / Light mode, using Tailwind and CSS variables
- [Astro Assets Integration](https://docs.astro.build/en/guides/assets/) for optimised images
- MD & [MDX](https://docs.astro.build/en/guides/markdown-content/#mdx-only-features) posts
- Pagination
- [Automatic RSS feed](https://docs.astro.build/en/guides/rss)
- [Webmentions](https://webmention.io/)
- Auto-generated [sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Pagefind](https://pagefind.app/) static search library integration
- [Astro Icon](https://github.com/natemoo-re/astro-icon) svg icon component
- [Expressive Code](https://expressive-code.com/) source code and syntax highlighter

## Demo 💻

Check out the [Demo](https:/pirateweb.org/), hosted on Netlify

> **Update** PIRATE is now built with the latest version of Astro and Keystatic!

---



# PIRATE

PIRATE is not your typical social network. It's a decentralized network of individualy owned personal websites acting together as a new social content distribution model. 

Here's how it works: instead of relying on a central platform, PIRATE leverages the power of Netlify and GitHub to utelize their free services for hosting your own platorm.  Your individual website becomes your hub for social interactions on both PIRATE and other social media. The content you produce, you fully own and control the rights to.

More than just a collection of individual websites, PIRATE uses the magic of RSS feeds, you can enjoy a central timeline that aggregates posts from across the network. You get to see what others are sharing, discover new voices, and engage in meaningful conversations.

Your PIRATE website is actually a Progressive Web App (PWA), which means you can access it seamlessly from any of your devices. Being a PWA also means there are no App Stores to worry about! 

PIRATE gives you the tools to easily edit your homepage, update your profile, and publish engaging posts. It's super easy to get started, without any complicated technical barriers. 

## But wait, there is more...

PIRATE is ALSO:

A complete website/web app platform with multimedia blog, that you can use however you wish. Configurable through the built in Content Management System, PIRATE comes with a customizable profile page and timeline. It also comes with a custom resume, cover letter and skills and notes pages with integrated contact forms that send directly to any email address.

Basically, PIRATE enables you to have YOUR OWN space on the web, where you can be confident that the content you produce is FULLY in your control. Twitter and other social media sites may change or come and go. With PIRATE, that doesn't matter - your content you share, is ALWAYS under your control. 

PIRATE is built to operate using FREE Cloud Based Services. This means that your PIRATE account is basically free to operate month to month with no cost. You only pay a metered cost for what you use over their generous limits. 

PIRATE is built to OPERATE FOR FREE using FREE Cloud Based Services

## 👌 Features

- Next-Gen Blogging Platform.
- State-of-the-art multimdedia/animation layering
- FULL animated SVG support
- User-installable PWA (Progressive Web Apps)
- Responsive Web Design
- Dark / Light Mode
- Customize Resume, Profile, Cover Letter, Skills, Interview Notes and Contact page.
- Add / Modify / Delete posts - no limitations.
- Edit website settings, seo settings, logos, etc all from  within the CMS.
- SEO Optimized (Scores 100 on PageSpeed)
- Social media icons
- OpenGraph structured data
- Twitter Cards meta
- XML Sitemaps

## Quick start

[Create a new repo](https://github.com/twilightscapes/pirate/generate) from this template.

```bash
# npm 7+
npm create astro@latest -- --template pirate/astro-pirate

# pnpm
pnpm dlx create-astro --template pirate/astro-pirate
```

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/twilightscapes/pirate) [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftwilightscapes%2Fpirate&project-name=astro-pirate-theme)




## Commands

Replace pnpm with your choice of npm / yarn

| Command          | Action                                                         |
| :--------------- | :------------------------------------------------------------- |
| `pnpm install`   | Installs dependencies                                          |
| `pnpm dev`       | Starts local dev server at `localhost:3000`                    |
| `pnpm build`     | Build your production site to `./dist/`                        |
| `pnpm postbuild` | Pagefind script to build the static search of your blog posts  |
| `pnpm preview`   | Preview your build locally, before deploying                   |
| `pnpm sync`      | Generate types based on your config in `src/content/config.ts` |

## Configure

- Edit the config file `src/site.config.ts` for basic site meta data
- Update file `astro.config.ts` site property with your own domain.
- Replace & update files within the `/public` folder:
  - favicon.ico & other social icons
  - robots.txt - update the Sitemap url to your own domain
  - manifest.webmanifest
- Modify file `src/styles/global.css` with your own light and dark styles.
  - You can also modify the theme(s) for markdown code blocks generated by [Expressive Code](https://expressive-code.com). Pirate has both a dark (dracula) and light (github-light) theme, which can be found in `src/site.config.ts`. You can find more theme(s) and options [here](https://expressive-code.com/guides/themes/#available-themes).
- Edit social links in `src/components/SocialList.astro` to add/replace your media profile. Icons can be found @ [icones.js.org](https://icones.js.org/), per [Astro Icon's instructions](https://www.astroicon.dev/guides/customization/#find-an-icon-set).
- Create / edit posts for your blog within `src/content/post/` with .md/mdx file(s). See [below](#adding-posts) for more details.


## Adding posts

This theme utilises [Content Collections](https://docs.astro.build/en/guides/content-collections/) to organise Markdown and/or MDX files, as well as type-checking frontmatter with a schema -> `src/content/config.ts`.

Adding a post is as simple as adding your .md(x) files to the `src/content/post` folder, the filename of which will be used as the slug/url. The posts included with this template are there as an example of how to structure your frontmatter. Additionally, the [Astro docs](https://docs.astro.build/en/guides/markdown-content/) has a detailed section on markdown pages.




## Pagefind search

This integration brings a static search feature for searching blog posts. In its current form, pagefind only works once the site has been built. This theme adds a postbuild script that should be run after Astro has built the site. You can preview locally by running both build && postbuild.

Search results only includes blog posts. If you would like to include other/all your pages, remove/re-locate the attribute `data-pagefind-body` to the article tag found in `src/layouts/BlogPost.astro`.

It also allows you to filter posts by tags added in the frontmatter of blog posts. If you would rather remove this, remove the data attribute `data-pagefind-filter="tag"` from the link in `src/components/blog/Hero.astro`.

If you would rather not include this integration, simply remove the component `src/components/Search.astro`, and uninstall both `@pagefind/default-ui` & `pagefind` from package.json. You will also need to remove the postbuild script from here as well.



## Analytics

You may want to track the number of visitors you receive to your blog/website in order to understand trends and popular posts/pages you've created. There are a number of providers out there one could use, including web hosts such as [vercel](https://vercel.com/analytics), [netlify](https://www.netlify.com/products/analytics/), and [cloudflare](https://www.cloudflare.com/web-analytics/).

This theme/template doesn't include a specific solution due to there being a number of use cases and/or options which some people may or may not use.

You may be asked to included a snippet inside the **HEAD** tag of your website when setting it up, which can be found in `src/layouts/Base.astro`. Alternatively, you could add the snippet in `src/components/BaseHead.astro`.

## Deploy

[Astro docs](https://docs.astro.build/en/guides/deploy/) has a great section and breakdown of how to deploy your own Astro site on various platforms and their idiosyncrasies.

By default the site will be built (see [Commands](#commands) section above) to a `/dist` directory.

## Acknowledgment

This theme was inspired by [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus/)

## 🙏 Thank you

We really appreciate you choosing to become a PIRATE!

[PIRATE]: https://PIRATEpro.app
[Astro]: https://astro.build
[Keystatic]: https://keystatic.com


## License

MIT
