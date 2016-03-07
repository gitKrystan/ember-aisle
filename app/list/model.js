import DS from 'ember-data';

export default DS.Model.extend({
  store: DS.belongsTo('store', {async: true}),
  products: DS.hasMany('product', {async: true}),
  aislePreference: DS.attr(),
  productsInCart: DS.attr()
});
