const User = require('../model/model.js');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');



exports.signup = async (req,res,next)=>{

const {name ,email , password,confirmPassword} = req.body;
console.log(req.body);
  
       if(!name || !email || !password){
        res.status(400).json({
            status:false,
            message:"Please Provide all neccessay data"
        })
       }
    
    const validEmail = emailValidator.validate(email);

     if(!validEmail){
        res.status(400).json({
            status:false,
            message:"Invalid Email Format"
        })
     }

    if(password !== confirmPassword){
        res.status(400).json({
            status:false,
            message:"Password Doesnt Match"
        })
    }

    try {

           const result = await User.create({
            name,
            email, 
            password
        })
    
        res.status(201).json({
            success: true ,
            message:"USER CREATED SUCCESSFULY",
            result
        })

        
    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
            
          }) 
        
    }

}

// SIGN IN 

exports.signIN = async (req, res) => {

     

    const { email , password } = req.body

    console.log(email,password)

    if(!email || !password ) {
        console.log(email,password)
        return res.status(400).json({
            status:false,
            message:"All fields are mandatory"
        })
        
    }

    try {

        const reqInfo = await User.findOne({
            email,
        })
        .select('+password');
        console.log(reqInfo)

        if(!reqInfo || password!=reqInfo.password){
            
           return res.status(400).json({
                status:false,
                message:'invalid credentials'
            })
        }


        // Token Creation 
       const token = reqInfo.jwttoken()
       User.password = undefined;

       const  cookieOption = {
        maxAge: 24*60*60*1000,
        httpOnly:true,
       }
       cookieCaller();
       
       function cookieCaller(){
        
        return res.cookie("token",token,cookieOption);

       }
        
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
            message:"Kindly Log In",
          }) 
        
    }
 
    
    
}

exports.login = async(res) =>{

    res.redirect('http://127.0.0.1:5501/CSS%20HTML%20Prac%20Programs/Login/index.html')
}

exports.getUser = async (req, res) => {

    res.setHeader('Access-Control-Allow-Methods', 'GET')

    // This brings ID from token which will be checked and decrypted in middleware 
    const idByReq = req.userInfoByToken.id;

    // Connection after checking conditions
    try {

        // This command check for ID in DataBase and returns data corresponding to that ID 
        const InfoByDb = await User.findById(idByReq);
       
        return res.status(400).json({
            success:true,
            message:"User Is recieved",
            data: InfoByDb 
        })

        
    } catch (error) {

       return res.status(400).json({
            success: false,
            message: error.message,
          }) 
          
    }
}

// Log OUt 

exports.logOut = (req,res) =>{
    try {

       res.cookie("token",'Null');
       return res.status(200).json({
            success:true,
            message:"LogOut Succes"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
            
          })    
    }
}