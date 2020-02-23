function Cord(parent, src, dest)
{
  this.parent = parent;
  this.src = src;
  this.dest = dest;
  this.name = this.src.effect+':'+this.src.port+'>'+this.dest.effect+':'+this.dest.port;

}



Cord.prototype.getCordData = function()
{
  var connectionDataMap = {};
   connectionDataMap.srcEffect = this.src.effect;
   connectionDataMap.destEffect = this.dest.effect;
  /*if(this.src.effect == "system")
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

  }*/

  connectionDataMap.srcPort = this.src.port;
  connectionDataMap.destPort = this.dest.port;

  return connectionDataMap;
}





function updateEffectConnectionMap()
{
  for(var i = 0; i < effectConnectionArray.length; i++)
  {
    var conn = effectConnectionArray[i];
    var key = conn.srcEffect+':'+conn.srcPort+'>'+conn.destEffect+':'+conn.destPort;
    effectConnectionMap[key] = effectConnectionArray[i];
  }

}
