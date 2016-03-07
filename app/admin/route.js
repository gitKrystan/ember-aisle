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
    }
  }
});
