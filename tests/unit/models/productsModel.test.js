const productModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const productsMock = require('./mocks/products');

const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;

describe('testa as funções da rota products ligados a camada Model', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('testa a função listAllProducts', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([productsMock]);
    // Act
    const products = await productModel.listAllProducts();
    // Assert
    expect(products).to.be.deep.equal(productsMock)
  })

  it('testa a função listProductById retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(connection, 'execute').resolves([[productsMock]]);
    // Act
    const products = await productModel.listProductById(1);
    // Assert
    expect(products).to.be.deep.equal(productsMock)
  })

  it('testa a função createNewProduct retorna corretamente um id', async function () {
    // Arrange
    const mockReturnId = 1;
    const name = 'ursinho'
    sinon.stub(connection, 'execute').resolves([{insertId: mockReturnId}]);
    // Act
    const products = await productModel.createNewProduct(name);
    // Assert
    expect(products).to.be.deep.equal(mockReturnId)
  })

});
