
function replotcallback() {
    $('#plotly-div')[0].on('plotly_relayout',(eventdata)=>{   
        threeDsurfacecam = JSON.stringify(eventdata["scene.camera"]);
    });
}	
function trace_filter_toggle() {
	$(".graphshift_preloader").show();
	console.log("trace filter new");
	let checked_trace = $('.traces_filter input:checked').map(function () {
	    return $(this).data('id')
	}).get();
	craftthegraph(graphusedparam[0],graphusedparam[1],graphusedparam[2],checked_trace);
	// console.log("filtered traces",checked_trace);

}
function preprocessdata(data) {
  for (var i = 0; i < data.length; i++) {
    data[i] = toObject(data[i]);
  }
  function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
      rv[i] = arr[i];// if ade issue dekat sting nnt convert dekat sini
    return rv;
  }
  return data;
}
function processDatavalidation(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    alldatavalidation = preprocessdata(lines); 
    console.log("all data validation",alldatavalidation);
}
function processDataactual(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // pass processed data to alldata global
    alldataactual = preprocessdata(lines); 
    console.log("all data actual",alldataactual);
    // call graph
    // craftthegraph(filters);
}
function handleChange() {
    $(".graphshift_preloader").show();
    // on scroll
    console.log("interpolate initiate");
    var sendingvarforactual = [];
    var sendingvarforimpact = [];
    let tempobjvarlist = {};
    for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
		tempobjvarlist[var_key-1]	= parseFloat($('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').val()).toFixed(10)
      	// var theValue{{preg_replace("/[^a-zA-Z0-9]+/", "_", $value['name'])}} = parseFloat($('#rangefor{{preg_replace("/[^a-zA-Z0-9]+/", "_",  $value['name'])}}[type="range"]').val()).toFixed(10);
      	// sendingvarforactual.push({[var_key+2]:parseFloat($('#rangefor'+preloadwindowdata_filteredvarlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').val()).toFixed(10)});
    }
    sendingvarforimpact.push(tempobjvarlist);

    console.log("things sent to flask",xaxis_setting-1,yaxis_setting-1,sendingvarforimpact);
    console.log("acutal filter: ",sendingvarforactual);
    actualfilters = sendingvarforactual;
    interpoldemand(window.preloadwindowdata_[target_num].preloadwindowdata_project.id,xaxis_setting-1,yaxis_setting-1,sendingvarforimpact);
    // if (dataloaded == 2) {
    //     craftthegraph(sendingvar,sendingvarforactual,null,sendingvarforimpact);
    // }
}
function handleChangequery() {
	console.log("query initiate");
	$(".graphshift_preloader").show();
    // on scroll
    var sendingvarforactual = [];
    var sendingvarforimpact = [];
    let tempobjvarlist = {};
    for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
		tempobjvarlist[var_key-1]	= parseFloat($('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').val()).toFixed(10)
      	// var theValue{{preg_replace("/[^a-zA-Z0-9]+/", "_", $value['name'])}} = parseFloat($('#rangefor{{preg_replace("/[^a-zA-Z0-9]+/", "_",  $value['name'])}}[type="range"]').val()).toFixed(10);
      	// sendingvarforactual.push({[var_key+2]:parseFloat($('#rangefor'+preloadwindowdata_filteredvarlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').val()).toFixed(10)});
    }
    sendingvarforimpact.push(tempobjvarlist);

    console.log("acutal filter: ",sendingvarforactual);
    actualfilters = sendingvarforactual;
    console.log("target_num",target_num);
    console.log("THINGS SENT TO FLASK ----");
    console.log("Project: ",window.preloadwindowdata_[target_num].preloadwindowdata_project);
    console.log("X: ",xaxis_setting-1); //temporary
    console.log("Y: ",yaxis_setting-1); //temporary
    console.log("Var: ",sendingvarforimpact);
    console.log("END THINGS SENT TO FLASK ----");
    querydemand(window.preloadwindowdata_[target_num].preloadwindowdata_project.id,xaxis_setting-1,yaxis_setting-1,sendingvarforimpact);
}
function handleChangecomboquery() {
	console.log("query initiate");
	$(".graphshift_preloader").show();
    // on scroll
    var sendingvarforactual = [];
    var sendingvarforimpact = [];
    
    let tempobjvarlist = {};
    for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
		tempobjvarlist[var_key-1]	= [..._.range(parseFloat($('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider( "values", 0 )).toFixed(10),parseFloat($('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider( "values", 1 )).toFixed(10),parseFloat($('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider( "option", "step" )).toFixed(10)),parseFloat($('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider( "values", 1 )).toFixed(10)].map((x)=>{return parseFloat(x).toFixed(10)});
    }
    sendingvarforimpact.push(tempobjvarlist);
	let arrayedobject = Object.keys(tempobjvarlist).map(function(key) {
	  return tempobjvarlist[key];
	});
    console.log("acutal filter: ",sendingvarforactual);
    actualfilters = sendingvarforactual;
    
    console.log("THINGS SENT TO FLASK ----");
    console.log("Project: ",window.preloadwindowdata_[target_num].preloadwindowdata_project.id);
    console.log("X: ",xaxis_setting-1); // temporary
    console.log("Y: ",yaxis_setting-1); // temporary
    console.log("Var: ",sendingvarforimpact);
    console.log("END THINGS SENT TO FLASK ----");
    combine(arrayedobject).map((x)=>{
    	let sendingvarforimpact2 = [];
    	sendingvarforimpact2.push({ ..._.split(x, ',') });
    	querydemand(window.preloadwindowdata_[target_num].preloadwindowdata_project.id,xaxis_setting-1,yaxis_setting-1,sendingvarforimpact2);
    });
}
// function switchfilter() {
//     // this will contain a reference to the checkbox   
//     if ($('#switchdata').is(':checked')) {
//         // the checkbox is now checked 
//         console.log("show all actual data");
//         filterswitch = true;
//         // plugin = $('#switchplugin').val();
//         handleChange();
//     } else {
//       filterswitch = false;
//       // plugin = $('#switchplugin').val();
//       handleChange();
//       console.log("filter actual data");
//         // the checkbox is now no longer checked
//     }
// }
		    // function axischange() {
		    //     xaxis_setting = $('#xaxis_setting :selected').val();//attr("key");
		    //     yaxis_setting = $('#yaxis_setting :selected').val();//attr("key");
		    //     console.log(xaxis_setting,yaxis_setting);
		    //     if (xaxis_setting == yaxis_setting) {
		    //         // return balik n alret error
		    //         swal("Opps! Something went wrong somewhere!", {
				  //     dangerMode: true,
				  //   });

		    //     }else{
		    //         // handleChange();
		    //         window.location.replace('/project/{{$project->id}}?loadview=3d&x_valselect='+xaxis_setting+'&y_valselect='+yaxis_setting);
		    //     }
		    // }
		    
	        function updateimpactonslider(impactarr) {
	        	console.log("impact on slider");
	            for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
					$('#impactlabelrangefor'+(var_key+2)).html(parseFloat(impactarr[0][var_key]*100).toFixed(2) + "%");
				}
	            
	        }
// 	        function updateresultfromslider(slider,result) {
// 	            console.log("slider and result:",slider,result);
// 	            let table = '';

// 	                table+= '<table id="consumption-data" class="table table-bordered table-striped">';
// 	                table+= '   <thead class="header">';
// 	                table+= '       <tr>';
// 	                table+=              '<th class="th-sm">{{preg_replace("/[^a-zA-Z0-9]+/", "_", $var['z'][1])}}';
// 	                table+=                '<i class="fa fa-sort float-right" aria-hidden="true"></i>';
// 	                table+=              '</th>';
// 	                @foreach($varlist as $key => $value)
// 	                table+=              '<th class="th-sm">{{preg_replace("/[^a-zA-Z0-9]+/", "_", $value['name'])}}';
// 	                table+=                '<i class="fa fa-sort float-right" aria-hidden="true"></i>';
// 	                table+=              '</th>';
// 	                @endforeach
	                
// 	                table+= '       </tr>';
// 	                table+= '   </thead>';
// 	                table+= '   <tbody class="dataresults">';
// 	                table+= '       <tr>';
// 	                table+=              '<td>'+result+'</td>';
// 	                @foreach($varlist as $key => $value)
// 	                table+=              '<td>'+roundtodc(slider[0][{{$key-1}}],2)+'</td>';
// 	                // table+=              '<td>'+slider[0][{{$key-1}}]+'</td>';

// 	                @endforeach
	                
// 	                table+= '       </tr>';
// 	                table+= '   </tbody>';
// 	                table+= '</table>';
// 	            $('#resulttable').empty();
// 	            $('#resulttable').append(table);
// 	            $('#resulttable').show();
// 	        }
// 	        function updatesurfaceontable(surface) {
// 	            console.log(surface.length);
// 	            let table = '';
// 	                table+='<table id="dtMaterialDesignExample" class="table table-striped table-sm" cellspacing="0" width="100%" style="margin:0px">';
// 	                table+=          '<thead>';
// 	                table+=            '<tr>';
// 	                table+=              '<th class="th-sm">{{preg_replace("/[^a-zA-Z0-9]+/", "_", $var['z'][1])}}';
// 	                table+=                '<i class="fa fa-sort float-right" aria-hidden="true"></i>';
// 	                table+=              '</th>';
// 	                @foreach($varlist as $key => $value)
// 	                table+=              '<th class="th-sm">{{preg_replace("/[^a-zA-Z0-9]+/", "_", $value['name'])}}';
// 	                table+=                '<i class="fa fa-sort float-right" aria-hidden="true"></i>';
// 	                table+=              '</th>';
// 	                @endforeach
// 	                table+=            '</tr>';
// 	                table+=          '</thead>';
// 	                table+=          '<tbody>';
// 	                // begin loop
// 	                if (surface) {
// 	                    for (var i = 0; i<surface.length; i++) {
// 	                        table+=            '<tr>';
// 	                        table+=              '<td>'+surface[i][{{$var['z'][0]}}]+'</td>';
// 	                        @foreach($varlist as $key => $value)
// 	                        table+=              '<td>'+surface[i][{{$key}}]+'</td>';
// 	                        @endforeach
// 	                        table+=            '</tr>';
// 	                    }
// 	                }
// 	                // end loop
// 	                table+=          '</tbody>';
// 	                table+=        '</table>';
	                        
// 	            $('#surfacetable').empty();
// 	            $('#surfacetable').append(table);
// 	            $('#dtMaterialDesignExample').DataTable({
// 	                "scrollY": "150px",
// 	                "scrollCollapse": true,
// 	                "paging": false,
// 	                "ordering": false,
// 	                "info": false,
// 	            });
// 	            $('.dataTables_length').addClass('bs-select');
// 	            $( "#dtMaterialDesignExample_wrapper .mdl-grid:last-child" ).css({ display:"none" });
// 	        }
		    
		    function craftthegraph(filtered_data,param,paramresult,trace_filter) {
		    	// var chartcanvaswidth = 700
		    	
	            console.log("param n param result", lol,param,paramresult);
	            console.log("filtered data",filtered_data);
	            // prediction
	            var varlength = Object.keys(filtered_data[0]).length;
	            var dnewArr = _.chunk(filtered_data.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][0]]),window.preloadwindowdata_[target_num].preloadwindowdata_blocksize["Y"]);
	            var enewArr = _.chunk(filtered_data.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][0]]),window.preloadwindowdata_[target_num].preloadwindowdata_blocksize["Y"]);
	            var fnewArr = _.chunk(filtered_data.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]]),window.preloadwindowdata_[target_num].preloadwindowdata_blocksize["Y"]);
	            console.log("chunking 1",window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][1],window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][0]);
	            console.log("chunking 2",window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][1],window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][0]);
	            console.log("chunking 3",window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][1],window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]);
	            console.log("e size",varlength);
	            function textmap(e) {
	            	// body...
	            	let tempe = window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][1]+":"+e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]]+"<br>";
	            	for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
		            	tempe += window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]['name']+":" + e[var_key]+"<br>";
		            }

	            }
	            var gentexttracesurface = _.chunk(filtered_data.map(e => textmap(e)),window.preloadwindowdata_[target_num].preloadwindowdata_blocksize["Y"]);
	            console.log("surface hover",gentexttracesurface);
	            // console.log("recheck:",dnewArr,enewArr,fnewArr);
	            // var filters = (filterswitch == false)? '': actualfilters;
	            // var filtered_data_actual = _.filter(alldataactual,_.assign(...filters));
	            // var filtered_error_actual = _.filter(allerroractual,_.assign(...filters));
	            console.log("opacity",opacityactual);
	            console.log("opacity val",opacityvalidation);
	            console.log("all data actual", alldataactual);
	            let filteredopacity = _.map(_.filter(opacityactual, function(o) { return o.val >= $("#rangeactual").val();}),(o)=>{return o.key.toString();});
	            let filteredopacity_validation = _.map(_.filter(opacityvalidation, function(o) { return o.val >= $("#rangeactual").val();}),(o)=>{return o.key.toString();});
	            let filtered_data_actual = _.filter(alldataactual, function(o) { return _.includes(filteredopacity, o[0]); });
	            let filtered_data_validation = _.filter(alldatavalidation, function(o) { return _.includes(filteredopacity_validation, o[0]); });
	            console.log("dnew-f",fnewArr);
	            console.log("filter opacity actual",filteredopacity,"filter opacity validation",filteredopacity_validation,"switchs",filterswitch);
	            // console.log("filtered data actual",filtered_data_actual);
	            // console.log("allactual filtered",lol);
	            // var filtered_data_actual = lol;
	            // console.log("filtered error actual",filtered_error_actual);

	            // actual value
	            console.log("filtered data actual",filtered_data_actual,"filtered data validation",filtered_data_validation);
	            var actual_dtest_arr = filtered_data_actual.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][0]+5]);
	            var actual_etest_arr = filtered_data_actual.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][0]+5]);
	            var actual_ftest_arr = filtered_data_actual.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+2]);
	            var actual_fclonetest_arr = filtered_data_actual.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+3]);
	            var actual_midtest_arr = filtered_data_actual.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+4]);
	            var actual_errortest_arr = filtered_data_actual.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+5]);

	            var validation_dtest_arr = filtered_data_validation.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][0]+5]);
	            var validation_etest_arr = filtered_data_validation.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][0]+5]);
	            var validation_ftest_arr = filtered_data_validation.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+2]);
	            var validation_fclonetest_arr = filtered_data_validation.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+3]);
	            var validation_midtest_arr = filtered_data_validation.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+4]);
	            var validation_errortest_arr = filtered_data_validation.map(e => e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+5]);
	            // var midpoint = filtered_error_actual.map(e => e[1]);
	            // var error_line = filtered_error_actual.map(e => e[0]);

	            // for debuggin
	            console.log("new actual test",actual_dtest_arr,actual_etest_arr,actual_ftest_arr,actual_fclonetest_arr,actual_midtest_arr,actual_errortest_arr);
	            console.log("new validation test", validation_dtest_arr, validation_etest_arr, validation_ftest_arr,validation_fclonetest_arr,validation_midtest_arr,validation_errortest_arr);
	            // console.log("surface test",dnewArr,enewArr,fnewArr);
	            // console.log("plot setting :","{{$viewer}}");

	            // begin tracing
	            // var trace2text = _.map(dnewArr,tracetextmaking);
	            function textmapgentexttracescatter(e) {
	            	// body...
	            	let tempe = window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][1]+":"+e[window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][0]+2]+"<br>";
	            	for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
		            	tempe += window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]['name']+":" + e[var_key+5]+"<br>";
		            }

	            }
	            var gentexttracescatter = filtered_data_actual.map(e => textmapgentexttracescatter(e));
	            var gentexttracescatter_validation = filtered_data_validation.map(e => textmapgentexttracescatter(e));

	            function textmapgentexttracescatterpoint() {
	            	// body...
	            	let tempe = window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][1]+":"+paramresult+"<br>";
	            	for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
		            	tempe += window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]['name']+":" + var_key+":"+param[0][var_key-1]+"<br>";
		            }
		            return tempe;
	            }

	            var gentexttracescatterpoint = textmapgentexttracescatterpoint();
			    
			    var trace5 = {
	              name: 'validation', 
	              x: validation_dtest_arr,
	              y: validation_etest_arr,
	              z: validation_ftest_arr,
	              autocolorscale: false, 
	              marker: {
	              	color: '#AAAAAA',
	                size: 8,
	                symbol: 'circle',
	                line: {
	                color: 'rgb(204, 204, 204)',
	                width: 1},
	                opacity: 0.8},
	              mode: 'markers',
	              type: 'scatter3d',
	              hoverinfo:"text",
	              text: gentexttracescatter_validation,
	            };
	            var trace5_clone = {
	              name: 'validation', 
	              x: validation_dtest_arr,
	              y: validation_etest_arr,
	              z: validation_fclonetest_arr,
	              autocolorscale: false, 
	              marker: {
	                color: '#F07549',
	                size: 8,
	                symbol: 'circle',
	                line: {
	                color: 'rgb(204, 204, 204)',
	                width: 1},
	                opacity: 0.8},
	              mode: 'markers',
	              type: 'scatter3d',
	              hoverinfo:"text",
	              text: gentexttracescatter_validation,
	            };
	            var trace5_mid_error = {
	              name: 'validation mid error', 
	              x: validation_dtest_arr,
	              y: validation_etest_arr,
	              z: validation_midtest_arr,
	              autocolorscale: false, 
	              marker: {
	                color: '#F07549',
	                size: 1,
	                symbol: 'circle',
	                line: {
	                color: 'rgb(204, 204, 204)',
	                width: 1},
	                opacity: 0.1},
	              error_z: {
	                visible: 'True',
	                type: 'data',
	                array: validation_errortest_arr,
	                color: '#FEC734',
	                thickness: 1},
	              mode: 'markers',
	              type: 'scatter3d',
	              // hoverinfo:"text",
	              // text: gentexttracescatter_validation,
	            };
	            var trace4 = {
	                name: 'point', 
	                x: [param[0][window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][0]-1]],
	                y: [param[0][window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][0]-1]],
	                z: [paramresult],
	                autocolorscale: false, 
	                marker: {
	                    color: '#BA1111',
	                    size: 8,
	                    symbol: 'diamond',
	                    line: {
	                        color: 'rgb(186, 0, 17)',
	                        width: 1},
	                    opacity: 0.8},
	                mode: 'markers',
	                type: 'scatter3d',
	                hoverinfo:"text",
	                text: gentexttracescatterpoint,
	            }
	            var trace2 = {
	              x: dnewArr, 
	              y: enewArr, 
	              z: fnewArr, 
	              autocolorscale: false, 
	              colorscale: [['0', '#440154'], ['0.0627450980392', '#48186a'], ['0.125490196078', '#472d7b'], ['0.188235294118', '#424086'], ['0.250980392157', '#3b528b'], ['0.313725490196', '#33638d'], ['0.376470588235', '#2c728e'], ['0.439215686275', '#26828e'], ['0.501960784314', '#21918c'], ['0.564705882353', '#1fa088'], ['0.627450980392', '#28ae80'], ['0.690196078431', '#3fbc73'], ['0.752941176471', '#5ec962'], ['0.81568627451', '#84d44b'], ['0.878431372549', '#addc30'], ['0.941176470588', '#d8e219'], ['1', '#fde725']], 
	              name: 'prediction', 
	              showlegend: true, 
	              showscale: false, 
	              type: 'surface', 
	              uid: 'e60d71', 
	              visible: true, 
	              hoverinfo:"text",
	              text: gentexttracesurface,
	              // zmax: 7.99662, 
	              // zmin: -6.326524
	            };
	            var trace1 = {
	              name: 'actual', 
	              x: actual_dtest_arr,
	              y: actual_etest_arr,
	              z: actual_ftest_arr,
	              autocolorscale: false, 
	              marker: {
	                color: 'rgb(255, 187, 3)',
	                size: 8,
	                symbol: 'circle',
	                line: {
	                color: 'rgb(255, 187, 3)',
	                width: 1},
	                opacity: 0.8},
	              mode: 'markers',
	              type: 'scatter3d',
	              hoverinfo:"text",
	              text: gentexttracescatter,
	            };
	            var trace1_clone = {
	              name: 'actual', 
	              x: actual_dtest_arr,
	              y: actual_etest_arr,
	              z: actual_fclonetest_arr,
	              autocolorscale: false, 
	              marker: {
	                color: 'rgb(204, 104, 17)',
	                size: 8,
	                symbol: 'circle',
	                line: {
	                color: 'rgb(204, 104, 17)',
	                width: 1},
	                opacity: 0.8},
	              mode: 'markers',
	              type: 'scatter3d',
	              hoverinfo:"text",
	              text: gentexttracescatter,
	            };
	            var trace1_mid_error = {
	              name: 'actual',
	              x: actual_dtest_arr,
	              y: actual_etest_arr,
	              z: actual_midtest_arr,
	              autocolorscale: false,
	              marker: {
	                color: '#FFBB03',
	                size: 1,
	                symbol: 'circle',
	                line: {
	                color: 'rgb(204, 204, 204)',
	                width: 1},
	                opacity: 0.8},
	              error_z: {
	                visible: 'True',
	                type: 'data',
	                array: actual_errortest_arr,
	                color: '#FEC734',
	                thickness: 1},
	              mode: 'markers',
	              type: 'scatter3d',
	            };
	            if(threeDsurfacecam == ''){
	                // threeDsurfacecam = '{"center": {"x": 0, "y": 0, "z": 0}, "eye": {"x": 1.25, "y": 1.25, "z": 1.25}, "up": {"x": 0, "y": 0, "z": 1}}';
	                threeDsurfacecam = '{"up":{"x":0.00983648517355447,"y":-0.008127786046999175,"z":0.9999185880127465},"center":{"x":0,"y":0,"z":0},"eye":{"x":1.5473040445802588,"y":1.7825526517689891,"z":0.5437845522715351}}';
	            }
	            var data = [];
	    		trace_filter = $('.traces_filter input:checked').map(function () {
				    return $(this).data('id')
				}).get();
            	if (trace_filter.includes("trace_filter_target")) {
            		data.push(trace4);
            	}
            	if (trace_filter.includes("trace_filter_scatter_actual")) {
            		data.push(trace1,trace1_clone,trace1_mid_error);
            	}
            	if (trace_filter.includes("trace_filter_scatter_validation")) {
            		data.push(trace5,trace5_clone,trace5_mid_error);
            	}
            	if (trace_filter.includes("trace_filter_surface_prediction")) {
            		data.push(trace2);
            	}
            	// use only after run
            	
            	console.log("data size after trace filter",data, data.length, "run", lol);
            	
	            
	            var layout = {
	              annotations: [
	                {
	                  x: 0.5175, 
	                  y: 0.935, 
	                  align: 'center', 
	                  showarrow: false, 
	                  text: '<b><b></b></b>', 
	                  xanchor: 'center', 
	                  xref: 'paper', 
	                  yanchor: 'bottom', 
	                  yref: 'paper'
	                }
	              ], 
	              dragmode: 'turntable', 
	              height: $(".content-viewbar-chartview").height(),
	              margin: {
	                r: 0, 
	                t: 0, 
	                b: 0, 
	                l: 0, 
	                pad: 0
	              }, 
	              scene: {
	                aspectratio: {
	                  x: 1, 
	                  y: 1, 
	                  z: 1
	                }, 
	                camera: JSON.parse(threeDsurfacecam),//, 
	                xaxis: {
	                  title: window.preloadwindowdata_[target_num].preloadwindowdata_var['x'][1],
	                  backgroundcolor: '#F9F9F9', 
	                  gridcolor: '#BAB8BA', 
	                  showbackground: true, 
	                  zerolinecolor: 'rgb(255, 255, 255)'
	                }, 
	                yaxis: {
	                  title: window.preloadwindowdata_[target_num].preloadwindowdata_var['y'][1],
	                  backgroundcolor: '#F9F9F9', 
	                  gridcolor: '#BAB8BA', 
	                  showbackground: true, 
	                  zerolinecolor: 'rgb(255, 255, 255)'
	                }, 
	                zaxis: {
	                  title: window.preloadwindowdata_[target_num].preloadwindowdata_var['z'][1],
	                  backgroundcolor: '#F9F9F9', 
	                  gridcolor: '#BAB8BA', 
	                  showbackground: true, 
	                  zerolinecolor: 'rgb(255, 255, 255)'
	                }
	              }, 
	              showlegend: false, 
	              // width: chartcanvaswidth, 
	              autosize: true,
	              xaxis: {
	                anchor: 'y', 
	                // title: 'haha',
	                // domain: [0.13, 0.905], 
	                side: 'bottom', 
	                type: 'linear'
	              }, 
	              yaxis: {
	                anchor: 'x', 
	                // title: 'haha',
	                // domain: [0.11, 0.925], 
	                side: 'left', 
	                type: 'linear'
	              }
	            };
	            
	            if (lol > 1) {// sebab onchange checkbox trigger bende ni 2 kali -- temporary
	            	prevtrace_to_delete = trace_to_delete;
	            	trace_to_delete = [];
	            	for (var i = 0; i < data.length; i++) {
	            		trace_to_delete.push(i);
	            	}
	            	console.log("if lol is more than 1",data,prevtrace_to_delete,trace_to_delete);	
	            	Plotly.deleteTraces('plotly-div',prevtrace_to_delete);
	            }else if(lol==1){
	            	trace_to_delete = [];
	            	for (var i = 0; i < data.length; i++) {
	            		trace_to_delete.push(i);
	            	}
	            	console.log("if lol is 1",data,prevtrace_to_delete,trace_to_delete);	
	            	Plotly.deleteTraces('plotly-div',[0,1,2,3,4,5,6,7]);
	            }

	            Plotly.newPlot('plotly-div', {
	              data: data,
	              layout: layout
	            }).then(
	                (gd)=>{
	                    plotlygd = gd;
	                }
	            );
	            lol+=1;
	            // console.log("asddasda");
	            $(".graphshift_preloader").hide();
	            replotcallback();
			}	

			// blindtest
			// function genexportvalidation() {
	  //           Createcsv(JSON.parse(jsonrespond.data).training_export,'training_export');
	  //           Createcsv(JSON.parse(jsonrespond.data).validation_export,'validation_export');
	  //       }
	        function craftthegraphbt(filtered_data,param,paramresult,trace_filter) {
	        	console.log("clearing out plot div");
	        	// $("#plotly-div").empty();
                console.log(filtered_data);
	        	var validation_data = JSON.parse(filtered_data);
		        console.log("param validation here",validation_data.scatter_training.x)
	            var trace1 = {
	                name: 'Training',
	                x: Object.keys(validation_data.scatter_training.x).map(function(_) { return validation_data.scatter_training.x[_]; }),
	                y: Object.keys(validation_data.scatter_training.y).map(function(_) { return validation_data.scatter_training.y[_]; }),
	                mode: 'markers',
	                type: 'scatter'
	            };
	            var trace2 = {
	                name: 'Validation',
	                x: Object.keys(validation_data.scatter_validation.x).map(function(_) { return validation_data.scatter_validation.x[_]; }),
	                y: Object.keys(validation_data.scatter_validation.y).map(function(_) { return validation_data.scatter_validation.y[_]; }),
	                mode: 'markers',
	                type: 'scatter'
	            };

	            var trace3 = {
	                name: 'Line',
	                x: Object.keys(validation_data.line.x).map(function(_) { return validation_data.line.x[_]; }),
	                y: Object.keys(validation_data.line.y).map(function(_) { return validation_data.line.y[_]; }),
	                mode: 'lines',
	                type: 'scatter'
	            };
	            console.log("validation traces",trace1,trace2,trace3);
	            var data = [trace1, trace2, trace3];
	            var layout = {
	                showlegend: false,
	                autosize: false,
	                width: $('.invg-chart-pane').width(),
	                height: $('.invg-plugin-mainpane').height()/10*7,
	                margin: {t: 50},
	                hovermode: 'closest',
	                bargap: 0,
	                xaxis: {
	                  domain: [0, 0.85],
	                  showgrid: false,
	                  zeroline: false
	                },
	                yaxis: {
	                  domain: [0, 0.85],
	                  showgrid: false,
	                  zeroline: false
	                },
	            };
	            // if (lol > 0) {Plotly.deleteTraces('plotly-div',[0]);}
	            Plotly.newPlot('plotly-div', {
	                data: data,
	                layout: layout
	            });
	            lol+=1;
	            $(".graphshift_preloader").hide();
	        }