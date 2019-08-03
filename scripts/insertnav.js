function toggleNav() {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle.checked) {
        navToggle.checked = false;
    } else if (!navToggle.checked) {
        navToggle.checked = true;
    }
}
var nav = `
<nav id="nav">
    <a href="/" aria-label="logo - link to homepage" class="logo" id="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216">
            <path class="logo-icon" d="M33.52,1.1h80.06C151.69,1.1,178,23.41,178,54.39c0,21.69-10.84,37.49-29.74,47.4,24.79,11.16,39,31,39,54.54,0,34.07-29.12,57.63-69.71,57.63H33.52Z" />
            <path class="logo-squiggle" d="M1.56,30.89l2.69-.21,2.48-.16c1.64-.09,3.26-.17,4.88-.23,3.25-.13,6.48-.2,9.72-.22,6.48,0,13,.16,19.55.59A196.58,196.58,0,0,1,60.82,33,124.79,124.79,0,0,1,81.5,38.21,81.87,81.87,0,0,1,92.24,42.9a59.43,59.43,0,0,1,10.83,7.26,46.71,46.71,0,0,1,9.67,11.21,42.38,42.38,0,0,1,5.54,14.69,48,48,0,0,1,.26,14.51c-.16,1.12-.33,2.22-.54,3.29s-.4,1.94-.61,2.87c-.42,1.82-.87,3.51-1.32,5.13-1.82,6.42-3.59,11.8-4.59,16.47a39.07,39.07,0,0,0-.92,6.13,14.12,14.12,0,0,0,.26,4,6.24,6.24,0,0,0,1,2.25,10.21,10.21,0,0,0,2.58,2.41,27.21,27.21,0,0,0,4.8,2.63c1,.43,1.9.81,3.11,1.22l3.89,1.3c5.24,1.66,10.66,3.13,16.27,4.5s11.47,2.66,17.46,4,12.19,2.75,18.44,4.41S191,154.82,197.26,157s12.54,4.83,18.72,7.57l-18.14,35.65a158.9,158.9,0,0,0-30-12.92c-5.39-1.73-10.92-3.34-16.69-4.91s-11.72-3.08-17.8-4.77S121,174,114.76,171.75L110.08,170c-1.64-.61-3.52-1.37-5.3-2.19a61.15,61.15,0,0,1-11-6.33,46.89,46.89,0,0,1-10.34-10.26,41.53,41.53,0,0,1-6.65-14.11,49.75,49.75,0,0,1-1.43-14,73.22,73.22,0,0,1,1.43-11.87c1.44-7.2,3.4-13.37,4.75-18.64.33-1.31.63-2.55.88-3.69.11-.55.23-1.14.3-1.58s.12-.81.17-1.19a11.59,11.59,0,0,0-.09-3.59,6.21,6.21,0,0,0-.9-2.19,10.85,10.85,0,0,0-2.26-2.39,33.9,33.9,0,0,0-10.26-5.18,89,89,0,0,0-14.57-3.4,157.77,157.77,0,0,0-16.18-1.59c-5.53-.29-11.15-.33-16.78-.19q-4.23.11-8.45.35l-4.18.29-2,.17-1.84.18Z" />
        </svg>
    </a>
    <div class="nav-items-container">
        <label tabindex="0" role="button" for="nav-toggle" id="hamburger" onkeypress="toggleNav()"></label>
        <a class="nav-item" href="/#work">Work</a>
        <a class="nav-item" href="/about/me">About</a>
        <a class="nav-item" href="/blog">Blog</a>
    </div>
</nav>`;
document.body.insertAdjacentHTML('afterbegin', nav);
document.body.insertAdjacentHTML('afterbegin', `
    <input tab-index="-1" aria-label="toggle navigation" type="checkbox" id="nav-toggle">
    <button id="up-down" aria-label="Back to top" onclick="window.location.href = '#';">
        <svg viewBox="0 0 18 9">
            <polyline stroke="currentColor" stroke-width="1.7" fill="none" points="1,8 9,0 17,8">
        </svg>
    </button>
`);