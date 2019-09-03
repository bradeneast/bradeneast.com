const wrapper = document.getElementById('wrapper');
for (i = 0; i < 100; i++) {
    let div = document.createElement('div');
    div.classList.add('child');
    wrapper.appendChild(div);
}

console.time('stagger styles took');
document.querySelectorAll('.stagger-child-transitions').forEach(element => {
    Array.from(element.children).map((child, index) => {
        child.style.transitionDelay = (index * .1) + 's';
    })
})
console.timeEnd('stagger styles took');