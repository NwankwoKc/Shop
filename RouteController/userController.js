const factoryFunction = require('../Utility/utility');
const userModel = require('../Model/signup');
const popu = 'cart';
exports.get = factoryFunction.getting(userModel,popu); 
exports.getSpecific = factoryFunction.gettingSpecific(userModel);


exports.update = async (req,res)=>{
    try{
        const data = userModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:'success',
            data
        })
    }catch{
        res.error()
    }
}


// exports.post = factoryFunction.posting(userModel);
// exports.postCart = factoryFunction.posting(cartModel);
// exports.getSpecificCart = factoryFunction.gettingSpecific(cartModel);
// exports.deleteCart = factoryFunction.deleting(cartModel);