
// Create dummy database for testing
const seeder = require('mongoose-seed');
const faker = require('faker');

let items = [];

for (i = 0; i < 10; i++) {
    items.push(
        {
            name: faker.name.title(),
            description: faker.lorem.paragraph()
        }
    )
}


let data = [{
    'model': 'Skills',
    'documents': items
}]

// connect mongodb
seeder.connect('mongodb://localhost:27017/thoxaydung', function () {
    seeder.loadModels([
        '../models/skill'
    ]);
    //empty collection before populating
    seeder.clearModels(['Skills'], function () {
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });
    });
});
