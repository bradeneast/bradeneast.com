// return first item with href area matching url area
export default (arrayOfElems) => {

    for (let item of arrayOfElems) {

        let url = location.pathname;
        let area = url.length <= 1 ? url : url.split('/')[1];
        let href = item.getAttribute('href');

        if (href == area || href.split('/')[1].includes(area)) {
            return item;
            break;
        }

    }

}