# Usage

Include js and css files located in the /dist/leaflet folder in your page :

``` javascript
<!-- Production -->
<link rel="stylesheet" href="dist/leaflet/GpPluginLeaflet.css" />
<script src="dist/leaflet/GpPluginLeaflet.js"></script>
```

``` javascript
<!-- Development -->
<link rel="stylesheet" href="src/leaflet/GpPluginLeaflet-src.css" />
<script src="src/leaflet/GpPluginLeaflet-src.js"></script>
```

And create a map in the 'viewer' div, add it to map :
``` javascript
var map = L.map('viewer').setView([48.845, 2.424], 15);
var searchEngine = L.geoportalControl.SearchEngine(opts);
map.addControl(searchEngine);
```

# Options

The control inherits options from [Leaflet Controls](http://leafletjs.com/reference.html#control).

Option      |  Type   |    Opt.   | Default    | Value
-|-|-|-|-|
collapsed   | Boolean | Optional | false     | Allows to control to expand the control
position    | String  | Optional | 'topleft' | Position of component into the map ([see leaflet options](http://leafletjs.com/reference.html#control-positions))
apiKey      | String  | Optional | null      | Key API for the use of services
advancedSearch | Object | Optional | {}      | Advanced search for geocoding (filters)
geocodeOptions | Object | Optional | {}      | Options of geocode service
autocompleteOptions | Object | Optional | {} | Options of autocomplete service
displayInfo | Boolean | Optional | false     | Get informations on popup marker
resources | Array  | Optional | []           | Resources geocoding

## Configuration of services

...

# Examples

## simple

...

## advanced

...

# Requirements

Leaflet v7.x and tested on version 1.0.0-RC

# Demo

<!-- Library Leaflet -->
<link rel="stylesheet" href="../lib/leaflet/leaflet.css" />
<script src="../lib/leaflet/leaflet.js"></script>

<!-- Plugin leaflet IGN -->
<link rel="stylesheet" href="../dist/leaflet/GpPluginLeaflet-src.css" />
<script src="../dist/leaflet/GpPluginLeaflet-src.js" data-key="jhyvi0fgmnuxvfv0zjzorvdn"></script>

<!-- code -->
<script>
window.onload = function () {

  var layer = L.geoportalLayer.WMS({
    layer : "ORTHOIMAGERY.ORTHOPHOTOS"
  });

  var map  = L.map('map', {
    zoom : 2,
    center : L.latLng(48, 2)
  });

  layer.addTo(map);

  var search = L.geoportalControl.SearchEngine();

  map.addControl(search);
}
</script>

<div id="map" style="height: 400px;"></div>
