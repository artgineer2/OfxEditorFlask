function getParameterValueString(valueIndex, paramType)
{
    var value;

    switch(paramType)
    {
        case 0:
            value = amp[valueIndex];
            break;
        case 1:
            value = filterFreq[valueIndex];
            break;
        case 2:
            value = delayTime[valueIndex];
            break;
        case 3:
            value = envTime[valueIndex];
            break;
        case 4:
            value = lfoFreq[valueIndex];
            break;
        case 5:
            value = lfoAmp[valueIndex];
            break;
        case 6:
            value = lfoOffset[valueIndex];
            break;
        default:;
    }

    return value;
}



function updateEffectEditorParameter(evt)
{
    var target = evt.currentTarget;
    var eventType = evt.type;
    var key = target.id;
    var key = key.split(':');
    var value;

    if (eventType == "click") // update combo parameter
    {
        currentCombo = key[2];
    }
    else
    {
    	var controlName;
    	var processName;
    	var paramType;

    	if(key[0].indexOf("control") >= 0)
    	{
            combo.effectMap[combo.currentEffect].effectControlMap[key[0]].controlParameterMap[key[1]].update(target.value);
            controlName = key[0];
            paramType = parseInt(combo.effectMap[combo.currentEffect].effectControlMap[key[0]].controlParameterMap[key[1]].type)
    	}
    	else
    	{
            combo.effectMap[combo.currentEffect].effectProcessMap[key[0]].paramMap[key[1]].update(target.value);
            processName = key[0];
            paramType = parseInt(combo.effectMap[combo.currentEffect].effectProcessMap[key[0]].paramMap[key[1]].type);
    	}
        var paramName = key[1];
        var valueIndex = parseInt(target.value);

        value = getParameterValueString(valueIndex, paramType);

        var valueId = key[0]+':'+key[1]+":value";

        $(document.getElementById(valueId)).val(value); // jquery uses colons, so basic DOM had to be used here
        var csrftoken = getCookie('csrftoken');
        $.ajaxSetup({
            beforeSend: function (xhr, settings) {  // setup CSRF token in request header
                if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            }
        });
    	if(key[0].indexOf("control") >= 0)
    	{
			var jsonData = {"control":controlName,"parameter":paramName,"value":target.value};
            $.ajax({type: 'POST', url: 'changeValue', data: JSON.stringify(jsonData), dataType: "json"})
            .success(function (data, status) {
            });
            newParameterValue.parentName = controlName;
            newParameterValue.parameterName = paramName;p
            newParameterValue.parameterValue = target.value;
    	}
    	else
    	{
			var jsonData = {"process":processName,"parameter":paramName,"value":target.value};
            $.ajax({type: 'POST', url: 'changeValue', data: JSON.stringify(jsonData), dataType: "json"})
            .success(function (data, status) {
            });
            newParameterValue.parentName = processName;
            newParameterValue.parameterName = paramName;
            newParameterValue.parameterValue = target.value;
    	}
    }
}

