import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {

    //add one aisle to the page on load
    var layout = {};
    var zIndex = 500;
    var aisleID = 1;
    var container = $('#grid-container');
    var newElement = container.append("<div class='grid-wrapper'>\
                        <div class='grid-snap' id='"+aisleID+"'>\
                          <button type='button' class='deleteAisle'>X</button>\
                          <div class='aisle-info'>\
                            <h4>\
                              <input\
                               class='form-control' \
                               type='number'\
                               style='z-index:999'\
                               value="+aisleID+">\
                              </input>\
                            </h4>\
                          </div>\
                        </div>\
                      </div>");
    $(newElement).children().children().children('.deleteAisle').bind('click', function() {
      $(this).parent().parent().remove();
    })

    //setup grid for snapping, dragging, dropping aisles, etc.
    var element = document.getElementsByClassName('grid-snap')[0];
    console.log(element.parentNode.parentNode);
    interact('.grid-snap')
      .draggable({
        snap: {
          targets: [
            interact.createSnapGrid({ x: 30, y: 30 })
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        },
        inertia: false,
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
          target.style.width  = (Math.round(event.rect.width / 30) * 30) + 'px';
          target.style.height = (Math.round(event.rect.height / 30) * 30) + 'px';

          // translate when resizing from top or left edges
          x += (Math.round(event.deltaRect.left / 30) * 30);
          y += (Math.round(event.deltaRect.top / 30) * 30);

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
      })
      .on('dragend', function(event) {
        updateLayout(event.target);
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

      function updateLayout (target) {
        console.log(target);
        layout[target.id] = target;
        console.log(layout);
      }

      window.dragMoveListener = dragMoveListener;

      //setup proper jquery bindings to add and remove aisles from the page
      $('.addAisle').on('click', function(event) {
        aisleID++;
        var container = $('#grid-container');
        var newElement = container.append("<div class='grid-wrapper'>\
                            <div class='grid-snap' id='"+aisleID+"'>\
                              <button type='button' class='deleteAisle'>X</button>\
                              <div class='aisle-info'>\
                                <h4>\
                                  <input\
                                   class='form-control' \
                                   type='number'\
                                   style='z-index:999'\
                                   value="+aisleID+">\
                                  </input>\
                                </h4>\
                              </div>\
                            </div>\
                          </div>");
        $(newElement).children().children().children('.deleteAisle').bind('click', function() {
          $(this).parent().parent().remove();
        })
      });
  },

  actions: {
  }
});
