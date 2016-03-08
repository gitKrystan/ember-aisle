import Ember from 'ember';

export default Ember.Route.extend({
  shopTemp: Ember.inject.service(),

  model() {
    return Ember.RSVP.hash({
      brands: this.store.findAll('brand'),
      shops: this.store.findAll('shop')
    });
  },

  actions: {
    createBrand(params) {
      var newBrand = this.store.createRecord('brand', params);
      newBrand.save();
    },

    createShop(params) {
      var shopTemp = this.get('shopTemp');
      var tempCategories = shopTemp.get('tempCategories');
      var tempAisles = shopTemp.get('tempAisles');
      var brand = params.brand;
      var newShop = this.store.createRecord('shop', params);
      newShop.save().then(function() {
        tempAisles.forEach(function(aisle) {
          var categories = aisle.get('categories');
          aisle.save().then(function() {
            categories.forEach(function(category) {
              category.save();
            })
          })
        })
      }).then(function() {
        brand.get('shops').addObject(newShop);
        brand.save();
      });
    },

    createTempCategory(params) {
      var tempCategory = this.store.createRecord('category', params);
      this.get('shopTemp').addTempCategory(tempCategory);
    },

    createCategory(params) {
      var newCategory = this.store.createRecord('category', params);
      var aisle = params.aisle;
      aisle.get('categories').addObject(newCategory);
      newCategory.save().then(function() {
        aisle.save();
      });
    },

    createTempAisle(params) {
      var tempAisle = this.store.createRecord('aisle', params);
      this.get('shopTemp').addTempAisle(tempAisle);
      console.log('in route')
    },

    createProduct(params) {
      var newProduct = this.store.createRecord('product', params);
      var category = params.category;
      category.get('categories').addObject(newProduct);
      newProduct.save().then(function() {
        category.save();
      });
    },
  }
});
