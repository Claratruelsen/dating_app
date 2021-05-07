/*class Admin {
    constructor(admin_email, admin_password){
        this.admin_email = admin_email;
        this.password = admin_password;
    }
*/
//OBS: admin login function er i system filen


//////////////////////////////////////////////adm log ud ///////////////////////////////////////////////
   function adm_logout(){
        //tilbage til login siden
        //ved at bruge removeItem kan vi slette brugeren fra localstorage, og dermed logges brugeren ud
        localStorage.removeItem('adm_login_details', JSON.stringify('adm_login_details'));
        window.location = "adminlogin.html"

    }


////////////////////////////////////////funktion der finder admin statistikker : /////////////////////////////////

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


///////////////////////////////////////////// funktion til at finde og vise en bruger //////////////////////////////////

// funktion der laver table
const adm_get_user_div = document.querySelector("div.adm_get_user") // Finder div i html
let get_user_table_headers = ["Email", "Fullname", "Age", "Gender", "Region", "Bio"]

const create_adm_get_user_table = () => {
while (adm_get_user_div.firstChild) adm_get_user_div.removeChild(adm_get_user_div.firstChild) // fjerner children hvis der er nogen - nulstiller div

let adm_get_user_table = document.createElement('table') // laver table
    adm_get_user_table.className = 'adm_get_user_table'

let adm_get_user_table_head = document.createElement('thead') // laver table header group element
    adm_get_user_table_head.className = 'adm_get_user_table_head'

let adm_get_user_table_header_row = document.createElement('tr') // laver tr til header
    adm_get_user_table_header_row.className = 'adm_get_user_table_header_row'


    table_headers.forEach(header => {
let adm_get_user_header = document.createElement('th') 
    adm_get_user_header.innerText = header

adm_get_user_table_header_row.append(adm_get_user_header) 
})


adm_get_user_table_head.append(adm_get_user_table_header_row)

adm_get_user_table.append(adm_get_user_table_head)

let adm_get_user_table_body = document.createElement('tbody')
adm_get_user_table_body.className = "adm_get_user_table_body"

adm_get_user_table.append(adm_get_user_table_body)
adm_get_user_div.append(adm_get_user_table)

}
//denne funktion sætter stats data ind i html 
const append_adm_get_user = (user) => {
const adm_get_user_table = document.querySelector('.adm_get_user_table') //finder table

let adm_get_user_table_body_row = document.createElement('tr')
    adm_get_user_table_body_row.className = 'adm_get_user_table_body_row'

let email_data = document.createElement('td')
    email_data.innerText = user.email

let fullname_data = document.createElement('td')
    fullname_data.innerText = user.fullname

let age_data = document.createElement('td')
    age_data.innerText = user.age

let gender_data = document.createElement('td')
    gender_data.innerText = user.gender

let region_data = document.createElement('td')
    region_data.innerText = user.region

let bio_data = document.createElement('td')
    bio_data.innerText = user.bio

adm_get_user_table_body_row.append(users_data, matches_data)
adm_get_user_table.append(adm_get_user_table_body_row)
}


// funktion der viser en user profil for admin
function adm_get_user(){

let email = document.getElementById("get_email").value 
fetch(`http://localhost:7071/api/adm_get_user?email=${email}`)
    .then(
        function(response){
            if (response.status!== 200){
                console.log("error" + response.status);
                return;
            }
            response.json().then(function(data){
                console.log(data);
            });
        }
    )
    .catch(function(err){
        console.log(err);
    })
 
    create_adm_get_user_table()
    append_adm_get_user(data)

    }
    





//admin skal kunne opdatere en brugers profil   
function adm_update_user(){

}


//admin skal kunne slette en brugers profil
function adm_delete_user() {
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

module.exports = adm_delete_user
module.exports = adm_logout
module.exports = adm_statistics