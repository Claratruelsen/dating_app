/* Det kan ikke fungere når det er inde i en klasse :D så det er bare great 
class system {
    constructor(user_id, email, password, fullname, age, region, gender, bio){
        this.user_id = user_id;
        this._email = email;
        this._password = password;
        this.fullname = fullname;
        this.age = age;
        this.region = region;
        this.gender = gender;
        this.bio = bio;
    }
*/
    // funktioner

   function create_user(){ //mangler at redirect til profilsiden
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
    
    
    function login(){
            var email = document.getElementById("email").value
            var password = document.getElementById("password").value
    
            alert("email =" + email + "and password = " + password + " Logged in succes")
            
            fetch(`http://localhost:7071/api/login`, {
                method: "GET",
                headers: {
                   "Content-Type": "application/json; charset-UTF-8"
               },
               redirect: 'follow',
               body: JSON.stringify({
                   "email": email,
                   "password": password
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
    
        // valider - lav API kald
        // gem i local storage så man forbliver logget ind
        // redirect til profil side
    

//}

