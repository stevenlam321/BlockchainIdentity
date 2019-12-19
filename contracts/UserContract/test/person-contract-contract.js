/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { PersonContractContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logging = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('PersonContractContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new PersonContractContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"person contract 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"person contract 1002 value"}'));
    });

    describe('#personContractExists', () => {

        it('should return true for a person contract', async () => {
            await contract.personContractExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a person contract that does not exist', async () => {
            await contract.personContractExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createPersonContract', () => {

        it('should create a person contract', async () => {
            await contract.createPersonContract(ctx, '1003', 'person contract 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"person contract 1003 value"}'));
        });

        it('should throw an error for a person contract that already exists', async () => {
            await contract.createPersonContract(ctx, '1001', 'myvalue').should.be.rejectedWith(/The person contract 1001 already exists/);
        });

    });

    describe('#readPersonContract', () => {

        it('should return a person contract', async () => {
            await contract.readPersonContract(ctx, '1001').should.eventually.deep.equal({ value: 'person contract 1001 value' });
        });

        it('should throw an error for a person contract that does not exist', async () => {
            await contract.readPersonContract(ctx, '1003').should.be.rejectedWith(/The person contract 1003 does not exist/);
        });

    });

    describe('#updatePersonContract', () => {

        it('should update a person contract', async () => {
            await contract.updatePersonContract(ctx, '1001', 'person contract 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"person contract 1001 new value"}'));
        });

        it('should throw an error for a person contract that does not exist', async () => {
            await contract.updatePersonContract(ctx, '1003', 'person contract 1003 new value').should.be.rejectedWith(/The person contract 1003 does not exist/);
        });

    });

    describe('#deletePersonContract', () => {

        it('should delete a person contract', async () => {
            await contract.deletePersonContract(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a person contract that does not exist', async () => {
            await contract.deletePersonContract(ctx, '1003').should.be.rejectedWith(/The person contract 1003 does not exist/);
        });

    });

});