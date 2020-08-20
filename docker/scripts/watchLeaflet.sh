#!/bin/bash

# Initialisation 
old="0"

# Monitoring 
inotifywait -r -m -e modify -e create -e delete --timefmt '%Y-%m-%d %H:%M:%S' --format '%T %w %e' /home/docker/geoportal-extensions/src/Leaflet/ |
while read date time file event
do
  message=$date$time$file$event
  if [ $old != $message ]
  then 
    pushd /home/docker/geoportal-extensions/
    npm run build:leaflet
    cp -rf ./dist/* /home/docker/html/geoportal-extensions/dist/
    cp -rf ./samples/* /home/docker/html/geoportal-extensions/samples/
    cp -rf ./jsdoc/* /home/docker/html/geoportal-extensions/jsdoc/
    popd
    pushd /home/docker/geoportal-extensions/build/scripts/release/
    rm -rf ./geoportal-extensions-leaflet*.tgz
    bash build-pack.sh -l
    cp ./geoportal-extensions-leaflet*.tgz /home/docker/html/geoportal-extensions/package/geoportal-extensions-leaflet-local.tgz
    popd
    old=$message
  fi
done