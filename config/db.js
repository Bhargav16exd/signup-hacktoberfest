const mongoose = require("mongoose");


const connect_DB = async ()=> {
   
   
    mongoose.connect('YOUR DATABASE CONNECTION')
   .then((conn)=>{
     console.log(`Connected to DB : ${conn.connection.host}`)
    })
    .catch((err)=>{
       console.log(err.message);
       proccess.exit(1);
    })
 


}

module.exports = connect_DB