function Label(parent,value,x,y)
{
  this.parent = parent;
  this.value = value;
  this.x = x;
  this.y = y;
}
Label.prototype.print = function()
{

  var data = {"name":this.value, "x":this.x, "y":this.y}
  this.label = this.parent
.append("text")
 .attr("dx",function(){return data.x-20;})
 .attr("dy",function(){return data.y-5;})
 .text(function(){return data.name;})
 .attr("fill", "black")
 .attr("font-size", "10px");

}
/*Connector
	Properties
		name (port)
		parentComponentProcess (process)
		type (input,output,control)
		location
      x
      y
	Methods
		draw
		update
		delete*/

function Connector(parent,process,name,type,x,y)
{
	/*var tempParent = parent;
  var tempParent0 = tempParent[0];
  var tempParent00 = tempParent0[0];
  this.parentProcess = parent[0][0].id;*/
	this.parent = parent;
	this.process = process;
	this.connector = null;
	this.name = name;
	this.type = type;
	this.x = x;
	this.y = y;
}

Connector.prototype.draw = function()
{
	var data;

	var processName;

	if(this.process.name) processName = this.process.name;
	else processName = this.process;


	if(this.process.processDirection == "feedback" && (this.type == "input" || this.type == "output"))
	{
		data = {"process":processName,"name":this.name,"type":this.type,"x":50-this.x,"y":this.y};
	}
	else if(this.process.processDirection == "normal" && (this.type == "input" || this.type == "output"))
	{
		data = {"process":processName,"name":this.name,"type":this.type,"x":this.x,"y":this.y};
	}
	else
	{
		data = {"process":processName,"name":this.name,"type":this.type,"x":this.x,"y":this.y};
		console.log("error: processDirection not given.")
	}


	this.connector = this.parent/*.selectAll("g")*/
	.append("circle")
	.attr("cx", function(){return data.x;})
	.attr("cy", function(){return data.y;})
	.attr("r", function(){
		if(data.type == "output") return 4;
		else return 4;
	})
	.attr("process",function(){return data.process;})
	.attr("name",function(){return data.name;})
	.attr("type",function(){return data.type;})
	.attr("id", function(){
		return data.process+':'+data.name;
	})
	.attr("index", function(d,i){return i;})
	.on("click", function(){
		var evt = d3.event;
		var dataElement = document.getElementById(evt.currentTarget.id);
		var data = JSON.parse(dataElement.getAttribute("data"));

		clickedConnector.process = data.process;
		clickedConnector.name = data.name;
		clickedConnector.type = data.type;
		mouseClickConnectorFunct();
	})
	.on("mouseover", function(){d3.select(this).style("fill", "red");})
	.on("mouseout", function(){d3.select(this).style("fill", "black");});

	var tempTag = document.getElementById(data.process+':'+data.name);
	tempTag.setAttribute('data',JSON.stringify(data));

	/*var label = new Label(this.parent, this.name,
     this.x, this.y);
  label.print()*/


}
/*Connector.prototype.clicked = function()
{
  clickedConnector.process = this.parent;
  clickedConnector.name = this.name;
  clickedConnector.type = this.type;
  mouseClickConnectorFunct();
}*/

Connector.prototype.erase = function()
{
	this.connector.remove();
}

/*Symbol
	Properties
		graphic
		location
      x
      y
		labels[]
		  value
      x
      y
	Methods
		draw
		update
		delete*/

function Symbol(parent,process,body,graphic,color,x,y,labels)
{
  this.parent = parent;

  this.body = "";
  this.wires = [];

	this.symbolType;

	if(process)
	{
		if(process.name.indexOf("control") >= 0)
		{
			this.symbolType = "control";
		}
		else
		{
			this.symbolType = "process";
		}
	}

  for(var bodyIndex = 0; bodyIndex < body.length; bodyIndex++)
	{
		if(body[bodyIndex].indexOf("M") >= 0)
		{
			this.wires.push(body[bodyIndex]);
		}
		else
		{
			this.body = body[bodyIndex];
		}
	}

  this.graphic = graphic;
  this.process = process;
  this.color = color;
  this.x = x;
  this.y = y;
  this.labelArray = new Array;
  for(var labelIndex = 0; labelIndex < labels.length; labelIndex++)
  {
    var label = {};
    label.values = labels[labelIndex].values;
    label.x = labels[labelIndex].x;
    label.y = labels[labelIndex].y;
    this.labelArray.push(label);
  }
}

