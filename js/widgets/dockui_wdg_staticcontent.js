$.dockui.widgets.static_content = {
	toolbar_drop: function(o, e, ui){
		var itemId = o.attr('id')+'_'+o.find('.dockui-dockitem').size()
		var html = $.dockui.core.elements.dockItem(itemId, ui.draggable.data('widget').title);
		var dockItem = $(html).appendTo(o);
		dockItem.resizable({containment: 'parent'});
		dockItem.draggable({containment: 'parent' });
		dockItem.find('.dockui-dockItem-header').append('<span class="ui-icon ui-icon-trash" style="float:right;"></span>').find('.ui-icon-trash').click(function(){$(this).parent().parent().remove();});
		
		var contentSelectHTML = '<select id="'+itemId+'_selector"><option value="">Please Select--></option><option value="content/sample_content.html">Sample Content</option></select>';
		var contentSelect = $(contentSelectHTML).appendTo(dockItem);
		var htmldisplayid = itemId+'_content_'+$(o).find('.dockui-dockitem-content').size();
		$('<div id="'+htmldisplayid+'" class="dockui-dockitem-content">&nbsp;</div>').appendTo(dockItem);

		var change = function(){
			$('#'+htmldisplayid).load($(this).attr('value'));
		}
		contentSelect.change(change);
	}
}
