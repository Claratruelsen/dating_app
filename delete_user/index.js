const db = require('../system/db');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.')

    try {
        await db.startDb(); //start db connection
    } catch (error) {
        console.log("Error connecting to the database", error.message)
    }

    switch (req.method) {
        case 'DELETE':
            await DELETE(context,req);
            break
        default:
            context.res = {
                body: "Please delete"
            };
            break
    }
}


async function DELETE(context, req){
    try{
        let payload = req.body;
        await db.delete_user(payload)
        context.res = {
            body: {status: 'Delete succes'}
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}`
        }
    }
}