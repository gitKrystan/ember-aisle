import DS from 'ember-data';

export default DS.Model.extend({
  layoutAisles: DS.attr(),
  shop: DS.belongsTo('shop', {async: true})
});
