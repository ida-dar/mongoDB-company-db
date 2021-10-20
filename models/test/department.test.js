const { expect } = require('chai');
const Department = require('../department.model.js');

describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department without `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    })
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('shoulg throw an error if "name" is longer than 20 or shorter than 5', () => {
    const cases = ['name', 'Loremipsumloremipsumloremipsum'];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should NOT throw error if "name" is correct', () => {
    const cases = ['Design', 'Lorem ipsum'];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

});
