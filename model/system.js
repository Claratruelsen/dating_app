function createUser(){
    alert("hej");
    var email = document.getElementById("email").value
    var regPassword = document.getElementById("password").value
    var fullname = document.getElementById("fullname").value
    var DOB = document.getElementById("DOB").value
    var bio = document.getElementById("bio").value
    var gender = document.getElementById("gender").value
    var region = document.getElementById("region").value

    fetch("http://localhost:7071/api/createUser_andGetUser", {
         method: "POST",
         headers: {
            "Content-Type": "application/json; charset-UTF-8"
        },
        body: JSON.stringify({
            email: email,
            password: regPassword,
            fullname: fullname,
            DOB: DOB,
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
    }).catch((err) => {
        console.log(err)
    })
}

   
/*
    login(){
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        fetch(`http://localhost:7071/api/createUser_andGetUser?email=${email}?hashed_password=${password}`)
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

    
logout(){
    // "fjern" fra local storage 
    //tilbage til startside
        }

//}

*/