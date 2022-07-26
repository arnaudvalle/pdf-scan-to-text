const { createWorker, createScheduler } = require('tesseract.js');
const path = require('path');
const fs = require('fs');

const scheduler = createScheduler();
const worker = createWorker({
    langPath: path.join(__dirname, '..', 'lang-data'), 
    logger: m => console.log(m),
});
scheduler.addWorker(worker);

(async () => {
    await worker.load();
    await worker.loadLanguage('fra');
    await worker.initialize('fra');

    const [first, last] = ['2', '3'];

    for (let currentPage = first; currentPage <= last; currentPage++) {
        console.log(`🧠✨🔮 Analysing page: ${currentPage}.jpeg`);
        
        const { data: { text } } = await scheduler.addJob('recognize', path.join(__dirname, '..', 'images', `${currentPage}.jpeg`));

        fs.writeFile(path.join(__dirname, '..', 'output', `${currentPage}.txt`), text, function (err) {
            if (err) return console.log(err);
        });

        console.log(`✅ Done writing file: ${currentPage}.txt`);
    };

    await worker.terminate();
})();