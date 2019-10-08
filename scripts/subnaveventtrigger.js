$(".sub-nav-item-btn-newdataset").click(function () {
  window.buttontriggered = "sub-nav-item-btn-newdataset";
  console.log("Checking buttontriggered ... ", window.buttontriggered);
  console.log("Checking current view ... ", window.currentview);
  console.log("creating new dataset" );
  $('#new_dataset_modal').modal('toggle');
});
$(".sub-nav-item-btn-dataset").click(function () {
  window.buttontriggered = "sub-nav-item-btn-dataset";
  console.log("Checking buttontriggered ... ", window.buttontriggered);
  window.currentview = "AllDatasheetview";
  console.log("Checking current view ... ", window.currentview);
  console.log("Showing all datasets" );
  initializing_inapp_ui();
  $('.explorer-sidebar-right').hide();
  refresh_explorer("bylistall");
});
$(".sub-nav-item-btn-blindtest").click(function () {
  window.buttontriggered = "sub-nav-item-btn-blindtest";
  console.log("Checking buttontriggered ... ", window.buttontriggered);
  console.log("Checking current view ... ", window.currentview);
  console.log("Showing blindtest Project", $("#content-viewbar-viewitem").val());
  if (window.currentview == "Projectview") {
    $(".content-viewbar").hide();
    $(".content-viewbar-item").hide();
    $(".explorer-sidebar-right").hide();
    getprojectinfo(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$("#content-viewbar-viewitem").val(),"blindtest");
    // getprojectinfo(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$("#content-viewbar-viewitem").val(),"3d")
  }else{
    alert("Not in project view");
  }
});
$(".sub-nav-item-btn-query").click(function () {
  window.buttontriggered = "sub-nav-item-btn-query";
  console.log("Checking buttontriggered ... ", window.buttontriggered);
  console.log("Checking current view ... ", window.currentview);
  console.log("Showing Query Project", $("#content-viewbar-viewitem").val());
  if (window.currentview == "Projectview") {
    $(".content-viewbar").hide();
    $(".content-viewbar-item").hide();
    $(".explorer-sidebar-right").hide();
    getprojectinfo(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$("#content-viewbar-viewitem").val(),"query");
    // getprojectinfo(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$("#content-viewbar-viewitem").val(),"3d")
  }else{
    alert("Not in project view");
  }
});
$(".sub-nav-item-btn-3d").click(function () {
  window.target_num = 0;
  window.buttontriggered = "sub-nav-item-btn-3d";
	chart3dbtntrigger();
});

function chart3dbtntrigger() {
  console.log("Checking buttontriggered ... ", window.buttontriggered);
  console.log("Checking current view ... ", window.currentview);
  console.log("Showing 3d Project", $("#content-viewbar-viewitem").val());
  if (window.currentview == "Projectview") {
    $(".content-viewbar").hide();
    $(".content-viewbar-item").hide();
    $(".explorer-sidebar-right").hide();
    getprojectinfo(localStorage.getItem('application_auth_token'),localStorage.getItem('application_auth_email'),$("#content-viewbar-viewitem").val(),"3d");
  }else{
    alert("Not in project view");
  }
}

