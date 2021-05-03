const { Connection, Request, TYPES} = require("tedious");
const config = require("./config.json");

var connection = new Connection(config)

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err)=> {
          if (err) {
              console.log("Connection failed")
              reject(err)
              throw err; 
          } else {
              console.log("Connected")
              resolve();
          }
        })
        connection.connect();
    })
}


module.exports.sqlConnection = connection;
module.exports.startDb = startDb;  


//create user 
function insert(payload){
    return new Promise((resolve, reject) => {
            const sql = `INSERT INTO dating_app.[user] (email, password, fullname, age, bio, gender, region) VALUES (@email, @password, @fullname, @age, @bio, @gender, @region)` //@ notattionen så vi ikke kan blice SQL injected - dvs nogen kan pille ved vores DB
            const request = new Request(sql, (err) => {
                if (err){
                    reject(err)
                    console.log(err)
                }
            });
            request.addParameter('email', TYPES.VarChar, payload.email)
            request.addParameter('password', TYPES.VarChar, payload.password)
            request.addParameter('fullname', TYPES.VarChar, payload.fullname)
            request.addParameter('age', TYPES.VarChar, payload.age)
            request.addParameter('bio', TYPES.VarChar, payload.bio)
            request.addParameter('gender', TYPES.VarChar, payload.gender)
            request.addParameter('region', TYPES.VarChar, payload.region)  

            request.on("requestCompleted", (row) =>{
                console.log("User inserted", row);
                resolve("user inserted", row)
            });
            console.log("Request started");
            connection.execSql(request);
            console.log("Request completed");
    });
}
module.exports.insert = insert;

//
//login
//
function login(payload){
    return new Promise((resolve, reject) => { 
        const sql = "SELECT * FROM dating_app.[user] WHERE email = @email AND password = @password" // @ gør at man kan sætte den ind med new parameter
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err) // hvis ikke email og password stemmer overens med det der er i DB så afvises den
                console.log(err)
            } else if (rowcount == 0){
                reject({message: "Email and/ or password i incorrect"})
            }
        });
        request.addParameter("email", TYPES.VarChar, payload.email)
        request.addParameter("password", TYPES.VarChar, payload.password)
    
        request.on("row", (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    });
};
module.exports.login = login;



//
//update user 
//
function update(payload){
    return new Promise((resolve, reject) => {
            const sql = `UPDATE dating_app.[user] SET
            email = @email,
            password = @password,
            fullname = @fullname,
            age = @age,
            bio = @bio,
            gender = @gender,
            region = @region
            FROM dating_app.[user]
            WHERE email = @email` 
            const request = new Request(sql, (err) => {
                if (err){
                    reject(err)
                    console.log(err)
                }
            });
            console.log(payload.email)

            request.addParameter('email', TYPES.VarChar, payload.email)
            request.addParameter('password', TYPES.VarChar, payload.password)
            request.addParameter('fullname', TYPES.VarChar, payload.fullname)
            request.addParameter('age', TYPES.VarChar, payload.age)
            request.addParameter('bio', TYPES.VarChar, payload.bio)
            request.addParameter('gender', TYPES.VarChar, payload.gender)
            request.addParameter('region', TYPES.VarChar, payload.region)  

            request.on("requestCompleted", (row) =>{
                console.log("User updated", row);
                resolve("user updated", row)
            });
            connection.execSql(request)
    });
}
module.exports.update = update;

//
// delete user function
//
function delete_user(payload) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM dating_app.[user] WHERE email = @email` //men sletter dette hele brugeren? 
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            } 
        });
        request.addParameter('email', TYPES.VarChar,payload.email)
    
        request.on('requestCompleted', (row) => {
            console.log('user deleted',row)
            resolve('user deleted', row)
        });
        connection.execSql(request)
    })
}
module.exports.delete_user = delete_user;





///////////////////////////////////////////ADMIN/////////////////////////////////////////////


function adm_login(payload){
    return new Promise((resolve, reject) => { 
        const sql = "SELECT * FROM dating_app.[admin] WHERE adm_email = @adm_email AND adm_password = @adm_password" // @ gør at man kan sætte den ind med new parameter
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err) // hvis ikke email og password stemmer overens med det der er i DB så afvises den
                console.log(err)
            } else if (rowcount == 0){
                reject({message: "Email and/ or password i incorrect"})
            }
        });
        request.addParameter("adm_email", TYPES.VarChar, payload.adm_email)
        request.addParameter("adm_password", TYPES.VarChar, payload.adm_password)
    
        request.on("row", (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    });
};
module.exports.adm_login = adm_login;


//
// statistik funktion 
//
function adm_statistics(){
    return new Promise((resolve, reject) => { 
        const sql = "SELECT (SELECT COUNT(ID) FROM dating_app.[user]) AS users,(SELECT COUNT(ID) FROM dating_app.[match]) AS matches" 
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: "cannot get stats"})
            }
        });
    
        request.on("row", (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    });
};
module.exports.adm_statistics = adm_statistics;









//
//get user funktion til admin
//
function select(fullname){
    return new Promise((resolve, reject) => { 
        const sql = "SELECT * FROM dating_app.[user] WHERE fullname = @fullname" // @ gør at man kan sætte den ind med new parameter
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: "User does not exist"})
            }
        });
        request.addParameter("fullname", TYPES.VarChar, fullname)
    
        request.on("row", (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    });
};
module.exports.select = select;

