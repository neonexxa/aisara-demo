// API LIST
function authenticate_user(token,expiry_at){

	$.ajax({
	    url: centrica_domain+'/api/auth/user',
	    headers: {
	        'Authorization': `Bearer ${token}`,
	    },
	    method: 'GET',
	    success: function(response){
	      	console.log("Authenticated user:",response.email);
	      	$('#aisaraguestt').hide();
          initializing_inapp_ui();
          // $('.explorer-sidebar-right').hide();
          // refresh_explorer("bylistall");
          $('#aisaraauthenticated').show();
	    },
	    error: function(error) {
	    	
	    	localStorage.removeItem('application_auth_token');
        localStorage.removeItem('application_auth_expiry');
        $('#aisaraauthenticated').hide();
        initializing_guest_ui();
	    	$('#aisaraguestt').show();
	        // alert(xhr.responseText);
	    }
	});
}
function getdatasetlist(token,method) {
  console.log("Getting All Dataset Method: ",method);
  $.ajax({
      url: centrica_domain+'/api/getdatasheetallcustom/'+method,
      headers: {
          'Authorization': `Bearer ${token}`,
      },
      method: 'GET',
      contentType: 'application/json',
      success: function(response){
        if (response.success) {
          console.log("Dataset responses: ",method);
          initialising_inapp_ui_sidebar_content(response.datasheets,method);
        }  
        
      },
      error: function(error) {
        
        localStorage.removeItem('application_auth_token');
        localStorage.removeItem('application_auth_expiry');
        $('#aisaraauthenticated').hide();
        initializing_guest_ui();
        $('#aisaraguestt').show();
          // alert(xhr.responseText);
      }
  });
}

// ALL event triggered when click dataset
function getprojectlist(token,datasetid,method) {
  
  console.log("Getting All Project: ",method, datasetid);
  // let ajaxdata = new FormData();
  // ajaxdata.append("userid",);
  // ajaxdata.append("dataid",);
  // ajaxdata.append("dataname",);
  // ajaxdata.append("datatype",);
  // $.ajax({
  //     url: 'http://localhost:5000/api/aisara/preview',
  //     headers: {
  //         'Authorization': `Bearer ${token}`,
  //     },
  //     data: ajaxdata,
  //     method: 'POST',
  //     contentType: 'application/json',
  //     success: function(response){
  //       if (response.success) {
  //         console.log("Project responses: ",method);
  //         initialising_inapp_ui_sidebar_datasheet_content(response.projects,datasetid,method);
  //       }  
        
  //     },
  //     error: function(error) {
        
  //       localStorage.removeItem('application_auth_token');
  //       localStorage.removeItem('application_auth_expiry');
  //       $('#aisaraauthenticated').hide();
  //       initializing_guest_ui();
  //       $('#aisaraguestt').show();
  //     }
  // });
  $.ajax({
      url: centrica_domain+'/api/desktopapi/datasheet/'+datasetid+'/getdatasheetprojectallcustom/'+method,
      headers: {
          'Authorization': `Bearer ${token}`,
      },
      method: 'GET',
      contentType: 'application/json',
      success: function(response){
        if (response.success) {
          console.log("Project responses: ",method);
          initialising_inapp_ui_sidebar_datasheet_content(response.projects,datasetid,method);
        }  
        
      },
      error: function(error) {
        
        localStorage.removeItem('application_auth_token');
        localStorage.removeItem('application_auth_expiry');
        $('#aisaraauthenticated').hide();
        initializing_guest_ui();
        $('#aisaraguestt').show();
          // alert(xhr.responseText);
      }
  });
}
function loaddatapreview(token,datasetid,pluginid,user) {
  // body...
  console.log("Preview Dataset:",datasetid);
  // let ajaxdata = new FormData();
  // ajaxdata.append("userid","17");
  // ajaxdata.append("dataid","96");
  // ajaxdata.append("dataname","curvesp.csv");
  // ajaxdata.append("datatype","csv");
  $.ajax({
    type: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    // url: 'http://localhost:5000/api/aisara/preview',
    url: centrica_domain+'/api/desktopapi/datasheet/'+datasetid+'/plugin/'+pluginid+'/user/'+user+'/apipreviewdatasheet',
    
    success: (data)=>{
      console.log("Successfuly Fetch Dataset .. ");
      $("#newproject_datasheetid").val(datasetid); 
      window.previewdataset = data;
      writepreviewdatatodom(window.previewdataset);// window.location.replace("/mydb/databook/"+data.databook.id+"/datasheet/"+data.datasheet.id+"/"+{{$plugin->id}}+"/project/create");
      console.log("Completed writing preview");
      writepreviewdatasettingtodom(window.previewdataset,"single");
      console.log("Completed writing setting");
    }
  }); 
}

