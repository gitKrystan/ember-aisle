import Ember from 'ember';

export default Ember.Component.extend({
  editLayout: false,
  layout: {},
  didInsertElement: function() {

    //add one aisle to the page on load
    var _this = this;
    var zIndex = 500;
    var aisleID = 1;
    var yPos = (parseInt(this.get('aisles').get('length')) * 30) - 30;
    var container = $('#grid-container');
    console.log(this.get('aisles'));
    (this.get('aisles')).forEach(function(aisle) {
      var nameArray = aisle.get('categories').mapBy('name');
      var nameList = nameArray.join(', ');
      var newElement = $("<div class='grid-wrapper'>\
                          <div class='grid-snap' id='"+aisle.get('number')+"'>\
                            <div class='aisle-info'>\
                              <h5>\
                                "+aisle.get('number')+' '+nameList+"\
                              </h5>\
                            </div>\
                          </div>\
                        </div>").appendTo(container);
      zIndex--;
      var tempElement = $(newElement).children()[0];
      tempElement.style.height = "30px"
      tempElement.style.webkitTransform =
      tempElement.style.transform =
          'translate(' + 0 + 'px,' + yPos + 'px)';
      tempElement.style.zIndex = zIndex
      tempElement.setAttribute('data-x', 0);
      tempElement.setAttribute('data-y', yPos);
      yPos -= 30;
      _this.get('layout')[tempElement.id] = {
        dataX: tempElement.getAttribute('data-x'),
        dataY: tempElement.getAttribute('data-y'),
        height: tempElement.style.height,
        transform: tempElement.style.transform,
        webkitTransform: tempElement.style.webkitTransform,
        width: tempElement.style.width,
        zIndex: tempElement.style.zIndex,
        catString: tempElement.outerText
      };
    })

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
        console.log(event.target.outerText);
        _this.get('layout')[event.target.id] = {
          dataX: event.target.getAttribute('data-x'),
          dataY: event.target.getAttribute('data-y'),
          height: event.target.style.height,
          transform: event.target.style.transform,
          webkitTransform: event.target.style.webkitTransform,
          width: event.target.style.width,
          zIndex: event.target.style.zIndex,
          catString: event.target.outerText
        };
      }

      window.dragMoveListener = dragMoveListener;
  },

  actions: {
    exportLayout() {
      var params = {
        layoutAisles: this.get('layout'),
        shop: this.get('shop')
      }
      this.sendAction('exportLayout', params);
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
