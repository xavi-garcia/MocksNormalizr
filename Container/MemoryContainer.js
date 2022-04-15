const faker = require('faker');

class MemoryContainer {
  constructor() {
    this.products = [];
    }


  getAllProducts = () => {
    return this.products;
    };

  getProductById = (id) => {
    return this.products.find((product) => product.id === id);
    };

  createProduct = () => {
    const product = {
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      picture: faker.image.imageUrl(),
      stock: faker.random.number(),
      createdAt: new Date(),
      updatedAt: new Date(),
};
    this.products.push(product);
    return product;
  };

  updateProduct = (id, product) => {
    const index = this.products.findIndex(el => el.id === id);
    if (index === -1) {
      return null;
    }
    this.products[index] = product;
    return product;
  };

  deleteProduct = (id) => {
    const index = this.products.findIndex(el => el.id === id);
    if (index === -1) {
      return null;
    }
    const deletedProduct = this.products[index];
    this.products.splice(index, 1);
    return deletedProduct;
  };
}

module.exports = MemoryContainer;