#!/bin/bash

# On crée les dossiers utiles s'ils n'existent pas
if [ ! -d /home/docker/html/geoportal-extensions/dist ]
then
    mkdir -p /home/docker/html/geoportal-extensions/dist
else 
    rm -rf /home/docker/html/geoportal-extensions/dist/*
fi
if [ ! -d /home/docker/html/geoportal-extensions/samples ]
then
    mkdir -p /home/docker/html/geoportal-extensions/samples
else 
    rm -rf /home/docker/html/geoportal-extensions/samples/*
fi
if [ ! -d /home/docker/html/geoportal-extensions/jsdoc ]
then
    mkdir -p /home/docker/html/geoportal-extensions/jsdoc
else 
    rm -rf /home/docker/html/geoportal-extensions/jsdoc/*
fi
if [ ! -d /home/docker/html/geoportal-extensions/package ]
then
    mkdir -p /home/docker/html/geoportal-extensions/package
else 
    rm -rf /home/docker/html/geoportal-extensions/package/*
fi
if [ ! -d /home/docker/html/geoportal-extensions/node_modules ]
then
    mkdir -p /home/docker/html/geoportal-extensions/node_modules
else 
    rm -rf /home/docker/html/geoportal-extensions/node_modules/*
fi

# on attend que les containers nginx et access-lib soient prêts
until [ -f /home/docker/html/geoportal-access-lib/package/geoportal-access-lib*.tgz ]; do
  >&2 echo "Access-lib package is unavailable - sleeping..."
  sleep 2
done
>&2 echo "Access-lib package is available !"

# Modification du package.json pour se baser sur la version d'access-lib qui est en local
sed -i 's/"\s*geoportal-access-lib\s*"\s*:\s*".*"/"geoportal-access-lib": "file:\/home\/docker\/html\/geoportal-access-lib\/package\/geoportal-access-lib-local.tgz"/g' package.json

# On build au cas où le code ait changé
pushd /home/docker/geoportal-extensions/
rm -rf node_modules package-lock.json && npm install
cp -r node_modules/* /home/docker/html/geoportal-extensions/node_modules/
npm run build
cp -rf ./dist/* /home/docker/html/geoportal-extensions/dist/
cp -rf ./samples/* /home/docker/html/geoportal-extensions/samples/
cp -rf ./jsdoc/* /home/docker/html/geoportal-extensions/jsdoc/
popd
pushd /home/docker/geoportal-extensions/build/scripts/release/
rm -rf ./geoportal-extensions*.tgz
bash build-pack.sh -a
cp ./geoportal-extensions-itowns*.tgz /home/docker/html/geoportal-extensions/package/geoportal-extensions-itowns-local.tgz
cp ./geoportal-extensions-leaflet*.tgz /home/docker/html/geoportal-extensions/package/geoportal-extensions-leaflet-local.tgz
cp ./geoportal-extensions-openlayers*.tgz /home/docker/html/geoportal-extensions/package/geoportal-extensions-openlayers-local.tgz
popd

# Observation des changements 
bash /home/docker/watchCommon.sh &
bash /home/docker/watchItowns.sh &
bash /home/docker/watchLeaflet.sh &
bash /home/docker/watchOl.sh &
bash /home/docker/watchSamples.sh &
bash /home/docker/watchAccessLib.sh &

# Lancement des serveurs pour les tests et observation des changements 
cd /home/docker/geoportal-extensions/ && npm run test:serve:docker 