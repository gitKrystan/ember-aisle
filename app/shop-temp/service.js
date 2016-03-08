import Ember from 'ember';

export default Ember.Service.extend({
  allCategories: [],
  tempCategories: [],
  aisleCategories: [],

  allAisles: [],
  tempAisles: [],

  loadAllCategories(categories) {
    this.set('allCategories', categories);
  },

  addTempCategory(category) {
    this.get('allCategories').addObject(category);
    this.get('tempCategories').addObject(category);
    this.get('aisleCategories').addObject(category);
  },

  addTempAisle(aisle) {
    console.log('in service')
    this.get('allAisles').addObject(aisle);
    this.get('tempAisles').addObject(aisle);
  }
});
