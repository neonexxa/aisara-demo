
function writepreviewdatatodom(previewresponse) {
  // body...
  let headdata = JSON.parse(previewresponse['preview_head']);
  let tablepreviewdatadom = '';
  tablepreviewdatadom += '<div class="grid-container"><div class="grid">';
  tablepreviewdatadom += '<div class="grid-col grid-col--fixed-left">';
  // console.log(headdata);
  for (var i = 0 ; i < _.size(headdata[Object.keys(headdata)[0]]); i++) {
    if (i == 0) {
      tablepreviewdatadom += '<div class="grid-item grid-item--header">';
      tablepreviewdatadom += '<p></p>';
      tablepreviewdatadom += '</div>';
    }else{
      tablepreviewdatadom += '<div class="grid-item">';
        tablepreviewdatadom += '<p></p>';
      tablepreviewdatadom += '</div>';
    }

  }  
  tablepreviewdatadom += '</div>';
  // bukan first dom
  let objlength = 0;
  for (const [key, value] of Object.entries(headdata)) {
    if (objlength != Object.entries(headdata).length - 1) {
      tablepreviewdatadom += '<div class="grid-col">';
      for (var i = 0 ; i < _.size(headdata[Object.keys(headdata)[0]]); i++) {
        if (i == 0) {
          tablepreviewdatadom += '<div class="grid-item grid-item--header">';
          tablepreviewdatadom += '<p>'+key+'</p>';
          tablepreviewdatadom += '</div>';
        }else{
          tablepreviewdatadom += '<div class="grid-item">';
          tablepreviewdatadom += '<p>'+value[i]+'</p>';
          tablepreviewdatadom += '</div>';
        }
                  
          // trs_head += '<td>'+value[i]+'</td>';
        // console.log(key, value, i);
      }
      tablepreviewdatadom += '</div>';
    }else{
      tablepreviewdatadom += '<div class="grid-col grid-col--fixed-right">';
      for (var i = 0 ; i < _.size(headdata[Object.keys(headdata)[0]]); i++) {
        if (i == 0) {
          tablepreviewdatadom += '<div class="grid-item grid-item--header">';
          tablepreviewdatadom += '<p>'+key+'</p>';
          tablepreviewdatadom += '</div>';
        }else{
          tablepreviewdatadom += '<div class="grid-item">';
          tablepreviewdatadom += '<p>'+value[i]+'</p>';
          tablepreviewdatadom += '</div>';
        }
        // console.log(key, value, i);
      }
      tablepreviewdatadom += '</div>';
    }
    objlength ++;
  }
  tablepreviewdatadom += '</div></div>';
  $("#content_view_bar_table").html(tablepreviewdatadom);
  // previewresponse
}
function writepreviewdatasettingtodom(data,target_type) {
  // body...
  console.log("preview data");
  console.log(data);
  // table cleaning
  $(".previewtable_usable_row").empty();
  $(".previewtable_header_row").empty();
  $(".previewtable_min_row").empty();
  $(".previewtable_max_row").empty();
  $(".previewtable_binsize_row").empty();
  $(".previewtable_datatype_row").empty();
  $(".previewtable_select_target_row").empty();

  // begining table construction
  // declaration
  let td_select_target_row          = '';
  let td_usable_row                 = '';
  let td_header_row                 = '';
  let td_min_row                    = '';
  let td_max_row                    = '';
  let td_binsize_row                = '';
  let td_datatype_row               = '';
  let datatypeopt                   = ['continuous','categorical'];
  let customstyle_start             = 'style="';
  let label_bg_color                = 'background-color: #C5C5C5;';
  let label_padding                 = 'padding: 5px;';
  let customstyle_end               = '"';
  
  // constuction
  td_select_target_row    += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Select Your Target</td>';
  td_usable_row           += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Use</td> ';
  td_header_row           += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Variable</td>';
  td_min_row              += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Minimum</td> ';
  td_max_row              += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Maximum</td> ';
  td_binsize_row          += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Bin Size</td> ';
  td_datatype_row         += '<td '+customstyle_start+label_bg_color+label_padding+customstyle_end+'>Data Type</td> ';

  // fill in the blanks
  for (var i = 0 ; i < data['binsize'].length; i++) {
    //   // check if var is target or not
      let target_bg_color = '';
      let target_checked = '';
      if (data['columntype'][i] == "target") {
        target_bg_color = 'background-color: whitesmoke;';
        target_checked = 'checked';

      }

      if (data['usable']) {
          optcheck = (data['usable'][i] || data['usable'][i] == 'true')? 'checked' :'';    
      }else{
          optcheck = '';
      }
      td_usable_row       += '<td class="var_col col_params_'+i+'"><input type="checkbox" id="usecheck'+i+'" '+optcheck+'></td>';
      td_header_row       += '<td class="col_params_'+i+'"><strong>'+data['headername'][i]+'</strong></td>';
      td_min_row          += '<td class="var_col col_params_'+i+'" contenteditable>'+data['min'][i]+'</td>';
      td_max_row          += '<td class="var_col col_params_'+i+'" contenteditable>'+data['max'][i]+'</td>';
      td_binsize_row      += '<td class="var_col col_params_'+i+'" contenteditable>'+data['binsize'][i]+'</td>';
      td_datatype_row     += '<td class="var_col col_params_'+i+'"><select style="display: inline-block !important;">';
      for (var j = 0 ; j < datatypeopt.length; j++) {
          let optselected = (datatypeopt[j] == data['datatype'][i]) ? 'selected': '';
          td_datatype_row += '<option value="'+datatypeopt[j]+'" '+optselected+'>'+datatypeopt[j]+'</option>';
      }
      td_datatype_row     += '</select></td>';
      if (target_type == "single") {
        td_select_target_row += '<td class="var_col col_params_'+i+'"><div>';
        td_select_target_row += '<input type="radio" id="customradio_'+i+'" name="target_selected" '+target_checked+'>';
        td_select_target_row += '</div></td>';
      }
      if (target_type == "multi") {
        td_select_target_row += '<td class="var_col col_params_'+i+'"><input type="checkbox" id="customradio_'+i+'"></td>';
      }

    }
    // // add to dom
    $( ".previewtable_select_target_row" ).append( td_select_target_row );
    $( ".previewtable_usable_row" ).append( td_usable_row );
    $( ".previewtable_header_row" ).append( td_header_row );
    $( ".previewtable_min_row" ).append( td_min_row );
    $( ".previewtable_max_row" ).append( td_max_row );
    $( ".previewtable_binsize_row" ).append( td_binsize_row );
    $( ".previewtable_datatype_row" ).append( td_datatype_row );
}
function writequerydatatodom() {
  console.log("Re-Writing query result to dom");
  // console.log(querytableoutput[0]);
  // console.log(querytableparams.length);

  // css adjustment
  console.log("CSS adjustment on table");
  console.log(Object.keys(window.preloadwindowdata_[target_num].preloadwindowdata_varlist).length,parseInt($("#queryinputheader").outerWidth(), 10)/Object.keys(window.preloadwindowdata_[target_num].preloadwindowdata_varlist).length);
  let tableheightclass = "grid-container";
  if (querytableparams.length > 10) {
    tableheightclass = "grid-container-fixedheight";
  }else{
    tableheightclass = "grid-container";
  }
  

  // endcss adjustment
  let tablepreviewdatadom = '';
  tablepreviewdatadom += '<div class="'+tableheightclass+'"><div class="grid">';
  tablepreviewdatadom += '<div class="grid-col grid-col--fixed-left">';
  
    for (var i = 0 ; i < querytableparams.length+1 ; i++) {
      if (i == 0) {
        tablepreviewdatadom += '<div class="grid-item grid-item--header">';
        tablepreviewdatadom += '<p></p>';
        tablepreviewdatadom += '</div>';
      }else{
        tablepreviewdatadom += '<div class="grid-item">';
          tablepreviewdatadom += '<p>'+i+'</p>';
        tablepreviewdatadom += '</div>';
      }
    }
  tablepreviewdatadom += '</div>';
  // bukan first dom
  let objlength = 0;
  for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
    tablepreviewdatadom += '<div class="grid-col">';
    for (var i = 0 ; i < querytableparams.length+1 ; i++) {
      if (i == 0) {
        tablepreviewdatadom += '<div class="grid-item grid-item--header">';
        tablepreviewdatadom += '<p>'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'</p>';
        tablepreviewdatadom += '</div>';
      }else{
        tablepreviewdatadom += '<div class="grid-item">';
        tablepreviewdatadom += '<p>'+querytableparams[i-1][var_key-1]+'</p>';
        tablepreviewdatadom += '</div>';
      }
      // console.log(preloadwindowdata_varlist[var_key]["name"],querytableparams[i-1][var_key-1], i);
    }
    tablepreviewdatadom += '</div>';
  }
  tablepreviewdatadom += '<div class="grid-col grid-col--fixed-right">';
    for (var i = 0 ; i < querytableparams.length+1; i++) {
      if (i == 0) {
        tablepreviewdatadom += '<div class="grid-item grid-item--header">';
        tablepreviewdatadom += '<p>Result</p>';
        tablepreviewdatadom += '</div>';
      }else{
        tablepreviewdatadom += '<div class="grid-item">';
        tablepreviewdatadom += '<p>'+querytableoutput[i-1]+'</p>';
        tablepreviewdatadom += '</div>';
      }
    }
    tablepreviewdatadom += '</div>';
  tablepreviewdatadom += '</div></div>';
  $("#content_view_bar_table_query").html(tablepreviewdatadom);
  $('.grid-col').css("width",parseInt($("#queryinputheader").outerWidth(), 10)/Object.keys(window.preloadwindowdata_[target_num].preloadwindowdata_varlist).length);
  $('.grid-col--fixed-left').css("width",parseInt($("#queryinputheader").outerWidth(), 10)/70*3);
  $('.grid-col--fixed-right').css("width",parseInt($("#queryinputheader").outerWidth(), 10)/70*27);
  
}

