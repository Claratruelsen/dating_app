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
        await adm_statistics(context, req);
        break;
    case 'POST':
       console.log("POST req ready to start")
        await post(context, req);
        break
    default:
        context.res = {
            status: 200,
            body: "Please get or post"
        };
        break
    }
}


async function adm_statistics(context){
    try{
        //let stats = req.query.stats;
        let stats = await db.adm_statistics()
        context.res = {
            body: stats
        };
    } catch(error){
        context.res = {
            stats: 400,
            body: `${error.message}` 
        }
    }
}