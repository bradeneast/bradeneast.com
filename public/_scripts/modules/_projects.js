function getProjects() {
    const portfolioID = '3486337941773520193';
    const projectWrappers = document.querySelectorAll('[data-projects]');

    projectWrappers.forEach(wrapper => {
        const wrapperType = wrapper.getAttribute('data-projects');

        if (wrapperType == 'feed') {

            window.addEventListener('hashchange', () => window.location.hash != '' ? hideTargetedElement({ fromParent: wrapper }) : null);

            fetchBloggerData({ blogID: portfolioID }).then(data => {
                data.items.map(item => {
                    let itemTitle = linkify(item.content.split(' ').shift());
                    let projectTemplate = document.importNode(wrapper.querySelector('template'), true).content;

                    Object.keys(item).map(key => parseBloggerJSON({ objectKey: key, objectValue: item[key], template: projectTemplate }));

                    projectTemplate.firstElementChild.id = itemTitle;
                    wrapper.appendChild(projectTemplate);
                    clearImageFormatting();
                })
                hideTargetedElement({ fromParent: wrapper });
                removeLoadingAnimations({ from: wrapper });
            })
        }

        if (wrapperType == 'single') {

            fetchBloggerData({ blogID: portfolioID }).then(data => {
                let target = window.location.hash.replace('#', '');

                data.items.map(item => {

                    if (target == linkify(item.content.split(' ').shift())) {
                        console.log(item);
                        Object.keys(item).map(key => parseBloggerJSON({ objectKey: key, objectValue: item[key], template: wrapper }));
                    }
                })
                clearImageFormatting();
                removeLoadingAnimations({ from: wrapper });

                window.addEventListener('hashchange', function (e) {

                    window.scrollTo(0, 0);

                    data.items.map(item => {

                        if (e.newURL.split('#').pop() == linkify(item.content.split(' ').shift())) {
                            Object.keys(item).map(key => parseBloggerJSON({ objectKey: key, objectValue: item[key], template: wrapper }));
                        }
                    })
                clearImageFormatting();
                })
            })
        }
    })
}