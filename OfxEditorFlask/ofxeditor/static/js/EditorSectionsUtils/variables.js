var txBlock = new Array(100);
var rxBlock = new Array(500);
var activeMod = '';
var xferCount = 0;
var comboArray = new Array;
var componentArray = new Array;
var controlArray = new Array;
var componentMap = {};

var combo;
/*var effectArray = new Array;
var effectMap = {};
var effectConnectionArray = new Array;
var effectConnectionMap = {};*/

/*var processArray = new Array;
var processConnectionArray = new Array;
var processMap = {};
var processConnectionMap = new Map;*/

/*var effectProcessArray = new Array;
var effectProcessConnectionArray = new Array;
var effectProcessMap = {};
var effectProcessConnectionMap = new Map;*/

var processTypeCount = {};





var currentData;


var sidebarSvg = d3.select("#sidebar")
         .append("svg")
         .attr("id", "sidebarSvg")
         .attr("width", 150)
         .attr("height", 900);

 var effectDrawingAreaSvg = [];
 var effectIndex = 0;

 var comboDrawingAreaSvg;

 var effectIO = [];

 /*var effectIoJson = {
     "outputMap": [{"name":"output1", "x":20, "y":160},{"name":"output2", "x":20, "y":240}],
     "name": "none",
     "inputMap": [{"name":"input1", "x":900, "y":160},{"name":"input2", "x":900, "y":240}],
     };*/

 /*effectIO[0] = new Process(effectDrawingAreaSvg[0], effectIoJson);
 effectIO[1] = new Process(effectDrawingAreaSvg[1], effectIoJson);
 effectIO[2] = new Process(effectDrawingAreaSvg[2], effectIoJson);       */



 /*var systemIoJson = {
     "outputMap": [{"name":"capture_1", "x":20, "y":160},{"name":"capture_2", "x":20, "y":240}],
     "name": "system",
     "inputMap": [{"name":"playback_1", "x":900, "y":160},{"name":"playback_2", "x":900, "y":240}],
     };
 var systemIO = new Process(effectDrawingAreaSvg_0, systemIoJson);       */



         var dummy = {"name":"none", "x":0, "y":0};
         var effectDrawingAreaDraggingElement = null; /* = {"__data__":{"x":0, "y":0, "poly":"0,0 0,0 0,0 0,0","name":null,
          "inputs":[{"index":0, "name":"input1", "x":-30, "y":5},{"index":1, "name":"input2", "x":-30, "y":25}],
          "outputs":[{"index":0, "name":"output1", "x":50, "y":5},{"index":1, "name":"output2", "x":50, "y":25}]},
          "attributes":{"dragx":0,"dragy":0}}*/
         var effectDrawingAreaFlippingElement = null;
         var d3coords;
         var mouseDownCoords = {"x":0,"y":0};
         var mouseDragCoords = {"x":0,"y":0};
         var effectDrawingAreaMouseOverSymbol = 0;
         var effectDrawingAreaMouseOverInputConnector = 0;
         var effectDrawingAreaMouseOverOutputConnector = 0;
         var effectDrawingAreaMouseClickConnector = {"component":0, "type":0, "index":0};
         //change flags
         var newProcessAdded = 0;
         var processRemoved = 0;
         var newConnectionAdded = 0;
         var connectionRemoved = 0;
         var newComboLoaded = 0;
         var effectDrawingAreaChange = 0;
         var effectProcessArrayUpdated = 0;
         var effectProcessConnectionArrayUpdated = 0;
         var currentEffect = "";
         var currentCombo = "";
         var mouseInSidebar = 0;
         var mouseInDrawingArea = 0;
         var sidebarDraggingElement = null;
         var sidebarMouseOverSymbol = 0;
         var newProcess = null;
         var newProcessConnection = null;
         var mouseOverProcess = null;
         var nMouseOffsetX = 0;
         var nMouseOffsetY = 0;
         var wait = 0;
         var totalCpuPowerRequired = 0;
         var clickedConnector = {"process":"", "port":"", "type":"", "index":0};
         var newConnection = {}; //{"srcPortIndex":0,"srcProcess":null,"destPortIndex":0,"destProcess":null}; // set components to 255 to indicate unset
         var effectEditorArea;
         var ofxMainStatus;
         var updateIntervalTime = 1000;
         var controlCount = 0;
         var newParameterValue = {"parentName":"", "parameterName":"", "parameterValue":0};
		var suspendUpdates = 0;
         /*var comboInput = [];
         comboInput[0] = new Connector(effectDrawingAreaSvg, "system", "capture_1", "output", 20, 160);
         comboInput[1] = new Connector(effectDrawingAreaSvg, "system", "capture_2", "output", 20, 240);

         var comboOutput = [];
         comboOutput[0] = new Connector(effectDrawingAreaSvg, "system", "playback_1", "input", 900, 160);
         comboOutput[1] = new Connector(effectDrawingAreaSvg, "system", "playback_2", "input", 900, 240);*/



var comboDataError;
