import Ember from 'ember';

export default Ember.Route.extend({
  shopTemp: Ember.inject.service(),

  model(params) {
    var shopID = params.shop_id;
    var shopTemp = this.get('shopTemp');
    return Ember.RSVP.hash({
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
      })
      shopTemp.loadAllAisles(aisles);
      shopTemp.loadAllCategories(modelHash.categories);
      return modelHash;
    });
  }
});
