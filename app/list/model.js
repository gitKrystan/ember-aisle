import DS from 'ember-data';

export default DS.Model.extend({
  shop: DS.belongsTo('shop', {async: true}),
  products: DS.hasMany('product', {async: true, inverse: 'lists'}),
  aislePreference: DS.attr(),
  productsInCart: DS.hasMany('product', {async: true, inverse: null })
});
