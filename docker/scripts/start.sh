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

# On build au cas où le code ait changé
pushd /home/docker/geoportal-extensions/
npm run build
cp -rf ./dist/* /home/docker/html/geoportal-access-lib/dist/
cp -rf ./samples/* /home/docker/html/geoportal-access-lib/samples/
cp -rf ./jsdoc/* /home/docker/html/geoportal-access-lib/jsdoc/
npm pack
cp *.tgz /home/docker/html/geoportal-access-lib/package/
popd

# Observation des changements 
bash /home/docker/watch.sh &

# Lancement des serveurs pour les tests et observation des changements 
cd /home/docker/geoportal-access-lib/ && npm run test:serve:docker &
cd /home/docker/geoportal-access-lib/ && npm run test:end-to-end:serve:docker 