function createnewproject(token,user,projectnew_dataid,projectnew_pluginid,project_title,params) {
  // body...
  console.log("User: ",user);
  let path = centrica_domain+'/api/desktopapi/datasheet/'+projectnew_dataid+'/plugin/'+projectnew_pluginid+'/user/'+user+'/apinewporject/new/'+project_title;
  console.log("Path",path);
  let target_type = $('#newproject_target_type option:selected').val();
  console.log("Target type:", target_type);

  // $(".invg-preloader-general").show();
  // $('.preview_modal_preloader').show();
  // $('.preview_modal_advance').hide();
  

  // begin your submission script
  // e.preventDefault();

  let table_aisarapreview = $('#paramsprojectnew')[0];
  // console.log(table_aisarapreview.rows[2]);
  if ($(table_aisarapreview.rows[1]).find('input[type="checkbox"]:checked').length < 4) {
    

    // swal({
    //   icon: "error",
    //   title: "Not enough parameters for multidimension analysis",
    // });
    alert("Not enough parameters for multidimension analysis");
    return false; 
  }
  let allparamsforjson = {};
  let targetonlyattrobj = {};
  
  
  let mainobj = {};
  let attrobj = {};
  let allobj = {};

  // setting for config
  for (var j = 1, col; col = table_aisarapreview.rows[2].cells[j]; j++) {
    if ($(table_aisarapreview.rows[0].cells[j]).find("input").is(':checked')) {
      targetonlyattrobj[$(col).text()] = 
      {
        "usable": (($(table_aisarapreview.rows[1].cells[j]).find("input").is(':checked'))? "true":"false"),
        "min": $(table_aisarapreview.rows[3].cells[j]).text(),//.find("input").val(),
        "max": $(table_aisarapreview.rows[4].cells[j]).text(),//.find("input").val(),
        "binsize": $(table_aisarapreview.rows[5].cells[j]).text(),
        "datatype": $(table_aisarapreview.rows[6].cells[j]).find('option:selected').val(),
        "columntype": (($(table_aisarapreview.rows[0].cells[j]).find("input").is(':checked'))?"target":"variable"),
      };
    }
    // console.log($(table_aisarapreview.rows[1].cells[j]).find('input[type="checkbox"]:checked'),$(table_aisarapreview.rows[1].cells[j]).find("input").is(':checked'),$(table_aisarapreview.rows[1].cells[j]).is(':checked'));
  }
  // setting for params
  if (target_type == "single") {
    attrobj = {};
    allobj = {};
    allobj["project_profile"] = {
        "name":$('#newproject_projectname').val(),
        "split":$('#newproject_bt_split').val(),
        "split_type" : $('#newproject_bt_type option:selected').val(),
        "round_type" : "up",//$('#target_rounding option:selected').val(),
    };
    for (var j = 1, col; col = table_aisarapreview.rows[2].cells[j]; j++) {
      attrobj[$(col).text()] = 
      {
        "usable": (($(table_aisarapreview.rows[1].cells[j]).find("input").is(':checked'))? "true":"false"),
        "min": $(table_aisarapreview.rows[3].cells[j]).text(),//.find("input").val(),
        "max": $(table_aisarapreview.rows[4].cells[j]).text(),//.find("input").val(),
        "binsize": $(table_aisarapreview.rows[5].cells[j]).text(),
        "datatype": $(table_aisarapreview.rows[6].cells[j]).find('option:selected').val(),
        "columntype": (($(table_aisarapreview.rows[0].cells[j]).find("input").is(':checked'))?"target":"variable"),
      };
      // console.log($(table_aisarapreview.rows[1].cells[j]).find('input[type="checkbox"]:checked'),$(table_aisarapreview.rows[1].cells[j]).find("input").is(':checked'),$(table_aisarapreview.rows[1].cells[j]).is(':checked'));
    }
    allobj["params"] = attrobj;
    let ranked = [];
    $.each($('#items>li'),function(index){
      ranked.push($(this).text());
    });
    
    allobj["ranking"] = {
        // "type":$('.ranking_type .btn.active').data("ranktype"),
        "type": "default", // temporary
        "array":ranked,
    };
  }else{
    console.log(targetonlyattrobj, Object.keys(targetonlyattrobj).length);
    console.log("length_target",targetonlyattrobj.length);
    for (const [key, value] of Object.entries(targetonlyattrobj)) {
      console.log("iterating target: ", targetonlyattrobj[key],key);
      attrobj = {};
      allobj = {};
      allobj["project_profile"] = {
          "name":$('#newproject_projectname').val(),
          "split":$('#newproject_bt_split').val(),
          "split_type" : $('#newproject_bt_type option:selected').val(),
          "round_type" : "up",//$('#target_rounding option:selected').val(),
      };
      for (var j = 1, col; col = table_aisarapreview.rows[2].cells[j]; j++) {
        let expcoltype = (($(table_aisarapreview.rows[0].cells[j]).find("input").is(':checked'))?"target":"variable");
        let expuseability = (($(table_aisarapreview.rows[1].cells[j]).find("input").is(':checked'))? "true":"false");
        
        console.log("iterating params: ",expcoltype,$(col).text(),key,$(col).text() == key);
        if (expcoltype == "target") {
          if (key != $(col).text()) {
            expcoltype = "variable" ;
            expuseability = "false" ;
          }else{
            expcoltype = "target" ;
            expuseability = "true" ;
          }
        }
        // console.log("after intrication:",expcoltype,expuseability,attrobj[$(col).text()]);
        attrobj[$(col).text()] = 
        {
          "usable": expuseability,
          "min": $(table_aisarapreview.rows[3].cells[j]).text(),//.find("input").val(),
          "max": $(table_aisarapreview.rows[4].cells[j]).text(),//.find("input").val(),
          "binsize": $(table_aisarapreview.rows[5].cells[j]).text(),
          "datatype": $(table_aisarapreview.rows[6].cells[j]).find('option:selected').val(),
          "columntype": expcoltype,
        };
        console.log("after intrication:",expcoltype,expuseability,attrobj[$(col).text()]);
      }
      console.log("sebelum sumbat:", attrobj);
      allobj["params"] = attrobj;
      let ranked = [];
      $.each($('#items>li'),function(index){
        ranked.push($(this).text());
      });
      
      allobj["ranking"] = {
          // "type":$('.ranking_type .btn.active').data("ranktype"),
          "type": "default", // temporary
          "array":ranked,
      };
      mainobj[key] = allobj;
    }
    
  }
  
  allparamsforjson["config"] = 
  {
    "target_type": target_type,
  };
  allparamsforjson["target"] = targetonlyattrobj;
  
  console.log(allparamsforjson,mainobj,allobj);
  let ajaxdata = new FormData();
  ajaxdata.append("config",JSON.stringify(allparamsforjson));
  if (target_type == "single") {
    ajaxdata.append("params",JSON.stringify(allobj));
  }
  if (target_type == "multi") {
    ajaxdata.append("params",JSON.stringify(mainobj));
  }
  $.ajax({
    type: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    url: path,
    data: ajaxdata,
    processData : false,
    contentType  : false,
    success: (data)=>{
      console.log("Response:",data);
      if (data.success) {
        console.log("Successfuly create new project .. ",project_title);
      }
    }
  }); 
}

