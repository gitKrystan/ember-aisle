import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    newList(shop) {
      var params = {
        shop: shop,
        aislePreference: null
      };
      this.sendAction('newList', params);
    }
  }
});
