function Stagger(params) {

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    let parent = params.parent;
    let children = [];
    let intensity = params.intensity * .5;
    let origin;
    let X;
    let Y;


    parent.r = parent.getBoundingClientRect();


    // Organize points of origin in a usable fashion
    params.origin ? origin = params.origin.split(' ') : origin = ['top', 'left'];
    !origin[1] ? origin.push('center') : null;
    origin[0] == 'left' || origin[0] == 'right' ? origin.reverse() : null;


    // Obtain X and Y integer values from origin string values
    !origin[1].includes('center') ? X = parent.r[origin[1]] : X = parent.r.right - (parent.r.width / 2);
    !origin[0].includes('center') ? Y = parent.r[origin[0]] : Y = parent.r.bottom - (parent.r.height / 2);


    // Get each child's distance from point of origin
    Array.from(params.parent.children).map(child => {

        if (child.tagName.toLowerCase() !== 'template') {

            child.r = child.getBoundingClientRect();

            // Get child position on X and Y axis
            let childX;
            let childY;
            !origin[1].includes('center') ? childX = child.r[origin[1]] : childX = child.r.right - (child.r.width / 2);
            !origin[0].includes('center') ? childY = child.r[origin[0]] : childY = child.r.bottom - (child.r.height / 2);

            // Get child distance from origin on each axis 
            let distanceX;
            let distanceY;
            childY < Y ? distanceY = Y - childY : distanceY = childY - Y;
            childX < X ? distanceX = X - childX : distanceX = childX - X;

            child.distance = Math.round(distanceX + distanceY);
            children.push(child);
        }
    });

    // Sort children by distance away from the point of origin
    children.sort(dynamicSort('distance'));
    params.direction == 'to' ? children.reverse() : null;

    // Apply relative animation delay to each child
    children.map((child, index) => child.style.animationDelay = index * intensity + 's')
}