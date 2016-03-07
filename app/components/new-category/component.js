import Ember from 'ember';

export default Ember.Component.extend({
  currentAisle: null,

  actions: {
    createCategory() {
      var params = {
        aisle: this.get('currentAisle') || '',
        name: this.get('categoryName') || ''
      };
      this.sendAction('createCategory', params);
    }
  }
});
