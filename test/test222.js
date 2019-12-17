const { Chaincode, Helpers, NotFoundError, StubHelper } =  require('@theledger/fabric-chaincode-utils');
const Yup = require('yup');
console.log(Yup);


const verifiedArgs =  Helpers.checkArgs({"key":"wqwq"}, Yup.object()
.shape({
    key: Yup.string().required(),
}));
console.log(verifiedArgs.key);