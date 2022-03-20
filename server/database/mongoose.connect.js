const mongoose = require('mongoose')

exports.connectMongo = async ()=>{
    const connect = await mongoose.connect(process.env.MONGO_URI,{
        dbName: process.env.DB_NAME,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })

    console.log(`MongoDB connected: ${connect.connection.host}`);
}

