import DS from 'ember-data';

export default DS.Model.extend({
  shop: DS.belongsTo('shop', {async: true}),
  categories: DS.hasMany('category', {async: true}),
  number: DS.attr()
});
