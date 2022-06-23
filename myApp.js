require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI); //, { useNewUrlParser: true, useUnifiedTopology: true }


let Person;

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age : Number,
  favoriteFoods : [String]
})

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Alexandra Holmes",
    age: 40,
    favoriteFoods: ['Gboma', 'Ademe', 'Fried potatoes']
  }) 
   person.save((err, data) => {
    if (err) {
      return console.error(err);
    } else { 
      done(null, data);
  }
   } ) 
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((doc) => {
      done(null, doc);      
    })
    .catch((err) => {
      console.error(err);
    })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, docs) => {
    if (err) return console.error(err)
    done(null, docs);
  })
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: { $regex: `.*${food}.*` }}, (err, docs) => {
    if (err) return console.error(err)
    done(null, docs);
  })
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, docs) => {
    if (err) {
      done(err, null)
    } else {
    done(null, docs);
  }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (err, docs) => {
    if (err) { 
      done (err, null)
    } else {
      let person = new Person({...docs, favoriteFoods: docs.favoriteFoods.push(foodToAdd)});
      person.save((err, data) => {
        if (err) {
          return console.error(err);
        } else { 
          done(null, data);
      }
       })
    }
  }) 

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
