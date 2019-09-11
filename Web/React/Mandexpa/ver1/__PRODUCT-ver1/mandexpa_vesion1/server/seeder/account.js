
// Create dummy database for testing
mongoose.Promise = require('bluebird');
const faker = require('faker');
const async = require('async');
const jwt=require('jsonwebtoken');
const Bcrypt = require('bcrypt');
var config = require('../config/constant.js');
const _ = require('lodash');


new Promise((resolve) => {
    mongoose.connect('mongodb://localhost:27017/thoxaydung', {
        promiseLibrary: require('bluebird')
    });
    async.parallel([
        (callback) => {
            Skill.find({}).exec((err, skills) => {
                callback(null, skills);
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
            items.push(
                {
                    type: faker.random.arrayElement(['host', 'worker', 'admin']),
                    name: faker.name.findName(),
                    username: faker.internet.userName(),
                    password: Bcrypt.hashSync('123@123a', 10),
                    gender: faker.random.arrayElement(['M', 'F']),
                    kind: faker.random.arrayElement(['group', 'single']),
                    is_ready: faker.random.arrayElement([true, false]),
                    phone: faker.phone.phoneNumber(),
                    birthday: faker.date.past(),
                    address: faker.address.streetAddress(),
                    location: {
                        type: "Point",
                        coordinates: [105.8 + Math.random()/10, 21.0 + Math.random()/10] // coordinates Hanoi
                    },  
                    expect_price: faker.random.arrayElement([100, 200, 500]),
                    avatar: faker.image.avatar(),
                    cover_image: faker.random.arrayElement(cover_images),
                    skills: _.sample(results[0])._id,
                    work_area: faker.random.arrayElement(config.provinces),
                    ratings: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
                    hits: faker.random.number(1, 200),
                    company: faker.company.companyName(),
                    created: faker.date.past()
                }
            )
        }

        items.push(
            {
                type: 'worker',
                name: faker.name.findName(),
                username: 'worker_demo',
                password: Bcrypt.hashSync('123@123a', 10),
                gender: faker.random.arrayElement(['M', 'F']),
                kind: faker.random.arrayElement(['group', 'single']),
                phone: '1686170836',
                birthday: faker.date.past(),
                address: faker.address.streetAddress(),
                location: {
                    type: "Point",
                    coordinates: [105.8 + Math.random()/10, 21.0 + Math.random()/10] // coordinates Hanoi
                },
                expect_price: faker.random.arrayElement([100, 200, 500]),
                avatar: faker.image.avatar(),
                cover_image: faker.random.arrayElement(cover_images),
                skills: _.sample(results[0])._id,
                work_area: faker.random.arrayElement(config.provinces),
                ratings: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
                hits: faker.random.number(1, 200),
                created: faker.date.past()
            }
        )

        items.push(
            {
                type: 'host',
                name: faker.name.findName(),
                username: 'host_demo',
                password: Bcrypt.hashSync('123@123a', 10),
                gender: faker.random.arrayElement(['M', 'F']),
                kind: faker.random.arrayElement(['group', 'single']),
                phone: '989632045',
                birthday: faker.date.past(),
                address: faker.address.streetAddress(),
                location: {
                    type: "Point",
                    coordinates: [105.8 + Math.random()/10, 21.0 + Math.random()/10] // coordinates Hanoi
                },
                avatar: faker.image.avatar(),
                cover_image: faker.random.arrayElement(cover_images),
                work_area: faker.random.arrayElement(config.provinces),
                ratings: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
                hits: faker.random.number(1, 200),
                company: faker.company.companyName(),
                created: faker.date.past()
            }
        )

        items.push(
            {
                type: 'admin',
                name: faker.name.findName(),
                username: 'admin',
                password: Bcrypt.hashSync('123@123a', 10),
                phone: '01832937921',
                location: {
                    type: "Point",
                    coordinates: [105.8 + Math.random()/10, 21.0 + Math.random()/10] // coordinates Hanoi
                },
            }
        )

        resolve(items);
    });
}).then((items) => {

    let data = [{
        'model': 'Account',
        'documents': items
    }]

    // connect mongodb
    seeder.connect('mongodb://localhost:27017/thoxaydung', function () {
        seeder.loadModels([
            '../models/account'
        ]);
        seeder.clearModels(['Account'], function() {
            seeder.populateModels(data, function () {
                seeder.disconnect();
            });
        })
    });
})

