const db = require("../system/db.js")

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    try {
        await db.startDb(); // start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }
    switch (req.method) {
        case 'GET': //GET metode fordi vi "henter" brugere fra databasen der skal matche, da vi har lavet en SQL statement der sorterer userne i en tabel i databasen, baseret på forskellige matching kriterier
            await get(context, req);
            break;
        }
    }

async function get(context, req){
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