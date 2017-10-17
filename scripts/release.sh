#!/bin/bash

set -x

PWD=`pwd`

# version
VERSION=0.0.1

# librairie
LIBRARY="leaflet"

# chemins des répertoires
DIR_SCRIPTS="${PWD}/scripts"
DIR_SRC="${PWD}/src"
DIR_DIST="${PWD}/dist"

# chargement des properties
PROPERTIES="${DIR_SCRIPTS}/release.ini"
source ${PROPERTIES}

# git
_GIT_COMMIT_MESSAGE=${GIT_COMMIT_MESSAGE}
_GIT_FILES_ADD=${GIT_FILES_ADD}
_GIT_DIR_PUBLISH=${GIT_DIR_PUBLISH}
_GIT_REPOSITORY=${GIT_REPOSITORY}
_GIT_REPOSITORY_TOKEN=${GIT_REPOSITORY_TOKEN}

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
--> Publication des releases ${LIBRARY} <--
-- Configuration : ${PROPERTIES}
-- Information   :
--      url (git)   : ${_GIT_REPOSITORY}
--      depot (git) : ${_GIT_DIR_PUBLISH}
----------------------------------------------------------

EOF
}

##########
# main ()

info

printTo "BEGIN"

################################################################################
printTo "--> build..."

# # gulp --leaflet
# doCmd "gulp --leaflet" > /dev/null 2>&1
# # gulp publish --leaflet
# doCmd "gulp publish --leaflet" > /dev/null 2>&1
# # gulp --production --leaflet
# doCmd "gulp --production --leaflet" > /dev/null 2>&1
# # gulp publish --leaflet
# doCmd "gulp publish --leaflet" > /dev/null 2>&1

################################################################################
printTo "--> data"

# git clone https://github.com/lowzonenose/geoportal-extensions-leaflet.git
doCmd "git clone https://github.com/${_GIT_REPOSITORY}.git ${_GIT_DIR_PUBLISH}"
# cp -r dist/leaflet geoportal-extensions-leaflet/dist
doCmd "cp -r ${DIR_DIST}/${LIBRARY}/. ${_GIT_DIR_PUBLISH}/dist"
# cp LICENCE.md geoportal-extensions-leaflet/
doCmd "cp LICENCE.md ${_GIT_DIR_PUBLISH}"
# cp README-leaflet.md geoportal-extensions-leaflet/README.md
doCmd "cp README-leaflet.md ${_GIT_DIR_PUBLISH}/README.md"
# cp CHANGELOG_DRAFT.md geoportal-extensions-leaflet/CHANGELOG.md
doCmd "cp CHANGELOG_DRAFT.md ${_GIT_DIR_PUBLISH}/CHANGELOG.md"

################################################################################
printTo "--> json"

package_version=$(cat package.json | perl -MJSON -0ne 'my $DS = decode_json $_;print $DS->{version};')
package_content=$(cat ${_GIT_DIR_PUBLISH}/package.json | perl -MJSON -0ne 'my $DS = decode_json $_; $DS->{version} = ${package_version}; print encode_json $DS')
bower_content= $(cat ${_GIT_DIR_PUBLISH}/bower.json | perl -MJSON -0ne 'my $DS = decode_json $_; $DS->{version} = ${package_version}; print encode_json $DS')
doCmd "echo ${package_content} > ${_GIT_DIR_PUBLISH}/package.json"
doCmd "echo ${bower_content} > ${_GIT_DIR_PUBLISH}/bower.json"

################################################################################
printTo "--> info"

# $(cat geoportal-extensions-leaflet/summary.json | perl -MJSON -0ne '
#   my $DS = decode_json $_;
#   $DS->{version} = $version;
#   $DS->{date} = ...;
#   $DS->{} = ...;
#   $DS->{} = ...;
#   print encode_json $DS
# ')

################################################################################
printTo "--> tag"

# git add -Af
doCmd "git add -Af ${_GIT_DIR_PUBLISH}"
# git commit -m "Publication Leaflet version 0.10.0"
message=$(echo ${_GIT_COMMIT_MESSAGE} | sed -e "s@%version%@$package_version@g" | sed -e "s@%library%@$LIBRARY@g")
doCmd "git commit -m \"$message\"  ${_GIT_DIR_PUBLISH}"
# git push
doCmd ""

###############################################################################
printTo "--> publish"

# npm publish
doCmd ""
# npm install bower
doCmd ""
# bower register geoportal-extensions-leaflet http://github.com/IGNF/geoportal-extensions-leaflet.git
doCmd ""

###############################################################################
printTo "--> clean"

# rm -rf geoportal-extensions-leaflet/
doCmd ""

printTo "END"

set +x

exit 0
