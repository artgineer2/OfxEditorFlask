/*function mouseDown(evt)
{
  var evt = d3.event;
  //alert(evt.currentTarget.id);
  if(evt.currentTarget.farthestViewportElement != null && evt.currentTarget.farthestViewportElement.id == "sidebarSvg")
  {
    //alert("component clicked: "+evt.target.parentNode.id);
    var process = new Process(effectDrawingAreaSvg, componentMap[evt.target.parentNode.id]);
    processArray.push(process);
    processMap[process.name] = process;
  }
  else
  {
    //alert("process clicked: "+evt.target.parentNode.id);
    var target = evt.currentTarget;
    //if(effectDrawingAreaMouseOverSymbol)
    {
      effectDrawingAreaDraggingElement = target;
    }

    if(target) {
      SVGRootArray = document.getElementsByTagName("svg");
      SVGRoot = document.getElementsByTagName("svg")[0];
        var p = SVGRoot.createSVGPoint();
        p.x = evt.clientX;
        p.y = evt.clientY;
        var m = getScreenCTM(SVGRoot);
        p = p.matrixTransform(m.inverse());
        nMouseOffsetX = p.x - parseInt(target.getAttribute("dragx"));
        nMouseOffsetY = p.y - parseInt(target.getAttribute("dragy"));
    }
  }
}*/

function getEffectDrawingAreaIndex(name)
{
    return combo.effectMap[name].index;
}

function effectDrawingAreaMouseDown(evt) {
    if(evt == undefined)
    {
        evt = d3.event;
    }
    SVGRootArray = document.getElementsByTagName("svg");
    var svgIndex = parseInt(evt.currentTarget.parentNode.id.split("_")[1])+1;
    SVGRoot = SVGRootArray[svgIndex];
    var p = SVGRoot.createSVGPoint();
    var svgCanvas = effectDrawingAreaSvg[combo.effectMap[combo.currentEffect].index][0][0];
    //evt.preventDefault();
    mouseDownCoords = {"x":d3.mouse(svgCanvas)[0],"y":d3.mouse(svgCanvas)[1]};
    if(evt)
    {
    	
        if(evt.which == 1)
        {
            //var svgCanvas = effectDrawingAreaSvg[combo.effectMap[combo.currentEffect].index][0][0];
            var target = evt.currentTarget;
            //if(effectDrawingAreaMouseOverSymbol)
            {
              effectDrawingAreaDraggingElement = target;
            }

            if(target) {
                /*SVGRoot = document.getElementsByTagName("svg")[1];
                var p = SVGRoot.createSVGPoint();*/
                d3coords = {"x":d3.mouse(svgCanvas)[0],"y":d3.mouse(svgCanvas)[1]}; // d3.event can give bad coords when used with
                                                                            //getScreenCTM and matrixTransform
                /*p.x = evt.clientX;
                p.y = evt.clientY;*/
                var m = getScreenCTM(SVGRoot);
                //p = p.matrixTransform(m.inverse());


                p.x = d3coords.x;
                p.y = d3coords.y;
                nMouseOffsetX = p.x - parseInt(target.getAttribute("dragx"));
                nMouseOffsetY = p.y - parseInt(target.getAttribute("dragy"));
            }
        }
        else if(evt.which == 3)
        {
            //alert(evt.currentTarget.id + " right clicked.");
            var effectProcessMap = combo.effectMap[combo.currentEffect].effectProcessMap;
            var clickKey = evt.currentTarget.id;
           
            if(clickKey.indexOf("effectDrawingAreaSvg") == -1)
            {
            	if(clickKey.indexOf("control") >= 0)
            	{
            		updateEffectEditorForm(combo.effectMap[combo.currentEffect].effectControlMap[clickKey]);
            	}
            	else
            	{
            		updateEffectEditorForm(combo.effectMap[combo.currentEffect].effectProcessMap[clickKey]);
            	}
            	//updateEffectEditorForm(effectProcessMap[clickKey]);
            	effectDrawingAreaFlippingElement = evt.currentTarget;
                console.log("mouse down at " + mouseDownCoords.x + "," + mouseDownCoords.y);
           	
            }
            /*else
            {
                updateEffectEditorForm({"effect_name": combo.effectMap[combo.currentEffect].name});
            }*/
        }
    }
    //sevt = null;
}


