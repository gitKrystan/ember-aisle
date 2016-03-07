import DS from 'ember-data';

export default DS.Model.extend({
  store: DS.belongsTo('store', {async: true}),
  categories: DS.hasMany('category', {async: true}),
  number: DS.attr()
});
