function ControlWire(parent, src, dest, parentEffect)
{
  this.parent = parent;
  this.src = src;
  var parsedDest = dest.name.split(":");
  this.dest = {"process":parsedDest[0],"parameter":parsedDest[1],"x":dest.x,"y":dest.y};
  this.parentEffect = parentEffect;

  var srcControl;
  var destParameter;

  srcControl = this.src.name;
  destParameter = this.dest.parameter;

  this.name = srcControl+'>'+this.dest.process+':'+this.dest.parameter;

  /*var srcControlStringParsed = srcControlString.split(':');
   var destParameterStringParsed = destParameterString.split(':');

   var srcControlName = srcControlStringParsed[0];

   var destParameterProcess = destParameterStringParsed[0];
   var destParameterName = destParameterStringParsed[1];

   var srcControl = combo.effectMap[effectName].effectControlMap[srcControlName];
   var destParameter = combo.effectMap[effectName].effectProcessMap[destParameterProcess].paramMap[destParameterName];*/


  this.x1 = this.parentEffect.effectControlMap[this.src.name].output.x
            + this.parentEffect.effectControlMap[this.src.name].symbol.location.x;
  this.y1 = this.parentEffect.effectControlMap[this.src.name].output.y
            + this.parentEffect.effectControlMap[this.src.name].symbol.location.y;


    this.x2 = this.parentEffect.effectProcessMap[this.dest.process].symbolBody.x
              + this.parentEffect.effectProcessMap[this.dest.process].symbol.location.x;
    this.y2 = this.parentEffect.effectProcessMap[this.dest.process].symbolBody.y
              + this.parentEffect.effectProcessMap[this.dest.process].symbol.location.y;
}

ControlWire.prototype.setSrcLocation = function(x,y)
{
  this.x1 = x;
  this.y1 = y;

}

ControlWire.prototype.setDestLocation = function(x,y)
{
  this.x2 = x;
  this.y2 = y;
}

ControlWire.prototype.draw = function()
{
  //var lineData = {"x1":this.src.name.x,"y1":this.src.name.y,"x2":this.dest.name.x,"y2":this.dest.name.y};
  var srcControlData;
  var srcPointData;
  var destParameterData;
  var destPointData;


      srcControlData = this.parentEffect.effectControlMap[this.src.name];
      srcPointData = {"base":srcControlData.getLocation(), "offset":srcControlData.output};



      destParameterData = this.parentEffect.effectProcessMap[this.dest.process];
      destPointData = {"base":destParameterData.getLocation(), "offset":destParameterData.paramMap[this.dest.parameter]};


  var lineData = {"src":srcPointData,"dest":destPointData};
  var wireIdString = this.name;//this.src.name.process+':'+this.src.name.port+'>'+this.dest.name.process+':'+this.dest.name.port;

  var svgValue = this.parent[0][0];
  var svgValueId = svgValue.id;
  var svgIndex = parseInt(svgValueId.split("_")[1]);
  var procConnection = effectDrawingAreaSvg[svgIndex]/*.selectAll("line")  // create SVG process connection groups
  .data(connections)
  .enter()*/
  .append("line")
  .attr("id", function(){
    return wireIdString;
  })
  .attr("x1", function(){
    var x1Data = lineData.src.base.x + lineData.src.offset.x;
    return x1Data;
  })
  .attr("y1", function(){
    var y1Data = lineData.src.base.y + lineData.src.offset.y;
    return y1Data;
  })
  .attr("x2", function(){
    var x2Data = lineData.dest.base.x + lineData.dest.offset.x;
    return x2Data;

  })
  .attr("y2", function(){
    var y2Data = lineData.dest.base.y + lineData.dest.offset.y;
    return y2Data;
  })
  .attr("stroke-width", 6)
  .attr("stroke", "black")
  .on("dblclick", function(){
    var evt = d3.event;
    var target = evt.currentTarget;

    deleteControlConnection(svgIndex, target);
  })
  .on("mouseover", function(){d3.select(this).style("stroke", "red");})
   .on("mouseout", function(){d3.select(this).style("stroke", "black");});
   //.on("click", showConnectionId);
}

