import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('interactive-layout', 'Integration | Component | interactive layout', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{interactive-layout}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#interactive-layout}}
      template block text
    {{/interactive-layout}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
