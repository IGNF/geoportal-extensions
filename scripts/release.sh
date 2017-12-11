#!/bin/bash

# TODO
# > authentification via token/basic NPM...
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
_DIR_SRC="${_PWD}/src"
_DIR_DIST="${_PWD}/dist"

# gulp
_BIN_GULP="${_PWD}/node_modules/.bin/gulp"

# chargement des properties
_PROPERTIES="${_DIR_SCRIPTS}/release.ini"
source ${_PROPERTIES}

# git properties
GIT_COMMIT_MESSAGE=${_GIT_COMMIT_MESSAGE}
GIT_TAG_NAME=${_GIT_TAG_NAME}
GIT_ORGANIZATION=${_GIT_ORGANIZATION}
GIT_FILES_ADD=${_GIT_FILES_ADD}
GIT_USER_NAME=${_GIT_USER_NAME} # surchargé par la config client !
GIT_USER_MAIL=${_GIT_USER_MAIL} # surchargé par la config client !
GIT_OAUTH_TOKEN=${_GIT_OAUTH_TOKEN} # issue de l'env. sys.
GIT_OAUTH_SSHKEY="non"

# npm properties
NPM_OAUTH_TOKEN=${_NPM_OAUTH_TOKEN} # issue de l'env. sys. mais ne marche pas !?
NPM_OAUTH_USER=${_NPM_OAUTH_USER}
NPM_OAUTH_MAIL=${_NPM_OAUTH_MAIL}
NPM_OAUTH_PWD=${_NPM_OAUTH_PWD} # issue de l'env. sys.
NPM_OAUTH_PWD_MSQ="XXXXXX"

# options properties
#   --leaflet |l
#   (--verbose )
#   --build |b, --data |d, --json |j, --commit |o, --publish |p, --clean |C
OPTS_RUN_BUILD=${_OPTS_RUN_BUILD}
OPTS_RUN_DATA=${_OPTS_RUN_DATA}
OPTS_RUN_JSON=${_OPTS_RUN_JSON}
OPTS_RUN_COMMIT=${_OPTS_RUN_COMMIT}
OPTS_RUN_TAG=${_OPTS_RUN_TAG}
OPTS_RUN_PUBLISH=${_OPTS_RUN_PUBLISH}
OPTS_RUN_CLEAN=${_OPTS_RUN_CLEAN}

# debug option
OPTS_VERBOSE=${_OPTS_VERBOSE}

# read option
# l (--leaflet) Publication Leaflet (par defaut),
# o (--ol3)     Publication Openlayers,
# b (--build)   Execution de la tache de compilation,
# d (--data)    Execution de la tache de git-clone,
# j (--json)    Execution de la tache de creation des json,
# c (--commit)  Execution de la tache de git-push,
# t (--tag)     Execution de la tache de git-tag,
# p (--publish) Execution de la tache de publication npm,
# C (--clean)   Execution de la tache de nettoyage.

_OPTS=`getopt -o hlob::d::j::c::t::p::C:: --long help,verbose,leaflet,ol3,password:,username:,token:,build::,data::,json::,commit::,tag::,publish::,clean:: -n 'release.sh' -- "$@"`
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
        echo "    --username    [private][surcharge] compte de publication NPM,"
        echo "    --password    [private][surcharge] password de publication NPM,"
        echo "    --token       [private][surcharge] token du github,"
        echo "    --build|b     Execution de la tache de compilation,"
        echo "    --data|d      Execution de la tache de git-clone,"
        echo "    --json|j      Execution de la tache de creation des json,"
        echo "    --commit|c    Execution de la tache de git-push,"
        echo "    --tag|t       Execution de la tache de git-tag,"
        echo "    --publish|p   Execution de la tache de publication npm,"
        echo "    --clean|C     Execution de la tache de nettoyage."
        echo "Ex. Options longues : `basename $0` --leaflet"
        echo "                  --build --data --json"
        echo "                  --commit=false --tag=false --publish=false"
        echo "                  --clean=true"
        echo "Ex. Options courtes : `basename $0` -l"
        echo "                  -bdj"
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

    --username)
        case "$2" in
          "") shift 2 ;;
          *) NPM_OAUTH_USER=$2 ; shift 2 ;;
        esac ;;

    --password)
        case "$2" in
          "") shift 2 ;;
          *) NPM_OAUTH_PWD=$2 ; shift 2 ;;
        esac ;;

    --token)
        case "$2" in
          "") shift 2 ;;
          *) GIT_OAUTH_TOKEN=$2 ; shift 2 ;;
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
--    git     : ${OPTS_RUN_COMMIT}
--    tag     : ${OPTS_RUN_TAG}
--    publish : ${OPTS_RUN_PUBLISH}
--    clean   : ${OPTS_RUN_CLEAN}
-- Information GitHub : ...
--    depot GitHub   : ${GIT_REPOSITORY}
--    user GitHub    : ${GIT_USER_NAME}
--    mail GitHub    : ${GIT_USER_MAIL}
--    token GitHub   : ${GIT_OAUTH_TOKEN} (ENV)
--    ssh-key GitHub : ${GIT_OAUTH_SSHKEY}
-- Information NPM : ...
--    user npm  : ${NPM_OAUTH_USER}
--    pwd npm   : ${NPM_OAUTH_PWD_MSQ} (ENV)
--    email npm : ${NPM_OAUTH_MAIL}
--  [ token npm : ${NPM_OAUTH_TOKEN} ] (ENV : not yet used !)
----------------------------------------------------------

