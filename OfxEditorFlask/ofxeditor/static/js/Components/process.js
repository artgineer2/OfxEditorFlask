function Process(parent, component, parentEffect)
{
  this.parent = parent;

  this.name = component.name;
  this.type = component.type;
  if(component.footswitchType)
  {
      this.footswitchType = component.footswitchType;
  }

  this.parentEffect = parentEffect;
  this.processDirection = component.processDirection; // normal or feedback
  var symbolGroup;
  var editorFormGroup = $('#effectEditorForm');

  if(component.symbol)
  {
      this.symbol = {"location":{}, "body":"", "graphic":"","color":"black","labels":{}};

      this.symbol.location = component.symbol.location;
      this.symbol.body = component.symbol.body;
      this.symbol.graphic = component.symbol.graphic;
      this.symbol.labels = component.symbol.labels;
      this.symbol.color = component.symbol.color;


      // this only creates the SVG group for encapsulating the symbol SVG parts
      var symbolData = {"name":this.name,"x":this.symbol.location.x,"y":this.symbol.location.y};

      symbolGroup = this.parent  // create SVG components
      .append("g")
      .attr("id",function(){
        return symbolData.name;
      })
      .attr("processType",function(){return symbolData.type;})
      .attr("dragy", function(){
        return symbolData.y;
      })
      .attr("dragx", function(){
        return symbolData.x;
      })
      .attr("transform", function(){
        return "translate("+symbolData.x+","+symbolData.y+")";
      })
      .on("mousedown", function(evt){
          var evt = d3.event;

          effectDrawingAreaMouseDown(evt);
      })
      .on("dblclick", function(){
    	  processDoubleClick(evt);
    }).on('contextmenu', function(){
            var evt = d3.event;
            evt.preventDefault();
        }, false);

      this.symbolBody = new Symbol(symbolGroup, this, this.symbol.body, this.symbol.graphic, this.symbol.color, this.symbol.location.x, this.symbol.location.y, this.symbol.labels);
  }
  else
  {
      symbolGroup = this.parent;  // create SVG components
  }

    this.inputMap = {};

  for(var inputKey in component.inputMap)
  {
    var input = new Connector(symbolGroup, this, component.inputMap[inputKey].name, "input",
      component.inputMap[inputKey].x, component.inputMap[inputKey].y);

    this.inputMap[component.inputMap[inputKey].name] = input;
  }

    this.outputMap = {};

    for(var outputKey in component.outputMap)
    {
      var output = new Connector(symbolGroup, this, component.outputMap[outputKey].name, "output",
        component.outputMap[outputKey].x, component.outputMap[outputKey].y);

      this.outputMap[component.outputMap[outputKey].name] = output;
    }

    this.paramMap = {};

    this.footswitch = new Footswitch(editorFormGroup, this);
    this.footswitchNumber = component.footswitchNumber;

    for(var paramKey in component.paramMap)
    {
      var param = new Parameter(editorFormGroup, symbolGroup, this, component.paramMap[paramKey].name, component.paramMap[paramKey].abbr,
        component.paramMap[paramKey].alias, component.paramMap[paramKey].value, component.paramMap[paramKey].type,
        component.paramMap[paramKey].x, component.paramMap[paramKey].y);

      this.paramMap[component.paramMap[paramKey].name] = param;
    }
}

Process.prototype.draw = function()
{

  for(var inputKey in this.inputMap)
  {
    this.inputMap[inputKey].draw();
  }

  if(this.symbolBody)
  {
      this.symbolBody.draw();
  }

  for(var paramKey in this.paramMap)
  {
    this.paramMap[paramKey].controlConn.draw();
  }

  for(var outputKey in this.outputMap)
  {
    this.outputMap[outputKey].draw();
  }
}

Process.prototype.erase = function()
{

  for(var inputKey in this.inputMap)
  {
    this.inputMap[inputKey].erase();
  }

  if(this.symbolBody)
  {
      this.symbolBody.erase();
  }

  for(var paramKey in this.paramMap)
  {
    this.paramMap[paramKey].controlConn.erase();
  }

  for(var outputKey in this.outputMap)
  {
    this.outputMap[outputKey].erase();
  }
}



Process.prototype.updateDirection = function(direction)
{
	this.processDirection = direction;


	this.erase();
	this.draw();

	for(var connectionKey in combo.effectMap[combo.currentEffect].effectIntraConnectionMap)
	{
		if(connectionKey.indexOf(this.name) >= 0)
		{
			console.log(connectionKey);
			combo.effectMap[combo.currentEffect].effectIntraConnectionMap[connectionKey].update();
		}
	}

}
Process.prototype.update = function(keyValuePair)
{
    var key = keyValuePair.keys[0];
    var value = keyValuePair[key];
}

Process.prototype.updateEditorForm = function()
{
  for(var paramKey in this.paramMap)
  {
    this.paramMap[paramKey].update(value);
  }
}

