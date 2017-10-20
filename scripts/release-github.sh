#!/bin/bash

# répertoire d'execution
_PWD=`pwd`

# version
_VERSION=0.0.1

# librairie par defaut
_LIBRARY="leaflet"

# options
#   --leaflet |l
#   (--debug )
#   --build |b, --tag |t, --publish |p, --clean |C
_OPTS_RUN_BUILD=false
_OPTS_RUN_TAG=false
_OPTS_RUN_PUBLISH=false
_OPTS_RUN_CLEAN=false

# parse options
_OPTS_VERBOSE=false

while getopts "hvlobtpC" opt; do
  case ${opt} in
    h|help )
      echo "Usage :"
      echo "    `basename $0` -h    Affiche cette aide."
      echo "    v (--verbose)     mode verbose,"
      echo "    l (--leaflet)     Execution de la publication Leaflet (par defaut),"
      echo "    o (--ol3)         Execution de la publication Openlayers,"
      echo "    b (--run-build)   Execution de la tache de compilation,"
      echo "    t (--run-tag)     Execution de la tache de git-tag,"
      echo "    p (--run-publish) Execution de la tache de publication gitHub,"
      echo "    C (--run-clean)   Execution de la tache de nettoyage."
      echo "Ex. `basename $0` -btpC"
      exit 0
      ;;
   \? )
     echo "Invalid Option: -$OPTARG" 1>&2
     exit 1
     ;;
   v|verbose )
     _OPTS_VERBOSE=true
     ;;
   l|leaflet )
      _LIBRARY="leaflet"
     ;;
   o|ol3 )
      _LIBRARY="ol3"
     ;;
   b|build )
      _OPTS_RUN_BUILD=true
     ;;
   t|tag )
     _OPTS_RUN_TAG=true
     ;;
   p|publish )
      _OPTS_RUN_PUBLISH=true
     ;;
   C|clean )
      _OPTS_RUN_CLEAN=true
     ;;
  esac
  shift $((OPTIND -1))
done

[ ${_OPTS_VERBOSE} == true ] && {
  set -x
}

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

[ ${_LIBRARY} == "leaflet" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_LEAFLET}
}

[ ${_LIBRARY} == "ol3" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_OPENLAYERS}
}

GITHUB_API_URL=${_GITHUB_API_URL}
GITHUB_API_UPLOAD_RELEASE_URL=${_GITHUB_API_UPLOAD_RELEASE_URL}
GITHUB_API_CREATE_RELEASE_URL=${_GITHUB_API_CREATE_RELEASE_URL}
GITHUB_API_CREATE_RELEASE_DATA=${_GITHUB_API_CREATE_RELEASE_DATA}

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
--> Publication des releases sur le GitHub pour ${_LIBRARY} <--
-- Configuration : ${_PROPERTIES}
-- Parametres : ...
--    build   : ${_OPTS_RUN_BUILD}
--    tag     : ${_OPTS_RUN_TAG}
--    publish : ${_OPTS_RUN_PUBLISH}
--    clean   : ${_OPTS_RUN_CLEAN}
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
export _PACKAGE_VERSION_NAME="${_LIBRARY}ExtVersion"
export _PACKAGE_VERSION=$(cat package.json |
  perl -MJSON -0ne '
    my $DS = decode_json $_;
    my $field = $ENV{_PACKAGE_VERSION_NAME};
    print $DS->{$field};
  ')

if [ ${_OPTS_RUN_BUILD} == true ]
then
  doCmd "cd ${_PWD}"
  doCmd "gulp --${_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp --production --${_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_LIBRARY}" > /dev/null 2>&1
fi

################################################################################
printTo "--> tag"

if [ ${_OPTS_RUN_TAG} == true ]
then

  _PACKAGE_TAG=$(echo ${GIT_TAG_NAME} |
        sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
        sed -e "s@%library%@${_LIBRARY}@g")

  doCmd "git tag ${_PACKAGE_TAG}"


  if [ -n ${GIT_OAUTH_TOKEN} ]; then
    GIT_REPOSITORY_URL=$(echo ${GIT_REPOSITORY_URL} | sed -e "s/github.com/${GIT_USER_NAME}:${GIT_OAUTH_TOKEN}@github.com/")
  fi

  doCmd "git push --repo ${GIT_REPOSITORY_URL}"

fi

################################################################################
printTo "--> TODO : publish"

if [ ${_OPTS_RUN_PUBLISH} == true ]
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

  if [ -n "${_CHANGELOG_CONTENT}" ] && [ ${_OPTS_RUN_TAG} == true ]
  then

    # https://developer.github.com/v3/repos/releases/#create-a-release
    _REQUEST_RELEASE_URL=$(echo "${GITHUB_API_URL}/${GITHUB_API_CREATE_RELEASE_URL}" |
        sed -e "s@%git_user_name%@${GIT_USER_NAME}@g" |
        sed -e "s@%git_repository_name%@${GIT_REPOSITORY_NAME}@g")

    _REQUEST_RELEASE_DATA=$(echo "${GITHUB_API_CREATE_RELEASE_DATA}" |
        sed -e "s@%tag_name%@${_PACKAGE_TAG}@g" |
        sed -e "s@%content%@${_CHANGELOG_CONTENT}@g")

    doCmd "curl -u ${GIT_USER_NAME}:${GIT_OAUTH_TOKEN} -X POST -H \"Content-Type: application/json\" -d ${_REQUEST_RELEASE_DATA} ${_REQUEST_RELEASE_URL}"
  fi

  ##############################################################################
  printTo "--> zip"

  _ZIP_NAME=""
  _ZIP_NAME+="GpPlugin"
  _ZIP_NAME+=${_LIBRARY^}
  _ZIP_NAME+="-"
  _ZIP_NAME+=${_PACKAGE_VERSION}
  _ZIP_NAME+=".zip"

  [ -d "${_DIR_DIST}/${_LIBRARY}" ] && {
    doCmd "zip -r ${GIT_DIR_PUBLISH}/${_ZIP_NAME} dist/${_LIBRARY}"
  }

  ##############################################################################
  printTo "--> TODO : sendZip"

  if [ -f ${_ZIP_NAME} ] && [ ${_OPTS_RUN_TAG} == true ]
  then

    # TODO
    # '_RELEASE_ID' issu de la requete de creation de la release ?

    doCmd "cd ${GIT_DIR_PUBLISH}"

    # https://developer.github.com/v3/repos/releases/#upload-a-release-asset
    _REQUEST_UPLOAD_URL==$(echo "${GITHUB_API_URL}/${GITHUB_API_UPLOAD_RELEASE_URL}" |
        sed -e "s@%git_user_name%@${GIT_USER_NAME}@g" |
        sed -e "s@%git_repository_name%@${GIT_REPOSITORY_NAME}@g"|
        sed -e "s@%release_id%@${_RELEASE_ID}@g"|
        sed -e "s@%zip_name%@${_ZIP_NAME}@g")

    doCmd "curl -u ${GIT_USER_NAME}:${GIT_OAUTH_TOKEN} -X POST -H \"Content-Type: application/zip\" ${_REQUEST_UPLOAD_URL}"
  fi

fi

################################################################################
printTo "--> clean"

if [ ${_OPTS_RUN_CLEAN} == true ]
then
  doCmd "cd ${_PWD}"
  doCmd "rm -rf ${GIT_DIR_PUBLISH}"
fi

printTo "END"

[ ${_OPTS_VERBOSE} == true ] && {
  set +x
}

exit 0
