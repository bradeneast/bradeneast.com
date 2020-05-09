export default {
    /** the private folder for html page templates */
    ignore: '_',
    /** the name of the homepage file needs to be specified so its index.html is placed at the root of the distribution folder. this option distinguishes it from other top-level pages in the source folder. */
    homepage: 'About',
    sitemap: {
        generate: true,
        exclude: [
            '/design',
            '/design/*',
            '/404'
        ],
        prioritize: [
            '/blog/*'
        ]
    },
    paths: {
        /** the private folder where page edits are made */
        src: 'src',
        /** the folder where the compiled site is published (edits made in this folder will be lost unless the ignore character is present at the beginning of the file/directory name) */
        dist: 'public',
        /** the private folder for the html or text building blocks used in the website */
        partials: 'partials',
        /** the private folder for html page templates */
        templates: 'templates',
        /** the http or https url at which the site will live in production */
        root: 'https://www.bradeneast.com',
    },
    match: {
        partials: ['{{', '}}'],
        variables: ['[[', ']]']
    },
    /** Feeds are lists of metadata or content from other pages. The first element child will be copied and used as the template for each feed item. */
    feeds: {
        /** The attribute that indicates a feed container element */
        attribute: 'data-feed',
        template: '',
        /** Formatting configuration for excerpts in a feed */
        excerpts: {
            /** Number of characters to show in the excerpt */
            length: 'auto',
            /** String appended to the excerpt */
            overflow: '',
        }
    },
    default: {
        /**
        toString: Wed Jan 23 2019 17: 23: 42 GMT + 0200(Central Standard Time)
        toJSON: 2019-01-23T06:00:00.000Z
        toDateString: Wed Jan 23 2019
        toTimeString: 03:23:42 GMT-0600 (Central Standard Time)
        toLocaleString: 23 / 01 / 2019, 17: 23: 42
        toLocaleDateString: Varies according to default locale
        toGMTString: Wed, 23 Jan 2019 09: 23: 42 GMT
        toUTCString: Wed, 23 Jan 2019 09: 23: 42 GMT
        toISOString: 2019 - 01 - 23T09: 23: 42.079Z
        */
        dateFormat: 'Monday April 9, 2020',
        categories: {
            split: ', '
        },
        /** Path to fallback media for items with no featured media specified */
        media: '/_assets/media/beach-ladder.jpg',
        codePenTheme: 'dark',
    },
    /** Template name is the file the build will look for in your templates folder. Target indicates where to apply the template (must begin with a leading slash)
        
        sort: available for any top-level page property whose value is a string or an integer. See examples below:
            name (default): alphabetical by name
            -name: reverse alphabetical by name
            created: chronological created
            -created: reverse chronological created
            modified: chronological last modified
            -modified: reverse chronological last modified

        categories indicates whether or not to create a feed page for each category in the target directory: defaults to false
    */
    scopes: [
        {
            templateName: 'main',
            target: '/',
        },
        {
            templateName: 'post',
            target: '/blog',
            sort: '-created',
            categories: {
                categorize: true,
                usePartial: 'category_feed',
            },
            rss: {
                name: 'Blog of Braden East',
                description: 'The blog for dev-signers.',
                path: '/blog'
            }
        },
        {
            templateName: 'project',
            target: '/projects',
            sort: '-modified',
            categories: {
                categorize: true,
                usePartial: 'category_feed',
            }
        },
    ],
}