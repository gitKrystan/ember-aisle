import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectAction(category) {
      var action = this.get('action');
      var list = this.get('list');
      if (action === 'createProductAndAddToList') {
        var params = {
          lists: [list],
          categories: [category],
          name: this.get('productName')
        };
        this.sendAction('createProductAndAddToList', params);
      } else if (action === 'categorizeProductAndAddToList') {
        var product = this.get('currentProduct');
        this.sendAction('categorizeProductAndAddToList', product, category, list);
      }
    }
  }
});
