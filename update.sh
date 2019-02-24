#!/usr/bin/env bash
git fetch
if [[ $(git status --porcelain | wc -l) -gt 0 ]]; then
  docker-compose down
  docker image prune -f
  git pull
  docker-compose up -d --build
fi
