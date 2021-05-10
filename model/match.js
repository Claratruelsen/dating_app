class Match{
    constructor(match_id, user1, user2, chat){
        this._matchId = match_id;
        this.user1 = user1;
        this.user2 = user2;
        this.chat = chat;
    }
}
//////////////////////////// matching_agorithm - finder et foreslået match og viser fuld profil på swipe.html//////////////////////////

// funktion der laver table
const match_profile_div = document.querySelector("div.match_profile") // Finder div i html
let match_profile_table_headers = ["Email", "Fullname", "Age", "Gender", "Region", "Bio"]

const create_match_profile_table = () => {
while (match_profile_div.firstChild) match_profile_div.removeChild(match_profile_div.firstChild) // fjerner children hvis der er nogen - nulstiller div

let match_profile_table = document.createElement('table') // laver table
    match_profile_table.className = 'match_profile_table'

let match_profile_table_head = document.createElement('thead') // laver table header group element
    match_profile_table_head.className = 'match_profile_table_head'

let match_profile_table_header_row = document.createElement('tr') // laver tr til header
match_profile_table_header_row.className = 'match_profile_table_header_row'


    table_headers.forEach(header => {
let match_profile_header = document.createElement('th') 
    match_profile_header.innerText = header

    match_profile_table_header_row.append(match_profile_header) 
})


match_profile_table_head.append(match_profile_table_header_row)

match_profile_table.append(match_profile_table_head)

let match_profile_table_body = document.createElement('tbody')
match_profile_table_body.className = "match_profile_table_body"

match_profile_table.append(match_profile_table_body)
match_profile_div.append(match_profile_table)

}
//denne funktion sætter stats data ind i html 
const append_match_profile = (user) => {
const match_profile_table = document.querySelector('.match_profile_table') //finder table

let match_profile_table_body_row = document.createElement('tr')
    match_profile_table_body_row.className = 'match_profile_table_body_row'

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

    match_profile_table_body_row.append(email_data, fullname_data, age_data, gender_data, region_data, bio_data)
    match_profile_table.append(match_profile_table_body_row)
}


//finder en foreslået bruger igennem et API kald med region, age og gender som filtre
//denne funktion kaldes også når man disliker en bruger (en ny bruger vises !!)
    function matching_algorithm(){
       // checker om brugeren er logget ind ved brug af local storage
        if (localStorage.getItem('user')) {
            const login_details = JSON.parse(localStorage.getItem("user"))
            if (email === login_details.email) {
                console.log("logget ind skirt skirt")
                }else {
                        console.log("Ikke logget ind endnu mæps")
                }
            }
        var user1_fullname = document.getElementById("user1_fullname").value 
        fetch(`http://localhost:7071/api/matching_algorithm?user1_fullname=${user1_fullname}`)
            .then(
                function(response){
                    if (response.status!== 200){
                        console.log("error" + response.status);
                        return;
                    }
                    response.json().then(function(data){
                        console.log(data);
                    });
                    window.location = "swipe.html" //Når der trykkes på 'start matching here" knappen sendes brugeren videre til swipe siden, hvor man kan like eller dislike relevante brugere
                    }
                )
                .catch(function(err){
                    console.log(err);
                })
                create_match_profile_table()
                append_match_profile(data)
                }

        //skal matche alle brugere indefor samme region - skal lave kald til DB som sorterer så der laves en liste over potentielle matches - dem som bor i samme area - tager bare oppe fra og ned
        //Altså denne matching algortime er jo reelt set lavet i system, men jeg ved bare ikke hvor jeg skal placere den

/////////////////////////////////////////like////////////////////////////////////////////////////////
    function like(){
        //checker om bruger er logget ind
        if (localStorage.getItem('user')) {
            const login_details = JSON.parse(localStorage.getItem("user"))
            if (email === login_details.email) {
                console.log("logget ind skirt skirt")
                }else {
                        console.log("Ikke logget ind endnu mæps")
                }
            }
            console.log("Fetching ENDPOINT")
            alert("Hurray - You have a new match!") //Alert som fungerer som pop-up besked, når to brugere har matchet.
        
            fetch("http://localhost:7071/api/like", {
                 method: "POST",
                 headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({ //user_id1 og user_id2 er værdierne i databasen, hvis pladser vi skal udfylde når der klikkes på like_btn.
                    user_id1: user_id1,
                    user_id2: user_id2,
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

//////////////////////////////////////////////////delete//////////////////////////////////////////////////////////////
function delete_match(){
    //checker om bruger er logget ind 
    if (localStorage.getItem('user')) {
        const login_details = JSON.parse(localStorage.getItem("user"))
        if (email === login_details.email) {
            console.log("logget ind skirt skirt")
            }else {
                    console.log("Ikke logget ind endnu mæps")
            }
        }
        let user_id2 = document.getElementById("user_id2").value 
    
        alert("Match has been deleted")
    
        fetch(`http://localhost:7071/api/delete_match`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset-UTF-8"
            },
            body: JSON.stringify({ 
              "user_id2": user_id2 // sletter 
            }),
          })
          .then((response) => {
            return response.json() //Når det foregående er gjort, så skal vi bruge matching_algorithm() for at gette en ny bruger, hvordan?
        })
            .catch((err) => {
            console.log(err)
        })
    }

/////////////////////////////////////////////show matches - viser liste over brugers matches ////////////////////////////////

// funktion der laver table med statistikkerne til admin: 
const match_list_div = document.querySelector("div.match_list") // Finder stats div i html
let table_headers = ["Match name"]

const create_match_list_table = () => {
while (match_list_div.firstChild) match_list_div.removeChild(match_list_div.firstChild) // fjerner children hvis der er nogen - nulstiller div

let match_list_table = document.createElement('table') // laver table
    match_list_table.className = 'match_list_table'

let match_list_table_head = document.createElement('thead') // laver table header group element
match_list_table_head.className = 'match_list_table_head'

let match_list_table_header_row = document.createElement('tr') // laver tr til header
match_list_table_header_row.className = 'match_list_table_header_row'


    table_headers.forEach(header => {
let match_list_header = document.createElement('th') 
    match_list_header.innerText = header

    match_list_table_header_row.append(match_list_header) 
})


match_list_table_head.append(match_list_table_header_row)

match_list_table.append(match_list_table_head)

let match_list_table_body = document.createElement('tbody')
match_list_table_body.className = "match_list_table_body"

match_list_table.append(match_list_table_body)
match_list_div.append(match_list_table)

}
//denne funktion sætter stats data ind i html 
const append_match_list = (match_list) => {
const match_list_table = document.querySelector('.match_list_table') //finder vores stats table

let match_list_table_body_row = document.createElement('tr')
match_list_table_body_row.className = 'match_list_table_body_row'

let match_list_data = document.createElement('td')
    match_list_data.innerHTML = match_list.matches

    match_list_table_body_row.append(match_list_data)
    match_list_table.append(match_list_table_body_row)

}

function show_matches(){
        // checker om bruger er logget ind: 
        if (localStorage.getItem('user')) {
            const login_details = JSON.parse(localStorage.getItem("user"))
            if (email === login_details.email) {
                console.log("logget ind skirt skirt")
                }else {
                        console.log("Ikke logget ind endnu mæps")
                }
            }

    var user_id2 = document.getElementById("user_id2").value 
    fetch(`http://localhost:7071/api/show_matches?user_id2=${user_id2}`)
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
            create_match_list_table()
            append_match_list(data)
            }

