import DS from 'ember-data';

export default DS.Model.extend({
  categories: DS.hasMany('category', {async: true}),
  lists: DS.hasMany('list', {async: true, inverse: 'products'}),
  name: DS.attr('string')
});
