import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {

    //add one aisle to the page on load
    var _this = this;
    var zIndex = 500;
    var aisleID = 1;
    var container = $('#grid-container');

    function placeAisle(layoutAisle, element) {
      var x = layoutAisle.dataX;
      var y = layoutAisle.dataY;

      // update the element's style
      element.style.width  = layoutAisle.width
      element.style.height = layoutAisle.height

      element.style.webkitTransform = element.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

      element.setAttribute('data-x', x);
      element.setAttribute('data-y', y);
    }

    (this.get('layout').get('firstObject').get('layoutAisles')).forEach(function(layoutAisle) {
      console.log(layoutAisle)
      var newElement = $("<div class='grid-wrapper'>\
                          <div class='grid-snap'>\
                            <div class='aisle-info'>\
                            </div>\
                          </div>\
                        </div>").appendTo(container);
      placeAisle(layoutAisle, newElement.children().first()[0]);
    });
  }
});