function effectDrawingAreaMouseUp(evt) {
    evt = d3.event;
                                                                //getScreenCTM and matrixTransform

  //alert(evt.currentTarget.id);
  if(evt)
  {
      if(evt.which == 1)
      {
          if(evt.currentTarget.farthestViewportElement != null && evt.currentTarget.farthestViewportElement.id == "sidebarSvg")
          {
          }
          else
          {
            effectDrawingAreaDraggingElement = null;
            nMouseOffsetX = 0;
            nMouseOffsetY = 0;
            mouseOverSymbol = 0;
            mouseOverInputConnector = 0;
            mouseOverOutputConnector = 0;
          }
      }
  }
}


function effectDrawingAreaMouseMove()
{
    evt = d3.event;
    
    SVGRootArray = document.getElementsByTagName("svg");
    var svgIndex = parseInt(evt.currentTarget.id.split("_")[1])+2;
    SVGRoot = SVGRootArray[svgIndex];
    var p = SVGRoot.createSVGPoint();

    var svgCanvas = effectDrawingAreaSvg[combo.effectMap[combo.currentEffect].index][0][0];
    //evt.preventDefault();

    if(evt)
    {
        if(evt.which == 1)
        {
            if(combo)
            {
                var keyCount = Object.keys(combo.effectMap).length;
                if(keyCount == 0) svgCanvasIndex = 0;
                else svgCanvasIndex = combo.effectMap[combo.currentEffect].index;
            }


            var svgCanvas = effectDrawingAreaSvg[svgCanvasIndex][0][0];

            //p.x = evt.clientX;
            //p.y = evt.clientY;
            d3coords = {"x":d3.mouse(svgCanvas)[0],"y":d3.mouse(svgCanvas)[1]}; // d3.event can give bad coords when used with
                                                                        //getScreenCTM and matrixTransform
            p.x = d3coords.x;
            p.y = d3coords.y;
            //console.log("pre transform" +":"+p.x+","+p.y);
            var m = getScreenCTM(SVGRoot);
            //p = p.matrixTransform(m.inverse());
            p.x -= nMouseOffsetX;
            p.y -= nMouseOffsetY;
            //console.log("post transform" +":"+p.x+","+p.y);
            if(effectDrawingAreaDraggingElement)
            {
                /*effectDrawingAreaDraggingElement.setAttribute("dragx", p.x);
                effectDrawingAreaDraggingElement.setAttribute("dragy", p.y);*/
                if(effectDrawingAreaDraggingElement.id.indexOf("control")>= 0)
                {
                    combo.effectMap[combo.currentEffect].effectControlMap[effectDrawingAreaDraggingElement.id].setLocation(p.x, p.y);
                    /*effectProcessMap[effectDrawingAreaDraggingElement.id].symbol.location.x = p.x;
                    effectProcessMap[effectDrawingAreaDraggingElement.id].symbol.location.y = p.y;*/

                    var dragElement = effectDrawingAreaDraggingElement;
                    /* update control wire connection data*/
                    // search through connected wires
                    var wires = combo.effectMap[combo.currentEffect].effectControlConnectionMap;
                    //for(var wireIndex = 0; wireIndex < wires.length; wireIndex++)
                    for(var controlWireKey in combo.effectMap[combo.currentEffect].effectControlConnectionMap)
                    {
                        var parsedControlWireKey = controlWireKey.split('>');
                        var parsedDest = parsedControlWireKey[1].split(':');
                        var destProcess = parsedDest[0];
                        var destParam = parsedDest[1];

                        // is wire connected to selected control output?
                        if(dragElement.id == combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].src.name)
                        {
                            console.log(combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].src);
                          // search through process parameters for process parameter connected to wire
                          //var inputMapSize = getMapSize(effectProcessMap[dragElement.id].inputMap);

                          for(var paramKey in combo.effectMap[combo.currentEffect].effectProcessMap[destProcess].paramMap)
                          {
                            var parameter = combo.effectMap[combo.currentEffect].effectProcessMap[destProcess].paramMap[paramKey];
                            // is process parameter connected to wire
                            /*if(destPort == wireEndPort && dragElement.id == wireEndProcess)
                            {
                              combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].dest.x = parseInt(dragElement.getAttribute("dragx"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].inputMap[inputKey].x);
                              combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].dest.y = parseInt(dragElement.getAttribute("dragy"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].inputMap[inputKey].y);
                            }*/
                          }
                          combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].update();                         
                        }
                        // is wire connected to selected process control ?
                        if(dragElement.id == combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].dest.process)
                        {
                            console.log(combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].dest);
                          // search through process output ports for process output connected to wire
                           outputKey = combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].output; // search for connected process output port
                          {
                            /*var srcPort = combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].outputMap[outputKey].port;
                            var wireEndPort = combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.port;
                            var wireEndProcess = combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.process;*/
                            // is process output connected to wire
                            /*if(srcPort == wireEndPort && dragElement.id == wireEndProcess)
                            {
                              combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.x =
                                parseInt(dragElement.getAttribute("dragx"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].outputMap[outputKey].x);
                              combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.y =
                                parseInt(dragElement.getAttribute("dragy"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].outputMap[outputKey].y);
                            }*/
                          }
                          combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].update();
                          
                        }
                        //combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].update();
                    }
                }
                else
                {
                    /*****************************************************************************************/
                    combo.effectMap[combo.currentEffect].effectProcessMap[effectDrawingAreaDraggingElement.id].setLocation(p.x, p.y);

                    /*effectProcessMap[effectDrawingAreaDraggingElement.id].symbol.location.x = p.x;
                    effectProcessMap[effectDrawingAreaDraggingElement.id].symbol.location.y = p.y;*/

                    var dragElement = effectDrawingAreaDraggingElement;
                    /* update wire connection data*/
                    // search through connected wires
                    var wires = combo.effectMap[combo.currentEffect].effectIntraConnectionMap;
                    //for(var wireIndex = 0; wireIndex < wires.length; wireIndex++)
                    for(var wireKey in combo.effectMap[combo.currentEffect].effectIntraConnectionMap)
                    {
                        // is wire connected to selected process input?
                        if(dragElement.id == combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].dest.process)
                        {
                          // search through process input ports for process input connected to wire
                          //var inputMapSize = getMapSize(effectProcessMap[dragElement.id].inputMap);
                          for(var inputKey in combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].inputMap)
                          {
                            var destPort = combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].inputMap[inputKey].port;
                            var wireEndPort = combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].dest.port;
                            var wireEndProcess = combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].dest.process;
                            // is process input connected to wire
                            if(destPort == wireEndPort && dragElement.id == wireEndProcess)
                            {
                              combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].dest.x = parseInt(dragElement.getAttribute("dragx"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].inputMap[inputKey].x);
                              combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].dest.y = parseInt(dragElement.getAttribute("dragy"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].inputMap[inputKey].y);
                            }
                          }
                          combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].update();
                        }
                        // is wire connected to selected process output ?
                        if(dragElement.id == combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].src.process)
                        {
                          // search through process output ports for process output connected to wire
                          for(var outputKey in combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].outputMap) // search for connected process output port
                          {
                            var srcPort = combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].outputMap[outputKey].port;
                            var wireEndPort = combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].src.port;
                            var wireEndProcess = combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].src.process;
                            // is process output connected to wire
                            if(srcPort == wireEndPort && dragElement.id == wireEndProcess)
                            {
                              combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].src.x =
                                parseInt(dragElement.getAttribute("dragx"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].outputMap[outputKey].x);
                              combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].src.y =
                                parseInt(dragElement.getAttribute("dragy"))
                                      + parseInt(combo.effectMap[combo.currentEffect].effectProcessMap[dragElement.id].outputMap[outputKey].y);
                            }
                          }
                          combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].update();
                        }
                        //combo.effectMap[combo.currentEffect].effectIntraConnectionMap[wireKey].update();
                      }
                      /*****************************************************************************************/

                      /*effectProcessMap[effectDrawingAreaDraggingElement.id].symbol.location.x = p.x;
                      effectProcessMap[effectDrawingAreaDraggingElement.id].symbol.location.y = p.y;*/

                      //var dragElement = effectDrawingAreaDraggingElement;
                      /* update control wire connection data*/
                      // search through connected wires
                      //var wires = combo.effectMap[combo.currentEffect].effectControlConnectionMap;
                      for(var controlWireKey in combo.effectMap[combo.currentEffect].effectControlConnectionMap)
                      {
                          var parsedControlWireKey = controlWireKey.split('>');
                          var parsedDest = parsedControlWireKey[1].split(':');
                          var srcControl = parsedControlWireKey[0];
                          var destProcess = parsedDest[0];
                          var destParam = parsedDest[1];

                          // is wire connected to selected control output?
                          if(dragElement.id == combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].dest.process)
                          {
                              console.log(combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].dest);
                            // search through process parameters for process parameter connected to wire
                            //var inputMapSize = getMapSize(effectProcessMap[dragElement.id].inputMap);


                            for(var paramKey in combo.effectMap[combo.currentEffect].effectProcessMap[destProcess].paramMap)
                            {
                              var parameter = combo.effectMap[combo.currentEffect].effectProcessMap[destProcess].paramMap[paramKey];
                              // is process parameter connected to wire
                              /*if(destPort == wireEndPort && dragElement.id == wireEndProcess)
                              {
                                combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].dest.x = parseInt(dragElement.getAttribute("dragx"))
                                        + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].inputMap[inputKey].x);
                                combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].dest.y = parseInt(dragElement.getAttribute("dragy"))
                                        + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].inputMap[inputKey].y);
                              }*/
                            }
                            combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].update();
                          }
                          // is wire connected to selected process control ?
                          if(dragElement.id == combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].dest.process)
                          {
                            // search through process output ports for process output connected to wire
                             outputKey = combo.effectMap[combo.currentEffect].effectControlMap[srcControl].output; // search for connected process output port
                            {
                              /*var srcPort = combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].outputMap[outputKey].port;
                              var wireEndPort = combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.port;
                              var wireEndProcess = combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.process;*/
                              // is process output connected to wire
                              /*if(srcPort == wireEndPort && dragElement.id == wireEndProcess)
                              {
                                combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.x =
                                  parseInt(dragElement.getAttribute("dragx"))
                                        + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].outputMap[outputKey].x);
                                combo.effectMap[combo.currentEffect].effectControlConnectionMap[wireKey].src.y =
                                  parseInt(dragElement.getAttribute("dragy"))
                                        + parseInt(combo.effectMap[combo.currentEffect].effectControlMap[dragElement.id].outputMap[outputKey].y);
                              }*/
                            }
                            combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].update();
                          }
                          //combo.effectMap[combo.currentEffect].effectControlConnectionMap[controlWireKey].update();
                      }
                  }
              }
            displayCoords(p.x, p.y, "(svg user)");

        }
        else if(evt.which == 3)
        {
        	var direction;
        	//var oldDirection;
        	if(effectDrawingAreaFlippingElement.id.indexOf("control") == -1)
        	{
                var svgCanvas = effectDrawingAreaSvg[combo.effectMap[combo.currentEffect].index][0][0];
                mouseDragCoords = {"x":d3.mouse(svgCanvas)[0],"y":d3.mouse(svgCanvas)[1]};
                //oldDirection = direction;
            	if(mouseDownCoords.x + 20 < mouseDragCoords.x) direction = "normal";
            	else if(mouseDownCoords.x - 20 > mouseDragCoords.x) direction = "feedback";
            	if(direction != null)
            	{
                    combo.effectMap[combo.currentEffect].effectProcessMap[effectDrawingAreaFlippingElement.id].processDirection = direction;
                    combo.effectMap[combo.currentEffect].effectProcessMap[effectDrawingAreaFlippingElement.id].updateDirection(direction);
            	}
           	
            	console.log(mouseDragCoords.x + ": right click moving " + direction );        		
        	}
        	
        }
    }
}


