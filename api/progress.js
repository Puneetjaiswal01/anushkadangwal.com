const {createAccess}=require('../server/access.cjs');
module.exports=(req,res)=>createAccess().handleProgress(req,res);
