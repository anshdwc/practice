import fs from "fs/promises";

async function run() {
    await fs.writeFile("notes.txt", "Learning Node JS today");
    const text = await fs.readFile("notes.txt", "utf-8");
    console.log(text);
}

run();