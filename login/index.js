const db = require("../system/db.js")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

try {
    await db.startDb(); // start db connection
} catch (error) {
    console.log("Error connecting to the database", error.message)
}
switch (req.method) {
    case 'GET':
        await login(context, req);
        break;
    }
}

//login funktion - get  
//skal være async så de ikke blokerer for andet !!
//skal lave try catch for det kan være der slet ikke er en bruger 
async function login(context, req){
    try{
        let email = req.query.email;
        let password = req.query.password;
        let user = await db.select(email, password)
        context.res = {
            body: user
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `User with that email and password does not exist - ${error.message}` 
        }
    }
}