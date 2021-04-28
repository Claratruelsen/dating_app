class User{
    constructor(user_id, email, password, fullname, age, region, gender, preferred_gender, age_min, age_max, img_id, bio, matchId){
        this.user_id = user_id;
        this._email = email;
        this._password = password;
        this.fullname = fullname;
        this.age = age;
        this.region = region;
        this.gender = gender;
        this.preferred_gender = preferred_gender;
        this.ageMin = age_min;
        this.ageMax = age_max;
        this.bio = bio;
        this.matchId = matchId; 
        this.img_id = img_id;
    }}

    function update_user(){
        // sender videre til anden html side hvor man kan redigere alle oplysninger
        // herunder en slet bruger knap
            alert("opdater bruger")
            var email = document.getElementById("email").value
            var password = document.getElementById("password").value
            var fullname = document.getElementById("fullname").value
            var age= document.getElementById("age").value
            var bio = document.getElementById("bio").value
            var gender = document.getElementById("gender").value
            var region = document.getElementById("region").value
        
            fetch("http://localhost:7071/api/updateUser", {
                 method: "PATCH",
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
        }    
    

    /*delete_user() {
        //det skal være muligt at slette sin profil
    }

    logout(){
        // "fjern" fra local storage 
        //tilbage til startside
            }

}*/


