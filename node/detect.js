const { createWorker, createScheduler, setLogging } = require('tesseract.js');
const path = require('path');
const fs = require('fs');

// Set to true to track down errors more easily.
setLogging(false);

const scheduler = createScheduler();

(async () => {
    // Load one (or more) workers for better performance.
    for (let i = 0; i < 2; i++) {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('fra');
        await worker.initialize('fra');

        scheduler.addWorker(worker);
    }

    // Initial value: first page / Up to: last page
    for (let currentPage = 13; currentPage <= 13; currentPage++) {
        console.log(`🧠✨🔮 Analysing page: ${currentPage}.jpeg`);
        
        const { data: { text } } = await scheduler.addJob('recognize', path.join(__dirname, '..', 'images', `${currentPage}.jpeg`));

        fs.writeFile(path.join(__dirname, '..', 'output', `${currentPage}.txt`), text, function (err) {
            if (err) return console.log(err);
        });

        console.log(`✅ Done writing file: ${currentPage}.txt`);
    };

    // We're all done - see ya 👋
    await scheduler.terminate();
})();