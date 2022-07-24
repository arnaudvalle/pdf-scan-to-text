const { createWorker } = require('tesseract.js');
const path = require('path');
const fs = require('fs');

const worker = createWorker({
    langPath: path.join(__dirname, '..', 'lang-data'), 
    logger: m => console.log(m),
});

(async () => {
    await worker.load();
    await worker.loadLanguage('fra');
    await worker.initialize('fra');

    const { data: { text } } = await worker.recognize(path.join(__dirname, '..', 'images', 'chap1.png'));

    fs.writeFile(path.join(__dirname, '..', 'output', `chap1.txt`), text, function (err) {
        if (err) return console.log(err);
    });

    await worker.terminate();
})();