function writetitleforcontentviewbar(argument) {
  // body...
  $("#content-viewbar-top-header-label").html(argument);
}

function createsliderondom() {
  // body...
  let sliderdom = '';
  let targetdom = '';
  console.log("Cleaning out previous slider");
  $('.predictsliderdom').empty();
  $('.predictsliderdom-query').empty();
  console.log("Target type: ",preloadwindowtarget);
  console.log("Compiling new slider");
  switch(window.buttontriggered){
    case "sub-nav-item-btn-3d":
      ix = 0;
      console.log("window.preloadwindowdata_",window.preloadwindowdata_);
      for (const [tar_name] in window.preloadwindowdata_) {
        targetstatus = (ix == target_num) ? "selected" : '';
        targetdom += '<option value="'+ix+'" '+targetstatus+'>'+window.preloadwindowdata_[ix].preloadwindowdata_targetname+'</option>';
        ix++;
      }
      $("#3d-target-select-option").html(targetdom); 
      for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
      
        sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
        sliderdom +=   '<div class="col-md-6">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'</div>';
        sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="impactlabelrangefor'+(var_key+2)+'">0%</span></div>  ';
        sliderdom +=   '<div class="col-md-12">';
        sliderdom +=    '<input ';
        sliderdom +=      'id="rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
        sliderdom +=      'data-key="'+var_key+'" ';
        sliderdom +=      'type="range" ';
        sliderdom +=      'min="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'" ';
        sliderdom +=      'max="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]+'" ';
        sliderdom +=      'step="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"]+'" ';
        sliderdom +=      'value="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'" ';
        sliderdom +=      'data-orientation="horizontal" ';
        sliderdom +=      'sliderfor="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'" ';
        sliderdom +=      'style="width: inherit;" >';
        sliderdom +=    '</div>';
        sliderdom +=  '</div>';
      }
      $('.predictsliderdom').html(sliderdom);  
    break;
    case "sub-nav-item-btn-query":
      ix = 0;
      for (const [tar_name] in window.preloadwindowdata_) {
        targetstatus = (ix == target_num) ? "selected" : '';
        targetdom += '<option value="'+ix+'" '+targetstatus+'>'+window.preloadwindowdata_[ix].preloadwindowdata_targetname+'</option>';
        ix++;
      }
      $("#query-target-select-option").html(targetdom); 
      if (window.preloadwindowtarget == "single") {
        if (window.rightnavtabquery == "single") {
          for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
            sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
            sliderdom +=   '<div class="col-md-6">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'</div>';
            sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="singlequeryval'+(var_key+2)+'">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'</span></div>  ';
            sliderdom +=   '<div class="col-md-12">';
            sliderdom +=    '<input ';
            sliderdom +=      'id="rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
            sliderdom +=      'data-key="'+var_key+'" ';
            sliderdom +=      'type="range" ';
            sliderdom +=      'min="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'" ';
            sliderdom +=      'max="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]+'" ';
            sliderdom +=      'step="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"]+'" ';
            sliderdom +=      'value="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'" ';
            sliderdom +=      'data-orientation="horizontal" ';
            sliderdom +=      'sliderfor="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'" ';
            sliderdom +=      'style="width: inherit;" >';
            sliderdom +=    '</div>';
            sliderdom +=  '</div>';
          }
          $('.predictsliderdom-query').html(sliderdom); 
           // write event trigger utk single sini
            for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
              $('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').rangeslider({
                polyfill: true,
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: 'rangeslider--vertical',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',
                // Callback function
                onInit: () => {},
                // Callback function
                onSlide: (position, value) => {},
                // Callback function
                onSlideEnd: (position, value) => {}
              }).on('change', handlesinglequeryslider);
            }
        }
        if (window.rightnavtabquery == "combo") {
          for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
            sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
            sliderdom +=   '<div class="col-md-12">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'</div>';
            // sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="impactlabelrangefor'+(var_key+2)+'">0%</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>MIN</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>X</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>MAX</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="comboqueryslidervalminfor'+(var_key+2)+'">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="whatisthis'+(var_key+2)+'">2</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="comboqueryslidervalmaxfor'+(var_key+2)+'">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]+'</span></div>  ';
            sliderdom +=   '<br>';
            sliderdom +=   '<div class="col-md-12">';
            // sliderdom +=    '<input ';
            // sliderdom +=      'id="rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
            // sliderdom +=      'data-key="'+var_key+'" ';
            // sliderdom +=      'type="range" ';
            // sliderdom +=      'min="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
            // sliderdom +=      'max="'+preloadwindowdata_varlist[var_key]["max"]+'" ';
            // sliderdom +=      'step="'+preloadwindowdata_varlist[var_key]["step"]+'" ';
            // sliderdom +=      'value="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
            // sliderdom +=      'data-orientation="horizontal" ';
            // sliderdom +=      'sliderfor="'+preloadwindowdata_varlist[var_key]["name"]+'" ';
            // sliderdom +=      'style="width: inherit;" >';
            sliderdom +=      '<div id="rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'"></div>';
            sliderdom +=    '</div>';
            sliderdom +=  '</div>';
          }
          $('.predictsliderdom-query').html(sliderdom);  
          for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
            $('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider({
              range: true,
              step: Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"]),
              min: Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]),
              max: Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]),
              values: [ Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]), Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"])+Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"])],
              slide: function( event, ui ) {
                console.log("i slide",[..._.range(ui.values[ 0 ],ui.values[ 1 ],Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"])),ui.values[ 1 ]].length);

                $( "#whatisthis"+(var_key+2) ).html([..._.range(ui.values[ 0 ],ui.values[ 1 ],Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"])),ui.values[ 1 ]].length);
              }
            });
          }
        }
      }
      if (window.preloadwindowtarget == "multi") {
        console.log("lol",window.preloadwindowdata_);
        
        if (window.rightnavtabquery == "single") {
          console.log("lol2",window.preloadwindowdata_[target_num].preloadwindowdata_varlist);
          for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
            sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
            sliderdom +=   '<div class="col-md-6">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'</div>';
            sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="singlequeryval'+(var_key+2)+'">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'</span></div>  ';
            sliderdom +=   '<div class="col-md-12">';
            sliderdom +=    '<input ';
            sliderdom +=      'id="rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
            sliderdom +=      'data-key="'+var_key+'" ';
            sliderdom +=      'type="range" ';
            sliderdom +=      'min="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'" ';
            sliderdom +=      'max="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]+'" ';
            sliderdom +=      'step="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"]+'" ';
            sliderdom +=      'value="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'" ';
            sliderdom +=      'data-orientation="horizontal" ';
            sliderdom +=      'sliderfor="'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'" ';
            sliderdom +=      'style="width: inherit;" >';
            sliderdom +=    '</div>';
            sliderdom +=  '</div>';
          }
          
          $('.predictsliderdom-query').html(sliderdom); 
           // write event trigger utk single sini
            for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
              $('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').rangeslider({
                polyfill: true,
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: 'rangeslider--vertical',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',
                // Callback function
                onInit: () => {},
                // Callback function
                onSlide: (position, value) => {},
                // Callback function
                onSlideEnd: (position, value) => {}
              }).on('change', handlesinglequeryslider);
            }
        }
        if (window.rightnavtabquery == "combo") {
          for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
            sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
            sliderdom +=   '<div class="col-md-12">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"]+'</div>';
            // sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="impactlabelrangefor'+(var_key+2)+'">0%</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>MIN</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>X</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>MAX</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="comboqueryslidervalminfor'+(var_key+2)+'">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]+'</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="whatisthis'+(var_key+2)+'">2</span></div>  ';
            sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="comboqueryslidervalmaxfor'+(var_key+2)+'">'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]+'</span></div>  ';
            sliderdom +=   '<br>';
            sliderdom +=   '<div class="col-md-12">';
            // sliderdom +=    '<input ';
            // sliderdom +=      'id="rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
            // sliderdom +=      'data-key="'+var_key+'" ';
            // sliderdom +=      'type="range" ';
            // sliderdom +=      'min="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
            // sliderdom +=      'max="'+preloadwindowdata_varlist[var_key]["max"]+'" ';
            // sliderdom +=      'step="'+preloadwindowdata_varlist[var_key]["step"]+'" ';
            // sliderdom +=      'value="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
            // sliderdom +=      'data-orientation="horizontal" ';
            // sliderdom +=      'sliderfor="'+preloadwindowdata_varlist[var_key]["name"]+'" ';
            // sliderdom +=      'style="width: inherit;" >';
            sliderdom +=      '<div id="rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'"></div>';
            sliderdom +=    '</div>';
            sliderdom +=  '</div>';
          }
          $('.predictsliderdom-query').html(sliderdom);  
          for (const [var_key] in window.preloadwindowdata_[target_num].preloadwindowdata_varlist) {
            $('#rangefor'+window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider({
              range: true,
              step: Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"]),
              min: Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]),
              max: Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["max"]),
              values: [ Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"]), Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["min"])+Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"])],
              slide: function( event, ui ) {
                console.log("i slide",[..._.range(ui.values[ 0 ],ui.values[ 1 ],Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"])),ui.values[ 1 ]].length);

                $( "#whatisthis"+(var_key+2) ).html([..._.range(ui.values[ 0 ],ui.values[ 1 ],Number(window.preloadwindowdata_[target_num].preloadwindowdata_varlist[var_key]["step"])),ui.values[ 1 ]].length);
              }
            });
          }
        }
      }
    break;
  }
  
  console.log("Done Create Slider On DOM");
  
}