Symbol.prototype.draw = function(graphic)
{


  var direction;
  var parentNodeType = this.parent[0][0].parentNode.id;

  if(this.process)
	  {
	  	direction = this.process.processDirection;
	  }
  else
	  {
	  	direction = "normal";
	  }
  //var symbolData = {"graphic":this.graphic, "wires":this.wires, "body":this.body, "label":"", "direction":direction, "color":this.color};
  	var symbolData;

	if(this.process)
	{
		if(this.process.footswitch)
			symbolData = {"graphic":this.graphic, "type":this.symbolType, "footswitch":this.process.footswitchNumber , "wires":this.wires, "body":this.body, "label":"", "direction":direction, "color":this.color};
		else if(this.process.type)
		{
			symbolData = {"graphic":graphic, "type":this.symbolType, "control":this.process.type, "wires":this.wires, "body":this.body, "label":"", "direction":direction, "color":this.color};
		}
	}
	else
	{
		symbolData = {"graphic":this.graphic, "type":this.symbolType, "wires":this.wires, "body":this.body, "label":"", "direction":direction, "color":this.color};
	}

  this.symbolBody = this.parent
  //.append("g")
  .append("polygon")
  .attr("points", function(){
    var dummy = symbolData.body;
    return dummy;
  })
  .attr("transform", function(){
	  if(symbolData.direction == "feedback")
	  {
		  return "translate(50,0) scale(-1,1)";
	  }
	  else
		  return "";
  })
  .attr("stroke","#000000")
  .attr("stroke-width",1.500)
  .attr("fill",function(){return symbolData.color;});
  //.on("mousedown", function(){mouseDown();});
  /*.on("mouseup", function(){mouseUp();})*/

  this.symbolWires = this.parent
  .append("path")
  .attr("d", function(){
    var dummy = symbolData.wires;
    return dummy;
  })
  .attr("transform", function(){
	  if(symbolData.direction == "feedback")
	  {
		  return "translate(50,0) scale(-1,1)";
	  }
	  else
		  return "";
  })
  .attr("fill",function(){return "none";})
  .attr("stroke-width",4.00)
  .attr("stroke","#000000");


  this.symbolGraphic = this.parent
  .append("path")
  .attr("d", function(){
    var dummy = symbolData.graphic;
    return dummy;
  })
  .attr("transform", function(){
	  if(symbolData.direction == "feedback")
	  {
		  return "translate(50,0) scale(-1,1)";
	  }
	  else
		  return "";
  })
  .attr("fill",function(){return "none";})
  .attr("stroke-width",1.500)
  .attr("stroke","#000000");
  //.on("mousedown", function(){mouseDown();});
  /*.on("mouseup", function(){mouseUp();})*/


  var process = this.parent[0][0];
  /*var label = new Label(this.parent, process.id,
     20, 0);
  label.print();*/


  this.symbolLabel = this.parent
  .append("text")
   .attr("dx",function(){return 0;})
	.attr("dy",function(){
		var labelPosition_y;

		if(symbolData.type == "control")
		{
			labelPosition_y = 60;
		}
		else if(symbolData.type == "process")
		{
			labelPosition_y = -5;
		}
		else
			labelPosition_y = -5;

		return labelPosition_y;
	})
   .text(function(){return process.id;})
	.attr("fill", function(){
		if(parentNodeType.indexOf("sidebar") >= 0) return "white";
		else return "black";
	})
	.attr("font-size", function(){
		if(parentNodeType.indexOf("sidebar") >= 0) return "15px";
		else return "10px";
	})
	.attr("font-weight", function(){
		if(parentNodeType.indexOf("sidebar") >= 0) return "bold";
		else return "normal";
	});

}

Symbol.prototype.erase = function()
{
	this.symbolBody.remove();
	this.symbolWires.remove();
	this.symbolGraphic.remove();
	this.symbolLabel.remove();
}

function Parameter(parentEditor,parentSymbol,parentProcess,name,abbr,alias,value,type,x,y)
{
  this.parentEditor = parentEditor;
  this.parentSymbol = parentSymbol;
  this.parentProcess = parentProcess;
  this.parentProcessName = parentProcess.name;
  this.name = name;
  this.abbr = abbr;
  this.alias = alias;
  this.value = value;
  this.type = 0;
  this.x = x;
  this.y = y;

  this.controlConn = new Connector(this.parentSymbol,this.parentProcessName,this.name,"control",this.x,this.y);
}

