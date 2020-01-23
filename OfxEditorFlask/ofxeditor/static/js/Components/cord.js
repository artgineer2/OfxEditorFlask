function Cord(parent, src, dest)
{
  this.parent = parent;
  this.src = src;
  this.dest = dest;
  this.name = this.src.effect+':'+this.src.port+'>'+this.dest.effect+':'+this.dest.port;

  /*this.x1 = this.src.x;//effectMap[srcEffect].outputMap[srcPort].x;
  this.y1 = this.src.y;//effectMap[srcEffect].outputMap[srcPort].y;
  this.x2 = this.dest.x;//effectMap[destEffect].outputMap[destPort].x;
  this.y2 = this.dest.y;//effectMap[destEffect].outputMap[srcPort].y;*/
}


/*Cord.prototype.setSrcLocation = function(x,y)
{
  this.x1 = x;
  this.y1 = y;

}

Cord.prototype.setDestLocation = function(x,y)
{
  this.x2 = x;
  this.y2 = y;
}

Cord.prototype.draw = function()
{
  //var lineData = {"x1":this.src.x,"y1":this.src.y,"x2":this.dest.x,"y2":this.dest.y};
  var srcEffectData;
  var srcPointData;
  var destEffectData;
  var destPointData;

  if(this.src.effect == "system")
  {
      srcPointData = {"base":{"x":this.src.x, "y":this.src.y,}, "offset":{"x":0,"y":0}};

  }
  else
  {
      srcEffectData = this.parentCombo.effectMap[this.src.effect];
      srcPointData = {"base":srcEffectData.getLocation(), "offset":srcEffectData.outputMap[this.src.port]};
  }

  if(this.dest.effect == "system")
  {
      destPointData = {"base":{"x":this.dest.x, "y":this.dest.y,}, "offset":{"x":0,"y":0}};

  }
  else
  {
      destEffectData = this.parentCombo.effectMap[this.dest.effect];
      destPointData = {"base":destEffectData.getLocation(), "offset":destEffectData.inputMap[this.dest.port]};
  }

  var lineData = {"src":srcPointData,"dest":destPointData};
  var wireIdString = this.src.effect+':'+this.src.port+'>'+this.dest.effect+':'+this.dest.port;

  var procConnection = drawingAreaSvg
  .append("line")
  .attr("id", function(){
    return wireIdString;
  })
  .attr("x1", function(){
    return lineData.src.base.x + lineData.src.offset.x;
  })
  .attr("y1", function(){
    return lineData.src.base.y + lineData.src.offset.y;
  })
  .attr("x2", function(){
    return lineData.dest.base.x + lineData.dest.offset.x;
  })
  .attr("y2", function(){
    return lineData.dest.base.y + lineData.dest.offset.y;
  })
  .attr("stroke-width", 6)
  .attr("stroke", "black")
  .on("dblclick", function(){
    var evt = d3.event;
    var target = evt.currentTarget;
    deleteConnection(target);
  })
  .on("mouseover", function(){d3.select(this).style("stroke", "red");})
   .on("mouseout", function(){d3.select(this).style("stroke", "black");});
   //.on("click", showConnectionId);
}*/

/*Cord.prototype.update = function()
{

    var srcEffectData;
    var srcPointData;
    var destEffectData;
    var destPointData;

    if(this.src.effect == "system")
    {
        srcPointData = {"base":{"x":this.src.x, "y":this.src.y,}, "offset":{"x":0,"y":0}};
    }
    else
    {
        srcEffectData = effectMap[this.src.effect];
        srcPointData = {"base":srcEffectData.getLocation(), "offset":srcEffectData.outputMap[this.src.port]};
    }

    if(this.dest.effect == "system")
    {
        destPointData = {"base":{"x":this.dest.x, "y":this.dest.y,}, "offset":{"x":0,"y":0}};
    }
    else
    {
        destEffectData = effectMap[this.dest.effect];
        destPointData = {"base":destEffectData.getLocation(), "offset":destEffectData.inputMap[this.dest.port]};
    }

  var lineData = {"src":srcPointData,"dest":destPointData};

  var wireIdString = this.src.effect+':'+this.src.port+'>'+this.dest.effect+':'+this.dest.port;

  var wireHandle = document.getElementById(wireIdString);

  wireHandle.setAttribute("x1", lineData.src.base.x + lineData.src.offset.x);

  wireHandle.setAttribute("y1", lineData.src.base.y + lineData.src.offset.y);

  wireHandle.setAttribute("x2", lineData.dest.base.x + lineData.dest.offset.x);

  wireHandle.setAttribute("y2", lineData.dest.base.y + lineData.dest.offset.y);

}*/



