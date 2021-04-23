class User{
    constructor(userId, email, password, fullName, DOB, region, gender, preferredGender, minAge, maxAge, img, bio, matches){
        this.userId = userId;
        this._email = email;
        this._password = password;
        this.fullName = fullName;
        this.DOB = DOB;
        this.region = region;
        this.gender = gender;
        this.preferredGender = preferredGender;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.bio = bio;
        this.matches = matches; 
        this.img = img;
    }

    updateProfile(){
        // sender videre til anden html side hvor man kan redigere alle oplysninger
        // herunder en slet bruger knap
            alert("opdater bruger")
            var email = document.getElementById("email").value
            var regPassword = document.getElementById("hashed_password").value
            var fullname = document.getElementById("fullname").value
            var DOB = document.getElementById("DOB").value
            var biography = document.getElementById("biography").value
            var gender = document.getElementById("gender").value
            var region = document.getElementById("region").value
        
            fetch("http://localhost:7071/api/updateUser", {
                 method: "PATCH",
                 headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({ 
                    email: email,
                    regPassword: regPassword,
                    fullname: fullname,
                    DOB: DOB,
                    biography: biography,
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
    


    updateBtn(){
        //knap der opdaterer alle felterne i formen - hvis de ikke er fyldt ud så beholdes de gamle
    }

    like(){
        // hvis begge har liket skal en pop up besked komme OG profilen skal tilføjes til matchliste
    }

    dislike(){
        //viser ny foreslået match
    }

    matchAlgorithm(){
        //skal matche alle brugere indefor samme region - skal lave kald til DB som sorterer så der laves en liste over potentielle matches - dem som bor i samme area - tager bare oppe fra og ned
    }

    deleteUser() {
        //det skal være muligt at slette sin profil
    }
}