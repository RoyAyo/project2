//const key = "QDNBJNIZRYOQ";
const key = "5e84417f343f4732adf220630192311";
const gkey = "0dbb0bd1e6ac4be09b4b2b65a221bcc8";

document.getElementById('sub').onclick = () => {
	const loc = encodeURIComponent(document.getElementById('search').value);

	document.getElementById('loader').style.display = "block";

	getTimeZone(loc).catch(error => {
		document.getElementById('loader').style.display = "none";
		window.alert("incorrect location inputted");
	});;
}

async function getTimeZone(loc) {
	const r = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${gkey}&q=${loc}`);
	const res = await r.json();

	lat = res.results[0].geometry.lat;
	lng = res.results[0].geometry.lng;

	mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvcm95IiwiYSI6ImNrMzk3bDNmMzBleWczaG5jYTMya2JrMDUifQ.Kqmo1lWYwAHdfb8koCzgTw';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v10',
		center: [lng, lat],
		zoom: 7,
	})

	
	getLocation(loc).then(res => {
		document.getElementById('loader').style.display = "none";
		document.getElementById('time').innerHTML = res;
	}).catch(error => {
		document.getElementById('loader').style.display = "none";
		window.alert("Location cannot be accessed Presently");
	});
}

async function getLocation(loc){
	//const res = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${lat}&lng=${lng}`);
	const res = await fetch(`http://api.worldweatheronline.com/premium/v1/tz.ashx?q=${loc}&format=json&key=${key}`);

	const result = await res.json();

	return result.data.time_zone[0].localtime;
	}