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
        main_directory="geoportal-extensions-openlayers"
        src_directory="OpenLayers"
        export _PACKAGE_FIELD_NAME="olExtVersion"
    }
    [ ${name} == "leaflet" ] && {
        main_directory="geoportal-extensions-leaflet"
        src_directory="Leaflet"
        export _PACKAGE_FIELD_NAME="leafletExtVersion"
    }
    [ ${name} == "itowns" ] && {
        main_directory="geoportal-extensions-itowns"
        src_directory="Itowns"
        export _PACKAGE_FIELD_NAME="itownsExtVersion"
    }

    [ -z ${src_directory} ] && {
        printTo "Oups..."
        exit -1
    }

    # binaires
    printTo "> dist/..."
    doCmd "mkdir -p ./${main_directory}/dist/"
    doCmd "cp ../../../dist/${name}/*.js ./${main_directory}/dist/"
    doCmd "cp ../../../dist/${name}/*.css ./${main_directory}/dist/"

    # sources
    printTo "> src/..."
    doCmd "mkdir -p ./${main_directory}/src/"
    doCmd "cp -r ../../../src/Common/ ./${main_directory}/src/."
    doCmd "cp -r ../../../src/${src_directory}/ ./${main_directory}/src/."

    # lecture du package.json du projet
    # - version :
    export _PACKAGE_VERSION=$(cat ../../../package.json |
        perl -MJSON -0ne '
          my $DS = decode_json $_;
          my $field = $ENV{_PACKAGE_FIELD_NAME};
          print $DS->{$field};
        ')
    printTo "> package.json-version : ${_PACKAGE_VERSION}..."

    # - date
    export _PACKAGE_DATE=$(cat ../../../package.json |
        perl -MJSON -0ne '
          my $DS = decode_json $_;
          my $field = "date";
          print $DS->{$field};
        ')
    printTo "> package.json-date : ${_PACKAGE_DATE}..."

    # modification du package.json : version & date de publication
    `cat "package-${name}.json" |
        perl -MJSON -0ne '
        my $DS = decode_json $_;
        $DS->{version} = $ENV{_PACKAGE_VERSION};
        $DS->{date} = $ENV{_PACKAGE_DATE};
        print to_json($DS, {
          utf8 => 1,
          pretty => 1,
          indent => 1,
          space_before => 1,
          space_after => 1})
        ' > "./${main_directory}/package.json"`

    # sauvegarde du package.json
    printTo "> package.json..."
    doCmd "cp ./${main_directory}/package.json package-${name}.json"

    # README & LICENCE
    printTo "> resources..."
    doCmd "cp ../../../doc/README-${name}.md ./${main_directory}/README.md"
    doCmd "cp ../../../LICENCE.md ./${main_directory}/LICENCE.md"

    # npm pack
    printTo "> npm pack..."
    doCmd "cd ./${main_directory}"
    doCmd "npm pack"
    doCmd "cd .."
    doCmd "mv ./${main_directory}/*.tgz ."

    # clean
    if [ ${clean} == true ]
    then
        printTo "> clean..."
        doCmd "rm -rf ./${main_directory}/dist/ ./${main_directory}/src/"
        doCmd "rm ./${main_directory}/README.md"
        doCmd "rm ./${main_directory}/LICENCE.md"
        doCmd "rm ./${main_directory}/package.json"
        doCmd "rmdir ./${main_directory}/"
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
