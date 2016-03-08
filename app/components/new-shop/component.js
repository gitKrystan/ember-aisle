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
    },

    createTempCategory(params) {
      console.log('in new-shop component');
      this.sendAction('createTempCategory', params);
    },

    createTempAisle(params) {
      this.sendAction('createTempAisle', params);
    }
  }
});
