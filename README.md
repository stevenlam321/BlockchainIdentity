# APi Server
cd api/packages/server
npm run start
http://localhost:8080/


# Admin console
cd admin-console
npm run start
http://localhost:8081/

# Developer console
cd developer-console
npm run start
http://localhost:8082/


# Thirty party client
cd third-party-client
npm run start
http://localhost:8083/




# Start mongo db docker container
docker run --name  mongodb  -p 27017:27017 -d mongo
docker run mongodb

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

## Seeding
cd contracts/packages/server
ts-node  src/init.ts


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


Public KEY 
-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsksWZ4O2SXXtFWNosaB0PzGKelWzebWnLBQReVXXcw/25DAM4FmN4z91b5EqkujIs4uYmFCDWPKAdHdIK+D0RgDe8vZpTUmO8nysjc8sZ65KFkiw4IJPc7SNYLO8BeCqaHz/j3wxSvDQwi+bBf6jdofkPw8YWukZ2RCKA/dqKhorHSzkKf06Ztk4DFaUV7XaFB7bE2yTiacyPHr1rfVSgCpMfp1OgRV5xzlHJrCuK+QFTt4Udqh/lLpIWQBl0jwkZMITzlCmHllOEhfl7e0GY3poRgymx8RnQXeV6dqrw8O20cVJMcnY7DDI4/d/4qmSdWBbFjNyHkN3c4Q58qXbtwIDAQAB-----END PUBLIC KEY-----

Private LEY
-----BEGIN RSA PRIVATE KEY-----MIIEogIBAAKCAQEAsksWZ4O2SXXtFWNosaB0PzGKelWzebWnLBQReVXXcw/25DAM4FmN4z91b5EqkujIs4uYmFCDWPKAdHdIK+D0RgDe8vZpTUmO8nysjc8sZ65KFkiw4IJPc7SNYLO8BeCqaHz/j3wxSvDQwi+bBf6jdofkPw8YWukZ2RCKA/dqKhorHSzkKf06Ztk4DFaUV7XaFB7bE2yTiacyPHr1rfVSgCpMfp1OgRV5xzlHJrCuK+QFTt4Udqh/lLpIWQBl0jwkZMITzlCmHllOEhfl7e0GY3poRgymx8RnQXeV6dqrw8O20cVJMcnY7DDI4/d/4qmSdWBbFjNyHkN3c4Q58qXbtwIDAQABAoIBAFJzPOoj09GG8luYvBqgjAGJRHOsXDIlmihdI3OMCfVQ5ajCu8GoSGBVwVYVuK11bxLwtGGDoiopAtRZMQvxnKUe0/thjnLKWIu0sgtmSi+sPuCtPvaj7GAil9qnY4UIT2XAoGJXWWhBkxip8TPFfQxcbWXn8ihgca6a4mhRK0xKRhrzNXUc07QSZJaF0r4yBw/2V4yruHgdPTMcNaqk/9wFTfnl1vMHpK8lmYMlRXiAB7sMh5sA1lvmN8TNNXmsisY86Rf75HPKk0DEFsaRcqihhGnEtNLoIcJK564xP42rbVObfbW1URika6Yq4owMv5Mfl/FvM1KjYa+Jh271j/kCgYEA1e1HqswXSsFIZdb+T5eai8eJwF4uuINkqOYhYRlNC1bvOeFEvbB2uXeg9C0AjE2wbU8s9hS5rginsZnK2CWov3qV0aFByUnUTprn6To7TKV9jP0a9v35P/rGni5EY/os/tCrmOaZz1l+Pa6rkUdTi/ZBaWY0whfKB9IL1vTyokUCgYEA1Vu9lnuNhieDDA/WTWqxkMJnnQ1IBBg6mika2wvAvo7HJcdnk70YJwKQvd94fvASKLOtE1aEc8N2ZEbMhbwrJ97zGqDoRgWhKNO+4O5y7e9Q63EBtsBzoSlGCejfFhqAb5a665bWegS3uktucKWyqD0ftlKN2yXmOIpxNQKs48sCgYBbmbRcP/OhQM3dPYe7UPEN9SzYv/tFao2JfLDCQPEqb9kTcY/boVnU5JJ4u2RGr2ViCMr5u7od+PrFI1Ml5koxYy4Pivr+U6yi09WFmjeWBC6UVjRbmjhF2v188da68H6fxX4UhHlLvcg+ZTJ1jJMLlTBBD1B742/QlXIYYt4Z+QKBgDe8H2qQHAhPigw8lt7iYEBQiICeV5G6QpTC6CEQkOk2ow9bZ9NQMl7+bJEtL2z5icTYKv5CO5eCGAtZ81N8NEnWE+uA3SxtjAv+RH69y4gcXCck/i2fWJVhEsrD6oL7qVF9LpcccCqv0M75pYAHyQPp877NEgGNhPaAM9KFQGTBAoGAbR4sowWBmMhqQsLd0DFKFkAZlbHY+SRLkTAskWg2jg9OxBTodmJ8f/uC0Rgj8LgeJZRELzEyLlb6SWoDyiBeaSlbjd524abeymq78KnzUkMbHxzJIbimKDEQeXpweFizxw/5XPrO5dapPx/Cqs8mBooaO3TxbIpWUjEXAymPjys=-----END RSA PRIVATE KEY-----



{"app_id":"APP-ABC123","email":"1","mobile":"0","credentials":[{"credential_id":"C-hkidcard","attribute_ids":["A-dob","A-first_name"]}]}