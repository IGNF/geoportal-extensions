#!/bin/bash

# TODO
# > impl. la surcharge de l'option version
# > bower !
# > tester l'authentification via token/basic NPM...
# > cf. FIXME

# répertoire d'execution
_PWD=`pwd`

# version du shell
_VERSION=0.0.1

# librairie par defaut
_PACKAGE_LIBRARY="leaflet"

# version du package
_PACKAGE_VERSION=""

# chemins des répertoires
_DIR_SCRIPTS="${_PWD}/scripts"
_DIR_CONFIG_NPM="${_PWD}/scripts/config_npm"
_DIR_CONFIG_NPM="${_PWD}/scripts/config_bower"
_DIR_SRC="${_PWD}/src"
_DIR_DIST="${_PWD}/dist"

# chargement des properties
_PROPERTIES="${_DIR_SCRIPTS}/release.ini"
source ${_PROPERTIES}

# git properties
GIT_COMMIT_MESSAGE=${_GIT_COMMIT_MESSAGE}
GIT_FILES_ADD=${_GIT_FILES_ADD}
GIT_USER_NAME=${_GIT_USER_NAME}
GIT_OAUTH_TOKEN=${_GIT_OAUTH_TOKEN}

# npm properties
NPM_OAUTH_TOKEN=${_NPM_OAUTH_TOKEN}
NPM_OAUTH_USER=${_NPM_OAUTH_USER}
NPM_OAUTH_PWD=${_NPM_OAUTH_PWD}
NPM_OAUTH_MAIL=${_NPM_OAUTH_MAIL}

# options properties
#   --leaflet |l
#   (--debug )
#   --build |b, --data |d, --json |j, --info |i, --commit |o, --publish |p, --clean |C
OPTS_RUN_BUILD=${_OPTS_RUN_BUILD}
OPTS_RUN_DATA=${_OPTS_RUN_DATA}
OPTS_RUN_JSON=${_OPTS_RUN_JSON}
OPTS_RUN_INFO=${_OPTS_RUN_INFO}
OPTS_RUN_COMMIT=${_OPTS_RUN_COMMIT}
OPTS_RUN_TAG=${_OPTS_RUN_TAG}
OPTS_RUN_PUBLISH=${_OPTS_RUN_PUBLISH}
OPTS_RUN_CLEAN=${_OPTS_RUN_CLEAN}

# debug option
OPTS_VERBOSE=${_OPTS_VERBOSE}

# read option
# l (--leaflet) Publication Leaflet (par defaut),
# o (--ol3)     Publication Openlayers,
# V (--version) Numero de version du package à publier,
# b (--build)   Execution de la tache de compilation,
# d (--data)    Execution de la tache de git-clone,
# j (--json)    Execution de la tache de creation des json,
# i (--info)    Execution de la tache de creation du fichier d'info,
# c (--commit)  Execution de la tache de git-push,
# t (--tag)     Execution de la tache de git-tag,
# p (--publish) Execution de la tache de publication npm et bower,
# C (--clean)   Execution de la tache de nettoyage.

_OPTS=`getopt -o hlov:b::d::j::i::c::t::p::C:: --long help,verbose,leaflet,ol3,version:,build::,data::,json::,info::,commit::,tag::,publish::,clean:: -n 'release.sh' -- "$@"`
eval set -- "${_OPTS}"

