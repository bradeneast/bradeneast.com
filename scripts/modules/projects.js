import { linkify, removeLoadingAnimations, removeEmpty } from './helpers.js';
import * as parseStuff from './parseStuff.js';
import * as fetchStuff from './fetchstuff.js';
import { wrap } from 'module';

export function getProjects() {
    const portfolioID = '3486337941773520193';
    const projectWrappers = document.querySelectorAll('[data-projects]');

    projectWrappers.forEach(wrapper => {
        const wrapperType = wrapper.getAttribute('data-projects');

        if (wrapperType == 'feed') {
            fetchStuff.fetchBloggerData({ blogID: portfolioID }).then(data => {
                data.items.map(item => {
                    let projectTemplate = document.importNode(wrapper.querySelector('template'), true).content;
                    Object.keys(item).map(key => {
                        parseStuff.parseBloggerJSON({ objectKey: key, objectValue: item[key], template: projectTemplate });
                    })
                    wrapper.appendChild(projectTemplate);
                })
                removeLoadingAnimations({ from: wrapper });
            })
        }

        if (wrapperType == 'single') {
            const selected = window.location.hash.replace('#', '');
            fetchStuff.fetchBloggerData({ blogID: portfolioID }).then(data => {
                window.addEventListener('hashchange', function (e) {
                    window.scrollTo(0, 0);
                    let target = e.newURL.split('#').pop();
                    data.items.map(item => {
                        if (target == linkify(item.title.split(' | ').shift())) {
                            Object.keys(item).map(key => {
                                parseStuff.parseBloggerJSON({ objectKey: key, objectValue: item[key], template: wrapper });
                            })
                        }
                    })
                })
                data.items.map(item => {
                    if (selected == linkify(item.title.split(' | ').shift())) {
                        Object.keys(item).map(key => {
                            parseStuff.parseBloggerJSON({ objectKey: key, objectValue: item[key], template: wrapper });
                        })
                    }
                })
                removeLoadingAnimations({ from: wrapper });
            })
        }
    })
}

export function getLocalContent() {
    const url = removeEmpty(window.location.pathname.split('/'));
    let pageName = url.reverse()[0];
    fetchStuff.fetchLocalData({ filePath: `../_content/${pageName}.json` }).then(data => {
        let wrapper = null;
        Object.keys(data).map(contentType => {
            wrapper = document.getElementById(contentType);
        })
        console.log(data);
        Object.values(data).map(content => {
            let template = document.importNode(wrapper.querySelector('template'), true).content;
            Object.keys(content).map(key => {
                parseStuff.parseBloggerJSON({ objectKey: key, objectValue: content[key], template: template });
                console.log(content[key]);
            })
            wrapper.appendChild(template);
        })
    })
}