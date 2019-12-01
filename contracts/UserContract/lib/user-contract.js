/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class UserContract extends Contract {

    async userExists(ctx, username) {
        const buffer = await ctx.stub.getState(username);
        return (!!buffer && buffer.length > 0);
    }

    async createUser(ctx, username) {
        const exists = await this.userExists(ctx, username);
        if (exists) {
            throw new Error(`The user ${username} already exists`);
        }
        var value = {
            username,
            firstName:"Steven",
            lastName: "Lam"
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(username, buffer);
    }

    async readUser(ctx, username) {
        const exists = await this.userExists(ctx, username);
        if (!exists) {
            throw new Error(`The user ${username} does not exist`);
        }
        const buffer = await ctx.stub.getState(username);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateUser(ctx, username, newValue) {
        const exists = await this.userExists(ctx, username);
        if (!exists) {
            throw new Error(`The user ${username} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(username, buffer);
    }

    async deleteUser(ctx, username) {
        const exists = await this.userExists(ctx, username);
        if (!exists) {
            throw new Error(`The user ${username} does not exist`);
        }
        await ctx.stub.deleteState(username);
    }

}

module.exports = UserContract;
