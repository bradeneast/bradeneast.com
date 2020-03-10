export default {
    /*
    ignore  //  ignore files and directories whose name begins with this character
    */
    ignore: '_',
    /*
    homepage  //  the name of the homepage file needs to be specified so its index.html is placed at the root of the distribution folder. this option distinguishes it from other top-level pages in the source folder.
    */
    homepage: 'About',
    sitemap: true,
    /*
    src  //  the private folder where page edits are made
    dist  //  the folder where the compiled site is published (edits made in this folder will be lost unless the ignore character is present at the beginning of the file/directory name)
    components  //  the private folder for the html or text building blocks used in the website
    templates  //  the private folder for html page templates
    */
    paths: {
        src: 'private',
        dist: 'public',
        components: 'components',
        templates: 'templates',
        root: 'https://www.bradeneast.com',
    },
    /*
    */
    match: {
        components: ['{{', '}}'],
        variables: ['[[', ']]'],
    },
    /*
    feeds are lists of metadata or content from other pages

        the feed attribute indicates that a feed should be processed within that element. the first element child will be copied and used as the template for each feed item.

        excerpts
            length  //  number of characters to show
            overflow  //  string appended to the excerpt
    */
    feeds: {
        attribute: 'data-feed',
        template: '',
        excerpts: {
            length: 'auto',
            overflow: '',
        }
    },
    default: {
        /*
        default date format
            toString  //  Wed Jan 23 2019 17: 23: 42 GMT + 0200(Central Standard Time)
            toJSON  //  2019-01-23T06:00:00.000Z
            toDateString  //  Wed Jan 23 2019
            toTimeString  //  03:23:42 GMT-0600 (Central Standard Time)
            toLocaleString  //  23 / 01 / 2019, 17: 23: 42
            toLocaleDateString  //  Varies according to default locale
            toGMTString  //  Wed, 23 Jan 2019 09: 23: 42 GMT
            toUTCString  //  Wed, 23 Jan 2019 09: 23: 42 GMT
            toISOString  //  2019 - 01 - 23T09: 23: 42.079Z
        */
        dateFormat: 'toDateString',
        // fallback for items with no featured media specified
        media: '/_assets/media/beach-ladder.jpg',
        // video element attributes
        autoPlayVideos: true,
        loopVideos: true,
        // transform category names and lists
        categories: {
            prepend: '#',
            append: '',
            split: ', ',
            join: ' ',
        },
        codePenTheme: 'dark',
    },
    /*
    scopes
        template name is the file the build will look for in your templates folder
        target indicates where to apply the template (must begin with a leading slash)
        
        sort: available for any top-level page property whose value is a string or an integer. See examples below:
            name (default)  //  alphabetical by name
            -name  //  reverse alphabetical by name
            created  //  chronological created
            -created  //  reverse chronological created
            modified  //  chronological last modified
            -modified  //  reverse chronological last modified

        categories indicates whether or not to create a feed page for each category in the target directory  //  defaults to false
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
                useComponent: 'category_feed',
            },
            rss: {
                name: 'Blog of Braden East',
                description: 'The blog for dev-signers.',
                path: '/blog'
            }
        },
        {
            templateName: 'post',
            target: '/design',
            sort: 'name',
            categories: {
                categorize: true,
                useComponent: 'category_feed_with_media',
            }
        },
    ],
}