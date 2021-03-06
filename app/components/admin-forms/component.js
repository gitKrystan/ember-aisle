import Ember from 'ember';

export default Ember.Component.extend({
  shopTemp: Ember.inject.service(),
  
  showBrandForm: false,
  showShopForm: false,
  showEditShop: false,
  showNewCategoryForm: false,
  showNewProductForm: false,
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
      this.get('shopTemp').clearAll();
      if (this.get('showShopForm') === false) {
        this.set('showShopForm', true);
        this.set('showEditShop', false);
        this.set('showBrandForm', false);
      } else {
        this.set('showShopForm', false);
      }
    },

    setCurrentShop(shop) {
      this.sendAction('setCurrentShop', shop);
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

    showNewCategoryForm() {
      if (this.get('showNewCategoryForm') === false) {
        this.set('showNewCategoryForm', true);
      } else {
        this.set('showNewCategoryForm', false);
      }
    },

    showNewProductForm() {
      if (this.get('showNewProductForm') === false) {
        this.set('showNewProductForm', true);
      } else {
        this.set('showNewProductForm', false);
      }
    },

    createBrand(params) {
      this.sendAction('createBrand', params);
    },

    createShop(params) {
      this.sendAction('createShop', params);
    },

    createTempCategory(params) {
      this.sendAction('createTempCategory', params);
    },

    createTempAisle(params) {
      this.sendAction('createTempAisle', params);
    },

    createCategory(params) {
      this.sendAction('createCategory', params);
    },

    createProduct(params) {
      this.sendAction('createProduct', params);
    }
  }
});
