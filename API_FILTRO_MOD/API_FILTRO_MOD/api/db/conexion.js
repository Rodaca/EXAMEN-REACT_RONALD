import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
dotenv.config("../../");
const env = process.env;

export async function conexion(){
    try {   
        const uri = "mongodb+srv://"+env.ATLAS_USER+":"+env.ATLAS_PASSWORD+"@"+env.ATLAS_CLUSTER+".mongodb.net/"+env.ATLAS_DB;
        console.log(uri);
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        const client = await MongoClient.connect(uri, options);
        return client.db()
    } catch (error) {
        console.log(error);
        return {status: 500, message:error};
    }
}