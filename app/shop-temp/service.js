import Ember from 'ember';

export default Ember.Service.extend({
  allCategories: [],
  tempCategories: [],
  aisleCategories: [],

  allAisles: [],
  tempAisles: [],

  clearAll() {
    this.set('allCategories', []);
    this.set('tempCategories', []);
    this.set('aisleCategories', []);
    this.set('allAisles', []);
    this.set('tempAisles', []);
  },

  loadAisle(aisle) {
    this.get('allAisles').addObject(aisle);
  },

  loadAllCategories(categories) {
    this.set('allCategories', categories);
  },

  addTempCategory(category) {
    this.get('allCategories').addObject(category);
    this.get('tempCategories').addObject(category);
    this.get('aisleCategories').addObject(category);
  },

  addTempAisle(aisle) {
    this.get('allAisles').addObject(aisle);
    this.get('tempAisles').addObject(aisle);
  }
});
