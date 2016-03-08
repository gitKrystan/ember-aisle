import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      brands: this.store.findAll('brand'),
      shops: this.store.findAll('shop')
    });
  },

  actions: {
    createBrand(params) {
      var newBrand = this.store.createRecord('brand', params);
      newBrand.save();
    },

    createShop(params) {
      var newShop = this.store.createRecord('shop', params);
      newShop.save();
    },

    createCategory(params) {
      var newCategory = this.store.createRecord('category', params);
      var aisle = params.aisle;
      aisle.get('categories').addObject(newCategory);
      newCategory.save().then(function() {
        aisle.save();
      });
    },

    createCategory(params) {
      var newProduct = this.store.createRecord('product', params);
      var category = params.category;
      category.get('categories').addObject(newProduct);
      newProduct.save().then(function() {
        category.save();
      });
    },
  }
});
