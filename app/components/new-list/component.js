import Ember from 'ember';
import _ from 'underscore';

export default Ember.Component.extend({
  init() {
    this.getListEntries();
    this._super();
  },

  shopCategoriesWithProducts(callback) {
    var listProducts = this.get('listProducts');
    var shopCategories = this.get('categories');

    var shopCategoriesWithProductsHash = {};

    var promises = [];
    listProducts.forEach(function(product) {
      promises.push(product.get('categories'));
    });

    Ember.RSVP.allSettled(promises).then(function(allProductCategories) {
      for (var productIndex = 0; productIndex < listProducts.get('length'); productIndex++) {
        var product = listProducts.objectAt(productIndex);
        var productCategories = allProductCategories.objectAt(productIndex).value;

        var shopCategoryNames = shopCategories.mapBy('name');
        var productCategoryNames = productCategories.mapBy('name');

        var matchedCategoryName = productCategoryNames.find(function(name) {
          return shopCategoryNames.contains(name);
        });

        if (matchedCategoryName in shopCategoriesWithProductsHash) {
          shopCategoriesWithProductsHash[matchedCategoryName].addObject(product);
        } else {
          shopCategoriesWithProductsHash[matchedCategoryName] = [product];
        }
        console.log('in for loop:')
        console.log(shopCategoriesWithProductsHash);
      }
      callback(shopCategoriesWithProductsHash);
    });
  },

  listProducts: Ember.computed('list.products.@each.name', function() {
    return this.get('list').get('products');
  }),

  getListEntries() {
    var component = this;

    this.shopCategoriesWithProducts(function(shopCategoriesWithProducts) {
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
            console.log('in listEntries:')
            console.log(shopCategoriesWithProducts);
            categoryEntry['categoryID'] = category.get('id');
            categoryEntry['categoryName'] = categoryName;
            categoryEntry['products'] = shopCategoriesWithProducts[categoryName];
            aisleEntry['categories'].addObject(categoryEntry);
          });
        });
        listEntries.addObject(aisleEntry);
      });

      console.log(listEntries);
      component.set('listEntries', listEntries);
    });
  },

  listEntries: null,

  listProductsObserver: Ember.observer('listProducts.@each.name', function() {
    this.getListEntries();
  }),

  productCategoryFormIsShowing: false,
  productCategoryFormAction: '',
  newProductName: '',
  currentProduct: null,
  productAlert: '',

  actions: {
    addProductToListOrCategorize(product) {
      var list = this.get('list');
      var shopCategories = this.get('categories').mapBy('name');
      var productCategories = product.get('categories').mapBy('name');


      var intersectingCategory = _.intersection(shopCategories, productCategories)[0];
      if (intersectingCategory) {
        this.sendAction('addProductToList', product, list);
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
