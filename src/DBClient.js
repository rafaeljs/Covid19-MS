import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

const client = Stitch.initializeDefaultAppClient('<nome do app no mongodb-atlas>');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('<nome do seu banco>');

export const find = async (filter, sort) => {
    return await client.auth.loginWithCredential(new AnonymousCredential()).then(async () => {
        return await db.collection('Dados').find(filter).toArray().then(result => {
            if(sort)
                return result.sort(function(a, b) {
                    var dateA = new Date(a.date), dateB = new Date(b.date);
                    return dateA - dateB;
                })
            return result
        })
    })
}

export const aggregate = async (filter, sort) => {
    return await client.auth.loginWithCredential(new AnonymousCredential()).then(async () => {
        return await db.collection('Dados').aggregate(filter).toArray().then(result => {
            if(sort)
                return result.sort(function(a, b) {
                    var dateA = new Date(a.date), dateB = new Date(b.date);
                    return dateA - dateB;
                })
            return result
        })
    })
}
