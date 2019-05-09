const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    created: { type: Date, default: Date.now }
});

//executa criptografia da senha antes de salvar
UserSchema.pre('save', async function (next) {
    let user = this;
    if(!user.isModified('password')) return next(); 

    let salt =  await bcrypt.genSaltSync(10)
	user.password = await bcrypt.hashSync(user.password, salt);

});

module.exports = mongoose.model('User', UserSchema); 