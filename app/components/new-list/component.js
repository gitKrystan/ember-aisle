import Ember from 'ember';

export default Ember.Component.extend({
  listProducts: Ember.computed('list', function() {
    var products = this.get('list').get('products');
    return products
    // var productList = [];
    // products.forEach(function(product) {
    //
    // })
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
