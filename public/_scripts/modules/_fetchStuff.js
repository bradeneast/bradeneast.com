function fetchLocalData({ filePath }) {
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