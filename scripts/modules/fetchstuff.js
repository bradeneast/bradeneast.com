export function fetchBloggerData({ blogID }) {
    let APIKey = 'AIzaSyAIvo41apphAFmT6AzIDQfpWG3wzM1fvp8';
    let fetched = null;
    blogID ? fetched = fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogID}/posts?key=${APIKey}`).then(r => { return r.json() }) : console.log('fetchBloggerData only accepts string arguments');
    return fetched;
}

export function fetchLocalData({ filePath }) {
    let fetched = null;
    if (filePath) {
        fetched = fetch(filePath).then(r => {
            let fileType = filePath.split('.').pop();
            if (fileType == 'json') {
                return r.json();
            } else {
                return r.text();
            }
        })
    }
    return fetched;
}