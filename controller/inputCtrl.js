const Input = require("../models/inputModel")
const asyncHandler = require('express-async-handler');

const createInput = asyncHandler(async (req, res) => {
    try {
      const { name, email, mobile, password, gender,category, profilePicture } = req.body;
      // const profilePicture = req.file.filename;
  
      const record = new Input({
        name,
        email,
        mobile,
        password,
        gender,
        category,
        profilePicture,
      });
  
      await record.save();
  
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })
  
  const updateInput = asyncHandler( async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, mobile, password, gender,category, profilePicture } = req.body;
  
      const record = await Input.findByIdAndUpdate(
        id,
        { name, email, mobile, password, gender,category, profilePicture },
        { new: true }
      );
  
      res.json(record);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })

  const getAllInput = asyncHandler( async (req, res) => {
    try {
      const records = await Input.find();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })
  const getInput = asyncHandler( async (req, res) => {
    const { id } = req.params;
    try {
      const records = await Input.findById(id);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })
  
  const getFileName = asyncHandler(async  (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, `public/uploads/${filename}`));
  })

  const deleteInput = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      await Input.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })

const uploadImages = asyncHandler(async (req,res)=>{
    const {id} = req.params;
    try{
        const uploader = (path)=> cloudinaryUploadImage(path,"images")
        const urls = [];
        const files = req.files
        for(const file of files){
            const {path} = file
            const newPath = await uploader(path)
            console.log(newPath)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
        const findInput = await Input.findByIdAndUpdate(id,{
            images:urls.map((file)=>{
                return file;
            })
        },{new:true})
        res.json(findInput)
    }catch(err){
        throw new Error(err)
    }
})

module.exports={uploadImages, createInput, updateInput, getAllInput, getFileName, deleteInput, getInput }