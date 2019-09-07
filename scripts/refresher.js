function refresh_explorer(modecontent){
  window.globalmodecontent = modecontent;
  // setting mode content / vier type here
  console.log("Mode Content:",modecontent);
  console.log("Re-Fetching Database");
  switch(modecontent) {
    case 'bytimeline':
      console.log("Initialising Left Sidebar (ModeContent) : ",modecontent);
      // preparing dom of this modecontent

      // get all dataset here
      getdatasetlist(localStorage.getItem('application_auth_token'),"pass24hour");
      getdatasetlist(localStorage.getItem('application_auth_token'),"passmonth"); 
      getdatasetlist(localStorage.getItem('application_auth_token'),"passweek"); 
      getdatasetlist(localStorage.getItem('application_auth_token'),"passyear");  
    break;
    case 'bylistall':
      console.log("Initialising Left Sidebar (ModeContent) : ",modecontent);
      // preparing dom of this modecontent
      
      // get all dataset here
      getdatasetlist(localStorage.getItem('application_auth_token'),"listall");
    break;
    default:

  }
  
}

function subnavbtndisabler() {
  // $(".sub-nav-item-btn");
}