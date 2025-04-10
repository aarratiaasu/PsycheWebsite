const fs = require('fs');
const path = require('path');

const landingDir = path.join(__dirname, 'src', 'landing');
const files = fs.readdirSync(landingDir).filter(file => file.endsWith('.js'));

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(landingDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace default import with named import
  if (content.includes("import gsap from 'gsap'")) {
    content = content.replace("import gsap from 'gsap'", "import { gsap } from 'gsap'");
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
    updatedCount++;
  }
});

console.log(`\nTotal files updated: ${updatedCount}`);
