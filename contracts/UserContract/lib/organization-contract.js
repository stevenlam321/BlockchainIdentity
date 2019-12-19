/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');



class OrganizationContract extends Contract {

    async organizationExists(ctx, name) {
        const buffer = await ctx.stub.getState(name);
        return (!!buffer && buffer.length > 0);
    }

    async createOrganization(ctx, name) {
        const exists = await this.organizationExists(ctx, name);
        if (exists) {
            throw new Error(`The organization ${name} already exists`);
        }
        // const organization = new User({name,certificate});
        const organization  = {
            name
        };
        const buffer = Buffer.from(JSON.stringify(organization));
        await ctx.stub.putState(name, buffer);
        return organization;
    }

    async readOrganization(ctx, name) {
        const exists = await this.organizationExists(ctx, name);
        if (!exists) {
            throw new Error(`The organization ${name} does not exist`);
        }
        const buffer = await ctx.stub.getState(name);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateOrganization(ctx, name, newValue) {
        const exists = await this.organizationExists(ctx, name);
        if (!exists) {
            throw new Error(`The organization  ${name} does not exist`);
        }
        const asset = { name: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(name, buffer);
    }

    async deleteOrganization(ctx, name) {
        const exists = await this.organizationExists(ctx, name);
        if (!exists) {
            throw new Error(`The organization ${name} does not exist`);
        }
        await ctx.stub.deleteState(name);
    }

}

module.exports = OrganizationContract;
