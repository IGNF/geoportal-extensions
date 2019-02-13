#!/bin/bash

# -- option de nettoyage du répertoire
# par defaut, on ne le nettoie pas...
clean=false

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
# build()

build () {
    name=$1

    [ ${name} == "openlayers" ] && {
        directory="OpenLayers"
    }
    [ ${name} == "leaflet" ] && {
        directory="Leaflet"
    }
    [ ${name} == "itowns" ] && {
        directory="Itowns"
    }

    [ -z ${directory} ] && {
        printTo "Oups..."
        exit -1
    }

    # binaires
    printTo "> dist/..."
    doCmd "mkdir -p ./${name}/dist/"
    doCmd "cp ../../../dist/${name}/*.js ./${name}/dist/"
    doCmd "cp ../../../dist/${name}/*.css ./${name}/dist/"

    # sources
    printTo "> src/..."
    doCmd "mkdir -p ./${name}/src/"
    doCmd "cp -r ../../../src/Common/ ./${name}/src/."
    doCmd "cp -r ../../../src/${directory}/ ./${name}/src/."

    # README & LICENCE & package.json
    printTo "> resources..."
    doCmd "cp ../../../doc/README-${name}.md ./${name}/README.md"
    doCmd "cp ../../../LICENCE.md ./${name}/LICENCE.md"
    doCmd "cp package-${name}.json ./${name}/package.json"

    # npm pack
    printTo "> npm pack..."
    doCmd "cd ./${name}"
    doCmd "npm pack"
    doCmd "cd .."
    doCmd "mv ./${name}/*.tgz ."

    # clean
    if [ ${clean} == true ]
    then
        printTo "> clean..."
        doCmd "rm -rf ./${name}/dist/ ./${name}/src/"
        doCmd "rm ./${name}/README.md ./${name}/LICENCE.md ./${name}/package.json"
        doCmd "rmdir ./${name}/"
    fi
}

################################################################################
# MAIN
################################################################################
printTo "BEGIN"

opts=`getopt -o halio --long help,all,leaflet,itowns,openlayers -n 'build-pack.sh' -- "$@"`
eval set -- "${opts}"

while true; do
    case "$1" in
        -h|--help)
            echo "Usage :"
            echo "    `basename $0` - construction du package TGZ à publier dans NPM"
            echo "    -h            Affiche cette aide."
            echo "    -o            build : Openlayers,"
            echo "    -l            build : Leaflet,"
            echo "    -i            build : Itowns,"
            echo "    -a            build : All."
            echo "Par defaut, le repertoire n'est pas supprimé"
            echo "(cf. l'option 'clean=true' dans le code)."
            echo "Le package validé, on se place dans le répertoire pour la publication :"
            echo "  > npm login"
            echo "  > npm publish"
            exit 0
            ;;

        -o|--openlayers)
            printTo "> Build openlayers"
            build "openlayers"
            shift ;;

        -l|--leaflet)
            printTo "> Build leaflet"
            build "leaflet"
            shift ;;

        -i|--itowns)
            printTo "> Build itowns"
            build "itowns"
            shift ;;

        -a|--all)
            printTo "> Build all !"
            build "openlayers"
            build "leaflet"
            build "itowns"
            shift ;;

        --)
            shift
            break
            ;;

        \?)
            printTo "$OPTARG : option invalide : a(all), o(openlayers), l(leaflet), i(itowns) !"
            exit -1
            ;;
   esac
done

printTo "END"
exit 0
