const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require("fs")

// to upload images to database and fetch it into database as cloud URL
const multerStorage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,path.join(__dirname,'../public/uploads'))
    },
    filename: function(req,file,callback){
        const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1e9)
        callback(null,file.fieldname+"-"+uniqueSuffix+".jpeg")}
})

const multerFilter = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true)
    }
    else{
        callback({message:"Unsupported file format (supports only .jpeg / .jpg)"},false)
    }
}

const uploadPicture = multer({
    storage:multerStorage,
    fileFilter: multerFilter,
    limits:{fileSize:5000000}//5 mb
})

const productImageResize = async (req,res,next)=>{
    if(!req.files) return next()
    await Promise.all(req.files.map(async (file)=>{
            await sharp(file.path).resize(300,300).toFormat('jpeg').jpeg({quality:90}).toFile(`public/uploads/${file.filename}`)
            fs.unlinkSync(`public/uploads/${file.filename}`)
     }))
        next()
}

module.exports = { uploadPicture, productImageResize }