Parameter.prototype.draw = function()
{
//  var parentProcess = this.parent
    var rangeMax = 99;
    var effectName = this.parentProcess.parentEffect;
    var procName = this.parentProcessName;
    var paramName = this.name;

    if(combo)
    {
        var paramValueIndex = parseInt(combo.effectMap[combo.currentEffect].effectProcessMap[procName].paramMap[paramName].value);
        var paramValueString = getParameterValueString(paramValueIndex, this.type)
        //var parsedId = this.id.split(":");
        //var processName = this.parentProcessName;
        //var paramName = this.name;

      /*$('#effectEditorForm').append($('<div>')*/
        this.parentEditor.append($('<div>')
            .attr({"id": this.name + "Div",
                "class": "form-group row"
            }
            )
            .append($('<label>')
                    .attr({"for": this.name,
                        "class": "col-md-2 control-label"})
                    .text(this.name))
            .append($('<div>').attr({"id": "sliderDiv"})
                .append($('<div>').attr({"class":"col-md-1"})
                    .append($('<input>')
                            .attr({"id": this.parentProcessName + ":" + this.name+":decrement",
                                "type": "button",
                                /*"value": this.value,
                                "name": this.name,
                                "min": 0,
                                "max": rangeMax,*/
                            }).on("click", function (evt) {
                              var decrementIdArray = evt.currentTarget.id.split(":")
                              var sliderId = decrementIdArray[0] + ":" + decrementIdArray[1] + ":slider";
                              var sliderIdjQuery = "#" + decrementIdArray[0] + "\\:" + decrementIdArray[1] + "\\:slider";
                              document.getElementById(sliderId).stepDown(1);

                              $(sliderIdjQuery).change();
                    })))
                .append($('<div>').attr({"class":"col-md-2"})
                    .append($('<input>')
                            .attr({"id": this.parentProcessName + ":" + this.name+":slider",
                                "type": "range",
                                "value": this.value,
                                "name": this.name,
                                "min": 0,
                                "max": rangeMax,
                            }).on("change", function (evt) {
                        updateEffectEditorParameter(evt);
                    })))
                .append($('<div>').attr({"class":"col-md-1"})
                    .append($('<input>')
                            .attr({"id": this.parentProcessName + ":" + this.name+":increment",
                                "type": "button",
                                /*"value": this.value,
                                "name": this.name,
                                "min": 0,
                                "max": rangeMax,*/
                            }).on("click", function (evt) {
                              var incrementIdArray = evt.currentTarget.id.split(":")
                              var sliderId = incrementIdArray[0] + ":" + incrementIdArray[1] + ":slider";
                              var sliderIdjQuery = "#" + incrementIdArray[0] + "\\:" + incrementIdArray[1] + "\\:slider";
                              document.getElementById(sliderId).stepUp(1);
                              $(sliderIdjQuery).change();
                    })))

            /*var pedalUiEnable = document.createElement("input", {"type": "checkbox"});
             pedalUiEnable.type = "checkbox";*/
            .append($('<input>').attr({"id":this.parentProcessName + ":" + this.name+":value","type": "text", "class": "col-md-1", "value": paramValueString}))
        ));
    }

    //this.controlConn.draw();

}

Parameter.prototype.update = function(value)
{
  this.value = value;
}

Parameter.prototype.read = function()
{

}




function Footswitch(parentEditor,parentProcess)
{
    this.parentEditor = parentEditor;
    this.process = parentProcess;
    this.type = parentProcess.footswitchType;
    this.number = parentProcess.footswitchNumber;
}

var footswitchCount = 2;

Footswitch.prototype.draw = function()
{
    var footswitchLabel;
    var footswitchNumberArray = new Array;
    var footswitchObject = this;

    for(var i = 0; i <= footswitchCount; i++)
    {
        footswitchNumberArray.push(i);
    }

    if(this.type == "None")
    {
        footswitchLabel = "";
    }
    else if(this.type == "Bypass")
    {
        footswitchLabel = "Bypass Footswitch Number";
    }
    else if(this.type == "Select")
    {
        footswitchLabel = "Channel Select Footswitch Number";
    }

    this.parentEditor.append($('<div>')
          .attr({"id": "footswitchDiv",
              "class": "form-group row"})
          .append($('<label>')
                  .attr({"class": "col-md-4", "style":"border:1px solid"})
                  .text(footswitchLabel))
          .append($('<select>')
                    .attr({"name":"footswitchNumber","id":"footswitchNumber", "class": "col-md-1"})
           )
           .change(function(){
               footswitchObject.process.footswitchNumber = parseInt($('#footswitchNumber').val());
               //alert(footswitchObject.process.footswitchNumber);
           }));

    for(var i = 0; i <= 2; i++)//$.each(footswitchNumberArray, function(i, number)
    {
        if(i == 0)
        {
            $('#footswitchNumber').append($('<option>').attr({"value":i}).text("None"));
        }
        else
        {
            $('#footswitchNumber').append($('<option>').attr({"value":i}).text(i));
        }

    }
    $('#footswitchNumber').val(footswitchObject.process.footswitchNumber);

}


