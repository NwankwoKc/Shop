const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'../public/img/users')
    },
    filename:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage});

module.exports = upload;