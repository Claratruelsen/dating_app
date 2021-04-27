function create_user(){ //mangler at redirect til profilsiden
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var fullname = document.getElementById("fullname").value
    var age = document.getElementById("age").value
    var bio = document.getElementById("bio").value 
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value

    fetch("http://localhost:7071/api/createUser_andGetUser", {
         method: "POST",
         headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "fullname": fullname,
            "age": age,
            "bio": bio,
            "gender": gender,
            "region": region
    }),
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })

// lav noget funktion halløj som sørger for at man kommer ind på sin profilside når man har skrevet alt rigtigt ind 

}

/*   

function login(email, password){
        var email = document.getElementById("email_login").value
        var password = document.getElementById("password_login").value
        fetch(`http://localhost:7071/api/login`)
            .then(
                function(response){ 
                    if (response.status !== 200){
                        console.log("Noget gik galt" + response.status);
                        return;
                    }
    
                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            )
            .catch(function (err){
                console.log(err);
            });
    };


    // valider - lav API kald
    // gem i local storage så man forbliver logget ind
    // redirect til profil side

*/    



