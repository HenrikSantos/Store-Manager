const productServices = require('../../../src/services/productsServices');
const productModel = require('../../../src/models/productsModel');
const productsMock = require('./mocks/products.json');

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

describe('testa se as funções da rota products ligados a camada Services', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('testa se a função listAllProducts retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(productModel, 'listAllProducts').resolves(productsMock);
    // Act
    const products = await productServices.listAllProducts();
    // Assert
    expect(products).to.be.deep.equal(productsMock)
  })

  it('testa se a função listProductById retorna corretamente um produto', async function () {
    // Arrange
    sinon.stub(productModel, 'listProductById').resolves(productsMock);

    // Act
    const products = await productServices.listProductById();
    // Assert
    expect(products).to.be.deep.equal(productsMock)
  })

  it('testa se a função createNewProduct retorna corretamente o id do produto criado', async function () {
    // Arrange
    const mockReturnId = 1;
    const name = 'ursinho'
    sinon.stub(productModel, 'createNewProduct').resolves(mockReturnId);

    // Act
    const products = await productServices.createNewProduct(name);

    // Assert
    expect(products).to.be.deep.equal(mockReturnId)
  })
});