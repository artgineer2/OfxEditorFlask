
function drawComponents(components)
{
  for(var symbolKey in componentMap)
  {
    componentMap[symbolKey].draw();
  }
}


function sidebarInit()
{
  var symbolArray = new Array;

  {
    var jsonComponent = {"inputs": [{"name":"input_1", "x":-20, "y":15},{"name":"input_2", "x":-20, "y":35}],
                         "name": "Blank",
                         "parentEffect": {"name": "effect 0", "abbr": "fx 0"},
                         "outputs": [{"name":"output_1", "x":70, "y":15, "connection":{"process": "none", "port": "none"}},
                                    {"name":"output_2", "x":70, "y":35, "connection":{"process": "none", "port": "none"}}],
                         "params": [{"alias": "gain", "name": "volume", "value": "0.5", "abbr": "gain"}],
                         "type": "blank",
                         "symbol":{"location":{"x":50,"y":50},"graphic":"0,0 50,25 0,50","color":"black","labels":[
                                 {"x":20,"y":20,"value":"Low"},{"x":20,"y":40,"value":"High"}]
                           }};

    var componentList = document.getElementById("componentList");
    var numberOfComponents = 0;
    $.ajax({url:'getComponents', dataType: "json"}).success(function(data,status)
    {
        console.log(data);
        componentArray = new Array;
        $.each(data, function(index, component){
	    jsonComponent = component;
            jsonComponent.symbol.location.x = 50;
            jsonComponent.symbol.location.y = 20+100*index;
            componentArray.push(jsonComponent);
            componentMap[jsonComponent.name] = new Component(sidebarSvg, jsonComponent);
            processTypeCount[componentArray[index].type]=0;
            numberOfComponents++;
        });
        drawComponents(componentMap);

        document.getElementById('sidebarSvg').style.height=100*numberOfComponents+"px";
        document.getElementById('sidebarSvg').style.width=150;
    });
  }

}
