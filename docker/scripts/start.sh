#!/bin/bash

# On crée les dossiers utiles s'ils n'existent pas
if [ ! -d /home/docker/html/geoportal-extensions/dist ]
then
    mkdir -p /home/docker/html/geoportal-extensions/dist
fi
if [ ! -d /home/docker/html/geoportal-extensions/samples ]
then
    mkdir -p /home/docker/html/geoportal-extensions/samples
fi
if [ ! -d /home/docker/html/geoportal-extensions/jsdoc ]
then
    mkdir -p /home/docker/html/geoportal-extensions/jsdoc
fi
if [ ! -d /home/docker/html/geoportal-extensions/package ]
then
    mkdir -p /home/docker/html/geoportal-extensions/package
fi
if [ ! -d /home/docker/html/geoportal-extensions/node_modules ]
then
    mkdir -p /home/docker/html/geoportal-extensions/node_modules
    pushd /home/docker/geoportal-extensions/
    cp -r node_modules/* /home/docker/html/geoportal-extensions/node_modules/
    popd
fi

# On build au cas où le code ait changé
pushd /home/docker/geoportal-extensions/
npm run build
cp -rf ./dist/* /home/docker/html/geoportal-extensions/dist/
cp -rf ./samples/* /home/docker/html/geoportal-extensions/samples/
cp -rf ./jsdoc/* /home/docker/html/geoportal-extensions/jsdoc/
npm pack
cp *.tgz /home/docker/html/geoportal-extensions/package/
popd

# Observation des changements 
# bash /home/docker/watch.sh &

# Lancement des serveurs pour les tests et observation des changements 
cd /home/docker/geoportal-extensions/ && npm run test:serve:docker 