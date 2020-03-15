var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    email: {
          type: String,
          unique: true,
          required: true
      },
    password: {
          type: String,
          required: true
      }
  });

  UserSchema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
  };

export default mongoose.model('User', UserSchema);