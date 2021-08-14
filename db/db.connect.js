const mongoose = require('mongoose');
const mySecret = process.env['dbURI']

const dbConnect = () => {
  mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => console.log("MongoDB connected")).catch((err) => console.error(err))
}


module.exports = { dbConnect };