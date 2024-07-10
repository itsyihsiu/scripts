const fs = require('fs').promises

class FileStorage {
    constructor(filename) {
        this.filename = filename
    }

    async saveData(data) {
        try {
            await fs.writeFile(this.filename, JSON.stringify(data, null, 2))
            console.log('Data saved successfully')
        } catch (error) {
            console.error('Error saving data:', error)
        }
    }

    async loadData() {
        try {
            const data = await fs.readFile(this.filename)
            return JSON.parse(data)
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('File not found. Returning empty object.')
                return {}
            }
            console.error('Error loading data:', error);
            return null;
        }
    }
}

// Usage
const storage = new FileStorage('userData.json');

// Saving data
storage.saveData({ name: 'John Doe', age: 30 });

// Loading data
storage.loadData().then(data => console.log('Loaded data:', data));