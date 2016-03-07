import Ember from 'ember';

export default Ember.Component.extend({
  showBrandForm: false,
  showShopForm: false,
  showEditeShop: false,

  actions: {
    showBrandForm() {
      if (this.get('showBrandForm') === false) {
        this.set('showBrandForm', true);
      } else {
        this.set('showBrandForm', false);
      }
    },

    showShopForm() {
      if (this.get('showShopForm') === false) {
        this.set('showShopForm', true);
      } else {
        this.set('showShopForm', false);
      }
    },

    showEditShop() {
      if (this.get('showEditShop') === false) {
        this.set('showEditShop', true);
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
