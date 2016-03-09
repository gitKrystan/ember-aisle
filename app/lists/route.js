import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var listID = params.list_id;
    return Ember.RSVP.hash({
      list: this.store.find('list', listID),
      shops: this.store.findAll('shop'),
      aisles: this.store.findAll('aisle'),
      categories: this.store.findAll('category'),
      products: this.store.findAll('product')
    });
  },

  actions: {
    createProductAndAddToList(params) {
      var list = params.lists[0];
      var newProduct = this.store.createRecord('product', params);
      newProduct.save().then(function() {
        list.get('products').addObject(newProduct);
        list.save();
      });
    }
  }
});