EOF
}

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

# utilisateur courant pour le github ?
_GIT_USER_MAIL=$(git config --get user.email)
if [ -n ${_GIT_USER_MAIL} ]; then
  printTo "Utilisation du 'email' de l'utilisateur courant (git config)"
  GIT_USER_MAIL=${_GIT_USER_MAIL}
fi

_GIT_USER_NAME=$(git config --get user.name)
if [ -n ${_GIT_USER_NAME} ]; then
  printTo "Utilisation du 'username' de l'utilisateur courant (git config)"
  GIT_USER_NAME=${_GIT_USER_NAME}
fi

# organisation ou compte utilisateur ?
GIT_REPOSITORY_USER_NAME=${GIT_USER_NAME}
if [ -n "${GIT_ORGANIZATION}" ]; then
  GIT_REPOSITORY_USER_NAME=${GIT_ORGANIZATION}
fi

# depot github leaflet
[ ${_PACKAGE_LIBRARY} == "leaflet" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_LEAFLET}
  GIT_REPOSITORY="${_GIT_REPOSITORY_PREFIX}${GIT_REPOSITORY_USER_NAME}/${_GIT_REPOSITORY_NAME_LEAFLET}.git"
}

# depot github ol
[ ${_PACKAGE_LIBRARY} == "ol3" ] && {
  GIT_DIR_PUBLISH=${_GIT_DIR_PUBLISH_OPENLAYERS}
  GIT_REPOSITORY="${_GIT_REPOSITORY_PREFIX}${GIT_REPOSITORY_USER_NAME}/${_GIT_REPOSITORY_NAME_OPENLAYERS}.git"
}

# authentification pour npm si besoin...
[ -z ${NPM_OAUTH_PWD} ] && {
  if [ ${OPTS_RUN_PUBLISH} == true ]
  then
    printTo "Veuillez renseigner la variable d'environement 'RELEASE_NPMJS_PASSWORD' pour l'authentification NPM de publication."
    exit 2
  fi
}

##########
# main ()

info

printTo "BEGIN"

################################################################################
printTo "--> version..."

