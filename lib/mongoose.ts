import  mongoose  from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);   //it ensures that the query conditions only contain fields that are defined in your schema. If a query condition includes a field that is not defined in the schema, Mongoose will throw an error.

    if(!process.env.MONGODB_URL) return console.log("Mongodb Url not found");
    if(isConnected) return console.log("Already connected to mongodb");

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;
        console.log('Connected to mongodb');
        
    } catch (error) {
        console.log(error);        
    }
}