ControlWire.prototype.update = function()
{

    var srcControlData;
    var srcPointData;
    var destParameterData;
    var destPointData;

    srcControlData = this.parentEffect.effectControlMap[this.src.name];
    srcPointData = {"base":srcControlData.getLocation(), "offset":srcControlData.output};



    destParameterData = this.parentEffect.effectProcessMap[this.dest.process];
    destPointData = {"base":destParameterData.getLocation(), "offset":destParameterData.paramMap[this.dest.parameter]};

    /*if(this.src.name.effect)//if(this.src.name.process.indexOf("(") == 0)
    {
        srcPointData = {"base":{"x":this.x1, "y":this.y1}, "offset":{"x":0,"y":0}};
    }
    else
    {
        srcControlData = this.parentEffect.effectControlMap[this.src.name];
        srcPointData = {"base":srcControlData.getLocation(), "offset":srcControlData.outputMap[this.src.name]};
    }

    if(this.dest.name.effect)//if(this.dest.name.process.indexOf("(") == 0)
    {
        destPointData = {"base":{"x":this.x2, "y":this.y2}, "offset":{"x":0,"y":0}};
    }
    else
    {
        destParameterData = this.parentEffect.effectControlMap[this.dest.name.process];
        destPointData = {"base":destParameterData.getLocation(), "offset":destParameterData.inputMap[this.dest.name.port]};
    }*/

  /*srcControlData = processMap[this.src.name.process];
  srcPointData = {"base":srcControlData.getLocation(), "offset":srcControlData.outputMap[this.src.name.port]};*/
  /*destParameterData = processMap[this.dest.name.process];
  destPointData = {"base":destParameterData.getLocation(), "offset":destParameterData.inputMap[this.dest.name.port]};*/
  var lineData = {"src":srcPointData,"dest":destPointData};

  var wireIdString = this.name;//this.src.name.process+':'+this.src.name.port+'>'+this.dest.name.process+':'+this.dest.name.port;

  var wireHandle = document.getElementById(wireIdString);
  /*.attr("id", function(d){
    var wireIdString = lineData.src.name+':'+lineData.src.port+'>'+lineData.dest.name+':'+lineData.dest.port;
    return wireIdString;
  })*/

  wireHandle.setAttribute("x1", lineData.src.base.x + lineData.src.offset.x);
  /*.attr("x1", function(){
    return lineData.src.base.x + lineData.src.offset.x;
  })*/

  wireHandle.setAttribute("y1", lineData.src.base.y + lineData.src.offset.y);
  /*.attr("y1", function(){
    return lineData.src.base.y + lineData.src.offset.y;
  })*/

  wireHandle.setAttribute("x2", lineData.dest.base.x + lineData.dest.offset.x);
  /*.attr("x2", function(){
    return lineData.dest.base.x + lineData.dest.offset.x;
  })*/

  wireHandle.setAttribute("y2", lineData.dest.base.y + lineData.dest.offset.y);
  /*.attr("y2", function(){
    return lineData.dest.base.y + lineData.dest.offset.y;
  })*/
}



ControlWire.prototype.getConnectionData = function()
{
    var connectionDataMap = {};

    //connectionDataMap.srcEffect = this.src.name.effect;
    //connectionDataMap.srcControl = this.src.name.process;
    connectionDataMap.src = this.src;
    //connectionDataMap.destEffect = this.dest.name.effect;
    //connectionDataMap.destParameter = this.dest.name.process;
    connectionDataMap.dest = this.dest;
    connectionDataMap.dest.name = this.dest.process + ":" + this.dest.parameter;
    connectionDataMap.parentEffect = this.parentEffect.name;



        connectionDataMap.x1 = this.parentEffect.effectControlMap[this.src.name].output.x
                + this.parentEffect.effectControlMap[this.src.name].symbol.location.x;
        connectionDataMap.y1 = this.parentEffect.effectControlMap[this.src.name].output.y
                + this.parentEffect.effectControlMap[this.src.name].symbol.location.y;
        connectionDataMap.srcControl = this.src.name;


        connectionDataMap.x2 = this.parentEffect.effectProcessMap[this.dest.process].paramMap[this.dest.parameter].x
                  + this.parentEffect.effectProcessMap[this.dest.process].symbol.location.x;
        connectionDataMap.y2 = this.parentEffect.effectProcessMap[this.dest.process].paramMap[this.dest.parameter].y
                  + this.parentEffect.effectProcessMap[this.dest.process].symbol.location.y;
        connectionDataMap.destParameter = this.dest.parameter;


  return connectionDataMap;
}



/*function deleteConnection(evt)
{
  var i,j = 0;
  var evt = d3.event;
  var srcControl = evt.currentTarget.__data__.srcControl;
  var srcPort = evt.currentTarget.__data__.srcPort;
  var destParameter = evt.currentTarget.__data__.destParameter;
  var destPort = evt.currentTarget.__data__.destPort;
  for(var connIndex = 0; connIndex < processConnectionArray.length; connIndex++)
  {
    if(processConnectionArray[connIndex].srcControl == srcControl && processConnectionArray[connIndex].srcPort == srcPort
    && processConnectionArray[connIndex].destParameter == destParameter && processConnectionArray[connIndex].destPort == destPort)
    {
      processConnectionArray.splice(connIndex,1);
    }
  }

  d3.event.currentTarget.remove();
  updateDrawingArea();
}*/

