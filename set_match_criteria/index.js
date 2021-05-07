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
        await set_match_criteria(context, req);
        break
    default:
        context.res = {
            status: 200,
            body: "Please get or post"
        };
        break
    }
}

async function set_match_criteria(context, req){
    try{
        let payload = req.body;
        console.log(payload)
        await db.set_match_criteria(payload)
        context.res = {
            body: {status: "set match criteria succes"}
        }

    } catch(error) {
        context.res = {
            status: 400,
            body: error.message 

        }
    }
}
