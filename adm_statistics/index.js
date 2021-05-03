async function statistics(context, req){
    try{
        let fullname = req.query.fullname;
        let user = await db.statistics(fullname)
        context.res = {
            body: user
        };
    } catch(error){
        context.res = {
            status: 400,
            body: `No user - ${error.message}` 
        }
    }
}