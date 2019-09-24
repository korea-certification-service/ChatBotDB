var Promise = require('promise');
var mongoose = require('mongoose');
var config = require('../config/config')
var DB_URL = config.db_url;

mongoose.Promise = global.Promise;
mongoose.set('debug, true');

function connect(DB_URI) {
    return new Promise((resolve, reject) => {
        if (mongoose.connection.readyState) {
            console.log('reuse connection')
            resolve(mongoose.connection)
        } else {
            console.log('new connection')
            mongoose.connect(DB_URI)
                .then((connection) => {
                    resolve(connection)
                })
                .catch((err) => {
                    console.error(err)
                    reject(err)
                })
        }
    })
}

exports.connectDB = function (country) {
    return new Promise((resolve, reject) => {

        let DB_URI = `mongodb:${DB_URL}`;

        console.log('country=>', country)
        console.log('DB_URI=>', DB_URI)

        connect(DB_URI).then(function (connection) {
            resolve(connection)
        }).catch(function (error) {
            reject(error)
        })
    })
}

exports.close = function () {
    mongoose.connection.close()
}