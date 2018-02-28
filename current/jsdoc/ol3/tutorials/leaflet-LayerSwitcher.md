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
var layerSwitcher = L.geoportalControl.LayerSwitcher(opts);
map.addControl(layerSwitcher);
```

# Options

The control inherits options from [Leaflet Controls](http://leafletjs.com/reference.html#control).

Option      |  Type   |    Opt.   | Default    | Value
-|-|-|-|-|
collapsed   | Boolean | Optional | false     | Allows to control to expand the control
position    | String  | Optional | 'topleft' | Position of component into the map ([see leaflet options](http://leafletjs.com/reference.html#control-positions))
| String  | Optional | null    |
| Object  | Optional | {}      |
| Object  | Optional | {}      |
| Object  | Optional | {}      |
| Boolean | Optional | false   |
| Array   | Optional | []      |

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
<link rel="stylesheet" href="../dist/leaflet/GpPluginLeaflet<%- mode %>.css" />
<script src="../dist/leaflet/GpPluginLeaflet<%- mode %>.js" data-key="jhyvi0fgmnuxvfv0zjzorvdn"></script>

<!-- code -->
<script>
window.onload = function () {

  var wmts1 = L.geoportalLayer.WMTS({
    layer : "CADASTRALPARCELS.PARCELS",
  },
  {
    attribution : "layer1",
    opacity : 0.3
  });

  var wms = L.geoportalLayer.WMS({
    layer : "ORTHOIMAGERY.ORTHOPHOTOS",
  },
  {
    attribution : "layer2",
    opacity : 0.3
  });

  var wmts2 = L.geoportalLayer.WMTS({
    layer : "GEOGRAPHICALGRIDSYSTEMS.MAPS",
  },
  {
    attribution : "layer3",
    opacity : 0.3
  });

  var wmts3 = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      opacity : 0.5
  });

  var map  = L.map('map', {
    zoom : 2,
    center : L.latLng(48, 2),
    layers : [wmts1, wms, wmts2, wmts3]
  });

  var layers = [
    {
      layer : wmts3,
      display : true,
      config : {
         title : "Layer OSM WMTS",
         description : "OpenStreetMap",
         visibility : true,
         legends : [{
           minScaleDenominator: 1067,
           url: "http://localhost/"
         }],
         quicklookUrl : "http://localhost/"
      }
    }
  ];

  var layerSwitcher = L.geoportalControl.LayerSwitcher({layers : layers, collapsed : true, position : 'topright'});
  map.addControl(layerSwitcher);
}
</script>

<div id="map" style="height: 400px;"></div>
