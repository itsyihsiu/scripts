const { MongoClient } = require('mongodb')

// npm install mongodb
// docker run -d -p 27017:27017 --name mongodb mongo

class MongoDBStorage {
    constructor(url, dbName) {
        this.url = url
        this.dbName = dbName
        this.client = null
        this.db = null
    }

    async connect() {
        this.client = await MongoClient.connect(this.url, { useUnifiedTopology: true });
        this.db = this.client.db(this.dbName);
        console.log('Connected to MongoDB');
    }

    async saveData(collectionName, data) {
        const collection = this.db.collection(collectionName);
        const result = await collection.insertOne(data);
        console.log(`Data saved with ID: ${result.insertedId}`);
        return result.insertedId;
    }

    async loadData(collectionName, query = {}) {
        const collection = this.db.collection(collectionName);
        return await collection.find(query).toArray();
    }

    async close() {
        if (this.client) {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        }
    }
}

async function main() {
    const storage = new MongoDBStorage('mongodb://localhost:27017', 'myDatabase');

    try {
        await storage.connect();

        // Save data
        const userId = await storage.saveData('users', { name: 'John Doe', age: 30 });

        // Load data
        const users = await storage.loadData('users');
        console.log('Loaded users:', users);

        // Load specific user
        const johnDoe = await storage.loadData('users', { name: 'John Doe' });
        console.log('John Doe:', johnDoe);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await storage.close();
    }
}

main();