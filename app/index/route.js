import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('shop');
  },

  actions: {
    newList(params) {
      var shop = params.shop;
      var newList = this.store.createRecord('list', params);
      shop.get('lists').addObject(newList);
      newList.save().then(function() {
        return shop.save();
      });
      this.transitionTo('lists', newList.id);
    }
  }
});
