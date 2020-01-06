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

        connectedCallback() {
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            this.upgradeProperty('src');
            this.upgradeProperty('disableNativeLazyloading');

            // store a reference to the actual iframe that will eventually be loaded
            this.iframe = this.getIframeElementToBeInserted();

            // if the browser supports native lazy loading, then immediately insert the iframe.
            // otherwise, setup an observer that will load the iframe when the page is scrolled to it
            this.supportsNativeLazyLoading() ?
                this.insertIframe() :
                this.setupObserver();
        }

        template() {
            const cloned = template.content.cloneNode(true);

            return cloned;
        }

        getIframeElementToBeInserted() {
            // get the current lightning-google-maps element and replace
            // it with iframe, and we should have a valid google maps embed iframe
            const template = document.createElement('template');
            template.innerHTML = replaceTag(this);
            const iframe = template.content.firstChild;

            if (this.supportsNativeLazyLoading()) {
                // for browsers that support native lazy loading, return the true iframe tag
                // with the real src but ensure it has the loading=lazy attribute
                iframe.loading = 'lazy';
            }

            // add our own class to the iframe
            iframe.classList.add('lightning-google-maps__iframe')

            return iframe;
        }

        supportsNativeLazyLoading() {
            return !this.disableNativeLazyloading && 'loading' in HTMLImageElement.prototype;
        }

        setupObserver() {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.insertIframe();

                        observer.unobserve(this);
                    }
                })
            }, { rootMargin: '0px' });

            observer.observe(this);
        }


        insertIframe() {
            const container = this.shadowRoot.querySelector('.lightning-google-maps');
            // clear all contents
            container.innerHTML = '';
            // insert the iframe into the shadow DOM
            container.appendChild(this.iframe);
        }

        upgradeProperty(prop) {
            if (this.hasOwnProperty(prop)) {
                let value = this[prop];
                delete this[prop];
                this[prop] = value;
            }
        }

        /**
         * Ensure src property is reflected to an attribute.
         * https://developers.google.com/web/fundamentals/web-components/customelements#properties_and_attributes
         */
        set src(value) {
            if (!value) {
                this.removeAttribute('src');

                return;
            }

            this.setAttribute('src', value);
        }

        get src() {
            return this.getAttribute('src');
        }

        set disableNativeLazyloading(value) {
            if (!value) {
                this.removeAttribute('disable-native-lazyloading');

                return;
            }

            this.setAttribute('disable-native-lazyloading', value);
        }

        get disableNativeLazyloading() {
            return this.hasAttribute('disable-native-lazyloading') && this.getAttribute('disable-native-lazyloading') !== 'false';
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
