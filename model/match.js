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
    }

//get matched !!
    match_algorithm(){
        //skal matche alle brugere indefor samme region - skal lave kald til DB som sorterer så der laves en liste over potentielle matches - dem som bor i samme area - tager bare oppe fra og ned
        //Altså denne matching algortime er jo reelt set lavet i system, men jeg ved bare ikke hvor jeg skal placere den
    }

    

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
