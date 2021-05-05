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
        await adm_login(context, req);
        break;
    }
}

async function adm_login(context, req){
    try{
        let adm_email = req.query.adm_email;
        let adm_password = req.query.adm_password;
        let admin = await db.adm_login(adm_email, adm_password)
        context.res = {
            body: admin
        };
        alert("Logged in succes")
    } catch(error){
        context.res = {
            status: 400,
            body: `Wrong admin login info - ${error.message}` 
        }
    }
}