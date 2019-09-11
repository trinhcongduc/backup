
// Create dummy database for testing

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const faker = require('faker');
const async = require('async');
const Account = require('../models/account');
const _ = require('lodash');

new Promise((resolve) => {
    mongoose.connect('mongodb://localhost:27017/magitoapi', {
        promiseLibrary: require('bluebird')
    });
    async.parallel([
        (callback) => {
            Account.find({ type: 'worker' }).distinct('_id')
                .exec((err, account_ids) => {
                    callback(null, account_ids);
                });
        }
    ],
        (err, results) => {
            resolve(results);
            mongoose.connection.close();
        });
}).then((results) => {
    return new Promise((resolve) => {
        let items = [];
        
        for (i = 0; i < 100; i++) {
           
            items.push(
                {
                    account: faker.random.arrayElement(results[0]),
                    coordinates: [105.8 + Math.random()/10, 21.0 + Math.random()/10],  // coordinates Hanoi
                }
            );
        }
        resolve(items);
    });
}).then((items) => {
    seeder.connect('mongodb://localhost:27017/magitoapi', function () {
        let data = [{
            'model': 'Location',
            'documents': items
        }];
        seeder.loadModels([
            '../models/location'
        ]);

        seeder.clearModels(['Location'], function () {
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });
        });
    });
});
