const { request } = require("express");
const { Connection, Request, TYPES} = require("tedious");
const config = require("./config.json")

var connection = new Connection(config)

function startDb(){
    return new Promise((resolve, reject) => {
        connection.on("connect", (err)=> {
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

function insert(payload){
    return new Promise((resolve, reject) => {
            const sql = `INSERT INTO dating_app.[user] (email, hashed_password, fullname, DOB, biography, gender, region) VALUES (@email, @regPassword, @fullName, @DOB, @biography, @gender, @region)` //@ notattionen så vi ikke kan blice SQL injected - dvs nogen kan pille ved vores DB
            const request = new Request(sql, (err) => {
                if (err){
                    reject(err)
                    console.log(err)
                }
            });
            request.addParameter("email", TYPES.VarChar, payload.email)
            request.addParameter("hashed_password", TYPES.Binary, payload.regPassword)
            request.addParameter("fullname", TYPES.VarChar, payload.fullname)
            request.addParameter("DOB", TYPES.Date, payload.DOB)
            request.addParameter("biography", TYPES.VarChar, payload.biography)
            request.addParameter("gender", TYPES.TinyInt, payload.gender)
            request.addParameter("region", TYPES.TinyInt, payload.region)  

            request.on("requestCompleted", (row) =>{
                console.log("User inserted", row);
                resolve("user inserted", row)
            });
            connection.execSql(request)
    });
}
module.exports.insert = insert;

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

