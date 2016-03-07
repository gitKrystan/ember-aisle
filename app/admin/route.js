import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      brands: this.store.findAll('brand')
    });
  },

  actions: {
    createBrand(params) {
      var newBrand = this.store.createRecord('brand', params);
      newBrand.save();
    }
  }
});
