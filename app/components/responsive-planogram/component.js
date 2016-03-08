import Ember from 'ember';

export default Ember.Component.extend({
   didInsertElement: function() {
      var $ = go.GraphObject.make;
      // Initialize the main Diagram
      var cellSize = new go.Size(50, 50);
      var myDiagram =
      $(go.Diagram, "myDiagram",
      {
        grid: $(go.Panel, "Grid",
        { gridCellSize: cellSize },
        $(go.Shape, "LineH", { stroke: "white" }),
        $(go.Shape, "LineV", { stroke: "white" })
      ),
      // support grid snapping when dragging and when resizing
      "draggingTool.isGridSnapEnabled": true,
      "draggingTool.gridSnapCellSpot": go.Spot.Center,
      "resizingTool.isGridSnapEnabled": true,
      allowDrop: true,  // handle drag-and-drop from the Palette
      "undoManager.isEnabled": true
    });
    // Regular Nodes represent items to be put onto racks.
    // Nodes are currently resizable, but if that is not desired, just set resizable to false.
    myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      { resizable: true, resizeObjectName: "SHAPE",
      // because the gridSnapCellSpot is Center, offset the Node's location
      locationSpot: new go.Spot(0, 0, cellSize.width / 2, cellSize.height / 2)
      },
      // always save/load the point that is the top-left corner of the node, not the location
      new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
      // this is the primary thing people see
      $(go.Shape, "Rectangle",
      { name: "SHAPE",
      fill: "white",
      minSize: cellSize,
      desiredSize: cellSize  // initially 1x1 cell
      },
      new go.Binding("fill", "color"),
      new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
      // with the textual key in the middle
      $(go.TextBlock,
        { alignment: go.Spot.Center, stroke: 'gray', font: "bold 75% sans-serif" },
        new go.Binding("text", "key"))
      );  // end Node

      myDiagram.model = new go.GraphLinksModel([
      ]);

      // pushes object position, color and size into a JSON notation
      myDiagram.model.addChangedListener(function(e) {
        if (e.isTransactionFinished) {
          document.getElementById("savedModel").textContent = myDiagram.model.toJson();
        }
      });

      var myPalette =
      $(go.Palette, "myPalette",
      { // share the templates with the main Diagram
        nodeTemplate: myDiagram.nodeTemplate,
        // groupTemplate: myDiagram.groupTemplate,
        layout: $(go.GridLayout)
      });

      myPalette.model = new go.GraphLinksModel([
        { key: "produce", color: "white"},
        { key: "meat", color: "white" },
        { key: "dairy", color: "white" },
        { key: "bakery", color: "white" },
        { key: "1", color: "white" },
        { key: "2", color: "white" },
        { key: "3", color: "white" },
        { key: "4", color: "white" },
        { key: "5", color: "white" },
        { key: "6", color: "white" },
        { key: "7", color: "white" },
        { key: "8", color: "white" },
        { key: "9", color: "white" },
        { key: "10", color: "white" },
        { key: "11", color: "white" }
      ]);

    }

  });
