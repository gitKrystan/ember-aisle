import Ember from 'ember';

export default Ember.Component.extend({
  showBrandForm: false,
  showStoreForm: false,

  actions: {
    showBrandForm() {
      if (this.get('showBrandForm') === false) {
        this.set('showBrandForm', true);
      } else {
        this.set('showBrandForm', false);
      }
    },

    showStoreForm() {
      if (this.get('showStoreForm') === false) {
        this.set('showStoreForm', true);
      } else {
        this.set('showStoreForm', false);
      }
    },

    createBrand(params) {
      this.sendAction('createBrand', params);
    }
  }
});
