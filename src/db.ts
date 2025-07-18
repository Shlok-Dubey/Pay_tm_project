import mongoose from "mongoose";

async function connection(dataBaseURL: string){
    try{
        await  mongoose.connect(dataBaseURL)
        console.log('DataBase is connected')

    }catch{
        console.error
    }
}
export {connection}