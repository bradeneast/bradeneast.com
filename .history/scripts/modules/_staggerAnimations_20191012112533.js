function Stagger(params) {

    let parent = params.parent;
    let pr = parent.getBoundingClientRect();
    let parentCenter = {
        x: pr.right - (pr.width / 2),
        y: pr.bottom - (pr.height / 2)
    }
    let children = Array.from(parent.children);
    let distances = [];
    let intensity = params.intensity * .5;
    let origin = params.origin.split(' ') || ['top', 'left'];
    let originX;
    let originY;


    // Organize points of origin in a usable fashion
    if (!origin[1]) origin.push('center');
    if (origin[0] == 'left' || origin[0] == 'right') origin.reverse();


    // Get X and Y values of origin on parent element
    origin.map((side, index) => {

        if (side != 'center') {

            index == 0 ? originY = pr[side] : originX = pr[side];

        } else {

            index == 0 ? originY = parentCenter.y : originX = parentCenter.x;

        }

    })

    console.log(originX, originY);


    // Get each child's distance from point of origin
    children.map(child => {

        let cr = child.getBoundingClientRect();

        // Get child position on X and Y axis
        let childX = cr.right - (cr.width / 2);
        let childY = cr.bottom - (cr.height / 2);

        // Get child distance from origin
        let distanceX = Math.max(originX, childX) - Math.min(originX, childX);
        let distanceY = Math.max(originY, childY) - Math.min(originY, childY);
        let distance = Math.round(distanceX + distanceY);

        distances.push(distance);

    });

    // Sort children by distance away from the point of origin
    distances.sort();
    params.direction == 'to' ? distances.reverse() : null;

    // Apply relative animation delay to each child
    distances.map((d, index) => children[index].style.animationDelay = index * intensity + 's')
}