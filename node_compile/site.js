const site = {
    name: 'Braden East',
    titleSeparator: ' | ',

    root: 'https://www.bradeneast.com/',
    ignoreChar: '_',
    public: './public/',
    blog: 'blog/',
    pageTemp: './_template.html',
    pagesFolder: './pages/',

    postAreas: ['blog', 'work'],
    postsFolder: './posts/',
    postSrc: './posts/_published/',
    postTemp: './posts/_template.html',
    staticComponents: './components/',

    audience: 'dev-signers',
    tagline: 'Gain confidence designing and coding stellar interfaces.',
    codepen: {
        theme_id: 'dark',
        height: '540',
        user: 'bradeneast',
        default_tab: 'result'
    }
}

module.exports = site;