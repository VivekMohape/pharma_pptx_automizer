import { Automizer } from 'pptx-automizer';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./input/data.json', 'utf8'));
const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const formatBullets = (arr) => arr.map(b => `• ${b}`).join('\n');

const automizer = new Automizer()
  .load('./backend/template.pptx')
  .setOutputDir('./output')
  .saveAs('final_combined.pptx');

const template = await automizer.presTemplate();

const slide0 = await template.useSlide(0);
slide0.replaceText('[[master_title]]', data.master_title);
slide0.replaceText('[[date]]', today);

const slide2 = await template.useSlide(2);
['es_box_1', 'es_box_2', 'es_box_3', 'es_box_4'].forEach(box => {
  if (data[box]) {
    slide2.replaceText(`[[${box}]]`, formatBullets(data[box]));
  }
});

await automizer.write();
console.log("✅ Slides updated and saved.");
