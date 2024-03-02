/*
const authPage = (permissions) =>{
    return(req,res,next) => {
        const userRole=req.body.role
        if(permissions.includes(userRole)){
            next()
        }else{
            return res.status(401).json("you dont have permissions");
        }
    }
};
const authCourse = (req,res,next)=>{
    next()  ;
};
module.exports = {authPage,authCourse};

*/