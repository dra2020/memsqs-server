#!/bin/sh

SRCSERVER=./simplesqs-server
DST=${SRCSERVER}.deploy

if [ ! -e ${SRCSERVER} ]; then
	echo Run archive script from parent directory of ${SRCSERVER}
	exit 1
fi

echo INFO: archiving...

rm -rf ${DST}
mkdir ${DST}
mkdir ${DST}/node_modules

# Prune packaged node_modules (aws-sdk is packaged into bundle to minimize overall size)
(cd ${SRCSERVER}; npm prune --production; rm -rf node_modules/aws-sdk)
cp -R ${SRCSERVER}/node_modules/* ${DST}/node_modules/

# Reset for development
(cd ${SRCSERVER}; npm install)

# Not including package.json will prevent npm install on deploy
#cp ${SRCSERVER}/package.json ${DST}/package.json

cp ${SRCSERVER}/server.js ${DST}
cp -R ${SRCSERVER}/dist ${DST}

cd ${DST}
zip -q -r archive-simplesqs.zip .
mv archive-simplesqs.zip ..
cd ..
rm -rf ${DST}
echo INFO: Archive created in archive-simplesqs.zip
exit 0
