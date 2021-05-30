const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log('ERROR: ', err);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        response = await axios.get(url);
        if(response.status === 200) {
            console.log(response.data);
        } else {
            console.log('Error: Request failed with status ', response.status);
            process.exit(1);
        }
    }
    catch {
        console.log('Error: could not find ', url);
    }
}

const input = process.argv[2];
const regex = new RegExp('^(http|https)://')
if (regex.test(input)) {
    webCat(input);
} else {
    cat(input);
}