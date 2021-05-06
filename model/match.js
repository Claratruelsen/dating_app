class Match{
    constructor(match_id, user1, user2, chat){
        this._matchId = match_id;
        this.user1 = user1;
        this.user2 = user2;
        this.chat = chat;
    }

//get matched !!
    matching_algorithm(){
            let email = document.getElementById("match_email").value 
            fetch(`http://localhost:7071/api/matching_algorithm`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({ 
                  "match_email": email
                }),
              })
              .then((response) => {
                return response.json()
            })
                .catch((err) => {
                console.log(err)
            })
        }
    
        //skal matche alle brugere indefor samme region - skal lave kald til DB som sorterer så der laves en liste over potentielle matches - dem som bor i samme area - tager bare oppe fra og ned
        //Altså denne matching algortime er jo reelt set lavet i system, men jeg ved bare ikke hvor jeg skal placere den


    like(){
        // hvis begge har liket skal en pop up besked komme OG profilen skal tilføjes til matchliste
    }

    dislike(){
        //viser ny foreslået match
    }

    //funktioner
    delete_match(){
    }
}
