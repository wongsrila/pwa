const Product = require('../models/Product');

// INDEX - GET
const indexGet = (req, res) => {
  Product.find().then((items) => {
    let totalNutri = {};
    if (items.length <= 0) {
      // Als er geen gegevens zijn, zet het dan op 0.
      totalNutri = {
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
      };
    } else {
      // Als er wel gegevens zijn, laat die dan zien
      totalNutri = items.reduce(function (previousValue, currentValue) {
        return {
          calories: previousValue.calories + currentValue.calories,
          carbs: previousValue.carbs + currentValue.carbs,
          protein: previousValue.protein + currentValue.protein,
          fats: previousValue.fats + currentValue.fats,
        };
      });
    }
    res.render('index', { items, totalNutri });
  });
};

// PRODUCT - GET
const productGet = (req, res) => {
  Product.findById(req.params.barcode).then((product) => {
    console.log(product);
    res.render('product', { product });
  });
};

// SCANNER - GET
const scannerGet = (req, res) => {
  res.render('scanner');
};

// RESULT - GET
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

// SAVE - POST
const savePost = (req, res) => {
  // Inputs
  const inputAmount = req.body.inputAmount;
  const barcode = req.body.barcode;

  async function getResponse() {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
    );
    const data = await response.json();

    // Helper funtion for added nutritions
    const TotalCalc = (response, inputValue) => {
      if (response === undefined) {
        response = 0;
        return (parseFloat(response / 100) * inputValue).toFixed(1);
      } else {
        return (parseFloat(response / 100) * inputValue).toFixed(1);
      }
    };

    // Calculate the added amount in nutritions
    const addedCalories = TotalCalc(
      data.product.nutriments['energy-kcal_100g'],
      inputAmount,
    );
    const addedProtein = TotalCalc(
      data.product.nutriments.proteins_100g,
      inputAmount,
    );
    const addedCarbs = TotalCalc(
      data.product.nutriments.carbohydrates_100g,
      inputAmount,
    );
    const addedFats = TotalCalc(data.product.nutriments.fat_100g, inputAmount);
    const addedSalts = TotalCalc(
      data.product.nutriments.salt_100g,
      inputAmount,
    );
    const addedSugars = TotalCalc(
      data.product.nutriments.sugars_100g,
      inputAmount,
    );

    // Add to database
    const product = new Product({
      barcode: data.code,
      imgUrl: data.product.image_small_url,
      name: data.product.product_name,
      brands: data.product.brands,
      quantity: data.product.quantity,
      ingredients: data.product.ingredients_text,
      categories: data.product.categories,
      calories: addedCalories,
      carbs: addedCarbs,
      protein: addedProtein,
      fats: addedFats,
      salt: addedSalts,
      sugars: addedSugars,
      addedAmount: inputAmount,
    });
    product
      .save()
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => console.log(err));
  }
  getResponse();
};

const deletePost = (req, res) => {
  Product.findByIdAndRemove(req.body.id)
    .then(() => {
      console.log('item verwijderd');
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

module.exports = {
  indexGet,
  productGet,
  scannerGet,
  resultGet,
  savePost,
  deletePost,
};
