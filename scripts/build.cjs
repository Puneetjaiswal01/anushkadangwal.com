const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),output=path.join(root,'public');fs.mkdirSync(output,{recursive:true});
for(const file of ['index.html','styles.css','themes.css','auth-client.js','profiles.js','app.js','content.js','universe.js','paper-bank.js','learning.js','exam-plan.js','personal.js'])fs.copyFileSync(path.join(root,file),path.join(output,file));
console.log('Built the static learning interface. Authentication and progress are served by private API functions.');
