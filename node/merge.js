const path = require('path');
const fs = require('fs/promises');

(async () => {
    const title = 'Le singe pèlerin';
    const author = "Wu Cheng'en";
    let combinedOutput = `# ${title}\n\n ## ${author}\n\n`;

    for (let currentPage = 1; currentPage <= 10; currentPage++) {
        console.log('👀 Reading page:', currentPage);

        try {
            const data = await fs.readFile(path.join(__dirname, '..', 'output', `${currentPage}.txt`), { encoding: 'utf8' });
            combinedOutput += data + '\n';

        } catch (err) {
            console.log(err);
        }
    }

    try {
        console.log('📄🔗=📕  Writing combined document');
        await fs.writeFile(path.join(__dirname, '..', 'output', 'final.txt'), combinedOutput);
    } catch (err) {
        console.log(err);
    }
})();