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
    case 'PATCH':
       console.log("opdater bruger")
        await patch(context, req);
        break
    default:
        context.res = {
            body: "Please get, post or update"
        };
        break
    }
}


async function patch(context, req){
    try{
        let payload = req.body;
        await db.update(payload)
        context.res = {
            body: {status: "User updated succesfully"}
        }

    } catch(error) {
        context.res = {
            status: 400,
            body: error.message 

        }
    }
}