$.dockui.widgets.messaging = {
	data:{pollInterval:30000},
	init: function(){
		$.dockui.widgets.messaging.data.messages=[];
		$.dockui.widgets.messaging.poll();
		$.dockui.widgets.messaging.timer = setInterval($.dockui.widgets.messaging.poll, $.dockui.widgets.messaging.data.pollInterval);
	},
	toolbar_click: function(){
		//$.dockui.widgets.messaging.sendString('iphone', 'New Message', 'Just testing the sendString Functionality');
		//clearTimeout($.dockui.widgets.messaging.timer);
		var messageForm = '<label for"txtTo">To: </label><input type="text" name"txtTo" id="txtTo"/><br/><label for"txtTo">Title: </label><input type="text" name"txtTitle" id="txtTitle"/><br/><label for"txtMessage">Message: </label><input type="text" name"txtMessage" id="txtMessage"/><br/>';
		$.dockui.core.globaldialog.show('Send Message', messageForm, {buttons:{'Send':$.dockui.widgets.messaging.handleSendString}});
		
	},
	toolbar_drop: function(o, e, ui){
		var itemId = o.attr('id')+'_'+o.find('.dockui-dockitem').size()
		var html = $.dockui.core.elements.dockItem(itemId, ui.draggable.data('widget').title);
		var dockItem = $(html).appendTo(o);
		dockItem.resizable({containment: 'parent'});
		dockItem.draggable({containment: 'parent' });
		dockItem.find('.dockui-dockItem-header').append('<span class="ui-icon ui-icon-trash" style="float:right;"></span>').find('.ui-icon-trash').click(function(){$(this).parent().parent().remove();});
		dockItem.append('<div class="dockui-widget-messagebox"></div>');
		$.dockui.widgets.messaging.updateMessages();
	},
	poll: function(){
		$.getJSON('server/core/messaging/', $.dockui.widgets.messaging.process);
		$.dockui.widgets.messaging.updateMessages();
	},
	process: function(data){
		if(data.errors.length==0){
			if(data.count>0){
				$.dockui.widgets.messaging.data.messages = data.messages;
				$('.messaging img').attr('src','images/widgets/messaging/toolbar_icon_active.png');
			}
		}
	},
	updateMessages: function(){
		var messages = $.dockui.widgets.messaging.data.messages;
		for(var i in messages){
			var message = messages[i];
			var messageId = 'dockui-message-'+message.id;
			
			var messageObj = $('<div class="'+messageId+'"><h3>'+message.from+' says '+message.title+'</h3></div>').data('message', message);
			
			$('.dockui-widget-messagebox').each(
				function(){
					if($(this).find('.'+messageId).size()==0){
						$(this).append(messageObj);
					}
				});
			
		}
	},
	sendString: function(to, title, data){
		$.dockui.widgets.messaging.sendMessage('string', 'send_string',to, title, data);
	},
	sendMessage: function(type, action, to, title, data){
		var myDate = new Date();
		var message = {
			'action':action,
			'id':'msg_'+myDate.valueOf(),
			'to':to,
			'type':type,
			'title': title,
			'data': data
			}

		$.post('server/core/messaging/', message, function(data){
			$.dockui.core.globaldialog.close();
			$.dockui.widgets.messaging.data.messages = data.messages;
			$.dockui.widgets.messaging.updateMessages();
		}, "json");
	},
	handleSendString: function(){
		var sto = $('#txtTo').attr('value');
		var stitle = $('#txtTitle').attr('value');
		var smessage = $('#txtMessage').attr('value');
		$.dockui.widgets.messaging.sendString(sto, stitle, smessage);
	}
}
