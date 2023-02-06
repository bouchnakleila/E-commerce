const multer=require("multer");

const Storage=multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"./Uploads")
    },
    filename:(req, file, cb)=>{
        cb(null,new Date().toISOString().replace(/:/g,"-")+ file.originalname)
    }
})
const fileFilter=(req, file, cb)=>{

    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg"
    )
    {
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload= multer({
    storage:Storage,
    fileFilter:fileFilter,
    limits:{
        _fileSize:1024 * 1024 * 1024 * 10
    }
})

module.exports=upload;