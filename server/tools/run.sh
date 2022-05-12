#!/usr/bin/bash

cd /c/Users/Admin/Desktop/gyarbete/server # Se till att bash får rätt working directory när den kör

rm -rf ../logs && mkdir ../logs

npm run start:prod
