const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {

  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  });

  it('"/:id" delete chosen document and return succes', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const deleted = await Department.findOne({ name: 'Department #1' })
    expect(res.status).to.be.equal(200);
    expect(res.body.length).to.be.equal(0);
    expect(deleted).to.be.null;
  });

});