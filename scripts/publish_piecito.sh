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

# Backup del index.html en local (Comentar aquestes dos linies si es desplega per primera vegada)
scp ${SERVER}:/data/html/${PUBLIC_PATH}/index.html "$SCRIPTDIR/../dist/spa/index-${DATE}.html"
scp "$SCRIPTDIR/../dist/spa/index-${DATE}.html" ${SERVER}:/data/html/${PUBLIC_PATH}/index-${DATE}.html

# sincronizamos los archivos al servidor
rsync -rv --exclude 'index.html' "$SCRIPTDIR/../dist/spa/" ${SERVER}:/data/html/${PUBLIC_PATH}/
scp "$SCRIPTDIR/../dist/spa/index.html" ${SERVER}:/data/html/${PUBLIC_PATH}/

# Corregir permisos
ssh ${SERVER} chown -R www-data /data/html/${PUBLIC_PATH}/