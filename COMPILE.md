# Compilation du projet

## GULPFILE

### options de compilation

> gulp [--production] [--leaflet] [--ol3]

### compilation du projet

```
> gulp [--production] [--leaflet] [--ol3]
> gulp publish
> tree dist/
dist/
├── leaflet
│   ├── GpPluginLeaflet.css
│   ├── GpPluginLeaflet.js
│   ├── GpPluginLeaflet-src.css
│   ├── GpPluginLeaflet-src.js
│   └── img
│       ├── GPlayerInfoClose.png
│       ├── GPlayerInfo.png
│       ├── GPlayerTools.png
│       ├── GPopacitySlider.png
│       ├── GPshowLayersList.png
│       └── ...
└── ol3
    ├── GpPluginOl3.css
    ├── GpPluginOl3.js
    ├── GpPluginOl3-src.css
    ├── GpPluginOl3-src.js
    └── img
        ├── GPlayerInfoClose.png
        ├── GPlayerInfo.png
        ├── GPlayerTools.png
        ├── GPopacitySlider.png
        ├── GPshowLayersList.png
        └── ...
```

### 'target' principales de compilation du projet

La target par defaut : 'build'
> gulp
ou
> gulp build

La target pour la lib. ol3 : 'build-ol3'
> gulp build-ol3
ou
> gulp --ol3

La target pour la lib. leaflet : 'build-leaflet'
> gulp build-leaflet
ou
> gulp --leaflet

#### pour une execution séparée :

```
> gulp test
> gulp check
> gulp src
> gulp res
> gulp licence
puis
> gulp publish
```

Attention, par defaut, sans options, c'est la librarie 'Leaflet' qui est compilée.
'gulp test' est identique à 'gulp test --leaflet'

#### résumé :

les targets sont :
```
        build | dist | doc | sample | publish | help
          |
        clean
         _|_
build-ol3  build-leaflet
    |            |
   test         test
   check        check
   build-dist   build-dist
   build-doc    build-doc
   lib          lib
   build-sample build-sample
```
