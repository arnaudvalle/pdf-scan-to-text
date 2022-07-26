const path = require('path');
const fs = require('fs/promises');

(async () => {
    const pages = ['2', '3'];
    let combinedOutput = '';

    for (let index = 0; index < pages.length; index++) {
        const currentPage = pages[index];

        console.log('Read page:', currentPage);

        try {
            const data = await fs.readFile(path.join(__dirname, '..', 'output', `${currentPage}.txt`), { encoding: 'utf8' });
            combinedOutput += data;

        } catch (err) {
            console.log(err);
        }
    }

    console.log('Combined output:', combinedOutput)
})();