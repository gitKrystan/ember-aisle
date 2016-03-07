import DS from 'ember-data';

export default DS.Model.extend({
  shop: DS.belongsTo('shop', {async: true}),
  products: DS.hasMany('product', {async: true}),
  aislePreference: DS.attr(),
  productsInCart: DS.attr()
});
