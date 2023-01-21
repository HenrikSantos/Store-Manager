const saleServices = require('../../../src/services/salesServices');
const salesModel = require('../../../src/models/salesModel');
const listOfSales = require('./mocks/listOfSales.json');
const oneSale = require('./mocks/oneSale.json');

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

describe('testa se as funções da rota sales ligados a camada Services', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('testa se a função registerNewSale retorna corretamente uma venda', async function () {
    const mockSaleId = 1;
    const salesMock = [
      {
        "productId": 2,
        "quantity": 123
      },
      {
        "productId": 1,
        "quantity": 123
      }
    ];
    // Arrange
    sinon.stub(salesModel, 'registerNewSale').resolves(mockSaleId);
    // Act
    const salesID = await saleServices.createNewSale(salesMock);
    // Assert
    expect(salesID).to.be.deep.equal(mockSaleId);
  })

  it('testa se a função listSales retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(salesModel, 'listSales').resolves(listOfSales);
    // Act
    const salesID = await saleServices.listSales();
    // Assert
    expect(salesID).to.be.deep.equal(listOfSales);
  })

  it('testa se a função listSalesById retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(salesModel, 'listSalesById').resolves(oneSale);
    // Act
    const salesID = await saleServices.listSalesById(1);
    // Assert
    expect(salesID).to.be.deep.equal(oneSale);
  })
});
