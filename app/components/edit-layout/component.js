import Ember from 'ember';

export default Ember.Component.extend({
  editLayout: false,
  tempLayout: {},
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
      var newElement = $("<div class='grid-wrapper'>\
                          <div class='grid-snap' id='"+aisleID+"'>\
                            <div class='aisle-info'>\
                              <h5>"+layoutAisle.catString+"</h5>\
                            </div>\
                          </div>\
                        </div>").appendTo(container);
      placeAisle(layoutAisle, newElement.children().first()[0]);
    });

    //setup grid for snapping, dragging, dropping aisles, etc.
    var element = document.getElementsByClassName('grid-snap')[0];
    interact('.grid-snap')
      .draggable({
        restrict: {
          restriction: element.parentNode.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: false
        },
        onmove: dragMoveListener
      })
      .resizable({
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('mousedown', function (event) {
        var target = event.target;
        zIndex += 1;
        target.style.zIndex = zIndex;
      })
      .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width  = (Math.round(event.rect.width / 15) * 15) + 'px';
          target.style.height = (Math.round(event.rect.height / 15) * 15) + 'px';

          // translate when resizing from top or left edges
          x += (Math.round(event.deltaRect.left / 15) * 15);
          y += (Math.round(event.deltaRect.top / 15) * 15);

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          updateLayout(event);
      })
      .on('dragend', function(event) {
        updateLayout(event);
      });

      function dragMoveListener (event) {
        var target = event.target,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
        target.style.transform =
          'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      };

      function updateLayout (event) {
        var target = event.target
        _this.get('tempLayout')[target.id] = {
          dataX: target.getAttribute('data-x'),
          dataY: target.getAttribute('data-y'),
          height: target.style.height,
          transform: target.style.transform,
          webkitTransform: target.style.webkitTransform,
          width: target.style.width,
          zIndex: target.style.zIndex,
          catString: target.outerText
        };
      }

      window.dragMoveListener = dragMoveListener;
  },

  actions: {
    updateLayout() {
      var params = {
        layoutAisles: this.get('tempLayout'),
        shop: this.get('shop'),
        layout: this.get('layout')
      }
      if ($("#hiddenWrapper").is(":visible")) {
        $("#hiddenWrapper").hide();
      } else {
        $("#hiddenWrapper").show();
      }
      this.sendAction('updateLayout', params);
    },

    editLayout() {
      if ($("#hiddenWrapper").is(":visible")) {
        $("#hiddenWrapper").hide();
      } else {
        $("#hiddenWrapper").show();
      }
    }
  }
});
