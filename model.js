class System{
    constructor(activeUsers){
        this._activeUsers = activeUsers;
    }

    login(){

    }

    logout(){

    }

}
//herunder har vi lavet noget fedt// hvorfor fungerer det ikke 
//det er episkkk
//det er episk

//nnn

class Test{
    
}

class User{
    constructor(userId, username, password, firstName, lastName, age, gender, sexuality, interests, address, matches, img){
        this.userId = userId;
        this._username = username;
        this._password = password
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = function(){
            return this.firstName + " " + this.lastName
        }
        this.age = age;
        this.gender = gender;
        this.sexuality = sexuality;
        this.interests = interests;
        this._address = address;
        this.matches = matches; 
        this.img = img;

    }

    getInfo(){
    }

    updateProfile(){

    }

    getMatches(){

    }

    likeUser(){

    }
}



class Interests{
    constructor(interests){
        this.interests = interests;

    }

    addInterests(){

    }

    deleteInterests(){

    }

    getInterest(){

    }
}

class Address{
    constructor(city, region, country){
        this.city = city;
        this.region = region;
        this.country = country;
    }

    compareAddress(){

    }
}

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
    constructor(matchId, user1, user2, chat, commonInterests, address){
        this._matchId = matchId;
        this.user1 = user1;
        this.user2 = user2;
        this.chat = chat;
        this._commonInterests = commonInterests; 
        this._address = address
    }

    //funktioner
    unMatch(){
    }

    openChat(){
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

