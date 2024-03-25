const { database } = require("../config/mongo")

class User{

    static userCollection(){
        return database.collection("users")
    }

    static async findAll(){
        const users = await User.userCollection().find().toArray()
        return users
    }

    static async createOne(data){
        const {username} = data
        // let findUsername= await this.userCollection().findOne({username})
        // if(findUsername) throw new Error("unique error")

        console.log(data);
        const newUser = await User.userCollection().insertOne(data)
        return newUser
    }

    static async findUser(username){
        // console.log(data, "<<<<<<<<<");
        const find = await User.userCollection().findOne({
            username
        })
        return find
    }
}

module.exports = User