import Ember from 'ember';

export default Ember.Route.extend({
  shopTemp: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      brands: this.store.findAll('brand'),
      shops: this.store.findAll('shop'),
      categories: this.store.findAll('category'),
    });
  },

  actions: {
    createBrand(params) {
      var newBrand = this.store.createRecord('brand', params);
      newBrand.save();
    },

    createShop(params) {
      var shopTemp = this.get('shopTemp');
      var tempAisles = shopTemp.get('tempAisles');
      var brand = params.brand;
      var newShop = this.store.createRecord('shop', params);
      newShop.save().then(function() {
        tempAisles.forEach(function(aisle) {
          var categories = aisle.get('categories');
          aisle.save().then(function() {
            categories.forEach(function(category) {
              category.save();
            });
          });
        });
      }).then(function() {
        brand.get('shops').addObject(newShop);
        brand.save();
        shopTemp.set('tempCategories', []);
        shopTemp.set('tempAisles', []);
      });
    },

    createTempCategory(params) {
      var tempCategory = this.store.createRecord('category', params);
      this.get('shopTemp').addTempCategory(tempCategory);
    },

    createTempAisle(params) {
      var tempAisle = this.store.createRecord('aisle', params);
      this.get('shopTemp').addTempAisle(tempAisle);
    },

    setCurrentShop(shop) {
      this.transitionTo('shops.edit', shop.get('id'));
    },
  }
});
