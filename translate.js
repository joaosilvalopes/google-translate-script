(async () => {
  const lang = process?.argv[2];

  if(!lang) {
    console.error("Insert a valid simple google translate api version 2 language as the command argument for this script to work :)");
    process.exit(1);
  }

  const dotenv = (await import('dotenv')).default;
  const Translate = (await import('@google-cloud/translate')).default.v2.Translate;
  const readFile = (await import('fs/promises')).default.readFile;
  const writeFile = (await import('fs/promises')).default.writeFile;

  dotenv.config();

  const text = await readFile('./input', { encoding: 'utf-8' });

  const translate = new Translate({ key: process.env.GOOGLE_API_KEY });

  const [translations] = await translate.translate(text, lang);

  const translatedText = (Array.isArray(translations) ? translations : [translations]).join("");

  await writeFile('./output', translatedText, { encoding: 'utf-8' });

  console.log("Successfully translated check output file");
})();
