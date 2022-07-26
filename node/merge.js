const path = require('path');
const fs = require('fs/promises');

(async () => {
    const [first, last] = [2, 3];
    let combinedOutput = '';

    for (let currentPage = first; currentPage <= last; currentPage++) {
        console.log('Read page:', currentPage);

        try {
            const data = await fs.readFile(path.join(__dirname, '..', 'output', `${currentPage}.txt`), { encoding: 'utf8' });
            combinedOutput += data + '\n';

        } catch (err) {
            console.log(err);
        }
    }

    console.log('Combined output:', combinedOutput);

    try {
        await fs.writeFile(path.join(__dirname, '..', 'output', 'final.txt'), combinedOutput);
    } catch (err) {
        console.log(err);
    }
})();