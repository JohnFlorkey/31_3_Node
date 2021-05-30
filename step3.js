const fs = require('fs');
const axios = require('axios');
const isOutFile = (process.argv[2] === '--out');
const regex = new RegExp('^(http|https)://');
let outPath = '';
let input = '';
let output = '';

function writeOut(output){
    if(isOutFile) {
        fs.writeFile(outPath, output, 'utf8', err => {
            if(err) {
                console.log('Error: writing to ', outPath);
            }
        })
    } else {
        console.log(output);
    }
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log('ERROR: ', err);
            process.exit(1);
        }
        writeOut(data);
    })
}

async function webCat(url) {
    try {
        response = await axios.get(url);
        if(response.status === 200) {
            writeOut(response.data);
        } else {
            console.log('Error: Request failed with status ', response.status);
            process.exit(1);
        }
    }
    catch {
        console.log('Error: could not find ', url);
        process.exit(1);
    }
}

if(isOutFile) {
    outPath = process.argv[3];
    input = process.argv[4];
} else {
    input = process.argv[2];
}

if (regex.test(input)) {
    webCat(input);
} else {
    cat(input);
}