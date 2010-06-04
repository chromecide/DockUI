{
	"user_auth":{
		"namespace":	"user_auth",
		"title":		"Login",
		"toolbar_icon": "images/widgets/user_auth/toolbar_icon.png",
		"script":		"js/core/dockui_wdg_userauth.js",
		"draggable":	false,
		"clickable":	true,
		"click": "$.dockui.widgets.user_auth.toolbar_click"
	},
	"messaging":{
		"namespace":	"messaging",
		"title":		"Messages",
		"toolbar_icon": "images/widgets/messaging/toolbar_icon.png",
		"script":		"js/core/dockui_wdg_messaging.js",
		"init":			"$.dockui.widgets.messaging.init",
		"draggable":	false,
		"clickable":	true,
		"click": "$.dockui.widgets.messaging.toolbar_click",
		"draggable":	true,
		"drop": "$.dockui.widgets.messaging.toolbar_drop"
	},
	"new_dock":{
		"namespace":	"new_dock",
		"title":		"New Dock",
		"toolbar_icon": "images/widgets/new_dock/toolbar_icon.png",
		"script":		"js/core/dockui_wdg_newdock.js",
		"draggable":	false,
		"clickable":	true,
		"click": "$.dockui.widgets.new_dock.toolbar_click"
	},
	"dock_share":{
		"namespace":	"dock_share",
		"title":		"Share a Dock",
		"toolbar_icon": "images/widgets/dock_share/toolbar_icon.png",
		"script":		"js/core/dockui_wdg_dockshare.js",
		"draggable":	true,
		"clickable":	false,
		"drop": "$.dockui.widgets.dockshare.toolbar_drop"
	},
	"static_content" : {
		"namespace":	"static_content",
		"title":		"Static Content",
		"toolbar_icon": "images/widgets/static_content/toolbar_icon.png",
		"script":		"js/widgets/dockui_wdg_staticcontent.js",
		"draggable":	true,
		"drop": "$.dockui.widgets.static_content.toolbar_drop",
		"clickable":	false
	}
}

