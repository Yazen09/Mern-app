const multer=require ('multer');
const Path = require("path");
// multer config
module.exports=multer({
    storage:multer.diskStorage({}),
    fileFilter:(red, res, cb)=>{
        let ext=Path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !==".png") {
            cb(new error("filed type"),false);
            return;
         }
         cb(null,true);
    },
})