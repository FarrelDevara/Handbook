const { ObjectId } = require("mongodb")
const { database } = require("../config/mongo")

class User{

    static userCollection(){
        return database.collection("users")
    }

    static async findAll(){
        const users = await User.userCollection().find().toArray()
        return users
    }

    static async findByUsername(username){
        // console.log(data, "<<<<<<<<<");
        const find = await User.userCollection().findOne({
            username
        },{ projection: { password: 0 } } )
        return find
    }

    static async findByEmail(email){
        // console.log(email, "<<<<<<<<<");
        const find = await User.userCollection().findOne({
            email
        })
        return find
    }

    static async findUserById(id){
        // console.log(data, "<<<<<<<<<");
        const find = await User.userCollection().findOne({
            _id : new ObjectId(String(id))
        })
        return find
    }

    static async createOne(data){
        // console.log(data);
        const newUser = await User.userCollection().insertOne(data)
        return newUser
    }

}

module.exports = User