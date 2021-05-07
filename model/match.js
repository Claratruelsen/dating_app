const likebtn = document.getElementById("likebtn");
const likecount = document.getElementById("likecount");
const dislikebtn = document.getElementById(".dislikebtn");
const discount = document.getElementById("discount");

let clicked = true;

likebtn.addEventListener("click", () => {
    if (!clicked) {
      clicked = true;
      likecount.textContent++;
    } else {
      clicked = false;
      likecount.textContent--;
    }
})


dislikebtn.addEventListener("click", () => {
    if (!clicked) {
        disclicked = true;
        count.textContent++;
    } else {
        clicked = false;
        discount.textContent--;
    }
})


/*class Match{
    constructor(match_id, user1, user2, chat){
        this._matchId = match_id;
        this.user1 = user1;
        this.user2 = user2;
        this.chat = chat;
    }*/

//get matched !!
/*
    function matching_algorithm(){

            let user1_fullname = document.getElementById("user1_fullname").value 
            fetch(`http://localhost:7071/api/matching_algorithm`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json; charset-UTF-8"
                },
                body: JSON.stringify({ 
                  "user1_fullname_matching": user1_fullname
                }),
              })
              .then((response) => {
                return response.json()
            })    
            .then((data) => {
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        */
        function matching_algorithm(){
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
                    }
                )
                .catch(function(err){
                    console.log(err);
                })
                }

    
        //skal matche alle brugere indefor samme region - skal lave kald til DB som sorterer så der laves en liste over potentielle matches - dem som bor i samme area - tager bare oppe fra og ned
        //Altså denne matching algortime er jo reelt set lavet i system, men jeg ved bare ikke hvor jeg skal placere den
<<<<<<< HEAD
    }

    
=======
>>>>>>> c11f7f2a035f60e383284416b62b2db4f53fca86

/*
    like(){
        // hvis begge har liket skal en pop up besked komme OG profilen skal tilføjes til matchliste



    }

    dislike(){
        //viser ny foreslået match



    }

    //funktioner
    delete_match(){
        //Evt brug noget kode fra delete user 

    }
}*/
