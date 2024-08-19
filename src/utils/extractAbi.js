const fs = require('fs');

// Path to the JSON file
const filePath = './contract_abis/GetStepsAPI.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse the JSON data
        const jsonObject = JSON.parse(data);

        // Extract the ABI part
        const abi = jsonObject.abi;

        // Create a new object with only the ABI
        const newJsonObject = { abi };

        // Convert the new object back to JSON
        const newJsonData = JSON.stringify(newJsonObject, null, 2);

        // Write the new JSON data back to the file
        fs.writeFile(filePath, newJsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('ABI extracted and written to file successfully.');
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
