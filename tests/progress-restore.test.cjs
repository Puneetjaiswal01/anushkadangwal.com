const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const base=process.env.CATALYST_TEST_URL||'http://127.0.0.1:8001/';
 let context=await browser.newContext(),page=await context.newPage();
 const deadlines={};
 for(const id of ['anushka','hardik','ojasvi']){
  await page.goto(base+'?profile='+id+'#tests');
  await page.evaluate(id=>{state.notes['restore-proof']=id+' personal note';state.focus=37;save()},id);
  await page.locator('#diagnostic').click();await page.locator('input[value="0"]').check();
  deadlines[id]=await page.evaluate(()=>quiz.ends);
 }
 // Only persistent browser storage survives a completely new context; no sessionStorage is copied.
 const stored=await context.storageState();await context.close();context=await browser.newContext({storageState:stored});page=await context.newPage();
 for(const id of ['anushka','hardik','ojasvi']){
  await page.goto(base+'?profile='+id);
  await page.locator('#testTimer').waitFor();
  assert.equal(await page.evaluate(()=>state.notes['restore-proof']),id+' personal note');
  assert.equal(await page.evaluate(()=>state.focus),37);
  assert.equal(await page.evaluate(()=>quiz.profileId),id);
  assert.equal(await page.evaluate(()=>quiz.ends),deadlines[id]);
  assert.equal(await page.locator('input[value="0"]').isChecked(),true);
  await page.locator('#submitTest').click();await page.locator('#confirmSubmit').click();
  await page.reload();assert.equal(await page.evaluate(()=>quiz),null);
  assert.equal(await page.evaluate(()=>state.results.length),1);
 }
 console.log('PASS all three profiles restore notes, focus and unfinished answers after browser restart; submitted drafts stay cleared');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
