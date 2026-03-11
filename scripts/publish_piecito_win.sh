#!/usr/bin/env bash
set -e

SCRIPTDIR=`dirname "$BASH_SOURCE"`
SERVER=root@192.168.1.97
DATE=$(date "+%Y-%m-%d-%H%M%S")

PUBLIC_PATH=bjj-library

# Build
npm run build

# Eliminar source maps
find "$SCRIPTDIR/../dist/spa/" -type f -name '*.map' -exec rm {} +


# sincronizamos los archivos al servidor
#rsync -rv --exclude 'index.html' "$SCRIPTDIR/../dist/spa/" ${SERVER}:/data/html/${PUBLIC_PATH}/
scp -r "$SCRIPTDIR/../dist/spa/"* ${SERVER}:/data/html/${PUBLIC_PATH}/


# Corregir permisos
ssh ${SERVER} chown -R www-data /data/html/${PUBLIC_PATH}/