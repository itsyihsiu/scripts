const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

const main = async () => {
    while (true) {
        const answer = await askQuestion('Enter something (type "exit" to stop): ');
        if (answer.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            break;
        } else {
            console.log(`You typed: ${answer}`);
        }
    }
};

main();
