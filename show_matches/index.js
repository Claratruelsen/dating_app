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
        await show_matches(context, req);
        break;
    default:
        context.res = {
            status: 200,
            body: "Please get or post"
        };
        break
    }
}


async function show_matches(context){
    try{
        let matches = await db.show_matches()
        context.res = {
            body: matches
        };
    } catch(error){
        context.res = {
            stats: 400,
            body: `${error.message}` 
        }
    }
}