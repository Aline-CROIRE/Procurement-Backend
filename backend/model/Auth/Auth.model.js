const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');


const Schema = mongoose.Schema;



let userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  role: {
    type: String, enum: {
      values: ['admin', 'HOD', 'MKG.officer', 'Manager','supplier'],
        message: '{VALUE} is not supported'
    }, required: true
  },
  resetToken: { type: String, required: false },
  resetTokenExpiration:{ type: String, required: false}
},
{
    timestamps: true
});

userSchema.methods.generateAuthToken = function() {
    const secretKey = 'your_secret_key'; // Replace with your secret key
    const token = jwt.sign({ id: this._id, role: this.role }, secretKey, { expiresIn: '1h' });
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports=User;

