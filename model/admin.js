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

let tableHeaders = ["Number of users", "Number of matches"]

const create_stats_table = () => {
    while (stats_div.firstChild) stats_div.removeChild(stats_div.firstChild) // fjerner children hvis der er nogen - nulstiller div

    let stats_table = document.createElement('table') // laver table
    stats_table.className = 'stats_table'

    let stats_table_head = document.createElement('thead') // laver table header group element
    stats_table_head.className = 'stats_table_head'



    
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
