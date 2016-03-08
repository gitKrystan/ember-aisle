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

  loadAllAisles(aisles) {
    this.set('allAisles', aisles);
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
