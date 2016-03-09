import Ember from 'ember';

export default Ember.Component.extend({
  listProducts: Ember.computed('list', function() {
    return this.get('list').get('products');
  }),
  shop: Ember.computed('list', function() {
    return this.get('list').get('shop');
  }),
  shopAisles: Ember.computed('shop', function() {
    return this.get('shop').get('aisles');
  }),
  shopCategories: Ember.computed('shopAisles', function() {
    var aisles = this.get('shopAisles');
    var categories = [];
    aisles.forEach(function(aisle) {
      categories.addObjects(aisle.get('categories'));
    });
    return categories;
  }),
  shopProducts: Ember.computed('shopCategories', function() {
    var categories = this.get('shopCategories');
    var products = [];
    categories.forEach(function(category) {
      products.addObjects(category.get('products'));
    });
    return products;
  }),

  categoryAlert: '',

  actions: {
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
          var params = {
            lists: [component.get('list')],
            name: productName
          };
          component.sendAction('createProductAndAddToList', params);
        } else if (isEmpty) {
          return;
        } else {
          component.set('productAlert', '(avoid duplicate product names)');
        }
      });
    },
  }
});