# on recupere la version du package
export _PACKAGE_VERSION_NAME="${_PACKAGE_LIBRARY}ExtVersion"
export _PACKAGE_VERSION=$(cat package.json |
    perl -MJSON -0ne '
      my $DS = decode_json $_;
      my $field = $ENV{_PACKAGE_VERSION_NAME};
      print $DS->{$field};
    ')

# export de la date du build pour Perl
export _PACKAGE_BUILD=`date '+%d/%m/%y - %H:%M:%S'`

################################################################################
if [ ${OPTS_RUN_BUILD} == true ]
then
  ##############################################################################
  printTo "--> build..."

  doCmd "cd ${_PWD}"
  doCmd "${_BIN_GULP} --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "${_BIN_GULP} publish --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "${_BIN_GULP} --production --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
  doCmd "${_BIN_GULP} publish --${_PACKAGE_LIBRARY}" > /dev/null 2>&1
fi

################################################################################
# FIXME
# - les sources font elles parties de la publication ? non, uniquement les binaires...
# - CHANGELOG ?
if [ ${OPTS_RUN_DATA} == true ]
then
  ##############################################################################
  printTo "--> data"

  doCmd "cd ${_PWD}"
  # git clone https://github.com/lowzonenose/geoportal-extensions-leaflet.git
  doCmd "git clone ${GIT_REPOSITORY} ${GIT_DIR_PUBLISH}"

  # dist ?
  [ ! -d "${GIT_DIR_PUBLISH}/dist" ] && {
    doCmd "mkdir ${GIT_DIR_PUBLISH}/dist"
  }

  doCmd "cp -r ${_DIR_DIST}/${_PACKAGE_LIBRARY}/. ${GIT_DIR_PUBLISH}/dist"
  doCmd "cp LICENCE.md ${GIT_DIR_PUBLISH}"
  doCmd "cp README-${_PACKAGE_LIBRARY}.md ${GIT_DIR_PUBLISH}/README.md"
  # doCmd "cp CHANGELOG_DRAFT.md ${GIT_DIR_PUBLISH}/CHANGELOG.md"

  # [ ! -d "${GIT_DIR_PUBLISH}/src" ] && {
  #   doCmd "mkdir ${GIT_DIR_PUBLISH}/src"
  # }
  # doCmd "cp ${_DIR_SRC}/Config.js ${GIT_DIR_PUBLISH}/src"
  # doCmd "cp -r ${_DIR_SRC}/Common ${GIT_DIR_PUBLISH}/src"
  # doCmd "cp -r ${_DIR_SRC}/${_PACKAGE_LIBRARY^} ${GIT_DIR_PUBLISH}/src"
fi

################################################################################
if [ ${OPTS_RUN_JSON} == true ]
then
  ##############################################################################
  printTo "--> json"

  [ -d ${GIT_DIR_PUBLISH} ] && {

    doCmd "cd ${_PWD}"

    # contenu du package.json avec version API
    _PACKAGE_CONTENT=`cat "${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}.json" |
        perl -MJSON -0ne '
        my $DS = decode_json $_;
        $DS->{version} = $ENV{_PACKAGE_VERSION};
        print to_json($DS, {
          utf8 => 1,
          pretty => 1,
          indent => 1,
          space_before => 1,
          space_after => 1})
        ' > "${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}-pretty.json"`

    doCmd "cp ${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}-pretty.json  ${GIT_DIR_PUBLISH}/package.json"
    doCmd "rm ${_DIR_CONFIG_NPM}/package-${_PACKAGE_LIBRARY}-pretty.json"

  }
fi

################################################################################
if [ ${OPTS_RUN_COMMIT} == true ]
then
  ################################################################################
  printTo "--> git"

  [ -d ${GIT_DIR_PUBLISH} ] && {

    doCmd "cd ${GIT_DIR_PUBLISH}"

    doCmd "git config user.email \"${GIT_USER_MAIL}\""
    doCmd "git config user.name \"${GIT_USER_NAME}\""

    doCmd "git add -Af"

    message=$(echo ${GIT_COMMIT_MESSAGE} |
        sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
        sed -e "s@%library%@${_PACKAGE_LIBRARY}@g")
    doCmd "git commit -m \"$message\""

    # authentification github via token si renseignée, sinon via SSH
    if [ -n ${GIT_OAUTH_TOKEN} ]; then
      # FIXME organisation ?
      _GIT_REPOSITORY_TOKEN=$(echo ${GIT_REPOSITORY} | sed -e "s/github.com/${GIT_USER_NAME}:${GIT_OAUTH_TOKEN}@github.com/")
      doCmd "git remote set-url origin ${_GIT_REPOSITORY_TOKEN}"
    fi

    doCmd "git push"

    ############################################################################
    if [ ${OPTS_RUN_TAG} == true ]
    then
      ##########################################################################
      printTo "--> tag"

      _tag_name=$(echo ${GIT_TAG_NAME} |
          sed -e "s@%version%@${_PACKAGE_VERSION}@g" |
          sed -e "s@%library%@${_PACKAGE_LIBRARY}@g")
      doCmd "git tag ${_tag_name}"

      doCmd "git push origin ${_tag_name}"
    fi

    doCmd "cd ${_PWD}"
  }
fi

################################################################################
# FIXME authentification token pour npm !?
if [ ${OPTS_RUN_PUBLISH} == true ]
then
  ##############################################################################
  printTo "--> publish"

  [ -d ${GIT_DIR_PUBLISH} ] && {
    doCmd "cd ${GIT_DIR_PUBLISH}"
    # npm login :
    # printf '${NPM_OAUTH_USER}\n${NPM_OAUTH_PWD}\n${NPM_OAUTH_MAIL}\n' | npm login  !?
    /usr/bin/expect << HEREDOC
    spawn npm login
    expect "Username:"
    send "${NPM_OAUTH_USER}\n"
    expect "Password:"
    send "${NPM_OAUTH_PWD}\n"
    expect Email:
    send "${NPM_OAUTH_MAIL}\n"
    expect eof
HEREDOC
    # wait
    sleep 2
    doCmd "npm publish"
    # INFO
    # la publication sous npm met en place automatiquement la publication sous Yarn !
    #   doCmd "npm install yarn --no-save"
    #   doCmd "yarn publish"
  }
fi

################################################################################
if [ ${OPTS_RUN_CLEAN} == true ]
then
  ##############################################################################
  printTo "--> clean"

  doCmd "cd ${_PWD}"
  doCmd "rm -rf ${GIT_DIR_PUBLISH}"
fi

printTo "END"

[ ${OPTS_VERBOSE} == true ] && {
  set +x
}

exit 0
