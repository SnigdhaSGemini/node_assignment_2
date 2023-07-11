const  mongoose  = require("mongoose")

const dbConnect =  async () =>{
    try{
    const connect = await  mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB Connected ")
}
    catch(err){
        console.log(err)
    }
}
module.exports = dbConnect;