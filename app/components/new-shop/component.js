import Ember from 'ember';

export default Ember.Component.extend({
  currentBrand: null,

  actions: {
    createShop() {
      console.log(this.get('currentBrand'))
      var params = {
        brand: this.get('currentBrand') || '',
        name: this.get('shopName') || '',
        address: this.get('shopAddress') || ''
      };
      this.sendAction('createShop', params);
    }
  }
});
