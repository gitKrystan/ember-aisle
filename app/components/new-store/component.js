import Ember from 'ember';

export default Ember.Component.extend({
  currentBrand: null,

  actions: {
    createStore() {
      console.log(this.get('currentBrand'))
      var params = {
        brand: this.get('currentBrand') || '',
        name: this.get('storeName') || '',
        address: this.get('storeAddress') || ''
      };
      this.sendAction('createStore', params);
    }
  }
});
