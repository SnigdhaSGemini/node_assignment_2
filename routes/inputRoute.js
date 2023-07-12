const express = require("express")
const router = express.Router()
const { createInput, updateInput, getAllInput, getFileName, deleteInput, getInput} = require("../controller/inputCtrl")


router.post('/', createInput);//to create input data
  
router.put('/:id',updateInput);//to update input data
  
router.get('/',getAllInput);//to get all input data

router.get('/:id',getInput);//to get specific input data

router.get('/getfile/:filename',getFileName)//to get file 

router.delete('/:id', deleteInput);//to delete input data



module.exports = router