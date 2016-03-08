import Ember from 'ember';

export function nameList(params/*, hash*/) {
  var nameArray = params[0].mapBy('name');
  var nameList = nameArray.join(', ');

  return nameList;
}

export default Ember.Helper.helper(nameList);