function mouseClickConnectorFunct(evt)
{
  var evt = d3.event;

  if(evt)
  {
      if(evt.currentTarget.farthestViewportElement != null && evt.currentTarget.farthestViewportElement.id == "sidebarSvg")
      {
      }
      else
      {
          if(evt.currentTarget.id.indexOf("control") >= 0 || evt.currentTarget.getAttribute("type") == "control")
          {
              if(evt.currentTarget.id.indexOf("control") >= 0)
              {
                  var name = evt.currentTarget.id.split(":")[0];
              }
              else
              {
                  var name = evt.currentTarget.id
              }

              //if(process == "effectDrawingAreaSvg") process = "system";
              var x = parseInt(evt.currentTarget.getAttribute("cx"));
              var y = parseInt(evt.currentTarget.getAttribute("cy"));
              var type = evt.currentTarget.getAttribute("type");
              var parentEffectIndex = parseInt(evt.currentTarget.ownerSVGElement.id.split("_")[1]);
               var connectionEnd = {"name":name,"type":type,"x":x,"y":y};//new Connector(null,process,port,type,x,y);

              if(evt.currentTarget.getAttribute("type") == "control")
              {
                  newConnection.dest = connectionEnd;
              }
              else if(evt.currentTarget.getAttribute("type") == "output")
              {
                  newConnection.src = connectionEnd;
              }
              //console.log("Input:"+effectDrawingAreaMouseClickConnector.component+":"+effectDrawingAreaMouseClickConnector.type+":"+effectDrawingAreaMouseClickConnector.index);
              //if(newConnection.srcProcess && newConnection.destProcess)
              if(newConnection.src && newConnection.dest)
              {
                {
                  addControlConnection(parentEffectIndex, newConnection);
                }
                newConnection = {};
                //newConnection.destProcess = null;
                //var dummy = effectMap[combo.currentEffect].effectIntraConnectionMaps;
              }
          }
          else
          {
              //alert("connector clicked: "+evt.target.parentNode.id+':'+evt.target.id);
              /*effectDrawingAreaMouseClickInputConnector = 1;
              effectDrawingAreaMouseClickConnector.component = Number(evt.path[1].id);
              effectDrawingAreaMouseClickConnector.type = 0;
              effectDrawingAreaMouseClickConnector.index = Number(evt.target.attributes.index.value);*/
              //var connectionEnd = {};

              var process = evt.currentTarget.id.split(":")[0];
              //if(process == "effectDrawingAreaSvg") process = "system";
              var x = parseInt(evt.currentTarget.getAttribute("cx"));
              var y = parseInt(evt.currentTarget.getAttribute("cy"));
              var type = evt.currentTarget.getAttribute("type");
              var portIndex = Number(evt.currentTarget.attributes.index.value);
              var port = evt.currentTarget.getAttribute("port");
              var parentEffectIndex = parseInt(evt.currentTarget.ownerSVGElement.id.split("_")[1]);
              if(port == null) port = evt.currentTarget.getAttribute("name");
              var connectionEnd = {"process":process,"port":port,"type":type,"x":x,"y":y};//new Connector(null,process,port,type,x,y);
              /*var connectionEnd = new Connector(null,
                evt.currentTarget.parentNode.id,
                evt.currentTarget.parentNode.getAttribute("port"),
                evt.currentTarget.parentNode.getAttribute("type"),
                parseInt(evt.currentTarget.parentNode.getAttribute("dragx")),
                parseInt(evt.currentTarget.parentNode.getAttribute("dragy")));*/

              if(evt.currentTarget.getAttribute("type") == "input")
              {
                  if(evt.currentTarget.getAttribute("process").indexOf("(")>=0) newConnection.src = connectionEnd; // effect input
                  else newConnection.dest = connectionEnd;
              }
              else if(evt.currentTarget.getAttribute("type") == "output")
              {
                  if(evt.currentTarget.getAttribute("process").indexOf("(")>=0) newConnection.dest = connectionEnd; // effect output
                  else newConnection.src = connectionEnd;
              }
              else // connection type is "control"
              {

              }
              //console.log("Input:"+effectDrawingAreaMouseClickConnector.component+":"+effectDrawingAreaMouseClickConnector.type+":"+effectDrawingAreaMouseClickConnector.index);
              //if(newConnection.srcProcess && newConnection.destProcess)
              if(newConnection.src && newConnection.dest)
              {
                if((newConnection.src.process != newConnection.dest.process) ||
                (newConnection.src.process.indexOf('(')>=0   &&   newConnection.dest.process.indexOf('(')>=0)) // need for creating straight-thru
                {
                  addConnection(parentEffectIndex, newConnection);
                }
                newConnection = {};
                //newConnection.destProcess = null;
                //var dummy = effectMap[combo.currentEffect].effectIntraConnectionMaps;
              }
          }

      }
  }
}