function ControlParameter(parentEditor, controlParameter, parentControl)
{
	  this.parentEditor = parentEditor;
	  this.parentControl = parentControl;
	  this.name = controlParameter.name;
	  this.abbr = controlParameter.abbr;
	  this.alias = controlParameter.alias;
	  this.value = controlParameter.value;
	  this.type = controlParameter.type;
}

ControlParameter.prototype.draw = function()
{
//  var parentProcess = this.parent
    var rangeMax = 99;
    var controlName = this.parentControl.name;
    var paramName = this.name;
    var controlParameterObject = this;

    if(combo)
    {
        var paramValueIndex = parseInt(combo.effectMap[combo.currentEffect].effectControlMap[controlName].controlParameterMap[paramName].value);
        var paramValueString = getParameterValueString(paramValueIndex, this.type)
        //var parsedId = this.id.split(":");
        //var processName = this.parentProcessName;
        //var paramName = this.name;

      $('#effectEditorForm').append($('<div>')
        //this.parentEditor.append($('<div>')
            .attr({"id": paramName + "Div",
                "class": "form-group row"
            }
            )
            .append($('<label>')
                    .attr({"for": paramName,
                        "class": "col-md-2 control-label"})
                    .text(paramName))
            .append($('<div>').attr({"id": "sliderDiv"})
                .append($('<div>').attr({"class":"col-md-1"})
                    .append($('<input>')
                            .attr({"id": controlName + ":" + paramName+":decrement",
                                "type": "button",
                                /*"value": this.value,
                                "name": this.name,
                                "min": 0,
                                "max": rangeMax,*/
                            }).on("click", function (evt) {
                              var decrementIdArray = evt.currentTarget.id.split(":")
                              var sliderId = decrementIdArray[0] + ":" + decrementIdArray[1] + ":slider";
                              var sliderIdjQuery = "#" + decrementIdArray[0] + "\\:" + decrementIdArray[1] + "\\:slider";
                              document.getElementById(sliderId).stepDown(1);

                              $(sliderIdjQuery).change();
                    })))

                .append($('<div>').attr({"class":"col-md-2"})
                    .append($('<input>')
                            .attr({"id": controlName + ":" + paramName+":slider",
                                "type": "range",
                                "value": this.value,
                                "name": paramName,
                                "min": 0,
                                "max": rangeMax,
                            }).on("change", function (evt) {
                        updateEffectEditorParameter(evt);
                    })))
                .append($('<div>').attr({"class":"col-md-1"})
                    .append($('<input>')
                            .attr({"id": controlName + ":" + paramName+":increment",
                                "type": "button",
                                /*"value": this.value,
                                "name": this.name,
                                "min": 0,
                                "max": rangeMax,*/
                            }).on("click", function (evt) {
                              var incrementIdArray = evt.currentTarget.id.split(":")
                              var sliderId = incrementIdArray[0] + ":" + incrementIdArray[1] + ":slider";
                              var sliderIdjQuery = "#" + incrementIdArray[0] + "\\:" + incrementIdArray[1] + "\\:slider";
                              document.getElementById(sliderId).stepUp(1);

                              $(sliderIdjQuery).change();
                    })))


            /*var pedalUiEnable = document.createElement("input", {"type": "checkbox"});
             pedalUiEnable.type = "checkbox";*/
            .append($('<input>').attr({"id":controlName + ":" + paramName+":value","type": "text", "class": "col-md-1", "value": paramValueString}))
            /*.append($('<div>').attr({"class": "col-md-1"}))*/
            .append($('<input>').attr({"id":controlName + ":" + paramName+":alias","type": "text", "class": "col-md-2", "value": controlParameterObject.alias}))
            .append($('<input>').attr({"id":controlName + ":" + paramName+":abbr","type": "text", "class": "col-md-1", "value": controlParameterObject.abbr}))
            .append($('<input>').attr({"id":controlName + ":" + paramName, "type": "button", "class": "col-md-2", "value": "Update Pedal UI Info"})
                    .on("click", function (evt) {
                        var pedalUiAliasId = this.id + ":alias";
                        var pedalUiAbbr = this.id + ":abbr";
                        var alias = $(document.getElementById(pedalUiAliasId)).val();
                        var abbr = $(document.getElementById(pedalUiAbbr)).val();
                        combo.effectMap[combo.currentEffect].effectControlMap[controlName]
                        .controlParameterMap[paramName].alias= alias;
                        combo.effectMap[combo.currentEffect].effectControlMap[controlName]
                        .controlParameterMap[paramName].abbr= abbr;
                    }))
        ));
    }


}

