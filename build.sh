#!/bin/bash

# Script de construction des bundles ainsi que de deploiement
# sur le serveur de sources
#  - TODO choix des bundles à construire
#  - TODO mise en place d'un "Build Number" unique et commune à tous les bundles
#         ex. fichier build.number avec un numéro qui est incrementé aprés chaque execution
#  - TODO gulp publish --build-number
#  - TODO gérer la publication des bundles sur le depot de sources (mercurial ou git)
#         hg commit -m "building bundles ${build.number}..."
#         hg outgoing | sed -n -e 3p  | cut -d: -f3 (ex. 944ed81fd2b6)
#         hg push

echo "BEGIN"

# leaflet
function leaflet() {
  echo "####### LEAFLET production !"
  gulp --production --leaflet
  gulp publish --leaflet
  echo "####### LEAFLET !"
  gulp --leaflet
  gulp publish --leaflet
}

# ol
function ol() {
  echo "####### OL production !"
  gulp --production --ol
  gulp publish --ol
  echo "####### OL !"
  gulp --ol
  gulp publish --ol
}

# vg
function vg() {
  echo "####### VG production !"
  gulp --vg
  gulp publish --vg
  echo "####### VG !"
  gulp --production --vg
  gulp publish --vg
}

# mix
function mix() {
  echo "####### Mixte OL/VG !"
  gulp --ol --vg --mix
  gulp publish --ol --vg --mix
  echo "####### Mixte OL/VG production !"
  gulp --production --ol --vg --mix
  gulp publish --ol --vg --mix
}

while getopts "aolvm" opts
do
   case $opts in
     o)
        echo "#################################"
        echo "###### OpenLayers bundle ! ######"
        ol
        ;;
     l)
        echo "#################################"
        echo "####### Leaflet bundle ! ########"
        leaflet
        ;;
     v)
        echo "#################################"
        echo "###### VirtualGeo bundle ! ######"
        vg
        ;;
     m)
        echo "#################################"
        echo "###### Mixte bundle ! ######"
        mix
        ;;
     a)
        echo "#################################"
        echo "########## ALL bundle ! #########"
        ol
        leaflet
        vg
        mix
        ;;
     \?)
        echo "$OPTARG : option invalide : a(all), o(openlayers), l(leaflet), v(virtualgeo) ou m(mix) !"
        exit -1
        ;;
   esac
done

echo "END"
exit 0
