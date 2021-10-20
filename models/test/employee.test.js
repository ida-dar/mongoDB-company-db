const { expect } = require('chai');
const Employee = require('../employee.model.js');

describe('Employee', () => {

  it('should throw an error if no args', () => {
    const emp = new Employee({});

    emp.validate(err => {
      expect(err.errors.firstName).to.exist &&
      expect(err.errors.lastName).to.exist &&
      expect(err.errors.department).to.exist;
    })
  });

  it('should throw an error if args are not a string', () => {
    const cases = [{}, []];
    for(let arg of cases) {
      const emp = new Employee({ arg, arg, arg });
  
      emp.validate(err => {
        expect(err.errors.firstName).to.exist &&
        expect(err.errors.lastName).to.exist &&
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should throw an error if "firstName" arg is missing', () => {
    const cases = [{}, []];
    for(let arg of cases) {
      const emp = new Employee({ firstName: arg, lastName: 'lorem', department: 'lorem' });
  
      emp.validate(err => {
        expect(err.errors.firstName).to.exist &&
        expect(err.errors.lastName).to.not.exist &&
        expect(err.errors.department).to.not.exist;
      });
    }
  });

  it('should throw an error if "lastName" arg is missing', () => {
    const cases = [{}, []];
    for(let arg of cases) {
      const emp = new Employee({ firstName: 'lorem', lastName: arg, department: 'lorem' });
  
      emp.validate(err => {
        expect(err.errors.firstName).to.not.exist &&
        expect(err.errors.lastName).to.exist &&
        expect(err.errors.department).to.not.exist;
      });
    }
  });

  it('should throw an error if "department" arg is missing', () => {
    const cases = [{}, []];
    for(let arg of cases) {
      const emp = new Employee({ firstName: 'lorem', lastName: 'lorem', department: arg });
  
      emp.validate(err => {
        expect(err.errors.firstName).to.not.exist &&
        expect(err.errors.lastName).to.not.exist &&
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should NOT throw an error if all args are correct', () => {
    const cases = ['Lorem', 'Lorem ipsum'];
    for(let arg of cases) {
      const emp = new Employee({ arg, arg, arg });
  
      emp.validate(err => {
        expect(err.errors.firstName).to.exist &&
        expect(err.errors.lastName).to.exist &&
        expect(err.errors.department).to.exist;
      });
    }
  });

});
