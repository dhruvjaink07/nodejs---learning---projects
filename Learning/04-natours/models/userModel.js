const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    role:{
        type: String,
        enum: ['user','guide','lead-guide','admin'],
        default: 'user'
    },
    password:{
        type: String, 
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    confirmPassword:{
        type: String, 
        required: [true, 'Password must be confirmed to validate the user'],
        minlength: 8,
        // only gonna work for save and create !!!!!!!!!!!!!
        validate:{
            validator: function(el){
                return el === this.password; // basically to check password for confirmation 
            },
            message: 'Passwords are not same'
        }
    },
    passwordChangedAt : Date, 
});

userSchema.pre('save', async function(next){
    // This is basically be run only when the password is field is being modified
    if(!this.isModified('password')){
        return next();
    }

    // Hashes the password with the cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // deletes the unused confirmPassword field from being saved in the database
    this.confirmPassword = undefined;

    next();
})

// Instance Method is a method that is certainly available on all the documents 
userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
  
      return JWTTimestamp < changedTimestamp;
    }
  
    // False means NOT changed
    return false;
  };
  
const User = mongoose.model('User',userSchema);

module.exports = User; 