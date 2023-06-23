import { MongoClient, ObjectId } from "mongodb";
import { Mongo_URI } from "./secret.js";
import e from "cors";

const connection = new MongoClient(Mongo_URI);
await connection.connect()
const db = connection.db("group-project")
const coll = db.collection("bugs")

export async function addBug(req, res) {
    try {
    const addBug = await coll.insertOne(req.body)
    res.status(200).send(addBug)
    } catch(err) {
        res.status(500).send(err)
    }
}

export async function getAllBugs(req, res){
    try {
    const allBugs = await coll.find({}).toArray()
    res.status(200).send(allBugs)
    } catch(err){
       res.status(500).send(err) 
    }
}

export async function updateBug(req, res) {
    const updateBug = await coll.updateOne(
        {_id: new ObjectId(req.params.bugId)},
        {$set: req.body}

    ).catch(res.status(500).send)
    res.status(200).send(updateBug)

}




export async function deleteBug(req, res){
    try{
     const deleteBug = await coll.deleteOne(
        {_id: new ObjectId(req.params.bugId)}
     )   
     res.status(200).send(deleteBug);
    } catch(err){
        res.status(500).send(err)
    }
    
}