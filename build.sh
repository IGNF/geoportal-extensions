#!/bin/bash

# Script de construction des bundles
# ./build.sh -a(all)
#     -o(openlayers)
#     -l(leaflet)
#     -i(itowns)
#     -I(ol/itowns)

# TODO
#   - gulp est une commande globale !
#     > npm install --global gulp

##########
# doCmd()

doCmd () {
    cmd2issue=$1
    eval ${cmd2issue}
    retour=$?
    if [ $retour -ne 0 ] ; then
        printTo "Erreur d'execution (code:${retour}) !..."
        exit 100
    fi
}

##########
# printTo()

printTo () {
    text=$1
    d=`date`
    echo "[${d}] ${text}"
}

printTo "BEGIN"

##########
# leaflet
function leaflet() {
  printTo "####### LEAFLET production !"
  doCmd "gulp build --production --leaflet"
  doCmd "gulp publish --leaflet"
  printTo "####### LEAFLET !"
  doCmd "gulp build --leaflet"
  doCmd "gulp publish --leaflet"
}

##########
# ol3
function ol3() {
  printTo "####### OL production !"
  doCmd "gulp build --production --ol3"
  doCmd "gulp publish --ol3"
  printTo "####### OL !"
  doCmd "gulp build --ol3"
  doCmd "gulp publish --ol3"
}

##########
# itowns
function itowns() {
  printTo "####### iTowns production !"
  doCmd "gulp build --itowns"
  doCmd "gulp publish --itowns"
  printTo "####### iTowns !"
  doCmd "gulp build --production --itowns"
  doCmd "gulp publish --itowns"
}

##########
# mix itowns
function mixIt() {
  printTo "####### Mixte OL/iTowns !"
  doCmd "gulp build --ol3 --itowns --mix"
  doCmd "gulp publish --ol3 --itowns --mix"
  printTo "####### Mixte OL/iTowns production !"
  doCmd "gulp build --production --ol3 --itowns --mix"
  doCmd "gulp publish --ol3 --itowns --mix"
}

##########
# build docker
function docker() {
  printTo "####### Build Docker !"
  doCmd "docker build -t geoportal-extensions ."
  printTo "####### Run Docker !"
  doCmd "docker run -it --rm geoportal-extensions"
}

doCmd "npm install"
doCmd "gulp clean"

while getopts "daoliI" opts
do
   case $opts in
     d)
        printTo "#################################"
        printTo "########### DOCKER ! ###########"
        docker
        ;;
     o)
        printTo "#################################"
        printTo "###### OpenLayers bundle ! ######"
        ol3
        ;;
     l)
        printTo "#################################"
        printTo "####### Leaflet bundle ! ########"
        leaflet
        ;;
     i)
        printTo "#############################"
        printTo "###### Itowns bundle ! ######"
        itowns
        ;;
     I)
        printTo "###################################"
        printTo "###### Mixte Itowns bundle ! ######"
        mixIt
        ;;
     a)
        printTo "#################################"
        printTo "########## ALL bundle ! #########"
        ol3
        leaflet
        itowns
        mixIt
        ;;
     \?)
        printTo "$OPTARG : option invalide : a(all), o(openlayers), l(leaflet), i(itowns), I(ol/itowns) !"
        exit -1
        ;;
   esac
done

printTo "END"
exit 0
