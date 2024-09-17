import React from 'react';
import { config, fields, collection, singleton } from '@keystatic/core';
import { colorPicker } from './src/components/ColorPicker.tsx';







const isProduction: boolean = process.env.NODE_ENV === 'production'

export default config({
  storage: isProduction
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: isProduction
    ? {
        project: 'tool/toolpirate',
      }
    : undefined,
  
  collections: {
    posts: collection({
      label: 'Posts',
      entryLayout: 'content',
      slugField: 'title',
      path: 'src/content/post/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', validation: { length: { min: 50, max: 160 } } }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({ label: 'Content' }),
        
        publishDate: fields.datetime({ label: 'Publish Date' }),
        updatedDate: fields.datetime({ label: 'Updated Date' }),
        divider: fields.empty(),
        coverImage: fields.object({
          src: fields.image({
            label: 'Image file',
            directory: 'public/images/posts',
            publicPath: '/images/posts',
          }),
          alt: fields.text({ 
            label: 'Alt Text',
          }),
        }),
        divider2: fields.empty(),
        youtube: fields.conditional(
          fields.checkbox({ label: 'Include YouTube Video' }),
          {
            true: fields.object({
              url: fields.text({ 
                label: 'YouTube Video URL',
                description: 'Enter the full YouTube video URL'
              }),
              title: fields.text({ 
                label: 'Video Title',
                description: 'Enter a title for the video (optional, leave blank for no title)',
                validation: { isRequired: false }
              }),
              controls: fields.checkbox({ label: 'Use YouTube Player Controls' }),
              useCustomPlayer: fields.checkbox({ 
                label: 'Use Custom Player Controls', 
                defaultValue: true 
              }),
              mute: fields.checkbox({ label: 'Mute Video' }),
              loop: fields.checkbox({ label: 'Loop Video' }),
              start: fields.number({ 
                label: 'Start Time (seconds)', 
                defaultValue: 0,
                validation: { min: 0 }
              }),
              end: fields.number({ 
                label: 'End Time (seconds)', 
                validation: { min: 0, isRequired: false }
              }),
              videoOnly: fields.checkbox({ label: 'Video Only', defaultValue: false }),
            }),
            false: fields.empty(),
          }
        ),
        divider1: fields.empty(),        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
      },
    }),    pages: collection({      label: 'Other Pages',
      path: 'src/content/pages/*',
      slugField: 'title',
      format: { contentField: 'content' },
      schema: {
        title: fields.text({ label: 'Title' }),
        description: fields.text({ label: 'Description' }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),

    pitches: collection({
      label: 'Info Block',
      path: 'src/content/pitches/*',
      schema: {
        title: fields.text({ label: 'Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        description: fields.text({ label: 'Description', multiline: true }),
        phone: fields.text({ label: 'Phone' }),
        subheading: fields.text({ label: 'Subheading' }),
        subcontent: fields.text({ label: 'Subcontent' }),
        subcta: fields.text({ label: 'CTA Text' }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/pitches',
          publicPath: '/images/pitches',
        }),
      },
      slugField: 'title'
    }),

    

    faqs: collection({
      label: 'FAQs',
      path: 'src/content/faqs/*',
      slugField: 'question',
      format: { contentField: 'answer' },
      schema: {
        question: fields.slug({ name: { label: 'Question' } }),
        answer: fields.document({
          label: 'Answer',
          formatting: true,
          dividers: true,
          links: true,
        }),
        order: fields.number({ label: 'Order' }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      path: 'src/content/testimonials/*',
      slugField: 'name',
      schema: {
        name: fields.text({ label: 'Name' }),
        location: fields.text({ label: 'Location' }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/testimonials',
          publicPath: '/images/testimonials',
        }),
        order: fields.number({ label: 'Order' }),
      },
    }),
    menuItems: collection({
      label: 'Menu Items',
      path: 'src/content/menu/*',
      slugField: 'path',
      schema: {
        title: fields.text({ label: 'Title' }),
        path: fields.text({ label: 'Path' }),
        order: fields.number({ label: 'Order' }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'src/content/siteSettings/main',
      schema: {
        logoImage: fields.image({
          label: 'Logo Image',
          description: 'Image used across the site - can use any format',
          directory: 'public/images/logo',
          publicPath: '/images/logo',
        }),
        divider: fields.empty(),
        showHeader: fields.checkbox({ label: 'Show Header', description: 'Hide/Show the main site header', defaultValue: true }),
        showLogo: fields.checkbox({ label: 'Show Logo', description: 'Hide/Show the logo in the header', defaultValue: true }),
        showHome: fields.checkbox({ label: 'Show Home Link', description: 'Hide/Show the Home Link', defaultValue: true }),
        showTheme: fields.checkbox({ label: 'Show Theme', description: 'Hide/Show the theme selector', defaultValue: true }),
        showSwitch: fields.checkbox({ label: 'Show Switch', description: 'Hide/Show the layout selector', defaultValue: true }),
        showSearch: fields.checkbox({ label: 'Show Search', description: 'Hide/Show the search in the header', defaultValue: true }),
        showFooter: fields.checkbox({ label: 'Show Footer', description: 'Hide/Show the Footer', defaultValue: true }),
        
        divider2: fields.empty(),

        


        divider3: fields.empty(),
        defaultView: fields.select({
          label: 'Default View (sets whether to show grid mode or swipe mode by default',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Swipe', value: 'swipe' },
          ],
          defaultValue: 'grid',
        }),
        showTitles: fields.checkbox({ label: 'Show Post Titles', description: 'Hide/Show the post titles', defaultValue: false }),
        showDates: fields.checkbox({ label: 'Show Dates', description: 'Hide/Show the post dates', defaultValue: true }),
        MAX_POSTS: fields.number({ label: 'Number of posts to display on home page', defaultValue: 3 }),
        MAX_POSTS_PER_PAGE: fields.number({ label: 'Number of posts to display on other pages', defaultValue: 3 }),

        
        divider4: fields.empty(),
        showShare: fields.checkbox({ label: 'Show Share section on posts', description: 'Hide/Show the share this copy button on posts', defaultValue: false }),


        
      },
    }),
    pwaSettings: singleton({
      label: 'PWA Settings',
      path: 'src/content/pwaSettings/',
      schema: {
        showRobots: fields.checkbox({
          label: 'SEO VISIBILITY',
          description: 'Set robots meta tag to index site and follow links - checking this box will make your site appear in search engines',
          defaultValue: false,
        }),
        siteUrl: fields.text({ label: 'Site Url', description: 'The address to your website' }),
        name: fields.text({ label: 'App Name' }),
        shortName: fields.text({ label: 'Short Name' }),

        divider: fields.empty(),

        screenshot: fields.image({
          label: 'Screenshot',
          description: 'This image is used on Android in the PWA install dialogue window (Image should be in JPG or PNG format and sized at 320x640)',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa',
        }),
        description: fields.text({ label: 'Description', description: 'The description, is used on Android in the PWA install dialogue window', }),

        divider2: fields.empty(),

        themeColor: colorPicker({ 
          label: 'Theme Color', 
          showOpacity: false
        }),
        backgroundColor: colorPicker({ 
          label: 'Background Color', 
          showOpacity: false
        }),
        startUrl: fields.text({
          label: 'PWA Start URL',
          description: 'This sets the start page when your app is installed',
          defaultValue: '/',
          validation: { length: { min: 1 } },
        }),
        display: fields.select({
          label: 'Display Mode',
          options: [
            { label: 'Standalone', value: 'standalone' },
            { label: 'Fullscreen', value: 'fullscreen' },
            { label: 'Minimal UI', value: 'minimal-ui' },
            { label: 'Browser', value: 'browser' }
          ],
          description: 'This sets the browser chrome to be used. - Standalone is default and removes all browser controls and chrome',
          defaultValue: 'standalone'
        }),
        icon192: fields.image({
          label: '192x192 Icon',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa'
        }),
        icon512: fields.image({
          label: '512x512 Icon',
          directory: 'public/images/pwa',
          publicPath: '/images/pwa'
        })
      }
    }),    home: singleton({
      label: 'Home Page',
      path: 'src/content/homepage/',
      schema: {

        featureImage: fields.object({
          src: fields.image({
            label: 'Feature Image',
            directory: 'public/images/homepage',
            publicPath: '/images/homepage',
          }),
          alt: fields.text({ 
            label: 'Featured Image Alt Text',
          }),
        }),

        showFeature: fields.checkbox({ label: 'Show Feature', description: 'Hide/Show the Feature section on home page', defaultValue: false }),

        showBioOnHome: fields.checkbox({
          label: 'Show Bio Module',
          description: 'Hide/Show the Bio/Info section on the home page',
          defaultValue: false,
        }),

        showHomeGallery: fields.checkbox({ label: 'Show Home Photo Gallery', description: 'Hide/Show the Photo section on home page', defaultValue: false }),

        showPosts: fields.checkbox({ label: 'Show Posts', description: 'Hide/Show the Posts section on the home page', defaultValue: false }),

        showMore: fields.checkbox({ label: 'Show More Button', description: 'Hide/Show the Show More Button (for the posts section above)', defaultValue: false }),


        showFaqOnHome: fields.checkbox({
          label: 'Show FAQ Module',
          description: 'Hide/Show the FAQ accordian section on the home page',
          defaultValue: false,
        }),

        showTestOnHome: fields.checkbox({
          label: 'Show Testimonials Module',
          description: 'Hide/Show the Testomonials section on the home page',
          defaultValue: false,
        }),
      
        

        divider: fields.empty(),

        pitch: fields.relationship({
          label: 'Select Pitch',
          collection: 'pitches',
        }),

        divider1: fields.empty(),
        
        testimonialtitle: fields.text({ label: 'Testimonials or Faq Title Header' }),
        postsectiontitle: fields.text({ label: 'Posts Section Title Header'  }),

        divider2: fields.empty(),


        youtube: fields.object({
          url: fields.text({ 
            label: 'YouTube Video URL',
            description: 'Enter the full YouTube video URL'
          }),

          title: fields.text({ 
            label: 'Video Title',
            description: 'Enter a title for the video (optional, leave blank for no title)',
            validation: { isRequired: false }
          }),
          // controls: fields.checkbox({ label: 'Show Controls', defaultValue: true }),
          controls: fields.checkbox({ label: 'Use YouTube Player Controls' }),
              useCustomPlayer: fields.checkbox({ 
                label: 'Use Custom Player Controls', 
                defaultValue: true 
              }),
          mute: fields.checkbox({ label: 'Mute Video', defaultValue: false }),
          loop: fields.checkbox({ label: 'Loop Video', defaultValue: false }),
          start: fields.number({ label: 'Start Time (seconds)', defaultValue: 0 }),
          end: fields.number({ label: 'End Time (seconds)' }),
          divider: fields.empty(),
        }),
      
      },
    }),    photoSettings: singleton({
      label: 'Photo Gallery Settings',
      path: 'src/content/photoSettings/',
      schema: {
        galleryMode: fields.select({
          label: 'Gallery Mode',
          description: '',
          options: [
            { label: 'Directory-based', value: 'directory' },
            { label: 'CMS-managed', value: 'keystatic' }
          ],
          defaultValue: 'directory'
        }),
        showCaptions: fields.checkbox({
          label: 'Show Photo Titles',
          defaultValue: true,
        }),

        divider: fields.empty(),

        showBioOnPhotos: fields.checkbox({
          label: 'Show Bio Module',
          defaultValue: false,
        }),

        showFaqsOnPhotos: fields.checkbox({
          label: 'Show FAQ Module',
          defaultValue: false,
        }),

        showTestimonialsOnPhotos: fields.checkbox({
          label: 'Show Testimonials Module',
          defaultValue: false,
        }),

        

        divider5: fields.empty(),

        defaultDirectory: fields.text({
          label: '(Directory-based Mode)',
          description: "Directory-based mode allows you to upload multiple folders of photos and it will automatically use the file names as the image captions allowing you to quickly create entire photo galleries - (Note: IT IS case-sensitive and space-sensitive) - Enter the EXACT name of the Default Directory to be displayed, below:",
          defaultValue: 'all',
          validation: { isRequired: false }
        }),
        
        showGallerySelector: fields.checkbox({
          label: 'Show Gallery Drop Down Menu',
          description: '(Directory-based mode only) Hiding this or leaving the default directory empty, will automatically show all the images in all directories',
          defaultValue: true,
        }),

        divider2: fields.empty(),
        divider3: fields.empty(),

        galleryImages: fields.array(
          fields.object({
            image: fields.image({
              label: 'Gallery Image',
              directory: 'public/images',
              publicPath: '/images',
              validation: { isRequired: false }
            }),

            caption: fields.text({
              label: 'Image Caption',
              description: 'Enter a caption for this image',
              validation: { isRequired: false }
            })
          }),
          {
            label: 'CMS-managed Gallery Images',
            itemLabel: (props) => props.fields.caption.value || 'Image',
          }
        ),        divider4: fields.empty(),

      },
    }),        
    
    styleAppearance: singleton({
      label: 'Appearance',
      path: 'src/content/styleapps/',
      schema: {
        backgroundImage: fields.image({
          label: 'Site Background Image',
          directory: 'public/images/styleapps',
          publicPath: '/images/styleapps'
        }),
        siteFont: fields.text({ label: 'Site Font', defaultValue: 'Bowlby One', description: 'Enter the name of any Google Font' }),
        borderRadius: fields.text({ label: 'Border Radius', description: 'Border Radius of elements on page (0) for square', validation: { isRequired: false }, defaultValue: "0px" }),
        divider5: fields.empty(),
        lightBg: colorPicker({ 
          label: 'Light Background Color', 
          description: '(light) Page Background - can use any color value',
        }),
        lightAccent: colorPicker({ 
          label: 'Light Accent Color', 
          description: '(light) Accent - can use any color value',
        }),
        lightAccent2: colorPicker({ 
          label: 'Light Accent2 Color', 
          description: '(light) Accent2 - can use any color value',
        }),
        divider6: fields.empty(),
        darkBg: colorPicker({ 
          label: 'Dark Background Color', 
          description: '(dark) Page Background - can use any color value',
        }),
        darkAccent: colorPicker({ 
          label: 'Dark Accent Color', 
          description: '(dark) Accent Color - can use any color value',
        }),
        darkAccent2: colorPicker({ 
          label: 'Dark Accent2 Color', 
          description: '(dark) Accent Color2 - can use any color value',
        }),
        divider7: fields.empty(),
        lightHeader: colorPicker({ 
          label: 'Light Header Color', 
          description: '(light) Header Color - can use any color value',
        }),
        darkHeader: colorPicker({ 
          label: 'Dark Header Color', 
          description: '(dark) Quote Color2 - can use any color value',
        }),
        divider8: fields.empty(),
        lightText: colorPicker({ 
          label: 'Light Text Color', 
          description: '(light) Text Color - can use any color value',
        }),
        darkText: colorPicker({ 
          label: 'Dark Text Color', 
          description: '(dark) Text Color - can use any color value',
        }),
        divider9: fields.empty(),
        lightLink: colorPicker({ 
          label: 'Light Link Color', 
          description: '(light) Link Color - can use any color value',
        }),
        darkLink: colorPicker({ 
          label: 'Dark Link Color', 
          description: '(dark) Link Color - can use any color value',
        }),

        customCSS: fields.text({ label: 'Custom CSS', description:'Additional CSS can be written here, overwriting the sites default styles.', multiline: true }),

        
      },
    }),


    socialCard: singleton({
      label: ' OG Site Image',
      path: 'src/content/photoUpload/',
      schema: {
        socialCard: fields.image({
          label: 'Upload Photo',
          description: "This is the site's default OG image - it is used for link previews on social media, if a custom image isn't uploaded.",
          directory: 'public/',
          publicPath: '/',
        }),
      },
    }),  

    language: singleton({
      label: 'Language',
      path: 'src/content/language/',
      schema: {
        homelink: fields.text({ label: 'Home' }),
        copyright: fields.text({ label: 'Copyright' }),
        goback: fields.text({ label: 'Back' }),
        viewmore: fields.text({ label: 'View More' }),
        allimages: fields.text({ label: 'All Images' }),
        close: fields.text({ label: 'Close' }),
        search: fields.text({ label: 'Search' }),
        mute: fields.text({ label: 'Mute' }),
        volume: fields.text({ label: 'Volume' }),
        progress: fields.text({ label: 'Progress' }),
        tags: fields.text({ label: 'Tags' }),
        viewall: fields.text({ label: 'View All' }),
        shareText: fields.text({ label: 'Share This' }),
        copyButton: fields.text({ label: 'Copy' }),
        
        // temp: fields.text({ label: 'temp', multiline: true }),
      },
    }),
  

    bio: singleton({
      label: 'Bio',
      path: 'src/content/bio/',
      schema: {
        title: fields.text({ label: 'Title' }),
        tagline: fields.text({ label: 'Tagline' }),
        description: fields.text({ label: 'Description', multiline: true }),
        image: fields.image({
          label: 'Image',
          directory: 'public/images/bio',
          publicPath: '/images/bio',
        }),
        phone: fields.text({ label: 'Phone' }),
        subheading: fields.text({ label: 'Sub Heading' }),
        subcontent: fields.text({ label: 'Sub Content', multiline: true }),
        subcta: fields.text({ label: 'CTA Text' }),
      },
    }),
    
  },




ui: {
  brand: {
    name: ' ',
    mark: ({ colorScheme }) => {
      let path = colorScheme === 'dark'
        ? '/images/logo/logoImage.svg'
        : '/images/logo/logoImage.svg';
      return React.createElement('img', { src: path, height: 40, alt: "Pirate Logo" });
    },
  },
  navigation: {
    'Pages and Posts': [
      'home',
      'pages',
      'posts',
    ],
    'Content Modules': [
      'bio',
      'faqs',
      'testimonials',
      'pitches',
      
    ],
    'Settings': [
      'siteSettings',
      'pwaSettings',
      'menuItems',
      'socialCard',
      'photoSettings',
      'styleAppearance',
      'language',
    ],
  },
},});
