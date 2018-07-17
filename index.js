var ExifImage = require('exif').ExifImage;
var dms2dec = require('dms2dec');
var turf = require('@turf/helpers');
const fs = require('fs');
const moment = require('moment');

function getExif(image) {
	return new Promise((resolve, reject) => {
		if (image.toLowerCase().indexOf('.jpg') === -1) {
			console.log(image)
			resolve();
			return;
		}
		try {
			new ExifImage({ image }, function (error, exifData) {
				if (error) {
					console.log('Error: '+error.message);
					console.log(image)
				} else {
					const { gps: { GPSLongitude, GPSLongitudeRef, GPSLatitude, GPSLatitudeRef, GPSDateStamp, GPSTimeStamp }, exif: { CreateDate}} = exifData;
					if (GPSLatitude && GPSLongitude) {
						const dec = dms2dec(GPSLongitude, GPSLongitudeRef, GPSLatitude, GPSLatitudeRef);
						
						const date = moment(GPSDateStamp + " " + GPSTimeStamp[0] + ":" + GPSTimeStamp[1] + ":" + GPSTimeStamp[2], "YYYY:MM:DD H:m:s")
						resolve({ image, dec, date: date});
					} else {
						resolve();
					}
				}
			});
		} catch (error) {
			console.log('Error: ' + error.message);
			conosle.error('./images/'+file);
			resolve();
		}
	});
}

fs.readdir('./images', (err, files) => {
	const promises = [];
	const points = files.reduce((result, file) => {
		const prom = getExif('./images/'+file);
		promises.push(prom);
	}, []);

	Promise.all(promises).then((points) => {
		points = points.filter(Boolean);

		linepoints = points.sort((pointa, pointb) => pointa.date > pointb.date ? 1 : -1).map((point) => point.dec);
		const line1 = turf.lineString(linepoints, {name: 'line 1'});
		
		const pins = points.map((point) => turf.point(point.dec, { "name": point.image, "date": point.date }))

		var features = turf.featureCollection([
			line1,
			// ...pins
		]);

		console.log(JSON.stringify(features));
	})
})
