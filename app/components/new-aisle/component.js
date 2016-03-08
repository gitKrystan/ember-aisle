import Ember from 'ember';

export default Ember.Component.extend({
  shopTemp: Ember.inject.service(),

  init() {
    var shopTemp = this.get('shopTemp');
    shopTemp.loadAllCategories(this.get('allCategories'));
    this._super();
  },

  actions: {
    findOrCreateCategory(dropdown, event) {
      if (event.keyCode !== 13) { return; }
      let categoryName = event.target.value;
      if (categoryName.length > 0 && this.get('allCategories').indexOf(categoryName) === -1) {
        // create new temp category and add it to the aisleCategories
        var params = {
          name: categoryName
        }
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
