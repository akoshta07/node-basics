const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db)=>{
    var db = mongoose.connection;

    Dishes.create({
        name : 'Uthappiza',
        description: 'test'
    })
    .then((dish)=>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id,{
            $set: {description: 'Updated test'}
        },{
            new: true
        })
        .exec();
    })
    .then((dish)=>{
        console.log(dish);

        dish.comments.push({
            rating:5,
            comment:'',
            author: ''
        });
        return dish.save();
    })
    .then((dish)=>{
        console.log();
        return db.Collection('dishes').drop();
    })
    .then(()=>{
        return db.close()
    })
})