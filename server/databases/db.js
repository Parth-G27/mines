import mongoose from "mongoose";


const Connection = async (username, password, dbName) => {
    const URI = `mongodb+srv://${username}:${password}@cluster1.sqvug29.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URI);
        console.log("database connection done");
    } catch (error) {
        console.log("Error while connecting the database", error);
    }
}

export default Connection;