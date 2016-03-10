import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createProductAndAddToList(category) {
      var params = {
        lists: [this.get('list')],
        categories: [category],
        name: this.get('productName')
      };
      this.sendAction('createProductAndAddToList', params);
    }
  }
});
