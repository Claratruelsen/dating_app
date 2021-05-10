class Admin {
    constructor(adm_email, adm_password){
        this._adm_email = adm_email;
        this._adm_password = adm_password;
    }
}
//OBS: admin login function er i system filen


////////////////////////////////////////funktion til admin statistikker + at vise dem i html: /////////////////////////////////

// funktion der laver table med statistikkerne til admin: 
const stats_div = document.querySelector("div.stats") // Finder stats div i html
let table_headers = ["Number of users", "Number of matches"]

const create_stats_table = () => {
while (stats_div.firstChild) stats_div.removeChild(stats_div.firstChild) // fjerner children hvis der er nogen - nulstiller div

let stats_table = document.createElement('table') // laver table
    stats_table.className = 'stats_table'

let stats_table_head = document.createElement('thead') // laver table header group element
    stats_table_head.className = 'stats_table_head'

let stats_table_header_row = document.createElement('tr') // laver tr til header
    stats_table_header_row.className = 'stats_table_header_row'


    table_headers.forEach(header => {
let stats_header = document.createElement('th') 
    stats_header.innerText = header

stats_table_header_row.append(stats_header) 
})


stats_table_head.append(stats_table_header_row)

stats_table.append(stats_table_head)

let stats_table_body = document.createElement('tbody')
    stats_table_body.className = "stats_table_body"

stats_table.append(stats_table_body)
stats_div.append(stats_table)

}
//denne funktion sætter stats data ind i html 
const append_stats = (stats) => {
const stats_table = document.querySelector('.stats_table') //finder vores stats table

let stats_table_body_row = document.createElement('tr')
    stats_table_body_row.className = 'stats_table_body_row'

let users_data = document.createElement('td')
    users_data.innerHTML = stats.users

let matches_data = document.createElement('td')
    matches_data.innerHTML = stats.matches

stats_table_body_row.append(users_data, matches_data)
stats_table.append(stats_table_body_row)

}

function adm_statistics(){

 // checker om admin er logget ind: 
    if (localStorage.getItem('admin')) {
        const login_details = JSON.parse(localStorage.getItem("admin"))
        if (email === login_details.email) {
            console.log("logget ind skirt skirt")
            }else {
                    console.log("Ikke logget ind endnu mæps")
            }
        }

    fetch("http://localhost:7071/api/adm_statistics", {
    method: "GET",
    headers: {
    "Content-Type": "application/json; charset-UTF-8"
    }
    })
    .then((response) => {
    return response.json()
    })
    .then((data) => {
    console.log(data)
    create_stats_table()
    append_stats(data)
    })
    }


///////////////////////////////////////////// adm update user //////////////////////////////////


function adm_update_user(){
 // checker om admin er logget ind: 
 if (localStorage.getItem('admin')) {
    const login_details = JSON.parse(localStorage.getItem("admin"))
    if (email === login_details.email) {
        console.log("logget ind skirt skirt")
        }else {
                console.log("Ikke logget ind endnu mæps")
        }
    }

        alert("bruger opdateret")
        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var fullname = document.getElementById("fullname").value
        var age= document.getElementById("age").value
        var bio = document.getElementById("bio").value
        var gender = document.getElementById("gender").value
        var region = document.getElementById("region").value
    
        fetch("http://localhost:7071/api/adm_update_user", {
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
    

//////////////////////////////////////////////////adm delete user///////////////////////////////////////
//admin skal kunne slette en brugers profil
function adm_delete_user() {

     // checker om admin er logget ind: 
     if (localStorage.getItem('admin')) {
        const login_details = JSON.parse(localStorage.getItem("admin"))
        if (email === login_details.email) {
            console.log("logget ind skirt skirt")
            }else {
                    console.log("Ikke logget ind endnu mæps")
            }
        }
        
    let email = document.getElementById("email").value 

    alert("User has been deleted")

    fetch(`http://localhost:7071/api/adm_delete_user`, {
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
}

//////////////////////////////////////////////adm log ud ///////////////////////////////////////////////
function adm_logout(){
    //tilbage til login siden
    //ved at bruge removeItem kan vi slette brugeren fra localstorage, og dermed logges brugeren ud
    localStorage.removeItem('adm_login_details', JSON.stringify('adm_login_details'));
    window.location = "adminlogin.html"

}
