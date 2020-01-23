
function showProcessId()
{
  var evt = d3.event;
  console.log(evt.currentTarget.getAttribute("id"));
}

function showConnectionId()
{
  var evt = d3.event;
  console.log(evt.currentTarget.getAttribute("id"));
}

function displayCoords(x,y,extra) {
    var xNode = document.getElementById("xpos");
    var yNode = document.getElementById("ypos");
    if(xNode && yNode) {
        xNode.firstChild.nodeValue = parseInt(x) + extra;
        yNode.firstChild.nodeValue = parseInt(y) + extra;
    }
}

function displayRawText(text) {
    var textNode = document.getElementById("raw");
    if(textNode) {
        textNode.firstChild.nodeValue = text;
    }
}


function getScreenCTM(doc){
    if(doc.getScreenCTM) { return doc.getScreenCTM(); }
}






function updateProcessConnectionArray()
{


}

function effectDrawingAreaInit() {
    // use D3 API

    var symbolArray = new Array;

    var jsonProcess = {"inputs": [{"name":"input_1", "x":-20, "y":15},{"name":"input_2", "x":-20, "y":35}],
                         "name": "Blank",
                         "parentEffect": {"name": "effect 0", "abbr": "fx 0"},
                         "outputs": [{"name":"output_1", "x":70, "y":15},
                                    {"name":"output_2", "x":70, "y":35}],
                         "params": [{"alias": "gain", "name": "volume", "value": "0.5", "abbr": "gain"}],
                         "type": "blank",
                         "symbol":{"location":{"x":50,"y":50},"graphic":"0,0 50,25 0,50","color":"black","labels":[
                                 {"x":20,"y":20,"value":"Low"},{"x":20,"y":40,"value":"High"}]
                           }};

    var dummy = processTypeCount;

    var effectDrawingAreaTabGroupDiv = $('#effectDrawingAreaTabGroupDiv');

    var effectDrawingAreaTabGroupUL = $('#effectDrawingAreaTabGroupUL');

    effectDrawingAreaTabGroupUL.empty();
    effectDrawingAreaTabGroupUL
            .append($('<li>')
                    .attr({"display": "inline-block"})
                    .attr({"class": "active"})
                    .append($('<a>').attr({"href": "#", "id": "comboHeader"})
                            .text("Combo Header")));

    /*$('#comboDrawingAreaCanvas').css("display","block");
    $('#comboDrawingAreaCanvas').css("width", 1000);
    $('#comboDrawingAreaCanvas').css("height", 350);*/

    $('#effectDrawingAreaCanvas').css("display","block");
    $('#effectDrawingAreaCanvas').css("width", 1000);
    $('#effectDrawingAreaCanvas').css("height", 350);

    $('#effectDrawingAreaSvg_0').css("display","none");
    $('#effectDrawingAreaSvg_0').css("width", 1000);
    $('#effectDrawingAreaSvg_0').css("height", 350);


    $('#effectDrawingAreaSvg_1').css("display","none");
    $('#effectDrawingAreaSvg_1').css("width", 1000);
    $('#effectDrawingAreaSvg_1').css("height", 350);


    $('#effectDrawingAreaSvg_2').css("display","none");
    $('#effectDrawingAreaSvg_2').css("width", 1000);
    $('#effectDrawingAreaSvg_2').css("height", 350);


    $('#effectTabEditor').css("display","none");
    $('#effectTabEditor').css("width", 1000);
    $('#effectTabEditor').css("height", 350);

    $('#comboTabEditor').css("display","none");
    $('#comboTabEditor').css("width", 1000);
    $('#comboTabEditor').css("height", 350);


}

function updateEffectDrawingArea(effect)
{
    //var effectIndex = effect.getEffectIndex();
    
    //var allSvg = effectDrawingAreaSvg[effectIndex].selectAll("*").remove();
    //allSvg.remove();

    /*var effectProcessArray = effect.processArray;
    var effectIntraProcessConnectionArray = effect.connectionArray;

    for (var effectProcessIndex = 0; effectProcessIndex < effectProcessArray.length; effectProcessIndex++)
    {
        effectProcessArray[effectProcessIndex].draw();
    }

    for (var effectIntraProcessConnectionIndex = 0; effectIntraProcessConnectionIndex < effectIntraProcessConnectionArray.length; effectIntraProcessConnectionIndex++)
    {
        effectIntraProcessConnectionArray[effectIntraProcessConnectionIndex].draw();
    }*/
    effect.draw();

  /*for(var processKey in processMap)
  {
     processMap[processKey].setLocation();
  }
  //updateProcesses(processMap);
  for(var connectionKey in processConnectionMap)
  {
    processConnectionMap[connectionKey].setLocation();
  }
  //updateConnections(processConnectionArray);*/

}