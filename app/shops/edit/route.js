import Ember from 'ember';

export default Ember.Route.extend({
  shopTemp: Ember.inject.service(),

  model(params) {
    var shopID = params.shop_id;
    var shopTemp = this.get('shopTemp');
    return Ember.RSVP.hash({
      brands: this.store.findAll('brand'),
      shop: this.store.find('shop', shopID),
      aisles: this.store.query('aisle', {
        orderBy: 'shop',
        equalTo: shopID
      }),
      categories: []
    }).then(function(modelHash) {
      var aisles = modelHash.aisles;
      aisles.forEach(function(aisle) {
        modelHash.categories.addObjects(aisle.get('categories'));
        shopTemp.loadAisle(aisle);
      });
      return modelHash;
    });
  },

  afterModel(resolvedModel) {
    var shopTemp = this.get('shopTemp');
    shopTemp.loadAllCategories(resolvedModel.categories);
  },

  actions: {
    updateShop(shop, params) {
      var shopTemp = this.get('shopTemp');
      var existingBrand = shop.get('brand');
      var newAisles = shopTemp.get('tempAisles');

      Object.keys(params).forEach(function(key) {
        var param = params[key];
        if(param !== undefined) {
          shop.set(key, param);
        }
      });

      shop.get('aisles').addObjects(newAisles);

      shop.save().then(function() {
        newAisles.forEach(function(aisle) {
          var categories = aisle.get('categories');
          aisle.save().then(function() {
            categories.forEach(function(category) {
              category.save();
            });
          });
        });
      }).then(function() {
        existingBrand.then(function(existingBrand) {
          var newBrand = params.brand;
          if (newBrand !== existingBrand) {
            existingBrand.get('shops').removeObject(shop);
            newBrand.get('shops').addObject(shop);
            existingBrand.save().then(function(newBrand) {
              return newBrand.save();
            });
          }
        });

      }).then(function() {
        shopTemp.set('tempCategories', []);
        shopTemp.set('tempAisles', []);
      });

      this.transitionTo('shops');
      // TODO: remove aisles
    },

    createTempCategory(params) {
      var tempCategory = this.store.createRecord('category', params);
      this.get('shopTemp').addTempCategory(tempCategory);
    },

    createTempAisle(params) {
      var tempAisle = this.store.createRecord('aisle', params);
      this.get('shopTemp').addTempAisle(tempAisle);
    }
  }
});