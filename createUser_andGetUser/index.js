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
    case 'POST':
       console.log("hej")
        await post(context, req);
        break
    default:
        context.res = {
            body: "Please get or post"
        };
        break
    }
}

//skal være async så de ikke blokerer for andet !!
//skal lave try catch for det kan være der slet ikke er en bruger 
async function get(context, req){
    try{
        let fullname = req.query.fullname;
        let user = await db.select(fullname)
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

async function post(context, req){
    try{
        let payload = req.body;
        await db.insert(payload)
        context.res = {
            body: {status: "Succes"}
        }

    } catch(error) {
        context.res = {
            status: 400,
            body: error.message 

        }
    }
}
