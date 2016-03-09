import Ember from 'ember';

export default Ember.Route.extend({
  listTemp: Ember.inject.service(),

  model(params) {
    var shopID = params.shop_id;
    return Ember.RSVP.hash({
      shop: this.store.find('shop', shopID),
      shopAisles: this.store.query('aisle', {
        orderBy: 'shop',
        equalTo: shopID
      }),
      allCategories: this.store.findAll('category'),
      shopCategories: [],
      allProducts: this.store.findAll('product'),
      shopProducts: [],
    });
  },

  afterModel(resolvedModel) {
    var aisles = resolvedModel.shopAisles;
    aisles.forEach(function(aisle) {
      resolvedModel.shopCategories.addObjects(aisle.get('categories'));
    });

    var categories = resolvedModel.shopCategories;
    categories.forEach(function(category) {
      resolvedModel.shopProducts.addObjects(category.get('products'));
    });
  },

  actions: {
    createTempProduct(params) {
      var tempProduct = this.store.createRecord('product', params);
      this.get('listTemp').addTempProduct(tempProduct);
    }
  }
});
