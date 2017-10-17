#!/bin/bash

set -x

# version
VERSION=0.0.1

# chargement des properties
PROPERTIES="release.ini"
source ${PROPERTIES}

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

##########
# info()

info () {
    cat >&2 <<EOF

----------------------------------------------------------
`basename $0`, version ${VERSION}
----------------------------------------------------------
--> Publication des releases sur le GitHub <--
-- Configuration : ${PROPERTIES}
-- Information   : ...
----------------------------------------------------------

EOF
}

##########
# main ()

info

printTo "BEGIN"
printTo "--> build"
printTo "--> json"
printTo "--> data"
printTo "--> tag"
printTo "--> info"
printTo "--> publish"
printTo "END"

set +x

exit 0
