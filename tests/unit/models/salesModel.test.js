const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const listOfSales = require('./mocks/listOfSales.json');
const oneSale = require('./mocks/oneSale.json');

const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

describe('testa as funções da rota sales ligados a camada Model', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('testa a função registerNewSale', async function () {
    const mockRegisterNewSale = [{
      insertId: 1,
    }]
    // Arrange
    sinon.stub(connection, 'execute').resolves([mockRegisterNewSale]);
    // Act
    const salesId = await salesModel.registerNewSale();
    // Assert
    expect(salesId).to.be.deep.equal(mockRegisterNewSale.insertId);
  })

  it('testa a função createNewSale', async function () {
    const mockNewSale = [{
      affectedRows: 1,
    }]

    const params = { saleId: 1, productId: 1, quantity: 1 }

    // Arrange
    sinon.stub(connection, 'execute').resolves([mockNewSale]);
    // Act
    const affectedRows = await salesModel.createNewSale(params);
    // Assert
    expect(affectedRows).to.be.deep.equal(mockNewSale.affectedRows);
  })

  it('testa a função listSales', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([listOfSales]);
    // Act
    const sales = await salesModel.listSales();
    // Assert
    expect(sales).to.be.deep.equal(listOfSales);
  })

  it('testa a função listSalesById', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([oneSale]);
    // Act
    const sales = await salesModel.listSalesById(1);
    // Assert
    expect(sales).to.be.deep.equal(oneSale);
  })

  it('testa a função deleteSale', async function () {
    const mockDelete = [{
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0
    }] 
    // Arrange
    sinon.stub(connection, 'execute').resolves([mockDelete]);
    // Act
    const result = await salesModel.deleteSale(1);
    // Assert
    expect(result).to.be.deep.equal(mockDelete);
  })
});
