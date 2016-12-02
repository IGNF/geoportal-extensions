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
var iso = L.geoportalControl.Isocurve(opts);
map.addControl(iso);
```

# Options

The control inherits options from [Leaflet Controls](http://leafletjs.com/reference.html#control).

Option      |  Type   |    Opt.   | Default    | Value
-|-|-|-|-|
collapsed   | Boolean | Optional | false     | Allows to control to expand the control
position    | String  | Optional | 'topleft' | Position of component into the map ([see leaflet options](http://leafletjs.com/reference.html#control-positions))
apiKey      | String  | Optional | null      | Key API for the use of services
graphs      | Array   | Optional | [Pieton, Voiture] | List of resources, by default : ["Voiture", "Pieton"], and the first element is selected.
exclusions  | Object  | Optional | {}        | List of exclusions with status
methods     | Array   | Optional | ["time", "distance"] | List of methods, by default : ["time", "distance"], and the first element is selected.
directions  | Array   | Optional | ["departure", "arrival"] | List ofdirections , by default : ["departure", "arrival"], and the first element is selected.
disableReverse | Boolean | Optional | false  | Allows to disable the reverse geocoding
isocurveOptions     | Object | Optional | {} | Options of isocurve service
autocompleteOptions | Object | Optional | {} | Options of autocomplete service

## Configuration of services

...


# Examples

## option control

``` javascript
var iso = L.geoportalControl.Isocurve({
  position : "topright",
  collapsed : false
});
map.addControl(iso);
```

## option graphs

``` javascript
var iso = L.geoportalControl.Isocurve({
  graphs : ["Voiture"]
});
map.addControl(iso);
```

## option directions

``` javascript
var iso = L.geoportalControl.Isocurve({
  directions : ["departure"]
});
map.addControl(iso);
```

## option methods

``` javascript
var iso = L.geoportalControl.Isocurve({
  methods : ["distance"]
});
map.addControl(iso);
```

## option exclusions

``` javascript
var iso = L.geoportalControl.Isocurve({
  exclusions = {
    tunnel : false,
    toll : false,
    bridge : false
  }
});
map.addControl(iso);
```

## option services

``` javascript
var iso = L.geoportalControl.Isocurve({
  isoCurveOptions = {
    // options de Gp.Services.isocurve()
  },
  autocompleteOptions = {
    // options de Gp.Services.autocomplete()
  }
});
map.addControl(iso);
```

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

  var iso = L.geoportalControl.Isocurve();

  map.addControl(iso);
}
</script>

<div id="map" style="height: 400px;"></div>
