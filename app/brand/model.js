import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  shops: DS.hasMany('shop', {async: true})
});
