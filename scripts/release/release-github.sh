#!/bin/bash

# TODO
# > tester l'authentification via token sur l'API gitHub...

# FIXME
# > basculer en authentification via SSH

# répertoire d'execution
_PWD=`pwd`

# version
_VERSION=0.0.1

# librairie par defaut
_PACKAGE_LIBRARY="leaflet"
_PACKAGE_LIBRARY_TARGET="leaflet"

# chemins des répertoires
_DIR_SCRIPTS="${_PWD}/scripts/release"
_DIR_DIST="${_PWD}/dist"

# chargement des properties
_PROPERTIES="${_DIR_SCRIPTS}/release.ini"
source ${_PROPERTIES}

# git
GIT_REPOSITORY_NAME=${_GIT_REPOSITORY_NAME}
GIT_TAG_NAME=${_GIT_TAG_NAME}
GIT_USER_NAME=${_GIT_USER_NAME} # surchargé par la config client !
GIT_USER_MAIL=${_GIT_USER_MAIL} # surchargé par la config client !
GIT_REPOSITORY_URL=""
GIT_OAUTH_TOKEN=${_GIT_OAUTH_TOKEN} # issue de l'env. sys
GIT_OAUTH_SSHKEY="non"

# github
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
        echo "    --build|b     Execution de la tache de compilation,"
        echo "    --tag|t       Execution de la tache de git-tag,"
        echo "    --publish|p   Execution de la tache de publication npm et bower,"
        echo "    --clean|C     Execution de la tache de nettoyage."
        echo "Ex. Options longues : `basename $0` --leaflet"
        echo "                  --build"
        echo "                  --tag=false --publish=false"
        echo "                  --clean=true"
        echo "Ex. Options courtes : `basename $0` -l"
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
         _PACKAGE_LIBRARY_TARGET="leaflet"
         shift ;;

    -o|--ol3)
          _PACKAGE_LIBRARY="openlayers"
          _PACKAGE_LIBRARY_TARGET="ol"
          shift ;;

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

# git : utilise le mail de l'utilisateur courant ?
_GIT_USER_MAIL=$(git config --get user.email)
if [ -n ${_GIT_USER_MAIL} ]; then
  printTo "Utilisation du 'email' de l'utilisateur courant (git config)"
  GIT_USER_MAIL=${_GIT_USER_MAIL}
fi

# git : compte de l'utilisateur courant ?
_GIT_USER_NAME=$(git config --get user.name)
if [ -n ${_GIT_USER_NAME} ]; then
  printTo "Utilisation du 'username' de l'utilisateur courant (git config)"
  GIT_USER_NAME=${_GIT_USER_NAME}
fi

# type d'authentification pour le github ?
if [ -n ${GIT_OAUTH_TOKEN} ]; then
  # si authentification via token, on passe en https
  _GIT_REPOSITORY_PREFIX="https://github.com/"
  printTo "L'authentification par token va être utilisée sur le dépôt gitHub."
else
  # utilisation du protocole ssh par defaut
  _GIT_REPOSITORY_PREFIX="git@github.com:"
  printTo "L'authentification par clef SSH va être utilisée sur le dépôt gitHub."
  GIT_OAUTH_SSHKEY="oui"
fi

# organisation ou compte utilisateur ?
GIT_REPOSITORY_USER_NAME=${GIT_USER_NAME}
if [ -n "${GIT_ORGANIZATION}" ]; then
  GIT_REPOSITORY_USER_NAME=${GIT_ORGANIZATION}
fi

# depot github
[ ${_PACKAGE_LIBRARY} == "leaflet" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_LEAFLET}
  GIT_REPOSITORY_URL="${_GIT_REPOSITORY_PREFIX}${GIT_REPOSITORY_USER_NAME}/${_GIT_REPOSITORY_NAME_LEAFLET}.git"
}

# depot github
[ ${_PACKAGE_LIBRARY} == "openlayers" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_OPENLAYERS}
  GIT_REPOSITORY_URL="${_GIT_REPOSITORY_PREFIX}${GIT_REPOSITORY_USER_NAME}/${_GIT_REPOSITORY_NAME_OPENLAYERS}.git"
}

##########
# main ()

info

printTo "BEGIN"

################################################################################
printTo "--> version..."

