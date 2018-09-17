# images-geodata-to-path
This node script will extract exif geo data from photos to create a path geoJSON path.

Perfect way to get geo data from images to Google Earth. Where you can get an estimate distance & elevation profile
![capture](https://user-images.githubusercontent.com/220755/42745203-0c81ebea-8897-11e8-85e4-d42365a9f5a4.PNG)

## Install

* Download [Node](https://nodejs.org/), I recommend using [nvm](https://github.com/creationix/nvm) if there is a chance you need multiple versions of node.
* Run open terminal and run `npm install`

## Run

* Add images with geo data to the `/images` directory
* Run `node index.js`
* Copy the output to [http://geojson.io](http://geojson.io).
* View / Download the KML file to open in Google Earth.

## Future
* Output KML file?
* `npx` support?
* Make into shell script?
* Prompts?
* Noise filtering (ignore points that are problaby impossible)

## Support on Beerpay
Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/TheBox193/images-geodata-to-path/badge.svg?style=beer-square)](https://beerpay.io/TheBox193/images-geodata-to-path)  [![Beerpay](https://beerpay.io/TheBox193/images-geodata-to-path/make-wish.svg?style=flat-square)](https://beerpay.io/TheBox193/images-geodata-to-path?focus=wish)