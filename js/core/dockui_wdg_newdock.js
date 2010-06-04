$.dockui.widgets.new_dock = {
	toolbar_click: function(){
		var content = $.dockui.widgets.new_dock.elements.form;
		var createCallback = function(){
			var title = $('#txtNewDockName').attr('value');
			$.dockui.widgets.new_dock.createDock(title);
			$.dockui.core.globaldialog.close();
		}
		
		$.dockui.core.globaldialog.show('Create New Dock', content, {buttons:{'OK': createCallback}});
	},
	elements:{
		form:'<label for="txtNewDockName">Dock Title: </label><input type="text" name="txtNewDockName" id="txtNewDockName" value=""/>'
	},
	createDock: function(title){
		var dockHTML = $.dockui.core.elements.dock('dockui_dock_'+$.dockui.core.localStore.dockCount, title);
		$.dockui.core.localStore.dockCount++;
		var dock = $(dockHTML).appendTo($.dockui.core.localStore.globalParent);
		dock.addClass('dockui-draggable');
		dock.find('.ui-widget-header').append('<span class="ui-icon ui-icon-trash" style="float:right;"></span>').find('.ui-icon-trash').click(function(){$(this).parent().parent().remove();});
		dock.draggable({stack:'.dockui-draggable'});
		dock.resizable();
		
		dock.droppable({
			accept: '.toolbox_icon', 
			drop: function(e, ui){
				//load the widget
				var myWidg = $(ui.draggable).data('widget');

				//define the function
				var myFunc = eval(myWidg.drop);

				//call the drop function
				myFunc($(this), e, ui);
			}
		});
	}
}
