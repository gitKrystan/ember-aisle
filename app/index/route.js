import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('shop');
  },

  actions: {
    newList(params) {
      console.log('index')
      var route = this;
      var newList = this.store.createRecord('list', params);
      newList.save().then(function() {
        route.transitionTo('lists', newList.id);
      });
    }
  }
});
