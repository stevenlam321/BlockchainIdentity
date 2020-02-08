# Start mongo db docker container
docker run --name  mongodb  -p 27017:27017 -d mongo


# Smart Contract Comands
## Start mongodb service
brew services start mongodb-community@4.2


## Start exited docker containers
docker start $(docker ps -a -q -f status=exited)

## Stop and remove docker containers
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)



## Start debug
hurl new (Reset first)
npm run cc:start:debug -- did
hurl invoke did did_init

## Update chaincode on debug mode
npm run cc:package -- did

# Start API Server
cd contracts/packages/server
nodemon src/app.ts



# BlockchainIdentity
A digitial identity framework using Hyperledger Fabric Blockchain Framework

Start Block browser
cd byzantine-browser
cp $HOME/hyperledger-fabric-network/.hfc-org1/* ./hfc-key-store
./runApiServer.sh
http://localhost:4001


{
   "selector": {
      "type": "did.person"
   }
}



docker start $(docker ps -a -q -f status=exited)

npm run cc:start:debug -- did

Run api server: 
nodemon src/app.ts


const model = new MyModel(id);
model.fetch()
  .then(onModelFound)
  .catch(onModelNotFound);
  console.log(model); => only has its id and its type


const s = await Attribute.getOne('first_name')  => get full object


npm run cc:upgrade -- credential 1.1
npm run cc:package -- credential

https://doc.pm2.io/en/runtime/integration/transpilers/
pm2 install typescript
## Start app.ts in watch & restart:
pm2 start app.ts --watch