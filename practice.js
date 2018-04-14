const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

MongoClient.connect(url,(err,client)=>{ 
    var db = client.db('conFusion');
    assert.equal(err,null);

    console.log('Connected correctly to server');

    const collection = db.collection('dishes');
    collection.insertOne({"name":"Utha","test":"test"},
    (err,result)=> {
        assert.equal(err,null);
        
        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);

            db.dropCollection("dishes",(err,result)=>{
                assert.equal(err,null);

                client.close();
            })
        })
    })

});