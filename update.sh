#!/usr/bin/env bash
if [[ `git status --porcelain` ]]; then
  docker-compose down
  git pull
  docker-compose up - --build
fi
