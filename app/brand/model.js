import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  stores: DS.hasMany('store', {async: true}),
  defaultStore: DS.belongsTo('store', {async: true})
});
