//const { response } = require("express")

var form = document.getElementById("reg-form")

form.addEventListener("createUser", function(e){
    e.preventDefault()

    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var fullname = document.getElementById("fullname").value
    var DOB = document.getElementById("DOB").value
    var biography = document.getElementById("biography").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value

    fetch("http://localhost:7071/api/getUser", {
         method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            fullname: fullname,
            DOB: DOB,
            biography: biography,
            gender: gender,
            region: region
        }),
        headers: {
            "Content-Type": "application/json; charset-UTF-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
})


