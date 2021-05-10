class User{
    constructor(user_id, email, password, fullname, age, region, gender, preferred_gender, age_min, age_max, img_id, bio, matchId){
        this.user_id = user_id;
        this._email = email;
        this._password = password;
        this._fullname = fullname;
        this._age = age;
        this._region = region;
        this._gender = gender;
        this._preferred_gender = preferred_gender;
        this._ageMin = age_min;
        this._ageMax = age_max;
        this._bio = bio;
    }}

    function update_user(){
        // checker om bruger er logget ind: 
        if (localStorage.getItem('user')) {
            const login_details = JSON.parse(localStorage.getItem("user"))
            if (email === login_details.email) {
                console.log("logget ind skirt skirt")
                }else {
                        console.log("Ikke logget ind endnu mæps")
                }
            }
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
 ////////////////////////////////////////////SET MATCH CRITERIA/////////////////////////////////////////////       
        
    function set_match_criteria(){
// checker om bruger er logget ind: 
        if (localStorage.getItem('user')) {
            const login_details = JSON.parse(localStorage.getItem("user"))
            if (email === login_details.email) {
                console.log("logget ind skirt skirt")
                }else {
                        console.log("Ikke logget ind endnu mæps")
                }
            }

            var preferred_gender= document.getElementById("preferred_gender").value
            var age_min = document.getElementById("age_min").value
            var age_max = document.getElementById("age_max").value

            console.log("Fetching ENDPOINT - matching criterias")
        
            fetch("http://localhost:7071/api/set_match_criteria", {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({
                    preferred_gender: preferred_gender,
                    age_min: age_min,
                    age_max: age_max,
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
        
        // lav noget funktion halløj som sørger for at man kommer ind på sin profilside når man har skrevet alt rigtigt ind - er det ikke lavet?? :)
        }

/////////////////////////////////////////////////DELETE USER////////////////////////////////////////////////////
    function delete_user() {
                // checker om bruger er logget ind: 
                if (localStorage.getItem('user')) {
                    const login_details = JSON.parse(localStorage.getItem("user"))
                    if (email === login_details.email) {
                        console.log("logget ind skirt skirt")
                        }else {
                                console.log("Ikke logget ind endnu mæps")
                        }
                    }
        let email = document.getElementById("email").value 
        fetch(`http://localhost:7071/api/delete_user`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            },
            body: JSON.stringify({ 
              "email": email
            }),
          })
          .then((response) => {
            return response.json()
        })
            .catch((err) => {
            console.log(err)
        })
        // fjerner nu brugeren fra local storage og fører bruger tilbage til landing page
        localStorage.removeItem('login_details', JSON.stringify('login_details'));
        window.location = "login.html"
    }

    ///////////////////////////////////////////// LOG OUT ////////////////////////////////////////////////////////
    function logout(){
        //tilbage til startside
        //ved at bruge removeItem kan vi slette brugeren fra localstorage, og dermed logges brugeren ud
        localStorage.removeItem('login_details', JSON.stringify('login_details'));
        window.location = "login.html"

    }



