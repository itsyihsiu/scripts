const sqlite3 = require('sqlite3').verbose();

// npm install sqlite3

class SQLiteStorage {
    constructor(dbFilename) {
        this.db = new sqlite3.Database(dbFilename);
        this.initTable();
    }

    initTable() {
        this.db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER
        )`);
    }

    saveData(data) {
        return new Promise((resolve, reject) => {
            const { name, age } = data;
            this.db.run('INSERT INTO users (name, age) VALUES (?, ?)', [name, age], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            });
        });
    }

    loadData() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    close() {
        this.db.close();
    }
}

// Usage
const storage = new SQLiteStorage('userData.sqlite');

// Saving data
storage.saveData({ name: 'John Doe', age: 30 })
    .then(id => console.log('Data saved with ID:', id))
    .catch(err => console.error('Error saving data:', err));

// Loading data
storage.loadData()
    .then(data => console.log('Loaded data:', data))
    .catch(err => console.error('Error loading data:', err));

// Don't forget to close the database connection when you're done
// storage.close();