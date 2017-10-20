#!/bin/bash

# répertoire d'execution
_PWD=`pwd`

# version du shell
_VERSION=0.0.1

# librairie par defaut
_LIBRARY="leaflet"

# options
#   --leaflet |l
#   (--debug )
#   --build |b, --data |d, --json |j, --info |i, --commit |o, --publish |p, --clean |C
_OPTS_RUN_BUILD=false
_OPTS_RUN_DATA=false
_OPTS_RUN_JSON=false
_OPTS_RUN_INFO=false
_OPTS_RUN_COMMIT=false
_OPTS_RUN_PUBLISH=false
_OPTS_RUN_CLEAN=false

# parse options
_OPTS_VERBOSE=false

while getopts "lovhbdjicpC" opt; do
  case ${opt} in
    h|help )
      echo "Usage :"
      echo "    `basename $0` -h    Affiche cette aide."
      echo "    v (--verbose)     mode verbose,"
      echo "    l (--leaflet)     Execution de la publication Leaflet (par defaut),"
      echo "    o (--ol3)         Execution de la publication Openlayers,"
      echo "    b (--run-build)   Execution de la tache de compilation,"
      echo "    d (--run-data)    Execution de la tache de git-clone,"
      echo "    j (--run-json)    Execution de la tache de creation des json,"
      echo "    i (--run-info)    Execution de la tache de creation du fichier d'info,"
      echo "    c (--run-commit)  Execution de la tache de git-push,"
      echo "    p (--run-publish) Execution de la tache de publication npm et bower,"
      echo "    C (--run-clean)   Execution de la tache de nettoyage."
      echo "Ex. `basename $0` -bdjicpC"
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
   d|data )
      _OPTS_RUN_DATA=true
     ;;
   j|json )
      _OPTS_RUN_JSON=true
     ;;
   i|info )
      _OPTS_RUN_INFO=true
     ;;
   c|commit )
     _OPTS_RUN_COMMIT=true
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
_DIR_SRC="${_PWD}/src"
_DIR_DIST="${_PWD}/dist"

# chargement des properties
_PROPERTIES="${_DIR_SCRIPTS}/release.ini"
source ${_PROPERTIES}

# git
GIT_COMMIT_MESSAGE=${_GIT_COMMIT_MESSAGE}
GIT_FILES_ADD=${_GIT_FILES_ADD}
GIT_USER_NAME=${_GIT_USER_NAME}
GIT_OAUTH_TOKEN=${_GIT_OAUTH_TOKEN}

[ ${_LIBRARY} == "leaflet" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_LEAFLET}
  GIT_REPOSITORY="https://github.com/${GIT_USER_NAME}/${_GIT_REPOSITORY_NAME_LEAFLET}.git"
}

[ ${_LIBRARY} == "ol3" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_OPENLAYERS}
  GIT_REPOSITORY="https://github.com/${GIT_USER_NAME}/${_GIT_REPOSITORY_NAME_OPENLAYERS}.git"
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
--> Publication des releases ${_LIBRARY} <--
-- Configuration : ${_PROPERTIES}
-- Parametres : ...
--    build   : ${_OPTS_RUN_BUILD}
--    data    : ${_OPTS_RUN_DATA}
--    json    : ${_OPTS_RUN_JSON}
--    info    : ${_OPTS_RUN_INFO}
--    git     : ${_OPTS_RUN_COMMIT}
--    publish : ${_OPTS_RUN_PUBLISH}
--    clean   : ${_OPTS_RUN_CLEAN}
-- Information   : ...
--    depot GitHub : ${GIT_REPOSITORY}
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

# date du build
export _PACKAGE_BUILD=`date '+%d/%m/%y - %H:%M:%S'`

if [ ${_OPTS_RUN_BUILD} == true ]
then
  doCmd "cd ${_PWD}"
  doCmd "gulp --${_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp --production --${_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_LIBRARY}" > /dev/null 2>&1
fi

################################################################################
printTo "--> data"

