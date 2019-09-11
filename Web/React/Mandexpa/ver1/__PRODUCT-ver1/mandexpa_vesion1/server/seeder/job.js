
// Create dummy database for testing

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const seeder = require('mongoose-seed');
const faker = require('faker');
const async = require('async');
const Account = require('../models/account');
const Skill = require('../models/skill');
const _ = require('lodash');

const config = require('../config/constant');

new Promise((resolve) => {
    mongoose.connect('mongodb://localhost:27017/thoxaydung', {
        promiseLibrary: require('bluebird')
    });
    async.parallel([
        (callback) => {
            Account.find({ type: "host", phone: 989632045 }, { _id: 1 }).exec((err, account_ids) => {
                callback(err, account_ids);
            });
        },
        (callback) => {
            Skill.find({}).exec((err, skills) => {
                callback(err, skills);
            });
        }
    ],
        (err, results) => {
            resolve(results);
            // mongoose.connection.close();
        });
}).then((results) => {
    return new Promise((resolve) => {
        let items = [];

        for (i = 0; i < 30; i++) {
            let current = new Date();
            let expired = new Date(current.setDate(current.getDate() + 20));
            let future = new Date(current.setDate(current.getDate() + 30));
            let is_pined = _.sample([0, 1]);
 
            items.push(
                {
                    construction_name: faker.name.jobTitle(),
                    host: _.sample(results[0])._id,
                    is_pined: is_pined,
                    pin_date: is_pined ? faker.random.arrayElement([current, current.setDate(current.getDate() + 1)]) : null,
                    start_date: current.toISOString(),
                    expired_date: expired.toISOString(),
                    description: faker.lorem.paragraph(),
                    job_type: faker.random.arrayElement(['group', 'single']),
                    skill: _.sample(results[1])._id,
                    region: faker.random.arrayElement(config.provinces),
                    address: faker.address.streetAddress(),
                    location: {
                        type: "Point",
                        coordinates: [105.8 + Math.random()/10, 21.0 + Math.random()/10] // coordinates Hanoi
                    },
                    seat: faker.random.arrayElement([1, 2, 3, 4, 5, 6]),
                    worker: [],
                    wage_type: faker.random.arrayElement(['agreement', 'fixed']),
                    min_wage: faker.random.number({ min: 100, max: 2000, precision: 50 }),
                    max_wage: faker.random.number({ min: 500, max: 2000, precision: 50 }),
                    status: faker.random.arrayElement([0, 1]),
                    hits: faker.random.number({ min: 10, max: 200, precision: 2 }),
                }
            );
        }
        resolve(items);
    });
}).then((items) => {
    seeder.connect('mongodb://localhost:27017/thoxaydung', function () {
        let data = [{
            'model': 'Job',
            'documents': items
        }];
        seeder.loadModels([
            '../models/job'
        ]);

        seeder.clearModels(['Job'], function () {
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });
        });
    });
});
