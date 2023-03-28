const Product = require('../models/Product');

const indexGet = (req, res) => {
  // console.log('request object', req);
  // getResponse();
  // async function getResponse() {
  //   const response = await fetch(
  //     `https://world.openfoodfacts.org/api/v0/product/90162602.json`,
  //   );
  //   const data = await response.json();
  //   const product = new Product({
  //     barcode: data.code,
  //     imgUrl: data.product.image_small_url,
  //     name: data.product.product_name,
  //     brands: data.product.brands,
  //     quantity: data.product.quantity,
  //     ingredients: data.product.ingredients_text,
  //     categories: data.product.categories,
  //   });
  //   product
  //     .save()
  //     .then(() => {
  //       res.render('index');
  //     })
  //     .catch(() => console.log('error'));
  // }
  // Product.findById('641aed788258383cf7e2e24c').then((result) => {
  //   console.log(result.ingredients);
  // });

  res.render('index');
};

const resultGet = (req, res) => {
  async function getResponse() {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${req.params.barcode}.json`,
    );
    const data = await response.json();

    res.render('result', data);
  }
  getResponse();
};

module.exports = {
  indexGet,
  resultGet,
};
