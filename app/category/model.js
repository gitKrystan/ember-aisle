import DS from 'ember-data';

export default DS.Model.extend({
  aisle: DS.belongsTo('aisle', {async: true}),
  products: DS.hasMany('product', {async: true}),
  name: DS.attr('string')
});
