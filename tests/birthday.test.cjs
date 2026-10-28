const {chromium}=require('playwright'),assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.clock.install({time:new Date('2026-10-28T12:00:00+05:30')});
 const base=process.env.CATALYST_TEST_URL||'http://127.0.0.1:8030/';
 await page.goto(base+'?profile=ojasvi');await page.locator('.birthday-dialog').waitFor();
 assert.equal(await page.locator('.birthday-dialog').evaluate(d=>d.open),true);
 await page.locator('.birthday-dialog .primary').click();await page.evaluate(()=>location.hash='notebook');await page.locator('#notebookDaily').waitFor();
 await page.evaluate(()=>location.hash='dashboard');await page.waitForFunction(()=>document.querySelector('.birthday-dialog').open);
 await page.locator('.birthday-dialog .close').click();await page.reload();await page.waitForFunction(()=>document.querySelector('.birthday-dialog').open);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:'/tmp/ojasvi-birthday-mobile.png'});
 for(const id of ['anushka','hardik']){await page.goto(base+'?profile='+id);assert.equal(await page.locator('.birthday-dialog').evaluate(d=>d.open),false);assert.equal(await page.locator('.birthday-banner').count(),0)}
 await page.clock.setFixedTime(new Date('2026-10-29T00:01:00+05:30'));await page.goto(base+'?profile=ojasvi');assert.equal(await page.locator('.birthday-dialog').evaluate(d=>d.open),false);assert.equal(await page.locator('.birthday-banner').count(),0);
 assert.deepEqual(errors,[]);console.log('PASS birthday appears on every open/dashboard return for Ojasvi only, fits mobile, and expires after 28 October in India');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
