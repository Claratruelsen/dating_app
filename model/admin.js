/*class Admin {
    constructor(admin_email, admin_password){
        this.admin_email = admin_email;
        this.password = admin_password;
    }
*/
//OBS: admin login function er i system filen

   function admin_logout(){
        // kommer ud på login siden igen
        //skal fixes med local storage eller med JWT 
    }

    function adm_statistics(){
        //en funktion som sørger for en count af hvormange mantches og brugere der er 


    }

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

const append_stats = (users, matches) => {
    const stats_table = document.querySelector('.stats_table') //finder vores stats table

    let stats_table_body_row = document.createElement('tr')

    
}



/*    
    function admin_update_user(){
        //knap som fører videre til en ny side med den specifikke profil
        //admin skal kunne opdatere en brugers profil

    }

    function admin_delete_user(){
        //denne funktion finder sted når man trykker på update user, 
        //admin skal kunne slette en brugers profil
    }
*/
