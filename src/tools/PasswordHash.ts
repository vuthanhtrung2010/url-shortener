import { hash } from "@/scripts/hash";
import readline from 'readline';

async function hashPassword() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Type your password: ', async (password) => {
        rl.close();

        if (!password) {
            console.log('Password cannot be empty');
            return;
        }

        const hashedPassword = Buffer.from(hash(password)).toString('base64');
        console.log("Hashed password: ", hashedPassword, '\n', "Please put it in your environment variable file to use your password!");
    });
}

hashPassword().then(() => {});