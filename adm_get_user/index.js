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
        await get(context, req);
        break;
    default:
        context.res = {
            status: 200,
            body: "Please get"
        };
        break
    }
}

//skal være async så de ikke blokerer for andet !!
//skal lave try catch for det kan være der slet ikke er en bruger 
async function get(context, req){
    try{
        let email = req.query.email;
        let user = await db.adm_get_user(fullname)
        context.res = {
            body: user
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}` 
        }
    }
}