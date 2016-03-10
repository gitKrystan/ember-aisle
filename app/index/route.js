import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('layout');
  },
  
  actions: {
    exportLayout(params) {
      console.log(params);
      var newLayout = this.store.createRecord('layout', params);
      newLayout.save().then(function() {
        console.log('saved')
      })
    }
  }
});