function getprojectinfo(token,user,project_id,project_page) {
  // body...
  console.log("Calling get project info for ",project_page);
  
  switch(project_page) {
    case "home":
      $.ajax({
        url: centrica_domain+'/api/getprojectinfos/'+project_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
          if (response.success) {
            // console.log("Project responses: ",method);
            console.log(response.data);
            showprojectviewhome(response.data);
            $(".content-viewbar-projectview").show();
            $(".content-viewbar").show();

          }  
          
        },
        error: function(error) {
          
          localStorage.removeItem('application_auth_token');
          localStorage.removeItem('application_auth_expiry');
          $('#aisaraauthenticated').hide();
          initializing_guest_ui();
          $('#aisaraguestt').show();
            // alert(xhr.responseText);
        }
      });
        
      break;
    case "blindtest":
    case "3d":
      $.ajax({
        url: centrica_domain+'/api/getprojectoutcome/'+project_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
          if (response.success) {
            window.preloadwindowtarget = response.target_type;
            window.preloadwindowdata_ = {};
            let i = 0 ;
            if (window.preloadwindowtarget == "single") {
                console.log("Writing for target ",i,response.var['z'][1]);
                if (i == 0) {window.target_name = response.var['z'][1]}
                window.preloadwindowdata_[i] = [];
                window.preloadwindowdata_[i].preloadwindowdata_targetname = window.target_name;
                window.preloadwindowdata_[i].preloadwindowdata_blocksize = response.blocksize;
                window.preloadwindowdata_[i].preloadwindowdata_filteredvarlist = response.filteredvarlist;
                window.preloadwindowdata_[i].preloadwindowdata_project = response.project;
                window.preloadwindowdata_[i].preloadwindowdata_var = response.var;
                window.preloadwindowdata_[i].preloadwindowdata_varlist = response.varlist;
                
            }else{
              for (var key in response.result) {
                console.log("Writing for target ",i,response.result[key]);
                if (i == 0) {window.target_name = key}
                window.preloadwindowdata_[i] = [];
                window.preloadwindowdata_[i].preloadwindowdata_targetname = response.result[key].target_name;
                window.preloadwindowdata_[i].preloadwindowdata_blocksize = response.result[key].blocksize;
                window.preloadwindowdata_[i].preloadwindowdata_filteredvarlist = response.result[key].filteredvarlist;
                window.preloadwindowdata_[i].preloadwindowdata_project = response.result[key].project;
                window.preloadwindowdata_[i].preloadwindowdata_var = response.result[key].var;
                window.preloadwindowdata_[i].preloadwindowdata_varlist = response.result[key].varlist;
                i++;
              }
            }
            console.log("Project responses: ",project_page,response.target_type);
            // for (const [var_key] in response.varlist) {
            //   let thesliderlabel = {[response.varlist[var_key]["name"]] : "lol"} ;
            //   console.log(thesliderlabel);
            // }
            // console.log(response.blocksize["Y"]);
            // console.log(response.varlist);
            // console.log(response.var['x'][0]);
            console.log("Setting DOM for slider");
            
            createsliderondom();
            console.log("Showing project info for : ",project_page);
            if (project_page == "3d") {
              $(".explorer-sidebar-right.explorer-sidebar-right-3dtoolkit").show();
              showprojectview3d(window.preloadwindowdata_[target_num].preloadwindowdata_project);  
            }else{
              showprojectviewblindtest(window.preloadwindowdata_[target_num].preloadwindowdata_project);
            }
            
            $(".content-viewbar-chartview").show();
            $(".content-viewbar").show();
            // showprojectviewhome(response.data);
            // $(".content-viewbar").show();
          }  
          
        },
        error: function(error) {
          
          localStorage.removeItem('application_auth_token');
          localStorage.removeItem('application_auth_expiry');
          $('#aisaraauthenticated').hide();
          initializing_guest_ui();
          $('#aisaraguestt').show();
            // alert(xhr.responseText);
        }
      });
      break;
    case "query":
      $.ajax({
        url: centrica_domain+'/api/getprojectoutcome/'+project_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
          if (response.success) {
            window.preloadwindowtarget = response.target_type;
            window.preloadwindowdata_ = {};
            let i = 0 ;
            if (window.preloadwindowtarget == "single") {
              
                console.log("Writing for target ",i,response);
                if (i == 0) {window.target_name = response.var['z'][1]}
                window.preloadwindowdata_[i] = [];
                window.preloadwindowdata_[i].preloadwindowdata_targetname = window.target_name;
                window.preloadwindowdata_[i].preloadwindowdata_blocksize = response.blocksize;
                window.preloadwindowdata_[i].preloadwindowdata_filteredvarlist = response.filteredvarlist;
                window.preloadwindowdata_[i].preloadwindowdata_project = response.project;
                window.preloadwindowdata_[i].preloadwindowdata_var = response.var;
                window.preloadwindowdata_[i].preloadwindowdata_varlist = response.varlist;
                
            }else{

              for (var key in response.result) {
                console.log("Writing for target ",i,response.result[key]);
                if (i == 0) {window.target_name = key}
                window.preloadwindowdata_[i] = [];
                window.preloadwindowdata_[i].preloadwindowdata_targetname = response.result[key].target_name;
                window.preloadwindowdata_[i].preloadwindowdata_blocksize = response.result[key].blocksize;
                window.preloadwindowdata_[i].preloadwindowdata_filteredvarlist = response.result[key].filteredvarlist;
                window.preloadwindowdata_[i].preloadwindowdata_project = response.result[key].project;
                window.preloadwindowdata_[i].preloadwindowdata_var = response.result[key].var;
                window.preloadwindowdata_[i].preloadwindowdata_varlist = response.result[key].varlist;
                i++;
              }

            }
            console.log("Project responses: ",project_page, _.size(response.result), window.preloadwindowtarget);
            console.log("initializing target");
            window.target_num = 0;
            console.log("Target Num: ", window.target_num, window.target_name);
            queryswitchtab("single");
          }  
          
        },
        error: function(error) {
          
          localStorage.removeItem('application_auth_token');
          localStorage.removeItem('application_auth_expiry');
          $('#aisaraauthenticated').hide();
          initializing_guest_ui();
          $('#aisaraguestt').show();
            // alert(xhr.responseText);
        }
      });
      break;
    default:
      // code block
  }
}

