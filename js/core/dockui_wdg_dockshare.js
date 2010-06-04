$.dockui.widgets.dockshare = {
	toolbar_drop: function(o, e, ui){
		var itemId = o.attr('id')+'_'+o.find('.dockui-dockitem').size()

		var dockItem = ui.draggable.clone();
		dockItem.appendTo(o);
		dockItem.draggable({containment: 'parent' });
		dockItem.removeClass('toolbox_icon');
		dockItem.addClass('toolbox_icon_embedded');
		dockItem.append('<span class="ui-icon ui-icon-person" style="float:right;"></span>').find('.ui-icon-person').click(function(){alert('selecting user')});
		dockItem.append('<span class="ui-icon ui-icon-trash" style="float:right;"></span>').find('.ui-icon-trash').click(function(){$(this).parent().remove();});
	},
	sendRequest: function(to, dockId){
		var dockInfo = {'id':dockId};
		var title = $_SESSION['user']['username']+' wants to share a Dock';
		$.dockui.widgets.messaging.sendMessage('share_request', 'share_doc', to, title, dockInfo);
	},
	selectUser: function(){
		
	}
}
