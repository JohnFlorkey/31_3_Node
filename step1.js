const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log('ERROR: ', err);
            process.exit(1);
        }
        console.log(data);
    })
}

const path = process.argv[2];
cat(path);