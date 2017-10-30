#!/bin/bash

# TODO
# > impl. option --version=1.0.0 pour la publication (?)
# > tester l'authentification via token sur l'API gitHub...
# > cf. FIXME

# répertoire d'execution
_PWD=`pwd`

# version
_VERSION=0.0.1

# librairie par defaut
_PACKAGE_LIBRARY="leaflet"

# chemins des répertoires
_DIR_SCRIPTS="${_PWD}/scripts"
_DIR_DIST="${_PWD}/dist"

# chargement des properties
_PROPERTIES="${_DIR_SCRIPTS}/release.ini"
source ${_PROPERTIES}

# git
GIT_REPOSITORY_NAME=${_GIT_REPOSITORY_NAME}
GIT_TAG_NAME=${_GIT_TAG_NAME}
GIT_USER_NAME=${_GIT_USER_NAME}
GIT_REPOSITORY_URL="https://github.com/${GIT_USER_NAME}/${GIT_REPOSITORY_NAME}.git"
GIT_OAUTH_TOKEN=${_GIT_OAUTH_TOKEN}

GITHUB_API_URL=${_GITHUB_API_URL}
GITHUB_API_UPLOAD_RELEASE_URL=${_GITHUB_API_UPLOAD_RELEASE_URL}
GITHUB_API_CREATE_RELEASE_URL=${_GITHUB_API_CREATE_RELEASE_URL}
GITHUB_API_CREATE_RELEASE_DATA=${_GITHUB_API_CREATE_RELEASE_DATA}

# options
#   --leaflet |l
#   --build |b, --tag |t, --publish |p, --clean |C
OPTS_RUN_BUILD=${_OPTS_RUN_BUILD}
OPTS_RUN_TAG=${_OPTS_RUN_TAG}
OPTS_RUN_PUBLISH=${_OPTS_RUN_PUBLISH}
OPTS_RUN_CLEAN=${_OPTS_RUN_CLEAN}

# parse options
OPTS_VERBOSE=${_OPTS_VERBOSE}

while true; do
  case "$1" in

    -h|--help)
        echo "Usage :"
        echo "    `basename $0` "
        echo "    -h            Affiche cette aide."
        echo "    --verbose     Mode verbose,"
        echo "    --leaflet|l   Publication Leaflet (par defaut),"
        echo "    --ol3|o       Publication Openlayers,"
        echo "    --version|v   [TODO] Numero de version du package à publier,"
        echo "    --build|b     Execution de la tache de compilation,"
        echo "    --tag|t       Execution de la tache de git-tag,"
        echo "    --publish|p   Execution de la tache de publication npm et bower,"
        echo "    --clean|C     Execution de la tache de nettoyage."
        echo "Ex. Options longues : `basename $0` --leaflet --version='1.0.0-test'"
        echo "                  --build"
        echo "                  --tag=false --publish=false"
        echo "                  --clean=true"
        echo "Ex. Options courtes : `basename $0` -l -v '1.0.0-test'"
        echo "                  -b"
        echo "                  -t false -p false"
        echo "                  -C true"
        exit 0 ;;

    --verbose)
        OPTS_VERBOSE=true
        shift ;;

    -l|--leaflet)
         # par defaut...
         _PACKAGE_LIBRARY="leaflet"
         shift ;;

    -o|--ol3)
          _PACKAGE_LIBRARY="ol3"
          shift ;;

    # TODO
    # -v|--version)
    #     # on surcharge la version du package !
    #     # par defaut, elle est extraite du fichier package.json...
    #     case "$2" in
    #       "") shift 2 ;;
    #       *) _PACKAGE_VERSION=$2 ; shift 2 ;;
    #     esac ;;

    -b|--build)
        case "$2" in
          "") OPTS_RUN_BUILD=true ; shift 2 ;;
          *) OPTS_RUN_BUILD=$2 ; shift 2 ;;
        esac ;;

    -y|--tag)
        case "$2" in
          "") OPTS_RUN_TAG=true ; shift 2 ;;
          *) OPTS_RUN_TAG=$2 ; shift 2 ;;
        esac ;;

    -p|--publish)
        case "$2" in
          "") OPTS_RUN_PUBLISH=true ; shift 2 ;;
          *) OPTS_RUN_PUBLISH=$2 ; shift 2 ;;
        esac ;;

    -C|--clean)
        case "$2" in
          "") OPTS_RUN_CLEAN=true ; shift 2 ;;
          *) OPTS_RUN_CLEAN=$2 ; shift 2 ;;
        esac ;;

    --)
        shift
        break ;;

    *)
        echo "Invalid Option: -$OPTARG" 1>&2
        exit 1 ;;
  esac
done

# authentification github
[ ${_PACKAGE_LIBRARY} == "leaflet" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_LEAFLET}
}

# authentification github
[ ${_PACKAGE_LIBRARY} == "ol3" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_OPENLAYERS}
}

[ ${OPTS_VERBOSE} == true ] && {
  set -x
}

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
`basename $0`, version ${_VERSION}
----------------------------------------------------------
--> Publication des releases sur le GitHub pour ${_PACKAGE_LIBRARY} <--
-- Configuration : ${_PROPERTIES}
-- Parametres : ...
--    build   : ${OPTS_RUN_BUILD}
--    tag     : ${OPTS_RUN_TAG}
--    publish : ${OPTS_RUN_PUBLISH}
--    clean   : ${OPTS_RUN_CLEAN}
-- Information   : ...
--    depot GitHub : ${GIT_REPOSITORY_URL}
--    user GitHub  : ${GIT_USER_NAME}
--    token GitHub : ${GIT_OAUTH_TOKEN}
----------------------------------------------------------

