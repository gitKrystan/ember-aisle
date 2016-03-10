import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('layout').then(function(model) {
      return model.get('firstObject')
    });
  }
});