// api for chart
function processdataajax(datamethod,project_id,plugin_id) {
  if (preloadwindowtarget == "multi") {
    switch(datamethod) {
      case "actual":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/actual_inbins",
          dataType: "text",
          success: (data)=> {processDataactual(JSON.parse(data).data[target_name]);dataloaded++;handleChange();}//
        });
      break;
      case "validation":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/validation_inbins",
          dataType: "text",
          success: (data)=> {processDatavalidation(JSON.parse(data).data[target_name]);dataloaded++;handleChange();}//
        });
      break;
      case "blindtest":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/bs",
          dataType: "text",
          success: (data)=> {jsonrespond = JSON.parse(data);craftthegraphbt(jsonrespond.data[target_name],0,0);$('#exportvalidationbutton').show();}//
        });
      break;
    }
  }else{
    switch(datamethod) {
      case "actual":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/actual_inbins",
          dataType: "text",
          success: (data)=> {processDataactual(JSON.parse(data).data);dataloaded++;handleChange();}//
        });
      break;
      case "validation":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/validation_inbins",
          dataType: "text",
          success: (data)=> {processDatavalidation(JSON.parse(data).data);dataloaded++;handleChange();}//
        });
      break;
      case "blindtest":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/bs",
          dataType: "text",
          success: (data)=> {jsonrespond = JSON.parse(data);craftthegraphbt(jsonrespond.data,0,0);$('#exportvalidationbutton').show();}//
        });
      break;
    }
  }

}
function processdataajaxquery(datamethod,project_id,plugin_id) {
  console.log("preprocessed data", target_name);
  if (preloadwindowtarget == "multi") {
    switch(datamethod) {
      case "actual":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/actual_inbins",
          dataType: "text",
          success: (data)=> {processDataactual(JSON.parse(data).data[target_name]);dataloaded++;}//
        });
      break;
      case "validation":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/validation_inbins",
          dataType: "text",
          success: (data)=> {processDatavalidation(JSON.parse(data).data[target_name]);dataloaded++;}//
        });
      break;
    }
  }else{
    switch(datamethod) {
      case "actual":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/actual_inbins",
          dataType: "text",
          success: (data)=> {processDataactual(JSON.parse(data).data);dataloaded++;}//
        });
      break;
      case "validation":
        $.ajax({
          type: "GET",
          url: centrica_domain+"/api/getprojectfiles/"+project_id+"/"+plugin_id+"/validation_inbins",
          dataType: "text",
          success: (data)=> {processDatavalidation(JSON.parse(data).data);dataloaded++;}//
        });
      break;
    }
  }

}

