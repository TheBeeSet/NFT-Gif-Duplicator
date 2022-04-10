const {
    supply,
    name,
    imageUri
} = require(`./config.js`);

const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path');

fs.rmSync('./build/gifs/', { recursive: true, force: true });
fs.rmSync('./build/json/', { recursive: true, force: true });
fs.mkdirSync('./build/gifs/');
fs.mkdirSync('./build/json/');

async function build() {
    for (i = 1; i <= supply; i++) {
        let chosenFile = fs.readdirSync('./gifs')[Math.floor(Math.random() * fs.readdirSync('./gifs').length)]
        fs.copyFile('./gifs/' + chosenFile, './build/gifs/' + i + '.gif', (err) => { if (err) throw err; });
        await fsPromises.copyFile('./json/' + path.parse(chosenFile).name + '.json', './build/json/' + i + '.json')
        .then(function() {
            let data = JSON.parse(fs.readFileSync('./build/json/' + i + '.json'));
            if (data.name) data.name = name.replace('{edition}', i);
            if (data.edition) data.edition = i;
            if (data.image) data.image = imageUri + i
            fs.writeFileSync('./build/json/' + i + '.json', JSON.stringify(data, null, 2));
        })
        console.log('Generating: ' + i + "/" + supply)
    }
} 

build()


