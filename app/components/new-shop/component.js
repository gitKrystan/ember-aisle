import Ember from 'ember';

export default Ember.Component.extend({
  shopTemp: Ember.inject.service(),

  currentBrand: null,

  newShopCategories: [],

  actions: {
    createShop() {
      var shopTemp = this.get('shopTemp');
      var params = {
        brand: this.get('currentBrand') || '',
        aisles: shopTemp.get('allAisles') || [],
        name: this.get('shopName') || '',
        address: this.get('shopAddress') || ''
      };
      this.sendAction('createShop', params);
      this.set('currentBrand', null);
      this.set('shopName', '');
      this.set('shopAddress', '');
    },

    createTempCategory(params) {
      this.sendAction('createTempCategory', params);
    },

    createTempAisle(params) {
      this.sendAction('createTempAisle', params);
    }
  }
});
