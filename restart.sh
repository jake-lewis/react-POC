#!/usr/bin/env bash
PATH=/usr/local/bin:$PATH
RUNNING=`docker-compose top`
if [[ "$RUNNING" != "" ]]; then
docker-compose down
fi
docker image prune -f
docker-compose up -d --build
