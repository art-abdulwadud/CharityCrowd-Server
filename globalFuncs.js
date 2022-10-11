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

module.exports = { addToServerDb };
