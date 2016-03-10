import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    var route = this;
    var listID = params.list_id;
    return Ember.RSVP.hash({
      list: this.store.findRecord('list', listID),
      products: this.store.findAll('product')
    }).then(function(modelHash) {
      // Get the shop
      var shopID = modelHash.list.get('shop').get('id');
      var shop = route.store.findRecord('shop', shopID);
      return shop.then(function(shop) {
        modelHash.shop = shop;

        // Get the aisles
        var shopID = shop.get('id');
        var aisles = route.store.query('aisle', {
          orderBy: 'shop',
          equalTo: shopID
        });
        return aisles.then(function(aisles) {
          modelHash.aisles = aisles;

          // Get the categories and their products
          var categoryIDs = [];
          aisles.forEach(function(aisle) {
            var aisleCategoryIDs = aisle.get('categories').mapBy('id');
            categoryIDs.addObjects(aisleCategoryIDs);
          });

          var categories = [];
          var shopProducts = [];
          categoryIDs.forEach(function(categoryID) {
            var category = route.store.findRecord('category', categoryID);
            return category.then(function(category) {
              categories.addObject(category);
              shopProducts.addObjects(category.get('products'));
            });
          });
          modelHash.categories = categories;
          modelHash.shopProducts = shopProducts;

          return modelHash;
        });
      });
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
