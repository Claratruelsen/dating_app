class User{
    constructor(userId, email, password, fullName, DOB, region, gender, preferredGender, minAge, maxAge, img, bio, matches){
        this.userId = userId;
        this._email = email;
        this._password = password
        this.fullName = fullName;
        this.DOB = DOB;
        this.region = region;
        this.gender = gender;
        this.preferredGender = preferredGender;
        this.minAge = minAge;
        this.maxAge = maxAge;
        this.bio = bio;
        this.matches = matches; 
        this.img = img;
    }

    login(){
        // valider - lav API kald
        // gem i local storage så man forbliver logget ind
        // redirect til profil side
            }
        
    logout(){
        // "fjern" fra local storage 
        //tilbage til startside
            }

    updateProfile(){
        // sender videre til anden html side hvor man kan redigere alle oplysninger
        // herunder en slet bruger knap
    }

    updateBtn(){
        //knap der opdaterer alle felterne i formen - hvis de ikke er fyldt ud så beholdes de gamle
    }

    getMatches(){
        // ny HTML side med liste over matches 
        //fjern match
        //chat med match - åbner ny side med chat
    }

    like(){
        // hvis begge har liket skal en pop up besked komme OG profilen skal tilføjes til matchliste
    }

    dislike(){
        //viser ny foreslået match
    }

    matchAlgorithm(){
        //skal matche alle brugere indefor samme region - skal lave kald til DB som sorterer så der laves en liste over potentielle matches - dem som bor i samme area - tager bare oppe fra og ned
    }

}



class Admin {
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    login(){
        // kommer ind på ny HTML side med 
    }

    logout(){

    }

    //


    adminUpdateUser(){

    }



}








//ved ikke om disse skal bruges endnu

class Img {
    constructor(path, mimeType){
        this.path = path;
        this.mimeType = mimeType;
    }

    editImg(){

    }

    uploadImg(){

    }

    deleteImg(){

    }
}

class Match{
    constructor(matchId, user1, user2, chat){
        this._matchId = matchId;
        this.user1 = user1;
        this.user2 = user2;
        this.chat = chat;
    }

    //funktioner
    deleteMatch(){
    }

    chat(){
    }
}

class Chat{
    constructor(msg){
        this._msg = msg;
    }

//funktioner
    sendMsg(){
        return "msg sent"
    }

    receiveMsg(){
        return "msg received"
    }

    deleteMsg(){

    }
}

