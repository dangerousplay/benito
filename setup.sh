#!/usr/bin/env bash

NPM="npm"
BUCKET_NAME="benito-images"
MINIO_URL="http://localhost:9000"


docker-compose up -d

pushd "./benito-backend" || exit

${NPM} install
${NPM} run seed

popd || exit


configure_minio="mc alias set myminio $MINIO_URL minioadmin minioadmin"
create_bucket="mc mb myminio/$BUCKET_NAME"

docker run --rm --network host --entrypoint bash quay.io/minio/minio "$configure_minio && $create_bucket"

