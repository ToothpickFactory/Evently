#!/bin/bash
source ./.env
ssh root@$IP_ADDRESS "cd $EVENTLY_PATH && git pull && cd api-server && npm install && npm run reload"