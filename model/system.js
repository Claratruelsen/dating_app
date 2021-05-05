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

            if (localStorage.getItem('user') {
            const login_details = JSON.parse(localStorage.getItem("user"))
            if (email === login_details.email && password === login_details.password) {
                console.log("logget ind skirt skirt")
                }else {
                        console.log("Ikke registreret endnu mæps")
                    }
                }else {
                    console.log("ikke registreret endnu")
                }
            }
           }

    


    function logout(){
    //ved at bruge removeItem kan vi slette brugeren fra localstorage, og dermed logges brugeren ud
    localStorage.removeItem('login_details', JSON.stringify('login_details'));
    }




////////////////////////ADMIN////////////////////////////////////

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
    
