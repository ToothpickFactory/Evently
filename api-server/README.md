# evently-server

## Global Setups
+ node version: 11.0.0
+ npm install pm2 -g

## Config
+ copy .env.example to .env
+ fill in proper keys
+ + IP_ADDRESS= IP address of remote server
+ + PORT= port the app will be running on
+ + DATABASE_URL= firebase database url
+ + JWT_KEY= secrect key for JWT
+ + MODE= either HTTP or HTTPS

## Add firebase config
+ Firebase > Project Settings > Service Accounts > Generate New Private Key
+ Add Firebase .env

## Add HTTPS certs
+ Use the following article to setup HTTPS - https://medium.com/@yash.kulshrestha/using-lets-encrypt-with-express-e069c7abe625
+ Create a sslcert directory in the root of the application.
+ It's advised that you symlink the fullchain.pem and privkey.pem files to this folder. Makes renewal easier.
+ Renew HTTPS certs every 3 months - 
+ + In .env change PORT to 80 and MODE to HTTP
+ + pm2 restart 0
+ + letsencrypt renew
+ + Change PORT back to 443 and MODE to HTTPS
+ + pm2 restart 0
