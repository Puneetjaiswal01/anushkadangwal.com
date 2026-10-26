const {createAccess}=require('../server/access.cjs');
module.exports=(req,res)=>createAccess().handleMigration(req,res);
