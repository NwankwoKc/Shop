const factoryFunction = require('../Utility/utility');
const productsModel = require('../Model/products');
const userModel = require('../Model/signup');

exports.get = factoryFunction.getting(productsModel); 
exports.post = factoryFunction.posting(productsModel);
exports.getUserdetails = factoryFunction.gettingSpecific(productsModel);
exports.delete = factoryFunction.deleting(productsModel);
exports.update = async (req,res)=>{
    try{
        console.log("i am patching");
        const data = await productsModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:false
        })
        
        if (!data) {
            // If the document with the given ID doesn't exist
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json({
            status:"Success"
        })
    }catch{
        
    }
}
