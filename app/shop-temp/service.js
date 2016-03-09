import Ember from 'ember';

export default Ember.Service.extend({
  tempCategories: [],
  aisleCategories: [],
  availableCategories: [],
  usedCategories: [],
  allCategories: Ember.computed.uniq('tempCategories', 'aisleCategories', 'availableCategories', 'usedCategories'),

  allAisles: [],
  tempAisles: [],
  aislesToRemove: [],

  clearAll() {
    this.set('tempCategories', []);
    this.set('aisleCategories', []);
    this.set('availableCategories', []);
    this.set('allAisles', []);
    this.set('tempAisles', []);
  },

  loadAisle(aisle) {
    this.get('allAisles').addObject(aisle);
  },

  loadAllCategories(categories) {
    this.set('usedCategories', categories);
  },

  addTempCategory(category) {
    this.get('tempCategories').addObject(category);
    this.get('aisleCategories').addObject(category);
  },

  addTempAisle(aisle) {
    this.get('allAisles').addObject(aisle);
    this.get('tempAisles').addObject(aisle);
  },

  removeAisle(aisle) {
    this.get('availableCategories').addObjects(aisle.get('categories'));
    this.get('allAisles').removeObject(aisle);
    this.get('tempAisles').removeObject(aisle);
    this.get('aislesToRemove').addObject(aisle);
  }
});
