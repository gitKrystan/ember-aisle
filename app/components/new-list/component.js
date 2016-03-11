import Ember from 'ember';

export default Ember.Component.extend({
  shopCategoriesWithProducts() {
    var listProducts = this.get('listProducts');
    var shopCategories = this.get('categories');

    var temp = {};
    listProducts.forEach(function(product) {
      product.get('categories').then(function(productCategories) {
        var shopCategoryNames = shopCategories.mapBy('name');
        var productCategoryNames = productCategories.mapBy('name');

        var matchedCategoryName = productCategoryNames.find(function(name) {
          return shopCategoryNames.contains(name);
        });

        if (matchedCategoryName in temp) {
          temp[matchedCategoryName].addObject(product);
        } else {
          temp[matchedCategoryName] = [product];
          console.log(temp)
        }
      });
    });
    return temp;
  },

  listProducts: Ember.computed('list.products.@each.name', function() {
    return this.get('list').get('products');
  }),

  listEntries: Ember.computed('listProducts.@each.name', 'temp', function() {
    var component = this;

    return new Ember.RSVP.Promise(function(resolve) {
      var shopCategoriesWithProducts = component.shopCategoriesWithProducts();
      return shopCategoriesWithProducts;
    }).then(function(shopCategoriesWithProducts) {
      var listEntries = [];
      var aisles = component.get('aisles');
      aisles.forEach(function(aisle) {
        var aisleEntry = {};
        aisleEntry['aisleID'] = aisle.get('id');
        aisleEntry['aisleNumber'] = aisle.get('number');
        aisleEntry['categories'] = [];
        aisle.get('categories').then(function(categories) {
          categories.forEach(function(category) {
            var categoryEntry = {};
            var categoryName = category.get('name');
            console.log(shopCategoriesWithProducts)
            categoryEntry['categoryID'] = category.get('id');
            categoryEntry['categoryName'] = categoryName;
            categoryEntry['products'] = shopCategoriesWithProducts[categoryName];
            aisleEntry['categories'].addObject(categoryEntry);
          });
        });
        listEntries.addObject(aisleEntry);
      })

      console.log(listEntries);
      return listEntries;
    })




    // setTimeout(function() {
    //   var listEntries = [];
    //   var temp = component.get('temp')
    //
    //   var aisles = component.get('aisles');
    //   aisles.forEach(function(aisle) {
    //     var aisleEntry = {};
    //     aisleEntry['aisleID'] = aisle.get('id');
    //     aisleEntry['aisleNumber'] = aisle.get('number');
    //     aisleEntry['categories'] = [];
    //     aisle.get('categories').then(function(categories) {
    //       categories.forEach(function(category) {
    //         var categoryEntry = {};
    //         var categoryName = category.get('name');
    //         categoryEntry['categoryID'] = category.get('id');
    //         categoryEntry['categoryName'] = categoryName;
    //         categoryEntry['products'] = temp[categoryName];
    //         aisleEntry['categories'].addObject(categoryEntry);
    //       });
    //     });
    //     listEntries.addObject(aisleEntry);
    //   })

    //   console.log(listEntries);
    //   return listEntries;
    // }, 1000)


  }),

  productCategoryFormIsShowing: false,
  productCategoryFormAction: '',
  newProductName: '',
  currentProduct: null,
  productAlert: '',

  actions: {
    addProductToListOrCategorize(product) {
      var list = this.get('list');
      var shopCategories = this.get('categories');
      var productCategories = product.get('categories');
      var intersectingCategory = Ember.computed
        .intersect(shopCategories, productCategories)[0];
      if (intersectingCategory) {
        this.sendAction('addProductToList', product, list)
      } else {
        this.set('currentProduct', product);
        this.set('productCategoryFormAction', 'categorizeProductAndAddToList');
        this.set('productCategoryFormIsShowing', true);
      }
    },

    findOrCreateProduct(dropdown, event) {
      if (event.keyCode !== 13) { return; }
      var component = this;

      let productInput = event.target.value;
      var productNames = productInput.split(', ');

      productNames.forEach(function(productName) {
        var isUnique = component.get('products')
          .mapBy('name').indexOf(productName) === -1;
        var isEmpty = productName.length === 0;
        if (!isEmpty && isUnique) {
          component.set('newProductName', productName);
          component.set('productCategoryFormAction', 'createProductAndAddToList');
          component.set('productCategoryFormIsShowing', true);
        } else if (isEmpty) {
          return;
        } else {
          component.set('productAlert', '(avoid duplicate product names)');
        }
      });
    },

    createProductAndAddToList(params) {
      this.sendAction('createProductAndAddToList', params);
      this.set('productCategoryFormIsShowing', false);
    },

    categorizeProductAndAddToList(product, category, list) {
      this.sendAction('categorizeProductAndAddToList', product, category, list);
      this.set('productCategoryFormIsShowing', false);
    }
  }
});
