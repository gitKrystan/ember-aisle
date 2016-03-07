import Ember from 'ember';

export default Ember.Component.extend({
  showBrandForm: false,
  showShopForm: false,
  showEditShop: false,
  currentShop: null,

  actions: {
    showBrandForm() {
      if (this.get('showBrandForm') === false) {
        this.set('showBrandForm', true);
        this.set('showShopForm', false);
        this.set('showEditShop', false);
      } else {
        this.set('showBrandForm', false);
      }
    },

    showShopForm() {
      if (this.get('showShopForm') === false) {
        this.set('showShopForm', true);
        this.set('showEditShop', false);
        this.set('showBrandForm', false);
      } else {
        this.set('showShopForm', false);
      }
    },

    showEditShop() {
      if (this.get('showEditShop') === false) {
        this.set('showEditShop', true);
        this.set('showBrandForm', false);
        this.set('showShopForm', false);
      } else {
        this.set('showEditShop', false);
      }
    },

    createBrand(params) {
      this.sendAction('createBrand', params);
    },

    createShop(params) {
      this.sendAction('createShop', params);
    }
  }
});