/*function updateControlConnectionMap()
{
  for(var i = 0; i < processConnectionArray.length; i++)
  {
    var proc = processConnectionArray[i];
    var key = proc.srcControl+':'+proc.srcPort+'>'+proc.destParameter+':'+proc.destPort;
    processConnectionMap[key] = processConnectionArray[i];
  }

}*/



function drawControlConnections(connections)
{

  //var processConnectionArray = new Array;
  for(var connectionKey in connections)
  {
      // filter by parent effect
     connections[connectionKey].draw();
   }

}


function addControlConnection(parentEffectIndex, jsonControlConnectionData)
{

  /*var connectionKeys = Object.keys(connection);
  var conIndex = connectionKeys.indexOf("srcControl");*/
	
	// validate data first
	var destStringParsed = jsonControlConnectionData.dest.name.split(':');
	var process = destStringParsed[0];
	var parameter = destStringParsed[1];
	if(process != null && parameter != null)
	{
		  if( Object.keys(jsonControlConnectionData).indexOf("srcControl") >= 0)
		  {
		    var oldConnection = jsonControlConnectionData;
		    jsonControlConnectionData = {"src":{},"dest":{}};
		    jsonControlConnectionData.src.name = oldConnection.srcControl;
		    jsonControlConnectionData.src.x = parseInt(oldConnection.x1);
		    jsonControlConnectionData.src.y = parseInt(oldConnection.y1);
		    jsonControlConnectionData.dest.parameter = oldConnection.destParameter;
		    jsonControlConnectionData.dest.x = parseInt(oldConnection.x2);
		    jsonControlConnectionData.dest.y = parseInt(oldConnection.y2);
		  }
		    var conKey;
		    
		    if(jsonControlConnectionData.dest.name == null)
		    {
		    	conKey = jsonControlConnectionData.src.name + ">" + jsonControlConnectionData.dest.process + ":" + jsonControlConnectionData.dest.parameter;
		    }
		    else
		    {
		    	conKey = jsonControlConnectionData.src.name + ">" + jsonControlConnectionData.dest.name;
		    }
		    


		  //var src = {"process":}
		  var srcControlString = jsonControlConnectionData.src.name;
		  var destProcessString = jsonControlConnectionData.dest.name;
		  var parsedDestProcessString = destProcessString.split(':');
		  var destParameterProcess = parsedDestProcessString[0];
		  var destParameterName = parsedDestProcessString[1];
		  
		  var destParameterString = jsonControlConnectionData.dest.parameter;

		  var effectIndex = parentEffectIndex;
		  //for(var key in combo.effectMap)
		  var effectName = combo.currentEffect;//Object.keys(combo.effectMap)[effectIndex];

		  var srcControlName = jsonControlConnectionData.src.name;

		  var destProcessString = destParameterProcess + ":" + destParameterName;

		  var srcControl = combo.effectMap[effectName].effectControlMap[srcControlName];
		  var destParameter = combo.effectMap[effectName].effectProcessMap[destParameterProcess].paramMap[destParameterName];

		      var conValue = {"src":{"name":jsonControlConnectionData.src.name,
		                      "x":jsonControlConnectionData.src.x + srcControl.output.x,
		                      "y":jsonControlConnectionData.src.y + srcControl.output.y},
		                      "dest":{"name":jsonControlConnectionData.dest.name,
		                      "x":jsonControlConnectionData.dest.x + destParameter.controlConn.x,
		                      "y":jsonControlConnectionData.dest.y + destParameter.controlConn.y}};



		  //var testcoords = srcControl.outputMap[jsonControlConnectionData.src.port];
		  //var testcoord_x = testcoords.x;

		  /*var evt = d3.event;
		  var target = evt.currentTarget;*/
		  // modifiy x/y locations in newConnection data to set proper connection locations
		  var connObject = new ControlWire(effectDrawingAreaSvg[effectIndex],conValue.src, conValue.dest, combo.effectMap[effectName]);
		  //processConnectionArray.push(connObject);
		  combo.effectMap[combo.currentEffect].effectControlConnectionMap[conKey] = connObject;
		  combo.effectMap[combo.currentEffect].effectControlConnectionMap[conKey].draw();
		  //processMap[connection.srcControl.name].output

		  //updateDrawingArea();		
	}

}


function deleteControlConnection(parentEffectIndex, target)
{
    var effectName = Object.keys(combo.effectMap)[parentEffectIndex];
  delete combo.effectMap[effectName].effectControlConnectionMap[target.id];
  target.remove();
}
