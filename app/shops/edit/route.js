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
      var modelHash = modelHash;
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
      Object.keys(params).forEach(function(key) {
        var param = params[key];
        if(param !== undefined) {
          shop.set(key, param);
        }
      });
      shop.save();
      this.transitionTo('shops');
      // TODO: add and remove aisles
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
