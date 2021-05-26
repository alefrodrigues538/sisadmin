const { MongoClient } = require('mongodb');

async function main() {

    const uri = "mongodb+srv://alefrodrigues538@gmail.com:J4kequb5@lvbankcluster0.iouo7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}