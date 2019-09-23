function writepreviewdatatodom(previewresponse) {
  // body...
  let headdata = JSON.parse(previewresponse['preview_head']);
  let tablepreviewdatadom = '';
  tablepreviewdatadom += '<div class="grid-container"><div class="grid">';
  tablepreviewdatadom += '<div class="grid-col grid-col--fixed-left">';
  console.log(headdata);
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
        console.log(key, value, i);
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
        console.log(key, value, i);
      }
      tablepreviewdatadom += '</div>';
    }
    objlength ++;
  }
  tablepreviewdatadom += '</div></div>';
  $("#content_view_bar_table").html(tablepreviewdatadom);
  // previewresponse
}
function writequerydatatodom() {
  console.log("Re-Writing query result to dom");
  // console.log(querytableoutput[0]);
  // console.log(querytableparams.length);

  // css adjustment
  console.log("CSS adjustment on table");
  console.log(Object.keys(preloadwindowdata_varlist).length,parseInt($("#queryinputheader").outerWidth(), 10)/Object.keys(preloadwindowdata_varlist).length);
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
  for (const [var_key] in preloadwindowdata_varlist) {
    tablepreviewdatadom += '<div class="grid-col">';
    for (var i = 0 ; i < querytableparams.length+1 ; i++) {
      if (i == 0) {
        tablepreviewdatadom += '<div class="grid-item grid-item--header">';
        tablepreviewdatadom += '<p>'+preloadwindowdata_varlist[var_key]["name"]+'</p>';
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
  $('.grid-col').css("width",parseInt($("#queryinputheader").outerWidth(), 10)/Object.keys(preloadwindowdata_varlist).length);
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
  console.log("Cleaning out previous slider");
  $('.predictsliderdom').empty();
  $('.predictsliderdom-query').empty();
  console.log("Compiling new slider");
  switch(window.buttontriggered){
    case "sub-nav-item-btn-3d":
      for (const [var_key] in preloadwindowdata_varlist) {
      
        sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
        sliderdom +=   '<div class="col-md-6">'+preloadwindowdata_varlist[var_key]["name"]+'</div>';
        sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="impactlabelrangefor'+(var_key+2)+'">0%</span></div>  ';
        sliderdom +=   '<div class="col-md-12">';
        sliderdom +=    '<input ';
        sliderdom +=      'id="rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
        sliderdom +=      'data-key="'+var_key+'" ';
        sliderdom +=      'type="range" ';
        sliderdom +=      'min="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
        sliderdom +=      'max="'+preloadwindowdata_varlist[var_key]["max"]+'" ';
        sliderdom +=      'step="'+preloadwindowdata_varlist[var_key]["step"]+'" ';
        sliderdom +=      'value="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
        sliderdom +=      'data-orientation="horizontal" ';
        sliderdom +=      'sliderfor="'+preloadwindowdata_varlist[var_key]["name"]+'" ';
        sliderdom +=      'style="width: inherit;" >';
        sliderdom +=    '</div>';
        sliderdom +=  '</div>';
      }
      $('.predictsliderdom').html(sliderdom);  
    break;
    case "sub-nav-item-btn-query":
      if (window.rightnavtabquery == "single") {
        for (const [var_key] in preloadwindowdata_varlist) {
          sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
          sliderdom +=   '<div class="col-md-6">'+preloadwindowdata_varlist[var_key]["name"]+'</div>';
          sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="singlequeryval'+(var_key+2)+'">'+preloadwindowdata_varlist[var_key]["min"]+'</span></div>  ';
          sliderdom +=   '<div class="col-md-12">';
          sliderdom +=    '<input ';
          sliderdom +=      'id="rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'" ';
          sliderdom +=      'data-key="'+var_key+'" ';
          sliderdom +=      'type="range" ';
          sliderdom +=      'min="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
          sliderdom +=      'max="'+preloadwindowdata_varlist[var_key]["max"]+'" ';
          sliderdom +=      'step="'+preloadwindowdata_varlist[var_key]["step"]+'" ';
          sliderdom +=      'value="'+preloadwindowdata_varlist[var_key]["min"]+'" ';
          sliderdom +=      'data-orientation="horizontal" ';
          sliderdom +=      'sliderfor="'+preloadwindowdata_varlist[var_key]["name"]+'" ';
          sliderdom +=      'style="width: inherit;" >';
          sliderdom +=    '</div>';
          sliderdom +=  '</div>';
        }
        $('.predictsliderdom-query').html(sliderdom); 
         // write event trigger utk single sini
          for (const [var_key] in preloadwindowdata_varlist) {
            $('#rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'[type="range"]').rangeslider({
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
        for (const [var_key] in preloadwindowdata_varlist) {
          sliderdom += '<div class="row sliderlist" style="margin:0px;padding: 5px">';
          sliderdom +=   '<div class="col-md-12">'+preloadwindowdata_varlist[var_key]["name"]+'</div>';
          // sliderdom +=   '<div class="col-md-6" style="padding:0px"><span id="impactlabelrangefor'+(var_key+2)+'">0%</span></div>  ';
          sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>MIN</span></div>  ';
          sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>X</span></div>  ';
          sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;"><span>MAX</span></div>  ';
          sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="comboqueryslidervalminfor'+(var_key+2)+'">'+preloadwindowdata_varlist[var_key]["min"]+'</span></div>  ';
          sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="whatisthis'+(var_key+2)+'">2</span></div>  ';
          sliderdom +=   '<div class="col-md-4 text-center" style="padding:0px;font-size: 8px;border:solid 1px #005D92"><span id="comboqueryslidervalmaxfor'+(var_key+2)+'">'+preloadwindowdata_varlist[var_key]["max"]+'</span></div>  ';
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
          sliderdom +=      '<div id="rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')+'"></div>';
          sliderdom +=    '</div>';
          sliderdom +=  '</div>';
        }
        $('.predictsliderdom-query').html(sliderdom);  
        for (const [var_key] in preloadwindowdata_varlist) {
          $('#rangefor'+preloadwindowdata_varlist[var_key]["name"].replace(/[^a-zA-Z0-9]+/, '_')).slider({
            range: true,
            step: Number(preloadwindowdata_varlist[var_key]["step"]),
            min: Number(preloadwindowdata_varlist[var_key]["min"]),
            max: Number(preloadwindowdata_varlist[var_key]["max"]),
            values: [ Number(preloadwindowdata_varlist[var_key]["min"]), Number(preloadwindowdata_varlist[var_key]["min"])+Number(preloadwindowdata_varlist[var_key]["step"])],
            slide: function( event, ui ) {
              console.log("i slide",[..._.range(ui.values[ 0 ],ui.values[ 1 ],Number(preloadwindowdata_varlist[var_key]["step"])),ui.values[ 1 ]].length);

              $( "#whatisthis"+(var_key+2) ).html([..._.range(ui.values[ 0 ],ui.values[ 1 ],Number(preloadwindowdata_varlist[var_key]["step"])),ui.values[ 1 ]].length);
            }
          });
        }
      }
      
    break;
  }
  
  console.log("Done Create Slider On DOM");
  
}