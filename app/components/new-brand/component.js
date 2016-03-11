import Ember from 'ember';

export default Ember.Component.extend({
  brandSaved: false,

  actions: {
    createBrand() {
      var params = {
        name: this.get('brandName')
      };
      this.sendAction('createBrand', params);
      this.set('brandName', '');
      this.set('brandSaved', 'true');
    },

    dismissAlert() {
      this.set('brandSaved', false);
    }
  }
});