if [ ${_OPTS_RUN_DATA} == true ]
then
  doCmd "cd ${_PWD}"
  # git clone https://github.com/lowzonenose/geoportal-extensions-leaflet.git
  doCmd "git clone ${GIT_REPOSITORY} ${GIT_DIR_PUBLISH}"
  # cp -r dist/leaflet geoportal-extensions-leaflet/dist
  doCmd "cp -r ${_DIR_DIST}/${_LIBRARY}/. ${GIT_DIR_PUBLISH}/dist"
  # cp LICENCE.md geoportal-extensions-leaflet/
  doCmd "cp LICENCE.md ${GIT_DIR_PUBLISH}"
  # cp README-leaflet.md geoportal-extensions-leaflet/README.md
  doCmd "cp README-${_LIBRARY}.md ${GIT_DIR_PUBLISH}/README.md"
  # cp CHANGELOG_DRAFT.md geoportal-extensions-leaflet/CHANGELOG.md
  doCmd "cp CHANGELOG_DRAFT.md ${GIT_DIR_PUBLISH}/CHANGELOG.md"
fi

################################################################################
printTo "--> json"

# version API
export _PACKAGE_VERSION_NAME="${_LIBRARY}ExtVersion"
export _PACKAGE_VERSION=$(cat package.json |
  perl -MJSON -0ne '
    my $DS = decode_json $_;
    my $field = $ENV{_PACKAGE_VERSION_NAME};
    print $DS->{$field};
  ')

if [ ${_OPTS_RUN_JSON} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {
    # contenu du package.json avec version API
    _PACKAGE_CONTENT=$(cat ${GIT_DIR_PUBLISH}/package.json |
        perl -MJSON -0ne '
          my $DS = decode_json $_;
          $DS->{version} = $ENV{_PACKAGE_VERSION};
          print encode_json $DS
        ')
    # contenu du bower.json avec version API
    _BOWER_CONTENT=$(cat ${GIT_DIR_PUBLISH}/bower.json |
        perl -MJSON -0ne '
          my $DS = decode_json $_;
          $DS->{version} = $ENV{_PACKAGE_VERSION};
          print encode_json $DS
        ')

    doCmd "cd ${_PWD}"
    echo ${_PACKAGE_CONTENT} > "${GIT_DIR_PUBLISH}/package.json"
    echo ${_BOWER_CONTENT} > "${GIT_DIR_PUBLISH}/bower.json"
  }
fi

################################################################################
printTo "--> info"

# informations sur la construcion des binaires
# Ex. date, version, size, md5, ...
if [ ${_OPTS_RUN_INFO} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {
    _INFO_CONTENT=$(cat ${GIT_DIR_PUBLISH}/summary.json |
    perl -MJSON -0ne '
      my $DS = decode_json $_;
      $DS->{version} = $ENV{_PACKAGE_VERSION};
      $DS->{date} = $ENV{_PACKAGE_BUILD};
      print encode_json $DS
    ')
    echo ${_INFO_CONTENT} > "${GIT_DIR_PUBLISH}/summary.json"
  }
fi

################################################################################
printTo "--> git"

# TODO tag !
if [ ${_OPTS_RUN_COMMIT} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {
    doCmd "cd ${GIT_DIR_PUBLISH}"
    doCmd "git add -Af"
    message=$(echo ${GIT_COMMIT_MESSAGE} |
        sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
        sed -e "s@%library%@${_LIBRARY}@g")
    doCmd "git commit -m \"$message\""

    if [ -n ${GIT_OAUTH_TOKEN} ]; then
      _GIT_REPOSITORY_TOKEN=$(echo ${GIT_REPOSITORY} | sed -e "s/github.com/${GIT_USER_NAME}:${GIT_OAUTH_TOKEN}@github.com/")
      doCmd "git remote set-url origin ${_GIT_REPOSITORY_TOKEN}"
    fi

    doCmd "git push"
  }
fi

###############################################################################
printTo "--> publish"

# TODO bower !
# FIXME authentification !
if [ ${_OPTS_RUN_PUBLISH} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {
    doCmd "cd ${GIT_DIR_PUBLISH}"
    # npm publish
    doCmd "npm publish"
    # npm install bower
    doCmd ""
    # bower register geoportal-extensions-leaflet http://github.com/IGNF/geoportal-extensions-leaflet.git
    doCmd ""
  }
fi

###############################################################################
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
