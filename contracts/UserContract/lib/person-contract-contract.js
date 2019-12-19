/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class PersonContractContract extends Contract {

    async personContractExists(ctx, personContractId) {
        const buffer = await ctx.stub.getState(personContractId);
        return (!!buffer && buffer.length > 0);
    }

    async createPersonContract(ctx, personContractId, value) {
        const exists = await this.personContractExists(ctx, personContractId);
        if (exists) {
            throw new Error(`The person contract ${personContractId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(personContractId, buffer);
    }

    async readPersonContract(ctx, personContractId) {
        const exists = await this.personContractExists(ctx, personContractId);
        if (!exists) {
            throw new Error(`The person contract ${personContractId} does not exist`);
        }
        const buffer = await ctx.stub.getState(personContractId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updatePersonContract(ctx, personContractId, newValue) {
        const exists = await this.personContractExists(ctx, personContractId);
        if (!exists) {
            throw new Error(`The person contract ${personContractId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(personContractId, buffer);
    }

    async deletePersonContract(ctx, personContractId) {
        const exists = await this.personContractExists(ctx, personContractId);
        if (!exists) {
            throw new Error(`The person contract ${personContractId} does not exist`);
        }
        await ctx.stub.deleteState(personContractId);
    }

}

module.exports = PersonContractContract;
