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

gulp --production --leaflet
gulp publish

gulp --leaflet
gulp publish

# ol3

gulp --production --ol3
gulp publish

gulp --ol3
gulp publish

# vg
gulp --vg
gulp publish

gulp --production --vg
gulp publish

echo "END"