Cord.prototype.getCordData = function()
{
  var connectionDataMap = {};
  if(this.src.effect == "system")
  {
      connectionDataMap.srcEffect = this.src.effect;
  }
  else
  {
      connectionDataMap.srcEffect = this.src.effect;
      //connectionDataMap.srcEffect = connectionDataMap.srcEffect.replace("(","");
      //connectionDataMap.srcEffect = connectionDataMap.srcEffect.replace(")","");
  }

  if(this.dest.effect == "system")
  {
      connectionDataMap.destEffect = this.dest.effect;
  }
  else
  {
      connectionDataMap.destEffect = this.dest.effect;
      //connectionDataMap.destEffect = connectionDataMap.destEffect.replace("(","");
      //connectionDataMap.destEffect = connectionDataMap.destEffect.replace(")","");

  }

  connectionDataMap.srcPort = this.src.port;
  connectionDataMap.destPort = this.dest.port;

  return connectionDataMap;
}



/*function deleteConnection(evt)
{
  var i,j = 0;
  var evt = d3.event;
  var srcEffect = evt.currentTarget.__data__.srcEffect;
  var srcPort = evt.currentTarget.__data__.srcPort;
  var destEffect = evt.currentTarget.__data__.destEffect;
  var destPort = evt.currentTarget.__data__.destPort;
  for(var connIndex = 0; connIndex < effectConnectionArray.length; connIndex++)
  {
    if(effectConnectionArray[connIndex].srcEffect == srcEffect && effectConnectionArray[connIndex].srcPort == srcPort
    && effectConnectionArray[connIndex].destEffect == destEffect && effectConnectionArray[connIndex].destPort == destPort)
    {
      effectConnectionArray.splice(connIndex,1);
    }
  }

  d3.event.currentTarget.remove();
  updateDrawingArea();
}*/

function updateEffectConnectionMap()
{
  for(var i = 0; i < effectConnectionArray.length; i++)
  {
    var conn = effectConnectionArray[i];
    var key = conn.srcEffect+':'+conn.srcPort+'>'+conn.destEffect+':'+conn.destPort;
    effectConnectionMap[key] = effectConnectionArray[i];
  }

}



/*function drawConnections(connections)
{

  //var effectConnectionArray = new Array;
  for(var connectionKey in connections)
  {
      // filter by parent effect
     connections[connectionKey].draw();
   }

}*/


