
$(".side-nav-content-data-div").on("click", ".explore-data-content",function() {
  $(".explore-data-content").removeClass("selected");
  $( this ).addClass("selected");
  console.log("selecting dom");
  // adjust ui
});
// APPICALTION EVENTS

// onclick dataset
$(".side-nav-content-data-div").on("click",".datasheetlist_item",function () {
  console.log("Selecting Dataset:",$(this).data("datasheetlist_itemid"));
  window.currentview = "Datasheetview";
  $("#newproject_datasheetid").val($(this).data("datasheetlist_itemid"));
  if($("#datasheetlist_dataid"+$(this).data("datasheetlist_itemid")).hasClass( "az-chevron-right" )){
    console.log("Expand");
    getprojectlist(localStorage.getItem('application_auth_token'),$(this).data("datasheetlist_itemid"),"listall");

    // enable contentviewbar for datapreview
    loaddatapreview(localStorage.getItem('application_auth_token'),$(this).data("datasheetlist_itemid"),1,localStorage.getItem('application_auth_email'));
    
    $(".explorer-sidebar-right").hide();
    // show visible
    $(".content-viewbar").show();
    $(".explorer-sidebar-right.explorer-sidebar-right-maintoolkit").show();
    $("#datasheetlist_dataid"+$(this).data("datasheetlist_itemid")).removeClass( "az-chevron-right" ).addClass( "az-chevron-down" );
  }else{
    console.log("Collapse");
    $(".projectchildfor"+$(this).data("datasheetlist_itemid")).remove();
    $("#datasheetlist_dataid"+$(this).data("datasheetlist_itemid")).removeClass( "az-chevron-down" ).addClass( "az-chevron-right" );
  }
  console.log($(this).data("datasheetlist_itemid"));
});

// onclick project
$(".side-nav-content-data-div").on("click",".projectlist_item",function () {
  console.log("Selecting Project:",$(this).data("projectlist_itemid"));
  window.currentview = "Projectview";
  $("#content-viewbar-viewtype").val(window.currentview);
  $("#content-viewbar-viewitem").val($(this).data("projectlist_itemid"));
  $(".content-viewbar").hide();
  $(".content-viewbar-item").hide();
  $(".explorer-sidebar-right").hide();
  initializing_inapp_ui_viewbar_content();
  getprojectinfo(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$(this).data("projectlist_itemid"),"home")
});
