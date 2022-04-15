const faker = require('faker');
const MemoryContainer = require('../Container/MemoryContainer');
const { datatype } = faker;

class MockProducts extends MemoryContainer {
  constructor() {
    super();
}

  populate = (quantity=50) => {
    
    const newProducts = [];
    for (let i = 0; i < quantity; i++) {
      newProducts.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        picture: faker.image.imageUrl(),
        stock: faker.datatype.number(),
      });
    }
    this.products = [...this.products, ...newProducts];
    return newProducts;
  };
}


module.exports = MockProducts;