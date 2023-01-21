const saleServices = require('../../../src/services/salesServices');
const saleControllers = require('../../../src/controllers/salesController');
const listOfSales = require('./mocks/listOfSales.json');
const oneSale = require('./mocks/oneSale.json');

const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

describe('testa as funções da rota sales ligados a camada Controller', function () {

  const req = {};
  const res = {};
  const next = () => { };

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });

  it('testa se a função createNewSale retorna corretamente uma venda', async function () {
    const mockSaleServicesId = 1;
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
    const expectedJson = {
      id: mockSaleServicesId,
      itemsSold: salesMock,
    }
    // Arrange
    req.body = salesMock;
    sinon.stub(saleServices, 'createNewSale').resolves(mockSaleServicesId);
    // Act
    await saleControllers.createNewSale(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWithExactly(expectedJson);
  })

  it('testa se a função listSales retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(saleServices, 'listSales').resolves(listOfSales);
    // Act
    await saleControllers.listSales(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(listOfSales);
  })

  it('testa se a função listSalesById retorna corretamente um produto', async function () {
    req.params = {id: 1}
    // Arrange
    sinon.stub(saleServices, 'listSalesById').resolves(oneSale);
    // Act
    await saleControllers.listSalesById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(oneSale);
  })
});
