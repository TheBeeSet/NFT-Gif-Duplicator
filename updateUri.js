const {
    imageUri
} = require(`./config.js`);

const fs = require('fs')
const path = require('path');

for (const file of fs.readdirSync('./build/json/')) {
    let data = JSON.parse(fs.readFileSync('./build/json/' + file));
    data.image = imageUri + path.parse(file).name
    fs.writeFileSync('./build/json/' + file, JSON.stringify(data, null, 2));
}