import { getDb } from "../db/connect-mongo.js";
import dotenv from "dotenv";
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken'

dotenv.config();
const db = await getDb();
const collection = await db.collection("users");


export async function serviceCreateUser(username, password, email, user_type) {
    const user = await collection.findOne({ username: username });
    if (user) {
        return "exist";
    }
    const insert = await collection.insertOne({
        username,
        password,
        email,
        user_type,
        last_login: new Date()
    });
    const res = await collection.findOne({ _id: insert.insertedId });
    return res
}

export async function serviceGetUser(id) {
    const user = await collection.findOne({
        _id: new ObjectId(id)
    });
    if (!user) {
        return 'not found'
    }
    return user
}

export async function serviceUpdateUser(username, password, email, user_type) {
    const user = await collection.findOne({ username: username });
    if (!user) {
        return "not found";
    }

    const data = {};
    if (password) data.password = password;
    if (email) data.email = email;
    if (user_type) data.user_type = user_type;
    data.last_login = new Date()

    const res = await collection.updateOne(
        { username: username },
        { $set: data }
    );
    return res;
}



export async function serviceDeleteUser(id) {
    const findUser = await collection.findOne({
        _id: new ObjectId(id)
    });
    if (!findUser) {
        return 'not found'
    }
    else {
        await collection.deleteOne({
            _id: new ObjectId(id)
        })
        return 'delete'
    }

}


export async function serviceLoginUser(username, password) {
    const user = await collection.findOne({ username: username });
    if (!user) {
        return "not found";
    }
    if (user.password === password) {
        const secret = process.env.SECRET_TOKEN || 12345;
        const token = jwt.sign(
            {
                id: user._id,
                user_type: user.user_type,
            },
            secret,
            { expiresIn: "1h" }
        );
        return {
            token, user: {
                id: user._id,
                username: user.username,
                user_type: user.user_type
            }
        };

    }
    return "wrong pass"
}

export async function serviceGetAllUsers() {
    const users = await collection.find({}).toArray()
    return users
}