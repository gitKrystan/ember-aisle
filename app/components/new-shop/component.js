import Ember from 'ember';

export default Ember.Component.extend({
  shopTemp: Ember.inject.service(),

  currentBrand: null,

  newShopCategories: [],

  shopBrand: Ember.computed.oneWay('shop.brand'),
  shopName: Ember.computed.oneWay('shop.name'),
  shopAddress: Ember.computed.oneWay('shop.address'),

  actions: {
    createShop() {
      var shopTemp = this.get('shopTemp');
      var params = {
        brand: this.get('shopBrand') || '',
        aisles: shopTemp.get('allAisles') || [],
        name: this.get('shopName') || '',
        address: this.get('shopAddress') || ''
      };
      this.sendAction('createShop', params);
      this.set('shopBrand', null);
      this.set('shopName', '');
      this.set('shopAddress', '');
    },

    updateShop(shop) {
      var params = {
        brand: this.get('shopBrand'),
        name: this.get('shopName'),
        address: this.get('shopAddress')
      };
      this.sendAction('updateShop', shop, params);
      this.set('shopBrand', null);
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
