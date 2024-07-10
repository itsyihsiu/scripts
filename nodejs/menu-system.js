const readline = require('readline');

class MenuSystem {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.menuOptions = {};
    }

    addOptions(optionsObject) {
        for (const [key, option] of Object.entries(optionsObject)) {
            if (typeof option === 'object' && option.name && option.action) {
                this.menuOptions[key] = {
                    name: option.name,
                    action: option.action
                };
            } else {
                console.warn(`Invalid option format for key "${key}". Skipping.`);
            }
        }
    }

    removeOption(key) {
        delete this.menuOptions[key];
    }

    displayMenu() {
        console.log('Please select an option:');
        for (const [key, option] of Object.entries(this.menuOptions)) {
            console.log(`${key}. ${option.name}`);
        }
    }

    processChoice(choice) {
        if (this.menuOptions.hasOwnProperty(choice)) {
            return this.menuOptions[choice].action();
        } else {
            console.log('Invalid choice. Please try again.');
            return false;
        }
    }

    promptUser() {
        this.displayMenu();
        this.rl.question('Enter your choice: ', (choice) => {
            const shouldExit = this.processChoice(choice);
            if (!shouldExit) {
                this.promptUser();
            } else {
                this.rl.close();
            }
        });
    }

    start() {
        this.promptUser();
    }
}

module.exports = MenuSystem;