# date build
export _PACKAGE_BUILD=`date '+%d/%m/%y - %H:%M:%S'`
# version package
export _PACKAGE_VERSION_NAME="${_PACKAGE_LIBRARY_TARGET}ExtVersion"
export _PACKAGE_VERSION=$(cat package.json |
  perl -MJSON -0ne '
    my $DS = decode_json $_;
    my $field = $ENV{_PACKAGE_VERSION_NAME};
    print $DS->{$field};
  ')

if [ ${OPTS_RUN_BUILD} == true ]
then
  ################################################################################
  printTo "--> build..."

  doCmd "cd ${_PWD}"
  doCmd "npm run build:${_PACKAGE_LIBRARY_TARGET}" > /dev/null 2>&1
  doCmd "npm run build:${_PACKAGE_LIBRARY_TARGET}:prod" > /dev/null 2>&1
fi


if [ ${OPTS_RUN_TAG} == true ]
then
  ################################################################################
  printTo "--> tag"

  _PACKAGE_TAG=$(echo ${GIT_TAG_NAME} |
        sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
        sed -e "s@%library%@${_PACKAGE_LIBRARY}@g")

  doCmd "git tag ${_PACKAGE_TAG}"

  if [ -n ${GIT_OAUTH_TOKEN} ]; then
    GIT_REPOSITORY_URL=$(echo ${GIT_REPOSITORY_URL} | sed -e "s/github.com/${GIT_USER_NAME}:${GIT_OAUTH_TOKEN}@github.com/")
  fi

  doCmd "git push --repo ${GIT_REPOSITORY_URL}"

fi


if [ ${OPTS_RUN_PUBLISH} == true ]
then
  ################################################################################
  printTo "--> publish"

  doCmd "mkdir ${GIT_DIR_PUBLISH}"

  ##############################################################################
  printTo "--> >>> data"

  _CHANGELOG_FILE="CHANGELOG_DRAFT.md"

  [ -f "${_PWD}/${_CHANGELOG_FILE}" ] && {
    doCmd "cp ${_CHANGELOG_FILE} ${GIT_DIR_PUBLISH}/CHANGELOG.md"
  }

  ##############################################################################
  printTo "--> >>> sendData"

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

    # Stocker le resultat de la requête
    _REQUEST_RELEASE_RESPONSE=$(curl -u ${GIT_USER_NAME}:${GIT_OAUTH_TOKEN} -X POST -H \"Content-Type: application/json\" -d ${_REQUEST_RELEASE_DATA} ${_REQUEST_RELEASE_URL})

    # Recuperation de l'ID de creation de la release
    _REQUEST_RELEASE_ID=$(echo "${_REQUEST_RELEASE_RESPONSE}" |
      perl -MJSON -0ne '
        my $DS = decode_json $_;
        my $field = "id";
        print $DS->{$field};
      ')
  fi

  ##############################################################################
  printTo "--> >>> zip"

  _REQUEST_ZIP_NAME=""
  _REQUEST_ZIP_NAME+="GpPlugin"
  _REQUEST_ZIP_NAME+=${_PACKAGE_LIBRARY^}
  _REQUEST_ZIP_NAME+="-"
  _REQUEST_ZIP_NAME+=${_PACKAGE_VERSION}
  _REQUEST_ZIP_NAME+=".zip"

  [ -d "${_DIR_DIST}/${_PACKAGE_LIBRARY}" ] && {
    doCmd "zip -r ${GIT_DIR_PUBLISH}/${_REQUEST_ZIP_NAME} dist/${_PACKAGE_LIBRARY}"
  }

  ##############################################################################
  printTo "--> >>> sendZip"

  if [ -f ${_REQUEST_ZIP_NAME} ] && [ ${OPTS_RUN_TAG} == true ]
  then

    doCmd "cd ${GIT_DIR_PUBLISH}"

    # https://developer.github.com/v3/repos/releases/#upload-a-release-asset
    _REQUEST_UPLOAD_URL==$(echo "${GITHUB_API_URL}/${GITHUB_API_UPLOAD_RELEASE_URL}" |
        sed -e "s@%GIT_USER_NAME%@${GIT_USER_NAME}@g" |
        sed -e "s@%GIT_REPOSITORY_NAME%@${GIT_REPOSITORY_NAME}@g"|
        sed -e "s@%release_id%@${_REQUEST_RELEASE_ID}@g"|
        sed -e "s@%zip_name%@${_REQUEST_ZIP_NAME}@g")

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
