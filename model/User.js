const { database } = require("../config/mongo")

class User{

    static userCollection(){
        return database.collection("users")
    }

    static async findAll(){
        const users = await User.userCollection().find().toArray()
        return users
    }

    static async findOne(username){
        // console.log(data, "<<<<<<<<<");
        const find = await User.userCollection().findOne({
            username
        })
        return find
    }

    static async findUserById(id){
        // console.log(data, "<<<<<<<<<");
        const find = await User.userCollection().findOne({
            _id : id
        })
        return find
    }

    static async createOne(data){
        // const {username} = data
        // let findUsername= await this.userCollection().findOne({username})
        // if(findUsername) throw new Error("unique error")

        console.log(data);
        const newUser = await User.userCollection().insertOne(data)
        return newUser
    }

    


}

module.exports = User