const { expect } = require('chai');
const mongoose = require('mongoose');
const Employee = require('../employee.model');
const Department = require('../department.model');

describe('Employee', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
    const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
    await testEmpOne.save();

    const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
    await testEmpTwo.save();
    });

    after(async () => {
      await Employee.deleteMany();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method.', async () => {
      const employee = await Employee.findOne({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      expect(employee.firstName).to.be.equal('firstName #1') &&
      expect(employee.lastName).to.be.equal('lastName #1') &&
      expect(employee.department).to.be.equal('department #1');
    });

  });

  describe('Populating data', () => {

    before(async () => {
      const testDep = new Department({ name: 'department #1' });
      await testDep.save();
      const { _id: depId } = await Department.findOne({ name: 'department #1' });

      const testEmp = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: depId.toString() });
      await testEmp.save();
    });

    after(async () => {
      await Department.deleteMany();
      await Employee.deleteMany();
    });

    it('should check if "department" arg is ref to Department model', async () => {
      await Employee.find().populate('department');
      const { _id: depId } = await Department.findOne({ name: 'department #1' });
      const emp = await Employee.findOne({ firstName: 'firstName #1' });
      expect(emp.department).to.be.equal(depId.toString());
    });

  });

  describe('Creating data', () => {

    it('should insert new document with insertOne method', async () => {
      const newEmp = { firstName: 'firstName #3', lastName: 'lastName #3', department: 'department #3' }
      const employee = new Employee(newEmp);
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
    
    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'firstName #1' }, { $set: { lastName: 'lastName #1#' } });
      const updated = await Employee.findOne({ lastName: 'lastName #1#' });
      expect(updated).to.not.be.null;
    });

    it('should properly update one document with save method', async () => {
      const employee = await Employee.findOne({ firstName: 'firstName #1' });
      employee.lastName = 'lastName #1#';
      await employee.save();

      const updated = await Employee.find({ lastName: 'lastName #1#' });
      expect(updated).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { department: 'Updated' });
      const employee = await Employee.find({ department: 'Updated' });
      expect(employee.length).to.be.equal(2);
    });

  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      await testEmpOne.save();
    
      const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
    
    it('should properly remove one document with deleteOne method', async () => {
      await Employee.deleteOne({ firstName: 'firstName #1' });
      const deleted = await Employee.findOne({ lastName: 'lastName #1' });
      expect(deleted).to.be.null;
    });

    it('should properly remove one document with remove method', async () => {
      const employee = await Employee.findOne({ firstName: 'firstName #1' });
      await employee.remove();

      const removed = await Employee.findOne({ lastName: 'lastName #1' });
      expect(removed).to.be.null;
    });

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Employee.deleteMany({});
      const employee = await Employee.find();
      expect(employee.length).to.equal(0);
    });
  });

});
