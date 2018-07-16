var ExifImage = require('exif').ExifImage;
var dms2dec = require('dms2dec');
var turf = require('@turf/helpers');
const fs = require('fs');

function getExif(image) {
	return new Promise((resolve, reject) => {
		if (image.toLowerCase().indexOf('.JPG') === -1) {
			resolve();
		}
		try {
			new ExifImage({ image }, function (error, exifData) {
				if (error)
					console.log('Error: '+error.message);
				else {
					const { gps: { GPSLongitude, GPSLongitudeRef, GPSLatitude, GPSLatitudeRef }, exif: { CreateDate}} = exifData;
					if (GPSLatitude && GPSLongitude) {
						const dec = dms2dec(GPSLongitude, GPSLongitudeRef, GPSLatitude, GPSLatitudeRef);
						resolve({ dec, date: CreateDate});
					}
					resolve();
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
		// console.log(points)
		// .sort((pointa, pointb) => pointa.dec[1] > pointb.dec[1])
		points = points.filter(Boolean).map((point) => point.dec);
		const line1 = turf.lineString(points, {name: 'line 1'});
		console.log(JSON.stringify(line1));
	})
})
