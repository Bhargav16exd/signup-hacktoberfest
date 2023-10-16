const moongoose = require("mongoose");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var SECRET = 'YOUR SECRET KEY';

const user_Schema = new moongoose.Schema({

    name:{
      type:String,
      required:[true , 'username is Required'],
      minLength:[5,'Name must be 5 char'],
      trim: true,
    },
    email:{
      type:String,
      required:[true , 'userEmail is Required'],
      sparse:true,
      unique:true,
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String,
     
    },
    passwordExpiryDate:{
        type:String,
     
    }



},
{timestamps:true
})


user_Schema.methods = {
  jwttoken() {
    return JWT.sign(
      {id: this._id , email: this.email},
      SECRET,
      {expiresIn:'24h'}
    )
  }
}






module.exports = moongoose.model("userData",user_Schema);


