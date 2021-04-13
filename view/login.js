var loginBtn = document.getElementById("login")

loginBtn.addEventListener("click", function(){
    var email = document.getElementById("email").value
    var password = document.getElementById("hashed_password").value
    fetch(`http://localhost:7071/api/getUser?email=${email}?hashed_password=${password}`)
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
})
