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


//////////////////////////////////////////// USER /////////////////////////////////////////////////
//
//create user 
//
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
        const sql = `DELETE FROM dating_app.[user] WHERE email = @email` 
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

//like:
function like(payload){
    return new Promise((resolve, reject) => {
            const sql = `INSERT INTO dating_app.match (user_id1, user_id2) VALUES (@user_id1, @user_id2)` //@ notattionen så vi ikke kan blice SQL injected - dvs nogen kan pille ved vores DB
            const request = new Request(sql, (err) => {
                if (err){
                    reject(err)
                    console.log(err)
                }
            });
            request.addParameter('user_id1', TYPES.VarChar, payload.user_id1)
            request.addParameter('user_id2', TYPES.VarChar, payload.user_id2) 

            request.on("requestCompleted", (row) =>{
                console.log("User inserted", row);
                resolve("user inserted", row)
            });
            console.log("Request started");
            connection.execSql(request);
            console.log("Request completed");
    });
}
module.exports.like = like;
/////////////////////////////////////////////// matching //////////////////////////////////

function matching_algorithm(user1_fullname){
    return new Promise((resolve, reject) => { 
        const sql = "SELECT * FROM dating_app.filtered_matching_algorithm WHERE user1_fullname = @user1_fullname" // @ gør at man kan sætte den ind med new parameter
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: "No potential matches"})
            }
        });
        request.addParameter("user1_fullname", TYPES.VarChar, user1_fullname)
    
        request.on("row", (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    });
};
module.exports.matching_algorithm = matching_algorithm;

//
// set match criteria //
//
function set_match_criteria(payload){
    return new Promise((resolve, reject) => {
            const sql = `INSERT INTO dating_app.match_criteria(preferred_gender, age_min, age_max) VALUES (@preferred_gender, @age_min, @age_max)` //@ notattionen så vi ikke kan blice SQL injected - dvs nogen kan pille ved vores DB
            const request = new Request(sql, (err) => {
                if (err){
                    reject(err)
                    console.log(err)
                }
            });
            request.addParameter('preferred_gender', TYPES.VarChar, payload.preferred_gender)
            request.addParameter('age_min', TYPES.VarChar, payload.age_min)
            request.addParameter('age_max', TYPES.VarChar, payload.age_max)

            request.on("requestCompleted", (row) =>{
                console.log("Match criteria set", row);
                resolve("match criteria has been set", row)
            });
            console.log("Request started");
            connection.execSql(request);
            console.log("Request completed");
    });
}
module.exports.set_match_criteria = set_match_criteria;

//
// delete match
//
function delete_match(payload) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM dating_app.[match] WHERE user_id2 = @user_id2` 
        const request = new Request(sql, (err) => {
            if (err){
                reject(err)
                console.log(err)
            } 
        });
        request.addParameter('user_id2', TYPES.VarChar,payload.user_id2)
    
        request.on('requestCompleted', (row) => {
            console.log('match deleted',row)
            resolve('match deleted', row)
        });
        connection.execSql(request)
    })
}
module.exports.delete_match = delete_match;

//
// show match list
//

function show_matches(){
    return new Promise((resolve, reject) => { 
        const sql = `SELECT user_id2 FROM dating_app.[match] WHERE user_id2 = @user_id2` 
        const request = new Request(sql, (err, rowcount) => {
            if (err){
                reject(err)
                console.log(err)
            } else if (rowcount == 0){
                reject({message: "cannot matchlist stats"})
            }
        });
    
        request.on("row", (columns) => {
            resolve(columns)
        });
        connection.execSql(request)
    });
};

module.exports.show_matches = show_matches;

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
// admin statistik funktion 
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
function adm_update_user(payload){
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
module.exports.adm_update_user = adm_update_user;



//
// admin delete user
//
function adm_delete_user(payload) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM dating_app.[user] WHERE email = @email` 
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
module.exports.adm_delete_user = adm_delete_user;



