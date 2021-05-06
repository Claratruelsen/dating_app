const db = require("../system/db.js")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        await db.startDb(); // start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET': //GET metode fordi vi "henter" brugere fra databasen der skal matche, da vi har lavet en SQL statement der sorterer userne
            await matching_algoritm(context, req);
            break;
        }
    }

async function matching_algoritm(context, req){
    try{
        let match = await db.matching_algoritm()
        context.res = {
            body: match
        };
        alert("Matching algoritm worked")
    } catch(error){
        context.res = {
            status: 400,
            body: `Matching algorithm did not work - ${error.message}` 
        }
    }
}