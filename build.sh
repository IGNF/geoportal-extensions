#!/bin/bash

# Script de construction des bundles
# ./build.sh -a(all)
#     -o(openlayers)
#     -l(leaflet)
#     -i(itowns)
#     -I(ol/itowns)

# FIXME incompatibilité avec un env. Windows

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
# clean
function clean() {
    # pas de tests...
    printTo "####### CLEAN !"
    doCmd "rm -rf dist/$1"
    doCmd "rm -rf samples/$1"
    doCmd "rm -rf jsdoc/$1"
}

##########
# leaflet
function leaflet() {
  printTo "####### LEAFLET !"
  doCmd "npm run build:leaflet"
  printTo "####### LEAFLET production !"
  doCmd "npm run build:leaflet:prod"
}

##########
# ol
function ol() {
  printTo "####### OL !"
  doCmd "npm run build:ol"
  printTo "####### OL production !"
  doCmd "npm run build:ol:prod"
}

##########
# itowns
function itowns() {
  printTo "####### iTowns !"
  doCmd "npm run build:itowns"
  printTo "####### iTowns production !"
  doCmd "npm run build:itowns:prod"
}

##########
# mix itowns
function mix() {
  printTo "####### Mixte OL/iTowns !"
  doCmd "npm run build:mix"
  printTo "####### Mixte OL/iTowns production !"
  doCmd "npm run build:mix:prod"
}

printTo "###########  NPM  ##############"
doCmd "npm run setup"

printTo "########### BUILD : ############"
printTo "#### > geoportal-access-lib ####"
doCmd "cd ./node_modules/geoportal-access-lib/ && npm install && npm run build"
doCmd "cd ../.."

while getopts "aoliI" opts
do
   case $opts in
     o)
        printTo "#################################"
        printTo "###### OpenLayers bundle ! ######"
        clean "openlayers"
        ol
        ;;
     l)
        printTo "#################################"
        printTo "####### Leaflet bundle ! ########"
        clean "leaflet"
        leaflet
        ;;
     i)
        printTo "#############################"
        printTo "###### Itowns bundle ! ######"
        clean "itowns"
        itowns
        ;;
     I)
        printTo "###################################"
        printTo "###### Mixte Itowns bundle ! ######"
        mix
        ;;
     a)
        printTo "#################################"
        printTo "########## ALL bundle ! #########"
        clean "openlayers"
        ol
        clean "leaflet"
        leaflet
        clean "itowns"
        itowns
        mix
        ;;
     \?)
        printTo "$OPTARG : option invalide : a(all), o(openlayers), l(leaflet), i(itowns), I(ol/itowns) !"
        exit -1
        ;;
   esac
done

printTo "END"
exit 0