Process.prototype.getProcessData = function ()
{
  var processDataMap = {};

  processDataMap.name = this.name;
  processDataMap.type = this.type;
  processDataMap.footswitchType = this.footswitchType;
  processDataMap.footswitchNumber = this.footswitchNumber;
  processDataMap.processDirection = this.processDirection; // normal or feedback
  processDataMap.symbol = {};

  processDataMap.symbol.location = this.getLocation();
  processDataMap.parentEffect = this.parentEffect;

    processDataMap.inputArray = new Array;

  for(var inputKey in this.inputMap)
  {
    var input = {"name":this.inputMap[inputKey].name,
    "x":this.inputMap[inputKey].x, "y":this.inputMap[inputKey].y};

    processDataMap.inputArray.push(input);
  }


  processDataMap.symbol.graphic = this.symbol.graphic;
  processDataMap.symbol.body = this.symbol.body;
  processDataMap.symbol.labels = this.symbol.labels;
  processDataMap.symbol.color = this.symbol.color;

    processDataMap.outputArray = new Array;

    for(var outputKey in this.outputMap)
    {
      var output = {"name":this.outputMap[outputKey].name,
      "x":this.outputMap[outputKey].x, "y":this.outputMap[outputKey].y};

      processDataMap.outputArray.push(output);
    }

    processDataMap.paramArray = new Array;

    for(var paramKey in this.paramMap)
    {
      var param = {"name":this.paramMap[paramKey].name, "abbr":this.paramMap[paramKey].abbr,
        "alias":this.paramMap[paramKey].alias, "value":this.paramMap[paramKey].value, "type":this.paramMap[paramKey].type,
        "x":this.paramMap[paramKey].x, "y":this.paramMap[paramKey].y};

      processDataMap.paramArray.push(param);
    }

    return processDataMap;
}

Process.prototype.setLocation = function(x,y)
{
  this.symbolBody.x = x;

  this.symbolBody.y = y;
  var element = document.getElementById(this.name);
  element.setAttribute("dragx", x);
  element.setAttribute("dragy", y);

  element.setAttribute("transform", "translate(" + x + "," + y + ")");
}


Process.prototype.getLocation = function()
{
  var location = {};
  location.x = this.symbolBody.x;
  location.y = this.symbolBody.y;
  return location;
}



function drawProcesses(processes)
{

  var processSymbolArray = new Array;

   for(var processKey in processMap)
   {
     // filter by parent effect
     processMap[processKey].draw();
   }
}


function addProcess(jsonProcessData)
{
  var process = new Process(effectDrawingAreaSvg[combo.effectMap[combo.currentEffect].index], jsonProcessData, combo.currentEffect);
  combo.effectMap[combo.currentEffect].effectProcessMap[process.name] = process;
  combo.effectMap[combo.currentEffect].effectProcessMap[process.name].draw();
  processTypeCount[process.type]++;
}


function deleteProcess(target)
{
  var svgObject = target.farthestViewportElement;
  var svgChildNodes = svgObject.childNodes;

  var process = target;
  var name = target.id;
  var processType = name.split('_')[0];
  var capProcessType = processType.charAt(0).toUpperCase() + processType.slice(1);

  // delete connected process wires before deleting process
  for(var processConnectionKey in combo.effectMap[combo.currentEffect].effectIntraConnectionMap)
  {
    var connectionKeyParse = processConnectionKey.split('>');
    connectionKeyParse[0] = connectionKeyParse[0].split(':');
    connectionKeyParse[1] = connectionKeyParse[1].split(':');
    var connSrcProcess = connectionKeyParse[0][0];
    var connSrcPort = connectionKeyParse[0][1];
    var connDestProcess = connectionKeyParse[1][0];
    var connDestPort = connectionKeyParse[1][1];
    var svgIndex = combo.effectMap[combo.currentEffect].index;
      // delete wires connected to inputs
      if(connDestProcess == name)
      {
        var targetConnection = document.getElementById(processConnectionKey);
        deleteConnection(svgIndex, targetConnection);
      }
      // delete wires connected to outputs
      if(connSrcProcess == name)
      {
        var targetConnection = document.getElementById(processConnectionKey);
        deleteConnection(svgIndex, targetConnection);
      }
  }

  // delete connected control wires before deleting process
  for(var controlConnectionKey in combo.effectMap[combo.currentEffect].effectControlConnectionMap)
  {
    var controlConnectionKeyParse = controlConnectionKey.split('>');
    controlConnectionKeyParse[1] = controlConnectionKeyParse[1].split(':');
    var connSrcControl = controlConnectionKeyParse[0];
    var connDestProcess = controlConnectionKeyParse[1][0];
    var connDestParameter = controlConnectionKeyParse[1][1];
    var svgIndex = combo.effectMap[combo.currentEffect].index;
      // delete wires connected to inputs
      if(connDestProcess == name)
      {
        var targetConnection = document.getElementById(controlConnectionKey);
        deleteControlConnection(svgIndex, targetConnection);
      }
      // delete wires connected to outputs
      if(connSrcControl == name)
      {
        var targetConnection = document.getElementById(controlConnectionKey);
        deleteControlConnection(svgIndex, targetConnection);
      }
  }

  var type = combo.effectMap[combo.currentEffect].effectProcessMap[process.id].type;
  processTypeCount[type]--;
  delete combo.effectMap[combo.currentEffect].effectProcessMap[process.id];
  process.remove();
  updateEffectEditorArea(combo.effectMap[combo.currentEffect]);

}

function updateProcessMap()
{
  for(var i = 0; i < processArray.length; i++)
  {

    processMap[processArray[i].name] = processArray[i];

  }
}

function resetProcessTypeCount()
{
  processTypeCount = {};
  for(var componentKey in componentMap)
  {
      processTypeCount[componentMap[componentKey].type] = 0;
  }
}
