(function() {
    /*
     *
     *     Shadow DOM Template
     * ---------------------------
     *
     */
    const template = document.createElement('template');
    template.innerHTML = `

<style>
</style>

<div class="lightning-google-maps"></div>

`;




    /**
     *
     *     Custom Element
     * ----------------------
     *
     */
    class LightningGoogleMaps extends HTMLElement {
        constructor() {
            super();

            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(this.template());
        }

        template() {
            const cloned = template.content.cloneNode(true);

            let iframe = replaceTag(this);
            iframe = iframe.replace(/ src=/g, ' loading="lazy" src=');

            const container = cloned.querySelector('.lightning-google-maps');
            container.innerHTML = iframe;

            return cloned;
        }
    }

    /**
     * Return a string that replaces our lightning- component with the original tag.
     *
     * @param element
     * @returns {string}
     */
    var replaceTag = function (element) {
        return element.outerHTML.replace(/lightning-google-maps/g, 'iframe').trim();
    };

    // check if custom elements are not supported, and fall to showing the original iframe if so
    if (!('customElements' in window)) {
        return [].forEach.call(document.querySelectorAll('lightning-google-maps'), function (el) {
            el.outerHTML = replaceTag(el);
        });
    }


    customElements.define('lightning-google-maps', LightningGoogleMaps);
})();


// class LightningGoogleMaps extends HTMLElement {
//     static DEFAULT_WIDTH = 600;
//     static DEFAULT_HEIGHT = 450;
//
//     constructor() {
//         super();
//
//         // here, we are going to store the exact iframe supplied to us, so that we can
//         // use it later when we replace the placeholder image with the actual iframe
//         const template = document.createElement('template');
//         template.innerHTML = this.querySelector('noscript').innerHTML.trim();
//         this.iframe = template.content.firstChild;
//
//         this.iframe.onload = () => {
//             this.hidePlaceholderImage();
//         };
//
//         // we don't need the noscript or iframe anymore
//         this.innerHTML = '';
//
//         this.width = this.iframe.width || LightningGoogleMaps.DEFAULT_WIDTH;
//         this.height = this.iframe.height || LightningGoogleMaps.DEFAULT_HEIGHT;
//         this.attachShadow({mode: 'open'}).innerHTML = this.template();;
//     }
//
//     connectedCallback() {
//         this.addEventListener('mouseover', this.insertIframe);
//         window.addEventListener('load', () => this.insertIframe());
//     }
//
//     template() {
//         return `
//         <style>
//         .lightning-google-maps {
//             display: inline-block;
//             cursor: pointer;
//         }
//         .lightning-google-maps__placeholder-image {
//             position: absolute;
//             left: 0;
//             opacity: 1;
//             transition: opacity 0.4s;
//         }
//         .lightning-google-maps__placeholder-image--hidden {
//             opacity: 0;
//         }
//         </style>
//
//         <div class="lightning-google-maps">
//             <img class="lightning-google-maps__placeholder-image" width="${this.width}" height="${this.height}" loading="lazy" src="https://placehold.it/${this.width}x${this.height}" alt="Google Maps Placeholder Image" />
//         </div>
//         `;
//     }
//
//     hidePlaceholderImage() {
//         this.shadowRoot.querySelector('.lightning-google-maps__placeholder-image').classList.add('lightning-google-maps__placeholder-image--hidden')
//     }
//
//     insertIframe() {
//         const container = this.shadowRoot.querySelector('.lightning-google-maps');
//
//         // add our own class to the iframe
//         this.iframe.classList.add('lightning-google-maps__iframe')
//
//         // ensure the iframe is the same dimensions as the placeholder image
//         this.iframe.width = this.width;
//         this.iframe.height = this.height;
//
//         // insert the iframe before the placeholder image so we can smoothly transition from the image to the iframe
//         container.prepend(this.iframe);
//
//         // we only need to insert the iframe once
//         this.removeEventListener('mouseover', this.insertIframe);
//     }
// }
//
// customElements.define('lightning-google-maps', LightningGoogleMaps);
