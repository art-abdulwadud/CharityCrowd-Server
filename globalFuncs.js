const fs = require("fs");
const { db } = require("./admin");

const addToServerDb = async (mypath, [arr,newObj,docId,collection], message, callback) => {
    try {
        const newItem = docId ? await db.collection(collection).doc(docId).set(newObj)
            : await db.collection(collection).add(newObj);
        fs.writeFile(mypath, JSON.stringify([...arr, { id: newItem.id, ...newObj }]), (err) => {
            if (err) {
                throw err;
            }
            console.log(message);
        });
        callback();
        return { ...newObj, id: docId || newItem.id };
    } catch (error) {
        return error.message;
    }
};

const fetchData = async (collectionName, jsonName) => {
    try {
        let savedData = [];
        let collectionData = await db.collection(collectionName).get();
        collectionData.forEach(key => {
            // make sure to check if field is timeStamp/timestamp
            savedData.push({ id: key.id, ...key.data(), timestamp: key.data().timestamp.toDate() });
        });
        fs.writeFile(`${jsonName}.json`, JSON.stringify(savedData), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    } catch (error) {
        console.log(error.message);
    }
};

const reFetchData = async (collectionName, jsonName, currentList) => {
    try {
        let savedData = [];
        let collectionData = await db.collection(collectionName)
            .where("timestamp",">",currentList[currentList.length - 1].timestamp)
            .get();
        collectionData.forEach(key => {
            // make sure to check if field is timeStamp/timestamp
            savedData.push({ id: key.id, ...key.data(), timestamp: key.data().timestamp.toDate() });
        });
        fs.writeFile(`${jsonName}.json`, JSON.stringify(savedData), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { addToServerDb, fetchData, reFetchData };
