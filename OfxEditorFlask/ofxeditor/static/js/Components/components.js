

function Component(parent, jsonData)
{
  this.parent = parent;

  this.name = jsonData.name;
  this.type = jsonData.type;
  this.cpuPower = jsonData.cpuPower;
  this.footswitchType = jsonData.footswitchType;

  this.symbol = {"location":{},"graphic":"","color":"black","labels":{}};

  this.symbol.location = jsonData.symbol.location;


  // this only creates the SVG group for encapsulating the symbol SVG parts
  var symbolData = {"name":this.name,"type":this.type,"x":this.symbol.location.x,"y":this.symbol.location.y}
  var symbolGroup = this.parent  // create SVG components

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
  .on("click", function(){componentClick();});


  //this.inputArray = new Array;
  this.inputMap = new Map;

  for(var inputIndex = 0; inputIndex < jsonData.inputArray.length; inputIndex++)
  {
    var input = new Connector(symbolGroup, jsonData.name, jsonData.inputArray[inputIndex].name, "input",
      jsonData.inputArray[inputIndex].x, jsonData.inputArray[inputIndex].y);

    //this.inputArray.push(input);
    this.inputMap[jsonData.inputArray[inputIndex].name] = input;
  }

  this.symbol.graphic = jsonData.symbol.graphic;
  this.symbol.labels = jsonData.symbol.labels;
  this.symbol.color = jsonData.symbol.color;
  this.symbolBody = new Symbol(symbolGroup, this.symbol.graphic, this.symbol.color, this.symbol.location.x, this.symbol.location.y,
    this.symbol.labels);

  //this.control = new Connector(symbolGroup, this.name+"Control", "control", 0, 100);

  /*this.controlMap = new Map;

  if(jsonData.controlArray)
  {
      for(var controlIndex = 0; controlIndex < jsonData.controlArray.length; controlIndex++)
      {
        var control = new Connector(symbolGroup, jsonData.name, jsonData.controlArray[controlIndex].name, "control",
          jsonData.controlArray[controlIndex].x, jsonData.controlArray[controlIndex].y);

        //this.inputArray.push(input);
        this.controlMap[jsonData.controlArray[controlIndex].name] = control;
      }
  }*/


    //this.outputArray = new Array;
    this.outputMap = new Map;

  for(var outputIndex = 0; outputIndex < jsonData.outputArray.length; outputIndex++)
  {
    var output = new Connector(symbolGroup, jsonData.name, jsonData.outputArray[outputIndex].name, "output",
      jsonData.outputArray[outputIndex].x, jsonData.outputArray[outputIndex].y);

    //this.outputArray.push(output);
    this.outputMap[jsonData.outputArray[outputIndex].name] = output;
  }

    //this.paramArray = new Array;
    this.paramMap = new Map;

    this.footswitch = new Footswitch(null, this);
    this.footswitchNumber = jsonData.footswitchNumber;

  for(var paramIndex = 0; paramIndex < jsonData.paramArray.length; paramIndex++)
  {
    var param = new Parameter(null, symbolGroup, jsonData.name, jsonData.paramArray[paramIndex].name, jsonData.paramArray[paramIndex].abbr,
      jsonData.paramArray[paramIndex].alias, jsonData.paramArray[paramIndex].value, jsonData.paramArray[paramIndex].type,
      jsonData.paramArray[paramIndex].x, jsonData.paramArray[paramIndex].y);
      /*var param = new Parameter(sidebarGroup, this.name, component.paramMap[paramKey].name, component.paramMap[paramKey].abbr,
        component.paramMap[paramKey].alias, component.paramMap[paramKey].value, component.paramMap[paramKey].type);*/


    //this.paramArray.push(param);
    this.paramMap[jsonData.paramArray[paramIndex].name] = param;
  }
}

Component.prototype.draw = function()
{

  for(var inputKey in this.inputMap)
  {
    this.inputMap[inputKey].draw();
  }

  this.symbolBody.draw();

  for(var paramKey in this.paramMap)
  {
    this.paramMap[paramKey].draw();
  }

  for(var outputKey in this.outputMap)
  {
    this.outputMap[outputKey].draw();
  }

}
