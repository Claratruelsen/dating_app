const db = require("../system/db.js")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

try {
    await db.startDb(); // start db connection
} catch (error) {
    console.log("Error connecting to the database", error.message)
}
switch (req.method) {
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


async function post(context, req){
    try{
        let payload = req.body;
        console.log(payload)
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