const interpoldemand = (projectid,xloc,yloc,param) => {
  console.log("dataset to flask",projectid,xloc,yloc,param);
  let ajaxdata = new FormData();
  ajaxdata.append('project_id',projectid);
  ajaxdata.append('xloc',xloc);
  ajaxdata.append('yloc',yloc);
  ajaxdata.append('sliderkey',JSON.stringify(param));
  ajaxdata.append('api_token','0134494290');
  $.ajax({
      type: 'POST',
      headers: {
        'Access-Control-Allow-Origin': "https://dev.aisara.ai",
        // 'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        // 'Access-Control-Allow-Headers': "Origin, Content-Type, X-CSRF-TOKEN",
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
      url: sara_domain+'/api/aisara/interpolate',
      data: ajaxdata,
      processData : false,
      contentType  : false,
      success: (data)=>{
        console.log(data);
        if (preloadwindowtarget == "multi") {
          opacityactual = data[target_num].opacity;
          opacityvalidation = data[target_num].opacity_validation;
          graphusedparam[0] = preprocessdata(data[target_num].predinbins);
          graphusedparam[1] = param;
          graphusedparam[2] = data[target_num].impacts[0][0];
          craftthegraph(graphusedparam[0],graphusedparam[1],graphusedparam[2],"all");
          updateimpactonslider(data[target_num].impacts);
          // updateresultfromslider(param,data.impacts[0][0]);
          // console.log(opacityactual);
        }else{
          opacityactual = data.opacity;
          opacityvalidation = data.opacity_validation;
          graphusedparam[0] = preprocessdata(data.predinbins);
          graphusedparam[1] = param;
          graphusedparam[2] = data.impacts[0][0];
          craftthegraph(graphusedparam[0],graphusedparam[1],graphusedparam[2],"all");
          updateimpactonslider(data.impacts);
          // updateresultfromslider(param,data.impacts[0][0]);
          // console.log(opacityactual);
          
        }
      }
  });
}
const querydemand = (projectid,xloc,yloc,param) => {
  console.log("dataset to flask",projectid,xloc,yloc,param);
  let ajaxdata = new FormData();
  ajaxdata.append('project_id',projectid);
  ajaxdata.append('xloc',xloc);
  ajaxdata.append('yloc',yloc);
  ajaxdata.append('sliderkey',JSON.stringify(param));
  ajaxdata.append('api_token','0134494290');
  $.ajax({
      type: 'POST',
      headers: {
            'Access-Control-Allow-Origin': "https://dev.aisara.ai",
        //      'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //      'Access-Control-Allow-Headers': "Origin, Content-Type, X-CSRF-TOKEN",
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
      url: sara_domain+'/api/aisara/interpolate',
      data: ajaxdata,
      processData : false,
      contentType  : false,
      success: (data)=>{
        if (preloadwindowtarget == "multi") {
          console.log("done query");
          console.log(data[target_num].impacts[0][0],param[0]);
          console.log("done query all data");
          console.log(data[target_num]);
          querytableoutput.push(data[target_num].impacts[0][0]);
          querytableparams.push(param[0]);
          writequerydatatodom();
        }else{
          console.log("done query");
          console.log(data.impacts[0][0],param[0]);
          console.log("done query all data");
          console.log(data);
          querytableoutput.push(data.impacts[0][0]);
          querytableparams.push(param[0]);
          writequerydatatodom();
        }
          // opacityactual = data.opacity;
          // opacityvalidation = data.opacity_validation;
          // graphusedparam[0] = preprocessdata(data.predinbins);
          // graphusedparam[1] = param;
          // graphusedparam[2] = data.impacts[0][0];
          // craftthegraph(graphusedparam[0],graphusedparam[1],graphusedparam[2],"all");
          // updateimpactonslider(data.impacts);
          // updateresultfromslider(param,data.impacts[0][0]);
          // console.log(opacityactual);
      }
  });
}

// END OF API LIST