import { mongoose, Schema } from "mongoose"
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    fullname : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    const encrypted = await bcrypt.hash(this.password.toString(), 12);
    this.password = encrypted;
    next();
});

mongoose.models = {};

const UserSchema = mongoose.model("User",userSchema);

export default UserSchema;