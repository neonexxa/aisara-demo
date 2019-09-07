// UI SETTINGS
function initializing_guest_ui(){

}
function initializing_inapp_ui(){
  console.log("in app current view : ",window.currentview);
  var system_topnav_height = parseInt($('.main-nav-tab').height(), 10);
  var system_subnav_height = parseInt($('.sub-nav-tab').height(), 10);
  console.log("Initialising Nav Height (top,sub) : ",system_topnav_height,system_subnav_height);
  $('.explorer-sidebar').hide();
  if (window.currentview == "Homeview") {
    console.log("show home");
    $('.home-viewbar').show();  
  }else{
    console.log("hide home");
    $('.home-viewbar').hide();
  }
  
  if (window.currentview == "AllDatasheetview") {
    $('.explorer-sidebar-left').show();
    $(".explorer-sidebar").css("height",(index)=>{
      index = (system_page_height-system_topnav_height-system_subnav_height);
      return index;
    });
    var system_leftsidebar_height = parseInt($('.explorer-sidebar').height(), 10);
    var system_leftsidebar_height_out = parseInt($('.explorer-sidebar').outerHeight(), 10);
    var system_leftsidebar_width = parseInt($('.explorer-sidebar').width(), 10);
    var system_leftsidebar_width_out = parseInt($('.explorer-sidebar').outerWidth(), 10);

    
    console.log("Initialising Left,Right Sidebar (Height) : ",system_leftsidebar_height, system_leftsidebar_height_out);
    console.log("Initialising Left,Right Sidebar (Width) : ",system_leftsidebar_width, system_leftsidebar_width_out);
    $(".content-viewbar").css("width",(index)=>{
      index = (system_page_width-system_leftsidebar_width_out*2);
      return index;
    });
    $(".content-viewbar").css("height",(index)=>{
      index = system_leftsidebar_height_out;
      return index;
    });
    var system_contentviewbar_width = parseInt($('.content-viewbar').width(), 10);
    console.log("Initialising Content Viewbar Sidebar (Width) : ",system_contentviewbar_width);
    initializing_inapp_ui_viewbar_content();
  }
  
  
}

function initializing_inapp_ui_viewbar_content() {
  // body...
  console.log("Viewbar Content: ",window.currentview);
  if (window.currentview == "AllDatasheetview") {

  }
  if (window.currentview == "Datasheetview") {
    resize_table_for_content_view_datasheet();
  }
  if (window.currentview == "Projectview") {
    resize_table_for_content_view_project();
  }
}

function initialising_inapp_ui_sidebar_content(items,method){
  console.log(globalmodecontent,method, items);
  switch(globalmodecontent){
    case 'bytimeline':
      switch(method){
        case 'passmonth':
          // write to passmonth dom
        break;
        default:
      }
    break;
    case 'bylistall':
      // write to passmonth dom
      let datasheetexplorerdom = '';
      items.forEach(function(item) {
        datasheetexplorerdom += '<div class="col-md-12 explore-data-content datasheetlist_item datasheetlist_eachitem'+item.id+'" data-datasheetlist_itemid="'+item.id+'">';
        datasheetexplorerdom += '<span class="side-nav-content-font"><i class="az-chevron-right" id="datasheetlist_dataid'+item.id+'"></i> <i class="az-file-text-o"></i>&nbsp;&nbsp;'+item.name+'</span>';
        datasheetexplorerdom += '</div>';
      });
      
      $(".side-nav-content-data-div").html(datasheetexplorerdom);
    break;
    default:

  }
}
function initialising_inapp_ui_sidebar_datasheet_content(items,datasheetid,method) {
   // body...
   console.log(globalmodecontent,method, items);
  switch(globalmodecontent){
    case 'bytimeline':
      switch(method){
        case 'passmonth':
          // write to passmonth dom
        break;
        default:
      }
    break;
    case 'bylistall':
      // write to passmonth dom
      let projectexplorerdom = '';
      items.forEach(function(item) {
        projectexplorerdom += '<div class="col-md-12 explore-data-content projectchildfor'+datasheetid+' projectlist_item projectlist_eachitem'+item.id+'" data-projectlist_itemid="'+item.id+'">';
        projectexplorerdom += '<span class="side-nav-content-font"><i class="az-flask"></i>&nbsp;&nbsp;'+item.title+'</span>';
        projectexplorerdom += '</div>';
      });
      
      $(".datasheetlist_eachitem"+datasheetid).after(projectexplorerdom);
    break;
    default:

  }
}