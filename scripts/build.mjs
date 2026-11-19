import {rm,mkdir,copyFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});
await mkdir('dist',{recursive:true});
for(const file of ['index.html','sw.js']) await copyFile(file,'dist/'+file);
console.log('Built the page and the retiring service worker.');
