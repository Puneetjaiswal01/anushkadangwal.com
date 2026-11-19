import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
const base='https://anushkadangwal.com';
const digest=data=>createHash('sha256').update(data).digest('hex');
const expected=digest(readFileSync('dist/index.html'));
let reason='';
for(let attempt=1;attempt<=24;attempt++){
 try{
  const response=await fetch(`${base}/?release=${process.env.GITHUB_SHA||Date.now()}`,{signal:AbortSignal.timeout(15000),headers:{'Cache-Control':'no-cache'}});
  if(!response.ok)throw new Error(`Page returned ${response.status}`);
  if(digest(Buffer.from(await response.arrayBuffer()))!==expected)throw new Error('The domain is still serving a different page.');
  const worker=await fetch(base+'/sw.js',{signal:AbortSignal.timeout(15000)});
  if(!worker.ok||!(await worker.text()).includes('registration.unregister()'))throw new Error('The retiring offline worker is not published.');
  for(const path of ['/api/auth','/manifest.webmanifest','/audio/a-little-place-to-land.mp3','/icons/icon-192.png','/src/main.jsx']){
   const removed=await fetch(base+path,{signal:AbortSignal.timeout(15000),method:'HEAD'});
   if(![404,410].includes(removed.status))throw new Error(`Removed path is still available: ${path} (${removed.status})`);
  }
  console.log(`Verified the exact page, cache retirement and removed app paths at ${base}`);process.exit(0);
 }catch(error){reason=error.message;console.log(`Deployment check ${attempt}/24: ${reason}`)}
 if(attempt<24)await new Promise(resolve=>setTimeout(resolve,15000));
}
throw new Error('Live verification failed: '+reason);