function symbolClick(evt)
{
  var evt = d3.event;
  if(evt)
  {
      if(evt.which == 1)
      {
          if(evt.currentTarget.farthestViewportElement.id == "sidebarSvg")
          {
            //alert("component clicked: "+evt.target.parentNode.id);
            var processData = componentMap[evt.target.parentNode.id];
            processData.name = processData.type + '_' + processTypeCount[processData.type];
            var process = new Process(effectDrawingAreaSvg[combo.effectMap[combo.currentEffect].index], processData);
            //processArray.push(process);
            combo.effectMap[combo.currentEffect].effectProcessMap[process.name] = process;
          }
          else
          {
            //alert("process clicked: "+evt.target.parentNode.id);

          }

      }

  }
}

function componentClick(evt)
{
  var evt = d3.event;
  if(evt)
  {
      var processData = componentMap[evt.target.parentNode.id];

      var processSuffix = 0;//processTypeCount[processData.type];
      processData.name = processData.type + '_' + processSuffix; // need underscore for parsing in OfxMain
      processData.symbol.location.y = 50;

      /*for(var processKey in combo.effectMap[combo.currentEffect].effectProcessMap)  // make sure name isn't already used.  Increment processSuffix if it is.
      {
          if(processData.name == combo.effectMap[combo.currentEffect].effectProcessMap[processKey].name)
          {
              processSuffix++;
              processData.name = processData.type + '_' + processSuffix; // need underscore for parsing in OfxMain
          }
      }*/
      var nameKeys = new Array;
      var keys1;// = Object.keys(combo.effectMap["effect0"].effectProcessMap);
      var keys2;// = Object.keys(combo.effectMap["effect1"].effectProcessMap);

      for(var keys in combo.effectMap)
      {
          keys1 = Object.keys(combo.effectMap[keys].effectProcessMap);
          nameKeys = nameKeys.concat(keys1);
      }
      //nameKeys = keys2.concat(keys1);
      for(var i = 0; nameKeys.indexOf(processData.name) >= 0; i++)
      {
          processData.name = processData.type + '_' + i;
      }
      //processData.name = processData.type + processTypeCount[processData.type];
      //var process = new Process(effectDrawingAreaSvg, processData);
      addProcess(processData);
      //processArray.push(process);
      //effectProcessMap[process.name] = process;
      //updateEffectDrawingArea(combo.effectMap[combo.currentEffect]);
      updateEffectEditorArea(combo.effectMap[combo.currentEffect]);


  }
}

