const Input = require("../models/inputModel")
const asyncHandler = require('express-async-handler');

// create input data
const createInput = asyncHandler(async (req, res) => {
    try {
      // get values from request
      const { name, email, mobile, password, gender,category, profilePicture } = req.body;
  
      // create new input
      const record = new Input({
        name,
        email,
        mobile,
        password,
        gender,
        category,
        profilePicture,
      });
  
      // save data else show error
      await record.save();
  
      res.status(201).json(record);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })
  
  // update input data
  const updateInput = asyncHandler( async (req, res) => {
    try {
      // get a particular user 'id'
      const { id } = req.params;
      // get values from request
      const { name, email, mobile, password, gender,category, profilePicture } = req.body;
  
      // find id and update its data
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

  // get all input data
  const getAllInput = asyncHandler( async (req, res) => {
    try {
      // find and store all data from database
      const records = await Input.find();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })

  // get a particular input data
  const getInput = asyncHandler( async (req, res) => {
         // get a particular user 'id'
    const { id } = req.params;
    try {
          // find id  data
      const records = await Input.findById(id);
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })
  
  // get file name
  const getFileName = asyncHandler(async  (req, res) => {
    const { filename } = req.params;
    // get filename data and send it to required position
    res.sendFile(path.join(__dirname, `public/uploads/${filename}`));
  })

  // delete input data of particular id
  const deleteInput = asyncHandler(async (req, res) => {
    try {    
      // get a particular user 'id'
      const { id } = req.params;
         // find id and delete its data
      await Input.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })

  // upload image url from cloudinary to database
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