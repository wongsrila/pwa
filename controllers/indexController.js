const Product = require('../models/Product');

const indexGet = (req, res) => {
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

const scanPost = (req, res) => {
  const barcode = req.body.decodedData;

  console.log(barcode);

  res.redirect('/result');
  // fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
  //   .then((res) => res.json())
  //   .then((res) => () => {
  //     ress.redirect('/result');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const resultGet = (req, res) => {
  res.render('result');
};

module.exports = {
  indexGet,
  scanPost,
  resultGet,
};
