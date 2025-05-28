const mongoose = require('mongoose');

module.exports = async () => {
    const mongoUri = "mongodb+srv://sumitmishra:sumitmishra@cluster0.11ikk.mongodb.net/?retryWrites=true&w=majority";
    try {
        const connect = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connect :', connect.connection.host);
    } catch (e) {
        console.log('error', e);
        process.exit(1);
    }
}
