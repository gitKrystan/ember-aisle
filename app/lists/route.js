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
    addProductToList(product, list) {
      product.get('lists').addObject(list);
      product.save().then(function() {
        list.get('products').addObject(product);
        list.save();
      });
    },

    createProductAndAddToList(params) {
      var newProduct = this.store.createRecord('product', params);
      var list = params.lists[0];
      list.get('products').addObject(newProduct);
      var category = params.categories[0];
      category.get('products').addObject(newProduct);
      newProduct.save().then(function() {
        list.save().catch(error => {
          console.log('error saving list:' + error.errors);
        });
        category.save().catch(error => {
          console.log('error saving category:' + error.errors);
        });
      }).catch(error => {
        console.log('error saving product:' + error.errors);
      });
    }
  }
});
