//dockui constructor
$.dockui = function(params){
	var defaults = {
		parent: 'body',
		clientCorePath: 'js/core/',
		clientWidgetPath: 'js/widgets/',
		serverCorePath: 'server/core/',
		serverWidgetPath: 'server/widgets/',
		globalDialogWidth: 300,
		globalDialogHeight: 300
	}

	
	var options = $.extend({}, defaults, params);

	$.dockui.core.localStore.options = options;
	$.dockui.core.init();
}

//dockui core functionality
$.dockui.core = {
	init: function(){
		$.dockui.core.globaldialog.show('Loading DockUI', '<h1 class="dockui-globaldialog-h1">Please Wait...<h1><div id="dockui-globaldialog-loader"></div>', {width: 400});
		$.dockui.core.globaltoolbox();
		$.dockui.core.loadWidgetList();
		$.dockui.core.globaldialog.close();
	},
	loadWidgetList: function(){
		$.getJSON('server/core/list_widgets', function(data){
			$.each(data, function(i,widget){
				//create the button
				var toolbar_iconHTML = $.dockui.core.elements.toolboxButton('tbb_'+widget.namespace,widget.toolbar_icon, widget.title);
				var toolbar_icon = $(toolbar_iconHTML).appendTo('#dockui_globaltoolbox');
				toolbar_icon.addClass(widget.namespace);
				toolbar_icon.hover(
					function() { $(this).addClass('ui-state-hover'); },
					function() { $(this).removeClass('ui-state-hover'); }	
				);

				//load the widget script
				$.getScript(widget.script, function(){
					//set the types and actions if appropriate
					if(widget.draggable){
						toolbar_icon.addClass('dockui-toolbaricon-draggable');
						toolbar_icon.addClass('dockui-draggable');
						var drop = eval(widget.toolbar_drop);
						toolbar_icon.draggable({revert:true, drop: drop, stack:'.dockui-draggable'});
						toolbar_icon.data('widget', widget);
					}
					if(widget.clickable){
						toolbar_icon.addClass('dockui-toolbaricon-clickable');
						toolbar_icon.click(eval(widget.click));
					}
					if(widget.init){
						eval(widget.init+'();')
					}
				});
			});
		});
	},
	requireScript: function(script_path){
		
	},
	requireStyle: function(style_path){

	},
		
}
//end dockui core functionality

//dockui global variables
$.dockui.core.localStore = {
	globalParent: 'body',
	dockCount:0,
	options: {}
}
//end dockui global variables

//dockui local common template elements
$.dockui.core.elements = {
	toolboxButton : function(id, image, tooltip){
		return '<div id="'+id+'" title="'+tooltip+'" class="toolbox_icon ui-widget ui-helper-clearfix ui-state-default ui-corner-all"><img src="'+image+'"/></div>';
	},
	toolboxSeperator : function(id){
		return '<div id="'+id+'" class="toolbox_seperator ui-widget ui-helper-clearfix ui-state-default ui-corner-all"></div>';
	},
	dock: function(id, title){
		return '<div id="'+id+'" class="dockui-dock ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"><div class="ui-widget-header">'+title+'</div></div>';
	},
	dockItem: function(id, title){
		return '<div id="'+id+'" class="dockui-dock-item ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-widget-header"><div class="ui-widget-header dockui-dockItem-header">'+title+'</div></div>'
	}
};
//end dockui local common template elements

//dockui global modal dialog
$.dockui.core.globaldialog = {
	show : function(title, content, opts, callback){

		var defaultoptions = { 
			autoOpen: false, 
			modal: true, 
			closeOnEscape: false,
			draggable:false,
			resizable:false,
			height: 'auto',
			width: 'auto',
			buttons:{}
			};

		var options = $.extend({}, defaultoptions, opts);

		if($('#dockui_globaldialog').size()==0){
			$('<div id="dockui_globaldialog" title="'+title+'"></div>').appendTo($.dockui.core.localStore.globalParent);
		}
		$( "#dockui_globaldialog" ).dialog(options);
		$('#dockui_globaldialog').html(content);
		$('#dockui_globaldialog').dialog({title: title});
		$('#dockui_globaldialog').dialog('open');
	},
	close : function(){
		$('#dockui_globaldialog').dialog('close');
	}
}
//end dockui global modal dialog

//dockui global toolbar
$.dockui.core.globaltoolbox = function(){
	var toolboxHTML = $.dockui.core.elements.dock('dockui_globaltoolbox','DockUI.net Toolbox');
	var toolbox = $(toolboxHTML).appendTo($.dockui.core.localStore.globalParent);
	var scrollToolbox = function(){
		$('#dockui_globaltoolbox').css({top: $($.dockui.core.localStore.globalParent).scrollTop()});
	}
	$(window).scroll(function()
	{
	  $('#dockui_globaltoolbox').animate({top:$(window).scrollTop()+"px" },{queue: false, duration: 100});
	});
}
//end dockui global toolbar

$.dockui.widgets = {};