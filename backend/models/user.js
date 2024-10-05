import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema ({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 2,
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    occupation: String,
    transactions: Array,
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'admin'
    }
},
    {timestamps: true},
)

const User = mongoose.model('user', UserSchema)

export { User }