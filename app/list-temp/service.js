import Ember from 'ember';

export default Ember.Service.extend({
  listProducts: [],

  addProductToList(product) {
    this.get('listProducts').addObject(product);
    console.log(this.get('listProducts').mapBy('name'))
  },
});
