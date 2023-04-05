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
          calories: Math.round(previousValue.calories + currentValue.calories),
          carbs: Math.round(previousValue.carbs + currentValue.carbs),
          protein: Math.round(previousValue.protein + currentValue.protein),
          fats: Math.round(previousValue.fats + currentValue.fats),
        };
      });
    }

    const userSettings = {
      name: 'First',
      calories: 2500,
      carbs: 300,
      protein: 140,
      fats: 70,
    };

    const nutriResult = {
      calories: Math.round((100 / userSettings.calories) * totalNutri.calories),
      carbs: Math.round((100 / userSettings.carbs) * totalNutri.carbs),
      protein: Math.round((100 / userSettings.protein) * totalNutri.protein),
      fats: Math.round((100 / userSettings.fats) * totalNutri.fats),
    };

    res.render('index', { items, totalNutri, nutriResult, userSettings });
  });
};

// PRODUCT - GET
const productGet = (req, res) => {
  Product.findById(req.params.barcode)
    .then((product) => {
      res.render('product', { product });
    })
    .catch((err) => console.error(err));
};

// SCANNER - GET
const scannerGet = (req, res) => {
  res.render('scanner');
};

// RESULT - GET
const resultGet = (req, res) => {
  const url = `https://world.openfoodfacts.org/api/v0/product/${req.params.barcode}.json`;

  fetch(url)
    .then((result) => result.json())
    .then((result) => resultHandle(result))
    .catch((error) => {
      console.log(error);
    });

  const resultHandle = (result) => {
    if (result.status === 1) {
      res.render('result', result);
    } else {
      res.render('scanner');
    }
  };
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
      calories: Math.round(addedCalories),
      carbs: Math.round(addedCarbs),
      protein: Math.round(addedProtein),
      fats: Math.round(addedFats),
      salt: Math.round(addedSalts),
      sugars: Math.round(addedSugars),
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

const offlineGet = (req, res) => {
  res.render('offline');
};

module.exports = {
  indexGet,
  productGet,
  scannerGet,
  resultGet,
  savePost,
  deletePost,
  offlineGet,
};
