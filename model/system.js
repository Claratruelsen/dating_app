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

const { userInfo } = require("os") //hvad er OS?

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
            sessionStorage.setItem('user', email);
            window.location = "profile.html"
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
                method: "POST",
                headers: {
                   "Content-Type": "application/json; charset-UTF-8"
               },
               redirect: 'follow', //hvad gør det her??
               body: JSON.stringify({
                   "email": email,
                   "password": password
        }),
        })
        .then((response) => {
            return response.json()
        }).then((logindata) => {
            console.log(logindata)
            if (email == @email && password == @password){ //udkast til hvad jeg tror der skal stå
            //i ovenstående kan det være relevant at vi får opsat JWT tokens, så kan vi nemlig bare skrive, at logindata skal matche JWT tokens
            localStorage.setItem('user', JSON.stringify(userInfo)) //pt importerer den userInfo fra et andet sted - måske skal vi kalde noget andet her
            // vi stringifier, så vi er sikre på, at dataene i localStorage stemmer overens med databasens standard format
            } return logindata;
        }
        //window.location.href = "/view/profile.html" tror ikke vi bare kan redirecte sådan her i JS
        )/*.try () {
            
        }.catch (err) => {
            console.log(err)
        }
        // valider - lav API kald
        // gem i local storage så man forbliver logget ind
            /*Ift localstorage skal vi lige kigge på min opgave sammen Clara, jeg formåede nemlig kun at få det til at fungere ved tryk på en knap
            som jeg kaldte "gem bruger", eller sådan noget. jeg ved ikke om det er muligt både at gemme bruger, logge bruger ind OG tjekke DB samtidig*/
        // redirect til profil side 
    }
    
    function logout(){
    //ved at bruge removeItem kan vi slette brugeren fra localstorage, og dermed logges brugeren ud
    localStorage.removeItem('loginata', JSON.stringify('logindata'));
    }
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
        // skal man også lave noget local storage her? 
      sessionStorage.setItem('admin', adm_email);
        window.location = "admin.html"
    }).catch((err) => {
        console.log(err)
    })

    // kommer ind på ny HTML side med 
    // valider
                
    }
    

//}

