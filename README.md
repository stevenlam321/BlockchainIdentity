# BlockchainIdentity
A digitial identity framework using Hyperledger Fabric Blockchain Framework

Start Block browser
cd byzantine-browser
cp $HOME/hyperledger-fabric-network/.hfc-org1/* ./hfc-key-store
./runApiServer.sh
http://localhost:4001



const model = new MyModel(id);
model.fetch()
  .then(onModelFound)
  .catch(onModelNotFound);
  console.log(model); => only has its id and its type


const s = await Attribute.getOne('first_name')  => get full object


npm run cc:upgrade -- credential 1.1


https://doc.pm2.io/en/runtime/integration/transpilers/
pm2 install typescript
## Start app.ts in watch & restart:
pm2 start app.ts --watch