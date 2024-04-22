const user = require('../Model/signup');
const product = require('../Model/products');
//add to cart
exports.posting = async (req,res)=>{
    try{
        const sessions = req.cookies.sessionId;
        console.log(sessions);
        const productData = await product.findById(req.params.id);
        console.log(productData._id)
        const sessionData = await user.findOne({SessionId:sessions});
        console.log(sessionData)
        const originalData = await user.findByIdAndUpdate(sessionData.id,{
            $push:{cart:productData._id}
        },{new:true})
        res.status(200).json({
            status:"Success"
        })
    }catch{
         console.log("Error")
    }
}

//remove cart
exports.deleteing = async (req,res)=>{
    try{
        const sessions = req.cookies.sessionId;
        const data = await user.findOne({SessionId:sessions});
        const originalData = await user.findByIdAndUpdate(data.id,{
            $pull:{cart:req.params.id}
        },{new:true})
        res.status(200).json({
            status:"Success"
        })
    }catch{
        console.log("error")
    }
}

//getting cart
exports.getCart = async(req,res)=>{
    try{
        const data = await userModel.findById(req.params.id); 
        const realData = data.cart;
    }catch{

    }
}