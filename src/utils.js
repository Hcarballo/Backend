import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

async function writeFile(file, data) {
    try {
        await fs.promises.appendFile(__dirname + "/" + file, JSON.stringify(data) + '\n');
        return true;
    } catch (error) {
        console.log(error);
    }
}

async function readFile(file) {
    try {
        let readFilename = __dirname + "/" + file;
        console.log("readfile", readFilename);
        let result = await fs.promises.readFile(__dirname + "/" + file, "utf-8");
        let data = await JSON.parse(result);
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function deleteFile(file) {
    try {
        await fs.promises.unlink(__dirname + "/" + file);
        return true;
    } catch (error) {
        console.log(error);
    }
}

export default {
    writeFile,
    deleteFile,
    readFile
}