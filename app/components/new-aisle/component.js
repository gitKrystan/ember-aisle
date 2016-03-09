import Ember from 'ember';

export default Ember.Component.extend({
  shopTemp: Ember.inject.service(),

  actions: {
    findOrCreateCategory(dropdown, event) {
      if (event.keyCode !== 13) { return; }
      let categoryName = event.target.value;
      var shopTemp = this.get('shopTemp');
      if (categoryName.length > 0 && shopTemp.get('allCategories').indexOf(categoryName) === -1) {
        var params = {
          name: categoryName
        };
        this.sendAction('createTempCategory', params);
      }
    },

    createTempAisle() {
      var shopTemp = this.get('shopTemp');
      var params = {
        number: this.get('aisleNumber'),
        categories: shopTemp.get('aisleCategories')
      };
      this.sendAction('createTempAisle', params);

      this.set('aisleNumber', '');
      shopTemp.set('aisleCategories', []);
    }
  }
});
