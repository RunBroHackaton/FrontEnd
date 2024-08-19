const fs = require("fs");
const path = require("path");

// Path to the folder containing JSON files
const folderPath = "./contract_abis";

// Read all files in the directory
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // Filter out non-JSON files
  const jsonFiles = files.filter((file) => path.extname(file) === ".json");

  // Process each JSON file
  jsonFiles.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Read the JSON file
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      try {
        // Parse the JSON data
        const jsonObject = JSON.parse(data);

        // Extract the ABI part
        const abi = jsonObject.abi;

        // Convert the ABI array back to JSON format
        const newJsonData = JSON.stringify(abi, null, 2);

        // Write the new JSON data back to the file
        fs.writeFile(filePath, newJsonData, "utf8", (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
          console.log(`ABI content extracted and written to file: ${file}`);
        });
      } catch (error) {
        console.error(`Error parsing JSON in file ${file}:`, error);
      }
    });
  });
});