EOF
}

##########
# main ()

info

printTo "BEGIN"

################################################################################
printTo "--> build..."

# date build
export _PACKAGE_BUILD=`date '+%d/%m/%y - %H:%M:%S'`
# version package
export _PACKAGE_VERSION_NAME="${_PACKAGE_LIBRARY}ExtVersion"
export _PACKAGE_VERSION=$(cat package.json |
  perl -MJSON -0ne '
    my $DS = decode_json $_;
    my $field = $ENV{_PACKAGE_VERSION_NAME};
    print $DS->{$field};
  ')

if [ ${OPTS_RUN_BUILD} == true ]
then
  doCmd "cd ${_PWD}"
  doCmd "gulp --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp --production --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
fi

################################################################################
printTo "--> tag"

if [ ${OPTS_RUN_TAG} == true ]
then

  _PACKAGE_TAG=$(echo ${GIT_TAG_NAME} |
        sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
        sed -e "s@%library%@${_PACKAGE_LIBRARY}@g")

  doCmd "git tag ${_PACKAGE_TAG}"


  if [ -n ${GIT_OAUTH_TOKEN} ]; then
    GIT_REPOSITORY_URL=$(echo ${GIT_REPOSITORY_URL} | sed -e "s/github.com/${GIT_USER_NAME}:${GIT_OAUTH_TOKEN}@github.com/")
  fi

  doCmd "git push --repo ${GIT_REPOSITORY_URL}"

fi

################################################################################
printTo "--> TODO : publish"

if [ ${OPTS_RUN_PUBLISH} == true ]
then

  ##############################################################################
  printTo "--> create"

  doCmd "mkdir ${GIT_DIR_PUBLISH}"

  ##############################################################################
  printTo "--> data"

  _CHANGELOG_FILE="CHANGELOG_DRAFT.md"

  [ -f "${_PWD}/${_CHANGELOG_FILE}" ] && {
    doCmd "cp ${_CHANGELOG_FILE} ${GIT_DIR_PUBLISH}/CHANGELOG.md"
  }

  ##############################################################################
  printTo "--> TODO : sendData"

  _CHANGELOG_CONTENT=`cat ${GIT_DIR_PUBLISH}/CHANGELOG.md`

  if [ -n "${_CHANGELOG_CONTENT}" ] && [ ${OPTS_RUN_TAG} == true ]
  then

    # https://developer.github.com/v3/repos/releases/#create-a-release
    _REQUEST_RELEASE_URL=$(echo "${GITHUB_API_URL}/${GITHUB_API_CREATE_RELEASE_URL}" |
        sed -e "s@%GIT_USER_NAME%@${GIT_USER_NAME}@g" |
        sed -e "s@%GIT_REPOSITORY_NAME%@${GIT_REPOSITORY_NAME}@g")

    _REQUEST_RELEASE_DATA=$(echo "${GITHUB_API_CREATE_RELEASE_DATA}" |
        sed -e "s@%tag_name%@${_PACKAGE_TAG}@g" |
        sed -e "s@%content%@${_CHANGELOG_CONTENT}@g")

    # FIXME
    # Stocker le resultat de la requête dans la variable _RELEASE_ID !
    doCmd "curl -u ${GIT_USER_NAME}:${GIT_OAUTH_TOKEN} -X POST -H \"Content-Type: application/json\" -d ${_REQUEST_RELEASE_DATA} ${_REQUEST_RELEASE_URL}"
  fi

  ##############################################################################
  printTo "--> zip"

  _ZIP_NAME=""
  _ZIP_NAME+="GpPlugin"
  _ZIP_NAME+=${_PACKAGE_LIBRARY^}
  _ZIP_NAME+="-"
  _ZIP_NAME+=${_PACKAGE_VERSION}
  _ZIP_NAME+=".zip"

  [ -d "${_DIR_DIST}/${_PACKAGE_LIBRARY}" ] && {
    doCmd "zip -r ${GIT_DIR_PUBLISH}/${_ZIP_NAME} dist/${_PACKAGE_LIBRARY}"
  }

  ##############################################################################
  printTo "--> TODO : sendZip"

  if [ -f ${_ZIP_NAME} ] && [ ${OPTS_RUN_TAG} == true ]
  then

    # FIXME
    # '_RELEASE_ID' issu de la requete de creation de la release est à mettre en
    # parametre !

    doCmd "cd ${GIT_DIR_PUBLISH}"

    # https://developer.github.com/v3/repos/releases/#upload-a-release-asset
    _REQUEST_UPLOAD_URL==$(echo "${GITHUB_API_URL}/${GITHUB_API_UPLOAD_RELEASE_URL}" |
        sed -e "s@%GIT_USER_NAME%@${GIT_USER_NAME}@g" |
        sed -e "s@%GIT_REPOSITORY_NAME%@${GIT_REPOSITORY_NAME}@g"|
        sed -e "s@%release_id%@${_RELEASE_ID}@g"|
        sed -e "s@%zip_name%@${_ZIP_NAME}@g")

    doCmd "curl -u ${GIT_USER_NAME}:${GIT_OAUTH_TOKEN} -X POST -H \"Content-Type: application/zip\" ${_REQUEST_UPLOAD_URL}"
  fi

fi

################################################################################
printTo "--> clean"

if [ ${OPTS_RUN_CLEAN} == true ]
then
  doCmd "cd ${_PWD}"
  doCmd "rm -rf ${GIT_DIR_PUBLISH}"
fi

printTo "END"

[ ${OPTS_VERBOSE} == true ] && {
  set +x
}

exit 0
