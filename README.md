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