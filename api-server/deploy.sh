#!/bin/bash
source ./.env
zip -r api-server.zip dist package.json
scp api-server.zip root@$IP_ADDRESS:~/
rm api-server.zip
ssh root@$IP_ADDRESS "cd ~ && unzip -o api-server.zip -d api-server/ && chmod -R 755 api-server && rm api-server.zip && cd api-server && npm install --production && npm run reload"