function processDoubleClick(evt)
{
    var evt = d3.event;
    var targetProcess = evt.currentTarget;

    deleteProcess(targetProcess);
    newConnection = {}; // make sure no connectors were accidentally clicked    	
    
}


function addParamControlClick(evt)
{
	var controlSuffix = 0;
	var controlData = {"name":"control_"+controlSuffix,"x":20,"y":20};
	var exit = false;
	var name;
	var compName;
    
    var controlKeys = new Array;
    var keys1;// = Object.keys(combo.effectMap["effect0"].effectProcessMap);

    for(var keys in combo.effectMap)
    {
        keys1 = Object.keys(combo.effectMap[keys].effectControlMap);
        controlKeys = controlKeys.concat(keys1);
    }

    for(var controlIndex = 0; controlIndex <= controlCount && exit != true; controlIndex++)  // make sure name isn't already used.  Increment processSuffix if it is.
    {																		// include actual controlCount value in case a new, higher control number			
    																		// is needed.
    	for(var controlKey in controlKeys)//(var i = 0; i < controlCount; i++)
    	{
        	name = controlData.name;
        	compName = controlKeys[controlKey];
        	//compName = combo.effectMap[combo.currentEffect].effectControlMap[controlKey].name;
            if(name == compName) // controlData.name is already used
            {
            	controlSuffix++;
            	controlData.name = "control_" + controlSuffix; // need underscore for parsing in OfxMain
            	break;
            }
            if(controlKey == controlCount - 1) // controlData.name is not used
            {
            	exit = true;
            	break;
            }    		
    	}
    }
    addControl(controlData);
}
