function showprojectviewhome(project) {
	// body...
	// set title to project name
	console.log(project.title);
	writetitleforcontentviewbar(project.title);
}

function showprojectview3d(project) {
	// body...
	window.alldata              = '';// global
    window.allimpact            = '';// global
    window.alldataactual        = '';// global
    window.alldatavalidation    = '';// global
    window.opacityactual        = '';// global
    window.opacityvalidation    = '';// global
    window.allerroractual       = '';// global
    window.graphusedparam     	= [];// global for trace filter use    
	window.filterswitch         = false;// global
    window.filters              = false;//global
    window.actualfilters        = '';
    window.xaxis_setting        = preloadwindowdata_var['x'][0];
    window.yaxis_setting        = preloadwindowdata_var['y'][0];
    window.lol                  = 0;
    window.dataloaded           = 0;
    window.plugin               = '';
    window.tracenumber          = 3;
    window.threeDsurfacecam = '';
	window.prevtrace_to_delete = [];
	window.trace_to_delete = [];
	// end data declaration
	// begin ajax call for data prep
	processdataajax("actual",project.id,1);
	processdataajax("validation",project.id,1);
	// end ajax call for data prep
	console.log(project.title);
	writetitleforcontentviewbar(project.title + " > " + "3D");

	// // side panel function prep
	$('#rangeactual[type="range"]').rangeslider({
		// Feature detection the default is `true`.
		// Set this to `false` if you want to use
		// the polyfill also in Browsers which support
		// the native <input type="range"> element.
		polyfill: true,
		// Default CSS classes
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
    }).on('change', handleChange);
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
        }).on('change', handleChange);
    }
}

function showprojectviewblindtest(project) {
	// body...
	console.log(project.title);
	window.jsonrespond          = '';// global
	window.lol                  = 0;
	$(".graphshift_preloader").show();
	processdataajax("blindtest",project.id,1);
	writetitleforcontentviewbar(project.title + " > " + "Blindtest");
}
function showprojectviewquery(project) {
	// body...
	console.log(project.title);
	// body...
	window.alldata              = '';// global
    window.allimpact            = '';// global
    window.alldataactual        = '';// global
    window.alldatavalidation    = '';// global
    window.opacityactual        = '';// global
    window.opacityvalidation    = '';// global
    window.allerroractual       = '';// global
    window.graphusedparam     	= [];// global for trace filter use    
	window.filterswitch         = false;// global
    window.filters              = false;//global
    window.actualfilters        = '';
    window.xaxis_setting        = preloadwindowdata_var['x'][0];
    window.yaxis_setting        = preloadwindowdata_var['y'][0];
    window.lol                  = 0;
    window.dataloaded           = 0;
    window.plugin               = '';
    window.tracenumber          = 3;
    window.threeDsurfacecam = '';
	window.prevtrace_to_delete = [];
	window.trace_to_delete = [];
	// end data declaration
	// begin ajax call for data prep
	processdataajaxquery("actual",project.id,1);
	processdataajaxquery("validation",project.id,1);
	// end ajax call for data prep
	console.log(project.title);
	writetitleforcontentviewbar(project.title + " > " + "Query");
	console.log("Done setting tittle");
	// // side panel function prep
	
	// temporary comment adjust
    // end temporary
}