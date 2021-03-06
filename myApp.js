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
  Person.findById(personId, (err, doc) => {
    if (err) {
      done(err, null)
    } else {
    done(null, doc);
  }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) { 
      done (err, null)
    } else {
      person.favoriteFoods.push(foodToAdd)
      person.save((err, updatedPerson) => {
        if (err) {
          done (err, null);
        } else { 
          done(null, updatedPerson);
      }
       })
    }
  }) 
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, { $set: { age: ageToSet }}, {new: true}, (err, newPerson) => {
    if (err) { done(err , null); } else { done(null, newPerson)}
  })
  
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) { done(err, null); } else { done(null, data);}
    })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, resJSON) => {
    if(err) return console.log(err);
    done(null, resJSON);
    })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: { $regex: `.*${foodToSearch}.*` }})
  .sort({name: 'ascending'}) // or 'asc'
  .limit(2)
  .select('-age')
  .exec((err, res) => {
    if (err) { done(err, null); } else { done(null, res);}
  })
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
