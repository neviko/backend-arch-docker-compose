const defaults = require('./defaults')
const { connectMongo } = require('./mongoose.connect')

const connectToDB = async ({db})=>{

    switch (db) {
        case defaults.DB_TYPES.mongo:
            await connectMongo()
            break;

        case defaults.DB_TYPES.postgres:
        
            break;

        default:
            break;
    }

    
}

module.exports = connectToDB