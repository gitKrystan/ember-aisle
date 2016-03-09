import Ember from 'ember';

export default Ember.Component.extend({
  shopTemp: Ember.inject.service(),
  categoryAlert: '',

  actions: {
    findOrCreateCategory(dropdown, event) {
      if (event.keyCode !== 13) { return; }
      var component = this;
      var shopTemp = this.get('shopTemp');

      let categoryInput = event.target.value;
      var categoryNames = categoryInput.split(', ');

      categoryNames.forEach(function(categoryName) {
        var isUnique = shopTemp.get('allCategories')
          .mapBy('name').indexOf(categoryName) === -1;
        var isEmpty = categoryName.length === 0;
        if (!isEmpty && isUnique) {
          var params = {
            name: categoryName
          };
          component.sendAction('createTempCategory', params);
        } else if (isEmpty) {
          return;
        } else {
          component.set('categoryAlert', '(avoid duplicate category names)');
        }
      });
    },

    createTempAisle() {
      var shopTemp = this.get('shopTemp');
      var aisleCategories = shopTemp.get('aisleCategories');
      var params = {
        number: this.get('aisleNumber'),
        categories: aisleCategories
      };
      this.sendAction('createTempAisle', params);

      this.set('aisleNumber', '');
      shopTemp.get('availableCategories').removeObjects(aisleCategories);
      shopTemp.set('aisleCategories', []);
      this.set('categoryAlert', '');
    },

    removeAisle(aisle) {
      var shopTemp = this.get('shopTemp');
      shopTemp.removeAisle(aisle);
    }
  }
});