/*function addConnection(jsonEffectConnectionData)
{


  if( Object.keys(jsonEffectConnectionData).indexOf("srcEffect") >= 0)
  {
    var oldConnection = jsonEffectConnectionData;
    jsonEffectConnectionData = {"src":{},"dest":{}};
    jsonEffectConnectionData.src.effect = oldConnection.srcEffect;
    jsonEffectConnectionData.src.port = oldConnection.srcPort;
    //jsonEffectConnectionData.src.x = parseInt(oldConnection.x1);
    //jsonEffectConnectionData.src.y = parseInt(oldConnection.y1);
    jsonEffectConnectionData.dest.effect = oldConnection.destEffect;
    jsonEffectConnectionData.dest.port = oldConnection.destPort;
    //jsonEffectConnectionData.dest.x = parseInt(oldConnection.x2);
    //jsonEffectConnectionData.dest.y = parseInt(oldConnection.y2);
  }
    var conKey =  jsonEffectConnectionData.src.effect+":"+
                  jsonEffectConnectionData.src.port + ">" +
                  jsonEffectConnectionData.dest.effect+":"+
                  jsonEffectConnectionData.dest.port;


  //var src = {"effect":}
  var srcEffectName = jsonEffectConnectionData.src.effect;
  var srcPortName = jsonEffectConnectionData.src.port;
  var destEffectName = jsonEffectConnectionData.dest.effect;
  var destPortName = jsonEffectConnectionData.dest.port;

  if((srcEffectName == "system") && (destEffectName == "system"))
  {
      var conValue = {"src":{"effect":systemIO.name, "port":srcPortName,
                          "x":systemIO.outputMap[srcPortName].x, "y":systemIO.outputMap[srcPortName].y},
                          "dest":{"effect":systemIO.name, "port":destPortName,
                                  "x":systemIO.inputMap[destPortName].x, "y":systemIO.inputMap[destPortName].y
                                  }
                              };

  }
  else if(srcEffectName == "system")
  {
      var destEffect = effectMap[jsonEffectConnectionData.dest.effect];
      var sysOutputIndex;
      if(srcPortName == "capture_1") sysOutputIndex = 0;
      else if(srcPortName == "capture_2") sysOutputIndex = 1;

      var conValue = {"src":{"effect":systemIO.name, "port":srcPortName,
                          "x":systemIO.outputMap[srcPortName].x, "y":systemIO.outputMap[srcPortName].y},
                    "dest":{"effect":jsonEffectConnectionData.dest.effect,
                          "port":jsonEffectConnectionData.dest.port,
                          "x":jsonEffectConnectionData.dest.x + destEffect.inputMap[jsonEffectConnectionData.dest.port].x,
                          "y":jsonEffectConnectionData.dest.y + destEffect.inputMap[jsonEffectConnectionData.dest.port].y}};

  }
  else if(destEffectName == "system")
  {
      var srcEffect = effectMap[jsonEffectConnectionData.src.effect];
      var sysInputIndex;
      if(destPortName == "playback_1") sysInputIndex = 0;
      else if(destPortName == "playback_2") sysInputIndex = 1;

      var conValue = {"src":{"effect":jsonEffectConnectionData.src.effect,
                              "port":jsonEffectConnectionData.src.port,
                              "x":jsonEffectConnectionData.src.x + srcEffect.outputMap[jsonEffectConnectionData.src.port].x,
                              "y":jsonEffectConnectionData.src.y + srcEffect.outputMap[jsonEffectConnectionData.src.port].y
                            },
                    "dest":{"effect":systemIO.name, "port":destPortName,
                            "x":systemIO.inputMap[destPortName].x, "y":systemIO.inputMap[destPortName].y
                            }
                        };
  }
  else
  {
      var srcEffect = effectMap[jsonEffectConnectionData.src.effect];
      var destEffect = effectMap[jsonEffectConnectionData.dest.effect];

      //var testcoords = srcEffect.outputMap[jsonEffectConnectionData.src.port];
      //var testcoord_x = testcoords.x;
      var conValue = {"src":{"effect":jsonEffectConnectionData.src.effect,
                      "port":jsonEffectConnectionData.src.port,
                      "x":jsonEffectConnectionData.src.x + srcEffect.outputMap[jsonEffectConnectionData.src.port].x,
                      "y":jsonEffectConnectionData.src.y + srcEffect.outputMap[jsonEffectConnectionData.src.port].y},
                      "dest":{"effect":jsonEffectConnectionData.dest.effect,
                      "port":jsonEffectConnectionData.dest.port,
                      "x":jsonEffectConnectionData.dest.x + destEffect.inputMap[jsonEffectConnectionData.dest.port].x,
                      "y":jsonEffectConnectionData.dest.y + destEffect.inputMap[jsonEffectConnectionData.dest.port].y}};

  }


  // modifiy x/y locations in newConnection data to set proper connection locations
  var connObject = new Cord(null,conValue.src, conValue.dest);
  //effectConnectionArray.push(connObject);
  effectConnectionMap[conKey] = connObject;
  effectConnectionMap[conKey].draw();
  //effectMap[connection.srcEffect.name].output

  //updateDrawingArea();
}*/


/*function deleteConnection(target)
{
  delete effectConnectionMap[target.id];
  target.remove();
}*/

/*function deleteConnection(evt)
{
  var i,j = 0;
  var evt = d3.event;
  var srcEffect = evt.currentTarget.__data__.srcEffect;
  var srcPort = evt.currentTarget.__data__.srcPort;
  var destEffect = evt.currentTarget.__data__.destEffect;
  var destPort = evt.currentTarget.__data__.destPort;
  for(var connIndex = 0; connIndex < effectConnectionArray.length; connIndex++)
  {
    if(effectConnectionArray[connIndex].srcEffect == srcEffect && effectConnectionArray[connIndex].srcPort == srcPort
    && effectConnectionArray[connIndex].destEffect == destEffect && effectConnectionArray[connIndex].destPort == destPort)
    {
      effectConnectionArray.splice(connIndex,1);
    }
  }

  d3.event.currentTarget.remove();
  updateDrawingArea();
}*/
