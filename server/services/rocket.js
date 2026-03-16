import { getDb } from "../db/connect-mongo.js";
import dotenv from "dotenv";
import { ObjectId } from 'mongodb';

dotenv.config();
const db = await getDb();
const collection = await db.collection("rocket");


export async function serviceAddRocket(city, rocketType, latitude, longitude, name) {
    const insert = await collection.insertOne({
        city,
        rocketType,
        latitude,
        longitude,
        name
    });
    const res = await collection.findOne({ id: insert.insertedId });
    return {
        success: true,
        rocket: res
    }
}

export async function serviceGetRocket(id) {
    const rocket = await collection.findOne({
        _id: new ObjectId(id)
    });
        if (!rocket) {
        return 'not found'
    }
    return rocket
}

export async function serviceGetAllRockets() {
    const rockets = await collection.find({})
    return rockets
}


export async function serviceDeleteRocket(id) {
    const findRocket = await collection.findOne({
        _id: new ObjectId(id)
    });
    if (!findRocket) {
        return 'not found'
    }
    else {
        const rocket = await collection.deleteOne({
            _id: new ObjectId(id)
        })
        return 'delete'
    }

}