const express = require("express")
const router = express.Router()
const { uploadPicture, productImageResize } = require("../middlewares/uploadimages")
const { uploadImages, createInput, updateInput, getAllInput, getFileName, deleteInput, getInput} = require("../controller/inputCtrl")
const Input = require("../models/inputModel")

// router.put('/upload/:id',uploadPicture.array('images',10),productImageResize,uploadImages)

router.post('/', createInput);//
  
  router.put('/:id',updateInput);//

  
router.get('/',getAllInput);//

router.get('/:id',getInput);//

//   **
  router.get('/getfile/:filename',getFileName)

  router.delete('/:id', deleteInput);//



module.exports = router