const bcrypt = require('bcrypt');

exports.confirmingPassword = async (candidatePass,userPass)=>{
    const check = await bcrypt.compare(candidatePass,userPass);
    return check
}