while true; do
  case "$1" in

    -h|--help)
        echo "Usage :"
        echo "    `basename $0` "
        echo "    -h            Affiche cette aide."
        echo "    --verbose     Mode verbose,"
        echo "    --leaflet|l   Publication Leaflet (par defaut),"
        echo "    --ol3|o       Publication Openlayers,"
        echo "    --version|v   Numero de version du package à publier,"
        echo "    --build|b     Execution de la tache de compilation,"
        echo "    --data|d      Execution de la tache de git-clone,"
        echo "    --json|j      Execution de la tache de creation des json,"
        echo "    --info|i      Execution de la tache de creation du fichier d'info,"
        echo "    --commit|c    Execution de la tache de git-push,"
        echo "    --tag|t       Execution de la tache de git-tag,"
        echo "    --publish|p   Execution de la tache de publication npm et bower,"
        echo "    --clean|C     Execution de la tache de nettoyage."
        echo "Ex. Options longues : `basename $0` --leaflet --version='1.0.0-test'"
        echo "                  --build --data --json --info"
        echo "                  --commit=false --tag=false --publish=false"
        echo "                  --clean=true"
        echo "Ex. Options courtes : `basename $0` -l -v '1.0.0-test'"
        echo "                  -bdji"
        echo "                  -c false -t false -p false"
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

    -v|--version)
        # on surcharge la version du package !
        # par defaut, elle est extraite du fichier package.json...
        case "$2" in
          "") shift 2 ;;
          *) _PACKAGE_VERSION=$2 ; shift 2 ;;
        esac ;;

    -b|--build)
        case "$2" in
          "") OPTS_RUN_BUILD=true ; shift 2 ;;
          *) OPTS_RUN_BUILD=$2 ; shift 2 ;;
        esac ;;

    -d|--data)
        case "$2" in
          "") OPTS_RUN_DATA=true ; shift 2 ;;
          *) OPTS_RUN_DATA=$2 ; shift 2 ;;
        esac ;;

    -j|--json)
        case "$2" in
          "") OPTS_RUN_JSON=true ; shift 2 ;;
          *) OPTS_RUN_JSON=$2 ; shift 2 ;;
        esac ;;

    -i|--info)
        case "$2" in
          "") OPTS_RUN_INFO=true ; shift 2 ;;
          *) OPTS_RUN_INFO=$2 ; shift 2 ;;
        esac ;;

    -c|--commit)
        case "$2" in
          "") OPTS_RUN_COMMIT=true ; shift 2 ;;
          *) OPTS_RUN_COMMIT=$2 ; shift 2 ;;
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
  GIT_REPOSITORY="https://github.com/${GIT_USER_NAME}/${_GIT_REPOSITORY_NAME_LEAFLET}.git"
}

# authentification github
[ ${_PACKAGE_LIBRARY} == "ol3" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_OPENLAYERS}
  GIT_REPOSITORY="https://github.com/${GIT_USER_NAME}/${_GIT_REPOSITORY_NAME_OPENLAYERS}.git"
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
--> Publication des releases ${_PACKAGE_LIBRARY} <--
-- Configuration : ${_PROPERTIES}
-- Parametres : ...
--    build   : ${OPTS_RUN_BUILD}
--    data    : ${OPTS_RUN_DATA}
--    json    : ${OPTS_RUN_JSON}
--    info    : ${OPTS_RUN_INFO}
--    git     : ${OPTS_RUN_COMMIT}
--    tag     : ${OPTS_RUN_TAG}
--    publish : ${OPTS_RUN_PUBLISH}
--    clean   : ${OPTS_RUN_CLEAN}
-- Information GitHub : ...
--    depot GitHub : ${GIT_REPOSITORY}
--    user GitHub  : ${GIT_USER_NAME}
--    token GitHub : ${GIT_OAUTH_TOKEN} (ENV)
-- Information NPM : ...
--    user npm  : ${NPM_OAUTH_USER}
--    pwd npm   : ${NPM_OAUTH_PWD}   (ENV)
--    token npm : ${NPM_OAUTH_TOKEN} (ENV)
--    email npm : ${NPM_OAUTH_MAIL}
----------------------------------------------------------

EOF
}

##########
# main ()

info

printTo "BEGIN"

################################################################################
printTo "--> build..."

# export de la date du build pour Perl
export _PACKAGE_BUILD=`date '+%d/%m/%y - %H:%M:%S'`

if [ ${OPTS_RUN_BUILD} == true ]
then
  doCmd "cd ${_PWD}"
  doCmd "gulp --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp --production --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "gulp publish --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
fi

################################################################################
printTo "--> data"

