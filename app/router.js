import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('shops', function() {
    this.route('new', {path: '/'});
    this.route('edit', {path: '/:shop_id'});
  });
  this.route('lists', {path: 'lists/:list_id'}, function() {
    this.route('new', {path: '/new/:shop_id2'});
  });
});

export default Router;
