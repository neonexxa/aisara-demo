function writepreviewdatatodom(previewresponse) {
  // body...
  let headdata = JSON.parse(previewresponse['preview_head']);
  let tablepreviewdatadom = '';
  tablepreviewdatadom += '<div class="grid-container"><div class="grid">';
  tablepreviewdatadom += '<div class="grid-col grid-col--fixed-left">';
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

function writetitleforcontentviewbar(argument) {
  // body...
  $("#content-viewbar-top-header-label").html(argument);
}

function createsliderondom() {
  // body...
  let sliderdom = '';
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
  
}