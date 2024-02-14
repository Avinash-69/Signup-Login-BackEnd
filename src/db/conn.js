const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/ChadRegistration", {

}).then(() => {
    console.log(`Connection Successful`);
}).catch((e) => {
    console.log(`No Connection` );
})



