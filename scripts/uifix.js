function resize_table_for_content_view_datasheet() {
	// body...
	console.log("Resizing content_view_bar_table_width");
	let content_view_bar_table_width = parseInt($("#content_view_bar_table").width(), 10);
	console.log("content_view_bar_table_width: ",content_view_bar_table_width);
	$(".grid-col--fixed-left").css("width",(index)=>{
		index = (content_view_bar_table_width*0.07);
		return index;
	});
	$(".grid-col--fixed-right").css("width",(index)=>{
		index = (content_view_bar_table_width*0.07);
		return index;
	});

	// Setting size for chart pane
	
}
function resize_table_for_content_view_project() {
	// body...
	let content_view_bar_height = parseInt($('.content-viewbar').height(), 10);
	let content_view_bar_header_height = parseInt($('.content-viewbar-header').outerHeight(), 10);
	$(".content-viewbar-chartview").css("height",(index)=>{
	    index = (content_view_bar_height-content_view_bar_header_height);
	    return index;
	});
	console.log("content viewbar outer height",$('.content-viewbar').height());
	console.log("content viewbar (height, header)",content_view_bar_height,content_view_bar_header_height);
	console.log("content viewbar chart height",$(".content-viewbar-chartview").height());
}

function settingdisabled() {
	console.log("Setting disabled for :",window.currentview);
	
	switch(window.currentview){
		case "Homeview":
		    
		    $(".sub-nav-item-btn").addClass("sub-nav-item-btn-disabled");

		    $(".sub-nav-item-btn-newdataset").removeClass("sub-nav-item-btn-disabled");
		    $(".sub-nav-item-btn-dataset").removeClass("sub-nav-item-btn-disabled");

		    console.log("enabling sub-nav-item-btn-newdataset sub-nav-item-btn-dataset");
		    break;
		case "AllDatasheetview":
		    // code block
		    $(".sub-nav-item-btn").addClass("sub-nav-item-btn-disabled");

		    $(".sub-nav-item-btn-newdataset").removeClass("sub-nav-item-btn-disabled");
		    $(".sub-nav-item-btn-dataset").removeClass("sub-nav-item-btn-disabled");

		    console.log("enabling sub-nav-item-btn-newdataset sub-nav-item-btn-dataset");
		    break;
		case "Projectview":
		    // code block
		    $(".sub-nav-item-btn").addClass("sub-nav-item-btn-disabled");

		    $(".sub-nav-item-btn-newdataset").removeClass("sub-nav-item-btn-disabled");
		    $(".sub-nav-item-btn-dataset").removeClass("sub-nav-item-btn-disabled");
			$(".sub-nav-item-btn-blindtest").removeClass("sub-nav-item-btn-disabled");
			$(".sub-nav-item-btn-query").removeClass("sub-nav-item-btn-disabled");
			$(".sub-nav-item-btn-3d").removeClass("sub-nav-item-btn-disabled");
		    console.log("enabling sub-nav-item-btn-newdataset sub-nav-item-btn-dataset sub-nav-item-btn-blindtest sub-nav-item-btn-query sub-nav-item-btn-3d");
		    break;
		
		default:
		    // code block
		
	}
}