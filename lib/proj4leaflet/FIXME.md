Pour une raison obscure,
j'ai dû commenter une partie de l'entête de "Browserification" :

```
(function (factory) {
	// var L, proj4; <---- FIXME ----->
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['leaflet', 'proj4'], factory);
	} else if (typeof module === 'object' && typeof module.exports === "object") {
		// Node/CommonJS
		L = require('leaflet');
		proj4 = require('proj4');
		module.exports = factory(L, proj4);
	} else {
		// Browser globals
		if (typeof window.L === 'undefined' || typeof window.proj4 === 'undefined')
			throw 'Leaflet and proj4 must be loaded first';
		factory(window.L, window.proj4);
	}
}(function (L, proj4) {
  ...
});
```

Sans cette modification, la variable globale **proj4** est indefinie... 
