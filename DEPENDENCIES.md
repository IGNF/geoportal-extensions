# DEPENDENCIES (12/10/2017)

* openlayers

└─┬ ol@4.4.1
  ├─┬ pbf@3.1.0
  │ ├── ieee754@1.1.8
  │ └─┬ resolve-protobuf-schema@2.0.0
  │   └── protocol-buffers-schema@2.2.0
  ├── pixelworks@1.1.0
  └─┬ rbush@2.0.1
    └── quickselect@1.0.0

> **FIXME**
Les binaires ne sont pas presents sur le npm !?
On utilise **bower** afin d'obtenir le projet, et on le compile :
```
> bower install --save openlayers
> cd bower_components/openlayers
> make build
> ls build/
    ol.css  
    ol-debug.js  
    ol.js
    ol.js.map

```

* proj4

last
└─┬ proj4@2.4.4
  ├── mgrs@1.0.0
  └── wkt-parser@1.2.0

> **FIXME**
BUG avec proj4leaflet pour leaflet !?

├─┬ proj4@2.2.1
│ └── mgrs@0.0.0
└─┬ proj4leaflet@1.0.1
  └─┬ proj4@2.4.4
    ├── mgrs@1.0.0
    └── wkt-parser@1.2.0

* proj4leaflet

last
└── proj4leaflet@1.0.2

> **FIXME**
BUG avec proj4 pour leaflet !?

└── proj4leaflet@1.0.1

* Sortable

└── sortablejs@1.6.1

* woodman

- node-fs@0.1.7
- base64id@0.1.0
- policyfile@0.0.4
- redis@0.7.3
- zeparser@0.0.5
- active-x-obfuscator@0.0.1
- uglify-js@1.2.5
- commander@2.1.0
- nan@1.0.0
- options@0.0.6
- tinycolor@0.0.1
- ws@0.4.32
- xmlhttprequest@1.4.2
- socket.io-client@0.9.16
- socket.io@0.9.16
└─┬ woodman@1.1.0
  └── esprima@1.0.4

* geoportal-access-lib

└── geoportal-access-lib@1.0.1

* leaflet

└── leaflet@1.2.0

* leaflet-draw

└── leaflet-draw@0.4.12

* requirejs

└── requirejs@2.3.5
