# pdf-scan-to-text

Convert a (badly) scanned PDF to formatted text.

## Step 1: Automator 🤖🔧

- Use Automator to split the PDF (1 document per page)
- Use Automator to transform each PDF page into an image

## Step 2: AI magic 🧠✨🔮

- For each image, extract the text with tesseract.js
- Write a file with whatever got extracted

```shell
npm run detect
```

## Step 3: 📄🔗=📕

- Merge all files together
   
```shell
npm run merge
```

- Format to HTML

```shell
npm run format
```