ControlParameter.prototype.update = function(value)
{
  this.value = value;
}






function ParameterControlType(parentEditor ,parentControl)
{
    this.parentEditor = parentEditor;
    this.parentControl = parentControl;

    if(parentControl.type != null)
    {
        this.type = parentControl.type; // 0: Normal, 1: Envelope Generator, 2: Low Frequency Oscillator
        //this.controlParameterArray = parentControl.paramArray;
    }
    else
    {
        this.type = "Norm"; // 0: Normal, 1: Envelope Generator, 2: Low Frequency Oscillator
        /*controlParameter = {"name":"parameter1","alias":"parameter1","abbr":"prm1","value":0}
        this.parentControl.controlParameterMap["parameter1"] =
        	new ControlParameter(this.parentEditor, controlParameter, this.parentControl);*/
    }
    //this.connectedProcessParameter = null;
}



var parameterControlTypeCount = 3;

ParameterControlType.prototype.draw = function()
{
    var parameterControlLabel;
    var parameterControlObject = this;
    var controlParameterSelectArray = {"Norm": "Normal",
                                       "Env": "Envelope Generator",
                                       "LFO": "Low Frequency Oscillator"};
    var controlParameterFormData;


    this.parentEditor.append($('<div>')
          .attr({"id": "parameterControlTypeDiv",
              "class": "form-group row"})
          /*.append($('<label>')
                  .attr({"class": "col-md-5", "style":"border:1px solid"})*/
		  .append($('<div>').attr({"class": "col-md-3"})
          .append($('<select>')
                    .attr({"name":"parameterControlType","id":"parameterControlType"})
           )
           .change(function(){
        	   parameterControlObject.parentControl.type = $('#parameterControlType').val();
        	    parameterControlObject.parentControl.controlParameterMap = {};

        	    if(parameterControlObject.parentControl.type == "Norm")
        	    {
        	        controlParameter = {"name":"parameter","alias":"parameter","abbr":"prm","type":0,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["parameter"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);

        	    }
        	    else if(parameterControlObject.parentControl.type == "Env")
        	    {
        	        controlParameter = {"name":"attack","alias":"attack","abbr":"atk","type":3,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["attack"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);

        	        controlParameter = {"name":"decay","alias":"decay","abbr":"dcy","type":3,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["decay"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);
        	        controlParameter = {"name":"release","alias":"release","rls":"prm4","type":3,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["release"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);
        	    }
        	    else if(parameterControlObject.parentControl.type == "LFO")
        	    {
        	        controlParameter = {"name":"frequency","alias":"frequency","abbr":"freq","type":4,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["frequency"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);

        	        controlParameter = {"name":"amplitude","alias":"amplitude","abbr":"amp","type":5,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["amplitude"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);

        	        controlParameter = {"name":"offset","alias":"offset","abbr":"off","type":6,"value":0}
        	        parameterControlObject.parentControl.controlParameterMap["offset"] =
        	        	new ControlParameter(parameterControlObject.parentEditor, controlParameter, parameterControlObject.parentControl);
        	   }

        	   updateEffectEditorForm(parameterControlObject.parentControl);
				var conMapKey = parameterControlObject.parentControl.name;
				combo.effectMap[combo.currentEffect].effectControlMap[conMapKey].erase();
				combo.effectMap[combo.currentEffect].effectControlMap[conMapKey].draw();
               //alert(footswitchObject.process.footswitchNumber);
           }))

    );

    $.each(controlParameterSelectArray, function(key, value)
    {
    	$('#parameterControlType').append($('<option>').attr({"value":key}).text(value));
    });
    $('#parameterControlType').val(parameterControlObject.parentControl.type);

}
