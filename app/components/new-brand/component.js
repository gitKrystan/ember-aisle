import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createBrand() {
      var params = {
        name: this.get('brandName')
      };
      this.sendAction('createBrand', params);
    }
  }
});
