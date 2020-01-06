# Lightning Components - Google Maps

Improve your websites page speed performance by replacing regular old `iframe` tags with `lightning-google-maps` tags.

## Features

- Lazy load google maps embed iframes that are not yet on screen to improve performance.
- Supports all attributes that would go on a basic `iframe` tag.
- It's just a vanilla web component, no frameworks to install.
- Will use the browser's built in native lazy loading if it supports it.

## Install

This component can be used as part of the entire lightning-components ecosystem or as a a standalone component.

###### Install with npm

```
npm install @lightning-components/google-maps
```

After installing, import it into your project.

```
import '@lightning-components/google-maps'
```

## Usage

As with all lightning-components, you simply replace the original tag with it's `lighting-tag` inspired counterpart.

So if this was the original `iframe` tag on your page:
```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42562.2757072101!2d-75.15273957606611!3d39.94151589949284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8830b04502f%3A0xce39e053fb81ef23!2sLiberty%20Bell!5e0!3m2!1sen!2sus!4v1574103352377!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
```
You would rewrite that as:
```html
<lightning-google-maps src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42562.2757072101!2d-75.15273957606611!3d39.94151589949284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6c8830b04502f%3A0xce39e053fb81ef23!2sLiberty%20Bell!5e0!3m2!1sen!2sus!4v1574103352377!5m2!1sen!2sus" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen=""></lightning-google-maps>
```

Keep all of the original attributes, classes, id's, etc. the same and just replace `iframe` with `lightning-google-maps`