function updateEffectEditorForm(formData)
{
//var form = document.getElementById("effectEditorForm");
// clear old child nodes  in effectEditorForm first
    $('#effectEditorForm').empty();

    var formDataKeys = Object.keys(formData);
    var formDataSize = formDataKeys.length;
    if (formDataSize > 2)//if("paramArray" in formData) // formData is process data
    {

        var form = $('#effectEditorForm');
        form.append($('<br>'));
        if(formData.name.indexOf("control") >= 0)
        {

            var control = formData;
            control.paramControlType.draw();

            /*$('#effectEditorForm').append($('<div>')*/
            form.append($('<div>')
                    .attr({"id": "effectEditorFormHeader",
                        "class": "row"}
                    )
                    .append($('<div>').attr({"id": "paramTitle", "class": "col-md-2"})
                            .text("Title"))
                    .append($('<div>').attr({"id": "paramSlider", "class": "col-md-1"})
                            .text("-"))
                    .append($('<div>').attr({"id": "paramSlider", "class": "col-md-2"})
                            .text("Slider"))
                    .append($('<div>').attr({"id": "paramSlider", "class": "col-md-1"})
                            .text("+"))
                    .append($('<div>').attr({"id": "paramValue", "class": "col-md-1"})
                            .text("Value"))
                    /*.append($('<div>').attr({"class": "col-md-1"}))*/
                    .append($('<div>').attr({"class": "col-md-2"})
                            .text("Pedal UI Alias"))
                    .append($('<div>').attr({"class": "col-md-2"})
                            .text("Pedal UI Abbr."))


                    )
                    /*.css("overflow-y","auto")
                    .css("overflow-x","hidden")
                    .css("height", "200px")*/;

            // create new child nodes
            for (var controlParameterKey in control.controlParameterMap)
            {
                control.controlParameterMap[controlParameterKey].draw(form);
            }
       }
        else
        {
            var process = formData;
            process.footswitch.draw();


            form.append($('<div>')
                    .attr({"id": "effectEditorFormHeader",
                        "class": "row"}
                    )
                    .append($('<div>').attr({"id": "paramTitle", "class": "col-md-2"})
                            .text("Title"))
                    .append($('<div>').attr({"id": "paramSlider", "class": "col-md-2"})
                            .text("Slider"))
                    )
                    .css("overflow-y","auto")
                    .css("overflow-x","hidden")
                    .css("height", "200px");

            // create new child nodes
            for (var paramKey in process.paramMap)
            {
                process.paramMap[paramKey].draw(form);
            }
        }
    }
    /*else if(formDataKeys.indexOf("combo_name")>=0) // formData is combo header data
    {
        currentCombo = formData.combo_name;
        $('#effectEditorTabGroupDiv').empty();
        $('#effectEditorForm')
                .append($('<br>'))
                .append($('<div>')
                .attr({"id": "effectDiv",
                    "class": "form-group col-md-10",
                    "value": currentCombo
                }
                )
                .append($('<label>')
                        .attr({"for": "comboName",
                            "class": "col-md-3 control-label"})
                        .text("Combo Name"))
                .append($('<input>').attr({"type": "text", "id": "comboHeaderName", "class": "col-md-3", "value": currentCombo, "maxlength": 9}))
                .append($('<input>').attr({"type": "button", "class": "col-md-3", "value": "Apply"})
                        .on("click", function (evt) {
                            currentCombo = $('#comboHeaderName').val();
                            //updateEffectEditorParameter(comboHeader);
                        }))
                );
    }
    else if(formDataKeys.indexOf("effect_name")>=0 && formData.effect_name.length > 1)
    {

        combo.currentEffect = formData.effect_name;
        effectIndex = combo.effectMap[combo.currentEffect].index;
        //$('#effectEditorTabGroupDiv').empty();
        $('#effectEditorForm')
                .append($('<br>'))
                .append($('<div>')
                .attr({"id": "effectDiv",
                    "class": "form-group col-md-10",
                    "value": combo.currentEffect
                }
                )
                .append($('<label>')
                        .attr({"for": "effectName",
                            "class": "col-md-3 control-label"})
                        .text("Effect Name"))
                .append($('<input>').attr({"type": "text", "id": "effectHeaderName", "class": "col-md-3", "value": combo.currentEffect}))
                .append($('<input>').attr({"type": "button", "class": "col-md-3", "value": "Apply", "maxlength": "9"})
                        // ************ EDIT NAME OF EFFECT *****************
                        .on("click", function (evt) {
                            //***** save old name and get new name ******
                            var oldName = combo.currentEffect;
                            //combo.effectMap[combo.currentEffect] = combo.effectMap[oldName];
                            combo.currentEffect = $('#effectHeaderName').val();

                            //******* change name by creating new Effect and deleting old Effect ******
                            var tempEffectParams = combo.effectMap[oldName].getEffectData();
                            combo.effectMap[oldName].update({"name":combo.currentEffect});

                            for(var key in tempEffectParams.processArray)
                            {
                                tempEffectParams.processArray[key].parentEffect.name = combo.currentEffect;
                            }

                            tempEffectParams.name = combo.currentEffect;
                            effectDrawingAreaSvg[effectIndex].selectAll("*").remove();
                            $('#effectArea_'+effectIndex).text(combo.currentEffect);
                            deleteEffect(oldName);
                            //delete combo.effectMap[oldName];
                            combo.effectMap[combo.currentEffect] = new Effect(effectDrawingAreaSvg[effectIndex], effectIndex, tempEffectParams);
                            combo.effectMap[combo.currentEffect].draw();

                            //****** replace cords with old effect name ***********
                            for(var cordKey in combo.effectConnectionMap)
                            {
                                var tempCordParams = combo.effectConnectionMap[cordKey].getCordData();
                                var tempCordName = tempCordParams.srcEffect+':'+tempCordParams.srcPort+'>'
                                    +tempCordParams.destEffect+':'+tempCordParams.destPort;
                                var oldNameParenthesis = "("+oldName+")";
                                var currentEffectParenthesis = "("+combo.currentEffect+")"

                                if(tempCordParams.srcEffect == oldNameParenthesis)
                                {
                                    tempCordParams.srcEffect = currentEffectParenthesis;
                                    delete combo.effectConnectionMap[tempCordName];
                                    var src = {"effect":tempCordParams.srcEffect,"port":tempCordParams.srcPort};
                                    var dest = {"effect":tempCordParams.destEffect,"port":tempCordParams.destPort};

                                    var cord = new Cord(null, src, dest, currentCombo);
                                    combo.effectConnectionMap[cord.name] = cord;
                                }
                                else if(tempCordParams.destEffect == oldNameParenthesis)
                                {
                                    tempCordParams.destEffect = currentEffectParenthesis;
                                    delete combo.effectConnectionMap[tempCordName];
                                    var src = {"effect":tempCordParams.srcEffect,"port":tempCordParams.srcPort};
                                    var dest = {"effect":tempCordParams.destEffect,"port":tempCordParams.destPort};
                                    var cord = new Cord(null, src, dest, currentCombo);
                                    combo.effectConnectionMap[cord.name] = cord;
                                }
                            }
                            //updateEffectEditorParameter(comboHeader);
                        }))
                );
    }*/
}

function updateEffectEditorArea(effect)
{

    var effectEditorTabGroupDiv = $('#effectEditorTabGroupDiv');
    var effectEditorForm = $('#effectEditorForm');
    // update combo tab
    effectEditorTabGroupDiv.empty();
    effectEditorTabGroupDiv

            .append($('<li>')
                    .attr({"display": "inline-block","style":"border:5px"})
                    .append($('<a>').attr({"href": "#", "id": "addParamControl"})
                            .text("Add Parameter Controller")));


    $('#addParamControl').click(function (evt) {
    	addParamControlClick(evt);
    });
    var numberOfProcesses = 0;
    // update process tabs
    //for (var processKey in processMap)
    updateEffectEditorForm({"effect_name": effect.name});//$('#effectEditorForm').empty()
}


function effectEditorInit()
{
    var effectEditorTabGroupDiv = document.getElementById("effectEditorTabGroupDiv");

    var effectEditorTabGroup = document.getElementById("effectEditorTabGroup");

    var effectEditorForm = document.getElementById("effectEditorForm");


    updateEffectEditorForm({"name": ""});//$('#effectEditorForm').empty();
    updateEffectEditorArea({"name": ""});//$('#effectEditorForm').empty();


}
