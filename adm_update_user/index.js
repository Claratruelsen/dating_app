const db = require("../system/db.js")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

try {
    await db.startDb(); // start db connection
} catch (error) {
    console.log("Error connecting to the database", error.message)
}
switch (req.method) {
    case 'PATCH':
       console.log("update user")
        await adm_update_user(context, req);
        break
    default:
        context.res = {
            body: "Please update"
        };
        break
    }
}


async function adm_update_user(context, req){
    try{
        let payload = req.body;
        await db.adm_update_user(payload)
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