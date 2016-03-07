import DS from 'ember-data';

export default DS.Model.extend({
  brand: DS.belongsTo('brand', {async: true}),
  lists: DS.hasMany('list', {async: true}),
  aisles: DS.hasMany('aisle', {async: true}),
  name: DS.attr('string'),
  address: DS.attr('string')
});
