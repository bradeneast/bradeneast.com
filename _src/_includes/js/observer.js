let setOffscreen = entry => {
  if (entry.isIntersecting) {
    entry.target.style.setProperty('--onscreen', 1);
    entry.target.removeAttribute("data-offscreen");
    // observer.unobserve(entry.target);
  }
  else {
    entry.target.style.setProperty('--onscreen', 0);
    entry.target.setAttribute("data-offscreen", "");
  }
}

let observer = new IntersectionObserver(entries => {
  entries.forEach(setOffscreen);
},
  {
    threshold: .4,
    rootMargin: "-100px 0%"
  }
);

export default observer;