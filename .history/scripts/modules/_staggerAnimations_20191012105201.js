function Stagger(params) {

    let parent = params.parent;
    let pr = parent.getBoundingClientRect();
    let distances = [];
    let intensity = params.intensity * .5;
    let origin;
    let X;
    let Y;


    // Organize points of origin in a usable fashion
    params.origin ? origin = params.origin.split(' ') : origin = ['top', 'left'];
    !origin[1] ? origin.push('center') : null;
    origin[0] == 'left' || origin[0] == 'right' ? origin.reverse() : null;


    // Obtain X and Y integer values from origin string values
    !origin[1].includes('center') ? X = pr[origin[1]] : X = pr.right - (pr.width / 2);
    !origin[0].includes('center') ? Y = pr[origin[0]] : Y = pr.bottom - (pr.height / 2);


    // Get each child's distance from point of origin
    Array.from(params.parent.children).map(child => {

        let distance;

        if (child.tagName.toLowerCase() !== 'template') {

            let r = child.getBoundingClientRect();

            // Get child position on X and Y axis
            let childX;
            let childY;
            !origin[1].includes('center') ? childX = r[origin[1]] : childX = r.right - (r.width / 2);
            !origin[0].includes('center') ? childY = r[origin[0]] : childY = r.bottom - (r.height / 2);

            // Get child distance from origin on each axis 
            let distanceX;
            let distanceY;
            childY < Y ? distanceY = Y - childY : distanceY = childY - Y;
            childX < X ? distanceX = X - childX : distanceX = childX - X;

            distance = Math.round(distanceX + distanceY);
            distances.push(distance);
        }
    });

    // Sort children by distance away from the point of origin
    distances.sort();
    params.direction == 'to' ? distances.reverse() : null;

    // Apply relative animation delay to each child
    distances.map((d, index) => params.parent.children[index].style.animationDelay = index * intensity + 's')
}