if [ ${OPTS_RUN_DATA} == true ]
then
  doCmd "cd ${_PWD}"
  # git clone https://github.com/lowzonenose/geoportal-extensions-leaflet.git
  doCmd "git clone ${GIT_REPOSITORY} ${GIT_DIR_PUBLISH}"
  # cp -r dist/leaflet geoportal-extensions-leaflet/dist
  doCmd "cp -r ${_DIR_DIST}/${_PACKAGE_LIBRARY}/. ${GIT_DIR_PUBLISH}/dist"
  # cp LICENCE.md geoportal-extensions-leaflet/
  doCmd "cp LICENCE.md ${GIT_DIR_PUBLISH}"
  # cp README-leaflet.md geoportal-extensions-leaflet/README.md
  doCmd "cp README-${_PACKAGE_LIBRARY}.md ${GIT_DIR_PUBLISH}/README.md"
  # cp CHANGELOG_DRAFT.md geoportal-extensions-leaflet/CHANGELOG.md
  doCmd "cp CHANGELOG_DRAFT.md ${GIT_DIR_PUBLISH}/CHANGELOG.md"
fi

################################################################################
printTo "--> json"

# la version est elle surchargée ?
if [ -z "${_PACKAGE_VERSION}" ]
then
  # on recupere la version du package
  _PACKAGE_VERSION=$(cat ${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}.json |
    perl -MJSON -0ne '
      my $DS = decode_json $_;
      my $field = "version";
      print $DS->{$field};
    ')
fi

# export de la version pour Perl
export _PACKAGE_VERSION=${_PACKAGE_VERSION}

if [ ${OPTS_RUN_JSON} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {

    doCmd "cd ${_PWD}"

    # contenu du package.json avec version API
    _PACKAGE_CONTENT=$(cat "${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}.json" |
        perl -MJSON -0ne '
          my $DS = decode_json $_;
          $DS->{version} = $ENV{_PACKAGE_VERSION};
          print encode_json $DS
        ')
    # contenu du bower.json avec version API
    _BOWER_CONTENT=$(cat ${_DIR_CONFIG_BOWER}/bower-${_PACKAGE_LIBRARY}.json |
        perl -MJSON -0ne '
          my $DS = decode_json $_;
          $DS->{version} = $ENV{_PACKAGE_VERSION};
          print encode_json $DS
        ')

    echo ${_BOWER_CONTENT}   > "${_DIR_CONFIG_BOWER}/bower-${_PACKAGE_LIBRARY}.json"
    echo ${_PACKAGE_CONTENT} > "${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}.json"

    doCmd "cp ${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}.json ${GIT_DIR_PUBLISH}/package.json"
    doCmd "cp ${_DIR_CONFIG_BOWER}/bower-${_PACKAGE_LIBRARY}.json ${GIT_DIR_PUBLISH}/bower.json"
  }
fi

################################################################################
printTo "--> info"

# informations sur la construcion des binaires
# Ex. date, version, size, md5, ...
if [ ${OPTS_RUN_INFO} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {

    doCmd "cd ${_PWD}"

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

if [ ${OPTS_RUN_COMMIT} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {
    doCmd "cd ${GIT_DIR_PUBLISH}"
    doCmd "git add -Af"

    message=$(echo ${GIT_COMMIT_MESSAGE} |
        sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
        sed -e "s@%library%@${_PACKAGE_LIBRARY}@g")
    doCmd "git commit -m \"$message\""

    if [ -n ${GIT_OAUTH_TOKEN} ]; then
      _GIT_REPOSITORY_TOKEN=$(echo ${GIT_REPOSITORY} | sed -e "s/github.com/${GIT_USER_NAME}:${GIT_OAUTH_TOKEN}@github.com/")
      doCmd "git remote set-url origin ${_GIT_REPOSITORY_TOKEN}"
    fi

    doCmd "git push"

    if [ ${OPTS_RUN_TAG} == true ]
    then
      ##########################################################################
      printTo "--> tag"

      message=$(echo ${GIT_TAG_NAME} |
          sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
          sed -e "s@%library%@${_PACKAGE_LIBRARY}@g")
      doCmd "git tag ${message}"

      doCmd "git push"
    fi
  }
fi

###############################################################################
printTo "--> publish"

# TODO bower !
# FIXME authentification token !
if [ ${OPTS_RUN_PUBLISH} == true ]
then
  [ -d ${GIT_DIR_PUBLISH} ] && {
    doCmd "cd ${GIT_DIR_PUBLISH}"
    # npm login
    doCmd "printf '${NPM_OAUTH_USER}\n${NPM_OAUTH_PWD}\n${NPM_OAUTH_MAIL}\n' | npm login"
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
