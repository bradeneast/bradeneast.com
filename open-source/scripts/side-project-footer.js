document.body.insertAdjacentHTML('beforeend',
    `
    <style>
        .description {
            padding: 5rem 0;
            margin: 3rem 0;
            max-width: 36rem;
        }

        .socials {
            margin-top: 2rem;
        }

        .socials a {
            text-decoration: none;
        }

        .socials [data-icon] {
            width: 1.5rem;
            height: 1.5rem;
        }

        .socials [data-icon]:hover {
            opacity: .8;
        }

        @media screen and (max-width: 1080px) {
            .description {
                padding: 0;
            }
        }
    </style>

    <section class="description">
        <h1>Was this resource helpful for you?</h1>
        <p>If you're using this free tool, you or someone you know might be interested in rebranding your business. I can help with that.
            <br />&nbsp;<br />
            More about me: <a href="https://www.bradeneast.com" target="_blank">bradeneast.com</a>
            <br>
            Reach me here: <a href="mailto:bradeneastdesign@gmail.com">bradeneastdesign@gmail.com</a>
        </p>
        <div class="socials center">
            <a href="https://www.behance.net/bradeneastdesign" aria-label="my behance profile" target="_blank">
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="behance-square" class="svg-inline--fa fa-behance-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M186.5 293c0 19.3-14 25.4-31.2 25.4h-45.1v-52.9h46c18.6.1 30.3 7.8 30.3 27.5zm-7.7-82.3c0-17.7-13.7-21.9-28.9-21.9h-39.6v44.8H153c15.1 0 25.8-6.6 25.8-22.9zm132.3 23.2c-18.3 0-30.5 11.4-31.7 29.7h62.2c-1.7-18.5-11.3-29.7-30.5-29.7zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zM271.7 185h77.8v-18.9h-77.8V185zm-43 110.3c0-24.1-11.4-44.9-35-51.6 17.2-8.2 26.2-17.7 26.2-37 0-38.2-28.5-47.5-61.4-47.5H68v192h93.1c34.9-.2 67.6-16.9 67.6-55.9zM380 280.5c0-41.1-24.1-75.4-67.6-75.4-42.4 0-71.1 31.8-71.1 73.6 0 43.3 27.3 73 71.1 73 33.2 0 54.7-14.9 65.1-46.8h-33.7c-3.7 11.9-18.6 18.1-30.2 18.1-22.4 0-34.1-13.1-34.1-35.3h100.2c.1-2.3.3-4.8.3-7.2z"></path>
                </svg>
            </a>
            <a href="https://www.instagram.com/bradeneastdesign" aria-label="my instagram profile" target="_blank">
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" class="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
            </a>
            <a href="https://github.com/bradeneast" aria-label="my github profile" target="_blank">
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github-square" class="svg-inline--fa fa-github-square fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"></path>
                </svg>
            </a>
            <a href="https://www.linkedin.com/in/bradeneast/" aria-label="my linkedin profile" target="_blank">
                <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" class="svg-inline--fa fa-linkedin fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                </svg>
            </a>
        </div>
        <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135.94 40.63" style="margin: 3rem 0; max-width: 4rem;">
            <path fill="#d0dce0" d="M0,25.85c1.29-1.37,2.45-2.5,3.69-3.7s2.48-2.34,3.75-3.47c2.54-2.27,5.17-4.46,7.92-6.54a88.26,88.26,0,0,1,8.7-5.88,52.92,52.92,0,0,1,10-4.67A33,33,0,0,1,40,.21a23.71,23.71,0,0,1,6.67.05,19.16,19.16,0,0,1,6.77,2.47,19.85,19.85,0,0,1,5.25,4.64,29.08,29.08,0,0,1,3.25,5.22c.82,1.63,1.51,3.17,2.17,4.63a45.82,45.82,0,0,0,4,7.54,10.7,10.7,0,0,0,2.17,2.36,6.53,6.53,0,0,0,2.25,1.16,11.51,11.51,0,0,0,6.27-.4c.61-.15,1.24-.4,1.88-.61l2.12-.86c1.41-.59,2.83-1.2,4.25-1.86,2.84-1.3,5.7-2.73,8.57-4.17,11.52-5.77,23.36-12.27,37-16l3.28,13.33a102.32,102.32,0,0,0-17.37,5.79c-5.79,2.44-11.57,5.24-17.47,8.08-3,1.41-5.95,2.83-9.06,4.17-1.54.68-3.12,1.33-4.72,2l-2.43.92c-.89.3-1.79.64-2.75.9a27.43,27.43,0,0,1-6.09,1.09,20.48,20.48,0,0,1-6.86-.71,18.83,18.83,0,0,1-6.36-3.27,24.16,24.16,0,0,1-4.49-4.72A55.44,55.44,0,0,1,53,22.35c-1.39-3-2.7-5.78-3.93-7.21a6.65,6.65,0,0,0-4.36-2.58,14.75,14.75,0,0,0-6.64.94,40.49,40.49,0,0,0-7.56,3.65,78.35,78.35,0,0,0-7.39,5.13c-2.41,1.87-4.77,3.87-7,6-1.14,1-2.27,2.11-3.37,3.19s-2.23,2.23-3.16,3.24Z" />
        </svg>
    </section>
`)