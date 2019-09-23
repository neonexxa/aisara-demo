window.$ = window.jQuery = require('jquery'); // not sure if you need this at all
// require('jquery-ui-dist/jquery-ui');
window.Bootstrap = require('bootstrap');
require('rangeslider.js');
window.currentview = "Homeview";
window.system_page_height = parseInt($('body').height(), 10);
window.system_page_width = parseInt($('body').width(), 10);
// auth initiator
$(document).ready(function(){
  
  $('#aisaraguestt').hide();
  $('#aisaraauthenticated').hide();
  console.log("Initialising App Height,Width: ",system_page_height,system_page_width);
  if (localStorage.getItem('application_auth_token')) {
    // console.log(localStorage.getItem('application_auth')['access_token'],localStorage.getItem('application_auth').access_token);
    authenticate_user(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_expiry'));  
    // loaddatapreview(localStorage.getItem('application_auth_token'),99);
  }else{
    $('#aisaraauthenticated').hide();
    initializing_guest_ui();
    $('#aisaraguestt').show();
  }

})

// generic function
$( window ).resize(function() {
  
  console.log("Resizing DOM");
  window.system_page_height = parseInt($('body').height(), 10);
  window.system_page_width = parseInt($('body').width(), 10); 
  console.log("Re-Initialising App Height,Width: ",system_page_height,system_page_width);
  initializing_inapp_ui();
});

// 

// auth login
$("#login-form").on('submit',function(e){
  e.preventDefault();
  $.post($(this).attr('action'),{email:$("#exampleInputEmail1").val(),password:$("#exampleInputPassword1").val()},function(response){
    console.log(response);
    if (response.access_token) {
      localStorage.setItem('application_auth_token', response.access_token);
      localStorage.setItem('application_auth_expiry', response.expires_at);
      localStorage.setItem('application_auth_email', response.user_email);
      authenticate_user(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_expiry'));  
    }
  })
});

// new dataset button

$("#projectnew_btnstartproject").click(function () {
  console.log("Initiate creating new project from datasheet:",$("#newproject_datasheetid").val());
  createnewproject(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$("#newproject_datasheetid").val(),1,$("#newproject_projectname").val(),"null");
});


// upload dataset
$( ".file-upload-btn-local" ).change((e)=>{
	if(!e.target.files || !window.FileReader) return;
	var files = e.target.files;
	// add_files_to_list(files,'computer');
	$('#uploadtype').val('local');
});

// form submit
$( "#formnewsheet" ).submit(function( event ) {
    console.log("Uploading Dataset (method):",$('#uploadtype').val())
    event.preventDefault();
    $('#new_datasheet_upload_button').text('Uploading...');
    let ajaxdata = new FormData();
    let token = localStorage.getItem('application_auth_token');
    ajaxdata.append("source",$('#uploadtype').val());
    switch($('#uploadtype').val()) {
      case 'localdrop':
        console.log(dropedfiles[0]);
        ajaxdata.append('sheet', dropedfiles[0]);
        $.ajax({
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          url: 'http://localhost:8000/mydb/datasheet/1',
          data: ajaxdata,
          processData : false,
          contentType  : false,
          success: (data)=>{
            console.log("Response:",data);
            if (data.success) {
              console.log("Successfuly upload data .. ");
              $('#new_dataset_modal').modal('toggle');
              refresh_explorer(globalmodecontent);
            }
            
            
            // window.location.replace("/mydb/databook/"+data.databook.id+"/datasheet/"+data.datasheet.id+"/"+{{$plugin->id}}+"/project/create");
          }
        });
        break;
      case 'local':
        ajaxdata.append('sheet', $('.file-upload-btn-local')[0].files[0]);
        $.ajax({
          type: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          url: 'http://localhost:8000/mydb/datasheet/1',
          data: ajaxdata,
          processData : false,
          contentType  : false,
          success: (data)=>{
            console.log("Response:",data);
            if (data.success) {
              console.log("Successfuly upload data .. ");
              $('#new_dataset_modal').modal('toggle');
              refresh_explorer(globalmodecontent);
            }
            // window.location.replace("/mydb/databook/"+data.databook.id+"/datasheet/"+data.datasheet.id+"/"+{{$plugin->id}}+"/project/create");
          }
        }); 
        break;

      default:
          
    }
    
    
  });