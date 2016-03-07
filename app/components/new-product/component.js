import Ember from 'ember';

export default Ember.Component.extend({
  currentAisle: null,
  currentCategory: null,

  actions: {
    createProduct() {
      var params = {
        category: this.get('currentCategory') || '',
        name: this.get('productName') || ''
      };
      this.sendAction('createProduct', params);
    }
  }
});
