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
        await matching_algorithm(context, req);
        break;
    default:
        context.res = {
            status: 200,
            body: "Please get"
        };
        break
    }
}

    /*
async function matching_algorithm(context, req){
    try{
        let payload = req.body
        console.log(payload)
        await db.matching_algorithm()
        context.res = {
            body: "succes"
        };
        alert("Matching algorithm worked")
    } catch(error){
        context.res = {
            status: 400,
            body: `Matching algorithm did not work - ${error.message}` 
        }
    }
}
*/

async function matching_algorithm(context, req){
    try{
        let  = req.query.user1_fullname;
        let matches = await db.matching_algorithm(user1_fullname)
        context.res = {
            body: matches
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No matches - ${error.message}` 
        }
    }
}