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
var mousePoistion = L.geoportalControl.MousePosition(opts);
map.addControl(mousePoistion);
```

# Options

The control inherits options from [Leaflet Controls](http://leafletjs.com/reference.html#control).

Option      |  Type   |    Opt.   | Default    | Value
-|-|-|-|-|
collapsed   | Boolean | Optional | false     | Allows to control to expand the control
position    | String  | Optional | 'bottomleft' | Position of the control on the map ([see leaflet options](http://leafletjs.com/reference.html#control-positions))
apiKey      | String  | Optional | null      | Key API for the use of services
systems     | Array   | Optional | [...]     | list of projection systems, by default, all systems
units       | Array   | Optional | [...]     | list of units, by default, all units
displayAltitude| Boolean | Optional | true     | Desactivate/activate the altitude panel, if desactivate, so have just the coordinate panel
displayCoordinates| Boolean | Optional | true     | Desactivate/activate the coordinate panel, if desactivate, so have just the altitude panel
altitude    | Object  | Optional | {}        | Options elevation calculation service

## Configuration of elevation calculation service

Option      |  Type   |    Opt.   | Default    | Value
-|-|-|-|-|
triggerDelay  | Number | Optional  | 500       | latency for altitude request
responseDelay | Number | Optional  | 200       | immobilisation time of movement on the map to trigger the elevation calculation
serviceOptions  | Object  | Optional | {}      | options of elevation service

The elevation calculation service can be configured :

``` javascript
altitude : {
    responseDelay : 200,
    triggerDelay : 500,
    serviceOptions : {
      protocol : XHR,
      httpMethod : "GET",
      apiKey : "fjfz8rg7r89t45t4er8t7g84er56g486t",
      api : 'REST'
    }
}
```

For details, see the description page :
- [altitude](./../bibacces/dd_services_altimetrie.html)

The control retrieves an altitude.
So by default, the 'zonly is always configured.

We can see that the property 'apiKey' is also at the level of service options.
You should know that the key service always overload the control.
It's the same with autoload service.

## Configuration of systems

...

# Examples

## simple

The autoload service is loaded.
Verification of resource rights is done.

It changes the position of control, expanded.

``` javascript
var mousePoistion  = L.geoportalControl.MousePosition({
    position : 'bottomright',
    collapsed : true
});
```

## advanced

The autoload service is not loaded!
No verification of rights is possible.
It's the responsibility of the user to manage his rights over the resource.

An API key is added in control :

``` javascript
var mousePoistion = L.geoportalControl.MousePosition({
    apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
});
```

It is also possible to enter the API key via the configuration of services.

``` javascript
var mousePoistion = L.geoportalControl.MousePosition({
    altitudeOptions : {
        apiKey : "far4ze5t4z56t4z65t4ert465zr6z"
    }
});
```
## advanced with units and systems

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

  var layer = L.geoportalLayer.WMS({
    layer : "ORTHOIMAGERY.ORTHOPHOTOS"
  });

  var map  = L.map('map', {
    zoom : 2,
    center : L.latLng(48, 2)
  });

  layer.addTo(map);

  var mouse = L.geoportalControl.MousePosition();

  map.addControl(mouse);
}
</script>

<div id="map" style="height: 400px;"></div>
