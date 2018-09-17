# evently-server

## Global Setups
+ node version: 8.5.0
+ npm install pm2 -g

## Config
+ copy .env.example to .env
+ fill in proper keys
+ + EVENTLY_PATH= path to the evently project on the remote server
+ + IP_ADDRESS= IP address of remote server
+ + PORT= port the app will be running on
+ + DATABASE_URL= firebase database url
+ + JWT_KEY= secrect key for JWT

## Add firebase config
+ Frebase > Project Settings > Service Accounts > Generate New Private Key
+ Rename file to eventlyFirebaseKey.json
+ Place in the root of api-server/