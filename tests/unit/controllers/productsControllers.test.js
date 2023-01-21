const productServices = require('../../../src/services/productsServices');
const productControllers = require('../../../src/controllers/productsController');
const productsMock = require('./mocks/products.json');

const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

describe('testa as funções da rota products ligados a camada Controller', function () {

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

  it('testa se a função listAllProducts retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(productServices, 'listAllProducts').resolves(productsMock);
    // Act
    await productControllers.listAllProducts(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(productsMock);
  })

  it('testa se a função listProductById retorna corretamente um produto', async function () {
    // Arrange
    req.params = { id: 1 };
    sinon.stub(productServices, 'listProductById').resolves(productsMock[0]);
    // Act
    await productControllers.listProductById(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(productsMock[0]);
  })

  it('testa se a função createNewProduct retorna corretamente um produto', async function () {
    // Arrange
    req.body = { name: 'ursinho' };
    const mockReturnId = 1;
    sinon.stub(productServices, 'createNewProduct').resolves(mockReturnId);
    // Act
    await productControllers.createNewProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWithExactly({ name: 'ursinho', id: 1 });
  })

  it('testa se a função updateProduct retorna corretamente um produto', async function () {
    req.params = { id: 1 };
    req.body = { name: 'teste' }
    const mockUpdate = {
      "id": 1,
      "name": "teste"
    }
    // Arrange
    // Act
    await productControllers.updateProduct(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWithExactly(mockUpdate);
  })
});