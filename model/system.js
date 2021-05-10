 //Det kan ikke fungere når det er inde i en klasse :D så det er bare great 
class system {
    constructor(system_id, email, password, fullname, age, bio, gender, region, adm_email, adm_password){
        this.system_id = system_id;
        this._email = email;
        this._password = password;
        this._fullname = fullname;
        this._age = age;
        this._bio = bio;
        this._gender = gender;
        this._region = region;
        this._adm_email = adm_email;
        this._adm_password = adm_password;
    }
}
    // funktioner
   function create_user(){
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var fullname = document.getElementById("fullname").value
        var age = document.getElementById("age").value
        var bio = document.getElementById("bio").value 
        var gender = document.getElementById("gender").value
        var region = document.getElementById("region").value
    
        console.log("Fetching ENDPOINT")
    
        fetch("http://localhost:7071/api/createUser_andGetUser", {
             method: "POST",
             headers: {
                "Content-Type": "application/json; charset-UTF-8"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                fullname: fullname,
                age: age,
                bio: bio,
                gender: gender,
                region: region
        }),
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            //brugeren gemmes i local storage for at kunne forblive logget ind
            localStorage.setItem('user', email);
            //bruger sendes videre til profil
            window.location = "profile.html"
        }).catch((err) => {
            console.log(err)
        })
    }

    ////////////////////////////////////////////////////LOGIN ////////////////////////////////////////////////
    function login(){
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
    
            fetch("http://localhost:7071/api/login", {
                method: "POST",
                headers: {
                   "Content-Type": "application/json; charset-UTF-8"
               },
               body: JSON.stringify({
                   email: email,
                   password: password
           }),
           })
           .then((response) => {
               return response.json()
           })
           .then((data) => {
               console.log(data)
               localStorage.setItem('user', email);
                window.location = "profile.html"
        }).catch((err) => {
            console.log(err)
        })

    }

////////////////////////ADMIN LOGIN////////////////////////////////////

//admin login
    function adm_login(){
    
        var adm_email = document.getElementById("adm_email").value
        var adm_password = document.getElementById("adm_password").value
        
        fetch(`http://localhost:7071/api/adm_login`, {
            method: "POST", //skal det være en post eller get ????
            headers: {
               "Content-Type": "application/json; charset-UTF-8"
           },
           redirect: 'follow',
           body: JSON.stringify({
               "adm_email": adm_email,
               "adm_password": adm_password
    }),
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
        if (localStorage.setItem('admin')) {
            const adm_login_details = JSON.parse(localStorage.getItem("admin"))
            if (email === adm_login_details.adm_email && password === adm_login_details.adm_password) {
                console.log("admin logget ind")
                }else {
                        console.log("Ikke logget ind endnu")
                }
            }
        localStorage.setItem('admin', email);
        window.location = "admin.html"

        }).catch((err) => {
            console.log(err)
        })
    }

