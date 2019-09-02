import { linkify, removeLoadingAnimations, clearImageFormatting, hideTargetedElement } from './helpers.js';
import * as parseStuff from './parsestuff.js';
import * as fetchStuff from './fetchstuff.js';

export function getProjects() {
    const portfolioID = '3486337941773520193';
    const projectWrappers = document.querySelectorAll('[data-projects]');

    projectWrappers.forEach(wrapper => {
        const wrapperType = wrapper.getAttribute('data-projects');

        if (wrapperType == 'feed') {
            window.addEventListener('hashchange', () => {
                window.location.hash != '' ? hideTargetedElement({ fromParent: wrapper }) : null;
            });
            fetchStuff.fetchBloggerData({ blogID: portfolioID }).then(data => {
                data.items.map(item => {
                    let itemTitle = linkify(item.title.split(' | ').shift());
                    let projectTemplate = document.importNode(wrapper.querySelector('template'), true).content;
                    Object.keys(item).map(key => {
                        parseStuff.parseBloggerJSON({ objectKey: key, objectValue: item[key], template: projectTemplate });
                    })
                    projectTemplate.firstElementChild.id = itemTitle;
                    wrapper.appendChild(projectTemplate);
                    clearImageFormatting();
                })
                hideTargetedElement({ fromParent: wrapper });
                removeLoadingAnimations({ from: wrapper });
            })
        }

        if (wrapperType == 'single') {
            fetchStuff.fetchBloggerData({ blogID: portfolioID }).then(data => {
                let target = window.location.hash.replace('#', '');
                data.items.map(item => {
                    let itemTitle = linkify(item.title.split(' | ').shift());
                    if (target == itemTitle) {
                        Object.keys(item).map(key => {
                            parseStuff.parseBloggerJSON({ objectKey: key, objectValue: item[key], template: wrapper });
                        })
                    }
                })
                window.addEventListener('hashchange', function (e) {
                    window.scrollTo(0, 0);
                    data.items.map(item => {
                        let itemTitle = linkify(item.title.split(' | ').shift());
                        if (e.newURL.split('#').pop() == itemTitle) {
                            Object.keys(item).map(key => {
                                parseStuff.parseBloggerJSON({ objectKey: key, objectValue: item[key], template: wrapper });
                            })
                        }
                    })
                })
                clearImageFormatting();
                removeLoadingAnimations({ from: wrapper });
            })
        }
    })
}