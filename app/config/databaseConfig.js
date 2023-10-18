const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB Connected")
    } catch (error) {
        console.log('db connect error: ', error.message);

    }

}
module.exports = connectDB