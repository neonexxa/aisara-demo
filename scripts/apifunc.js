// API LIST
function authenticate_user(token,expiry_at){

	$.ajax({
	    url: 'http://localhost:8000/api/auth/user',
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
      url: 'http://localhost:8000/api/getdatasheetallcustom/'+method,
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
      url: 'http://localhost:8000/api/desktopapi/datasheet/'+datasetid+'/getdatasheetprojectallcustom/'+method,
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
    url: 'http://localhost:8000/api/desktopapi/datasheet/'+datasetid+'/plugin/'+pluginid+'/user/'+user+'/apipreviewdatasheet',
    
    success: (data)=>{
      console.log("Successfuly Fetch Dataset .. ");
      $("#newproject_datasheetid").val(datasetid); 
      writepreviewdatatodom(data);// window.location.replace("/mydb/databook/"+data.databook.id+"/datasheet/"+data.datasheet.id+"/"+{{$plugin->id}}+"/project/create");
    }
  }); 
}

function createnewproject(token,user,projectnew_dataid,projectnew_pluginid,project_title,params) {
  // body...
  console.log("User: ",user);
  let path = 'http://localhost:8000/api/desktopapi/datasheet/'+projectnew_dataid+'/plugin/'+projectnew_pluginid+'/user/'+user+'/apinewporject/new/'+project_title;
  console.log("Path",path);
  let ajaxdata = new FormData();
  ajaxdata.append("params",'{"project_profile":{"name":"azrycube","split":"50","split_type":"random","round_type":"up"},"params":{"ObjFunc":{"usable":"true","min":"1.958854897","max":"16.02620789","binsize":"10","datatype":"continuous","columntype":"target"},"Para1":{"usable":"true","min":"1","max":"10","binsize":"10","datatype":"categorical","columntype":"variable"},"Para2":{"usable":"true","min":"1","max":"10","binsize":"10","datatype":"categorical","columntype":"variable"},"Para3":{"usable":"true","min":"1","max":"10","binsize":"10","datatype":"categorical","columntype":"variable"}},"ranking":{"type":"default","array":["ObjFunc","Para1","Para2","Para3"]}}');
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
        // refresh_explorer(globalmodecontent);
        // run function show project
      }
      // window.location.replace("/mydb/databook/"+data.databook.id+"/datasheet/"+data.datasheet.id+"/"+{{$plugin->id}}+"/project/create");
    }
  }); 
}

function getprojectinfo(token,user,project_id,project_page) {
  // body...
  
  
  switch(project_page) {
    case "home":
      $.ajax({
        url: 'http://localhost:8000/api/getprojectinfos/'+project_id,
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
        url: 'http://localhost:8000/api/getprojectoutcome/'+project_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
          if (response.success) {
            window.preloadwindowdata_blocksize = response.blocksize;
            window.preloadwindowdata_filteredvarlist = response.filteredvarlist;
            window.preloadwindowdata_project = response.project;
            window.preloadwindowdata_success = response.success;
            window.preloadwindowdata_var = response.var;
            window.preloadwindowdata_varlist = response.varlist;
            console.log("Project responses: ",project_page);
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
              showprojectview3d(preloadwindowdata_project);  
            }else{
              showprojectviewblindtest(preloadwindowdata_project);
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
        url: 'http://localhost:8000/api/getprojectoutcome/'+project_id,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
          if (response.success) {
            window.preloadwindowdata_blocksize = response.blocksize;
            window.preloadwindowdata_filteredvarlist = response.filteredvarlist;
            window.preloadwindowdata_project = response.project;
            window.preloadwindowdata_success = response.success;
            window.preloadwindowdata_var = response.var;
            window.preloadwindowdata_varlist = response.varlist;
            console.log("Project responses: ",project_page);
            
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
  
  switch(datamethod) {
    case "actual":
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getprojectfiles/"+project_id+"/"+plugin_id+"/actual_inbins",
        dataType: "text",
        success: (data)=> {processDataactual(JSON.parse(data).data);dataloaded++;handleChange();}//
      });
    break;
    case "validation":
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getprojectfiles/"+project_id+"/"+plugin_id+"/validation_inbins",
        dataType: "text",
        success: (data)=> {processDatavalidation(JSON.parse(data).data);dataloaded++;handleChange();}//
      });
    break;
    case "blindtest":
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getprojectfiles/"+project_id+"/"+plugin_id+"/bs",
        dataType: "text",
        success: (data)=> {jsonrespond = JSON.parse(data);craftthegraphbt(jsonrespond.data,0,0);$('#exportvalidationbutton').show();}//
      });
    break;
  }

}
function processdataajaxquery(datamethod,project_id,plugin_id) {
  
  switch(datamethod) {
    case "actual":
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getprojectfiles/"+project_id+"/"+plugin_id+"/actual_inbins",
        dataType: "text",
        success: (data)=> {processDataactual(JSON.parse(data).data);dataloaded++;}//
      });
    break;
    case "validation":
      $.ajax({
        type: "GET",
        url: "http://localhost:8000/api/getprojectfiles/"+project_id+"/"+plugin_id+"/validation_inbins",
        dataType: "text",
        success: (data)=> {processDatavalidation(JSON.parse(data).data);dataloaded++;}//
      });
    break;
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
        //      'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //      'Access-Control-Allow-Headers': "Origin, Content-Type, X-CSRF-TOKEN",
              'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
      url: 'http://localhost:5000/api/aisara/interpolate',
      data: ajaxdata,
      processData : false,
      contentType  : false,
      success: (data)=>{
        console.log(data);
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
      url: 'http://localhost:5000/api/aisara/interpolate',
      data: ajaxdata,
      processData : false,
      contentType  : false,
      success: (data)=>{
        console.log("done query");
        console.log(data.impacts[0][0],param[0]);
        console.log("done query all data");
        console.log(data);
        querytableoutput.push(data.impacts[0][0]);
        querytableparams.push(param[0]);
        writequerydatatodom();
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