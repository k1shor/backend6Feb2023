const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE)
.then(()=>console.log("DATABASE CONNECTED"))
.catch(error=>console.log(error))