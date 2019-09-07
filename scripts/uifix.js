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