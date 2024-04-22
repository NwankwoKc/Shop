
//Get Request
exports.getting = (Model,popu)=> async (req,res,next)=>{
    try{
        let data = await Model.find()
        res.status(201).json({
            status:'success',
            data:data
        })
    }catch{
        next(Error)
    }
}
//GetById Request
exports.gettingSpecific = Model=> async (req,res,next)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.status(201).json({
            status:'suucees',
            data:data
        })
    }catch{
        next(Error)
    }
}

//Post Request
exports.posting = Model=> async (req,res,next)=>{
    try{
        const data = await Model.create(req.body);
        res.status(201).json({
            status:'success',
            data:data
        })
    }catch{
        next(Error)
    }
}

//Update Request
exports.updating = Model=> async (req,res,next)=>{
    try{
        const data = await Model.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:false
        });
        res.status(201).json({
            status:'success',
            data:data
        })
    }catch{
        next(Error)
    }
}

//Deleting Request
exports.deleting = Model => async(req,res,next)=>{
    try{
        const data = await Model.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status:'success',
            data:data
        })
    }catch{
        next(Error)
    }
}

//Patch Request
// exports.patching = Model => async (req,res,next)=>{
//     try{
//         const data = await Model.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:false
//         })
//         res.status(201).json({
//             status:'Success'
//         })
//     }catch{
//         next(Error)
//     }
// }