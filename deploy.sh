#!/bin/bash
ssh nourriture-prod@nourriture.dennajort.fr <<EOF
  cd ~/nourriture-bjtu-webapp
  git pull
  npm install --production
  grunt deploy
  bower install
  exit
EOF
