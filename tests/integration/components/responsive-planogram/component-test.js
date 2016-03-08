import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('responsive-planogram', 'Integration | Component | responsive planogram', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{responsive-planogram}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#responsive-planogram}}
      template block text
    {{/responsive-planogram}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
