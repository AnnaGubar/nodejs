const fs = require("fs/promises");
// const fs = require("fs").promises;

//* запуск ⌨ `node text`

const fileOperation = async(filePath, action = "read", data = "") => {
    switch(action){
        case "read":
            const text = await fs.readFile(filePath, "utf-8");
            console.log(text);
            break;
        case "add":
            await fs.appendFile(filePath, data);
            break;
        case "replace":
            await fs.writeFile(filePath, data);
            break;
        default:
            console.log("Unknown action")
    }
}

fileOperation("text/file.txt");
// fileOperation("files/file.txt", "add", "\nfffffff");
// fileOperation("files/file.txt", "replace", "Не плюйся - никто не носит золота во рту");

