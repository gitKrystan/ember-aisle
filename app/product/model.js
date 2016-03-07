import DS from 'ember-data';

export default DS.Model.extend({
  category: DS.belongsTo('category', {async: true}),
  list: DS.belongsTo('list', {async: true}),
  name: DS.attr('string')
});
