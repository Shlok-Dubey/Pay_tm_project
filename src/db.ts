import mongoose, { model, Schema } from "mongoose";
const ObjectId = Schema.ObjectId;

async function connection(dataBaseURL: string) {
    try {
        await mongoose.connect(dataBaseURL)
        console.log('DataBase is connected')

    } catch {
        console.error
    }
}

const userSchema = new Schema({
    googleId: { type: Number, unique: true, required: true, id: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    userName: { type: String },
    password: { type: String },

})

const balanceSchema = new Schema({
    balanceId: { type: ObjectId, required: true, unique: true  },
    userId: { type: Number, required: true, unique: true, ref: 'userSchema' },
    amount: { type: Number }
})

const balanceModel = model('balance', balanceSchema)
const userModel = model('User', userSchema)
export { connection, userModel , balanceModel}