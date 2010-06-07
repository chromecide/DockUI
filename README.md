DockUI : jQuery Based Web UI
=======================
**NOTE: Tuesday, June 8, 2010**

Please see the [Dock UI Google Group](http://groups.google.com/group/dockui) for more information and updates about this project.
**/rant**


Introduction
=========

DockUI is a JavaScript UI built on JavaScript and jQuery

It uses the concept of "Docks", or frames that act as groupings for "widgets".  You can add multiple Docks to a single page, allowing you to group your widgets in any way you want.

The core of the system allows for rapid development of widgets, as well as the ability to use any server side language as the backend.  Also included is a core messaging system that allows for communication between authorised users, as well as the ability to "share" docks between users.  Docks can be shared as read-only, colaboratively or ownership of a Dock can be transfered to another user.

Server calls are made using paths(i.e. 'server/widget/widgetx/command'), instead of files(i,e, '/widgetx.php?save'), allowing for any server-side language to be used as the backend of the DockUI system.

The system at the moment consists only of the core system and a basic "static content" widget, with planned widgets to include basic twitter and facebook interaction, email and some more advanced sharing widgets.


More Information
=========

[DockUI.net](http://www.dockui.net)

[Dock UI Google Group](http://groups.google.com/group/dockui)


Parameters
============

Available Parameters
-----------

>**clientCorePath**
>
>The path of the DockUI core JavaScript files
>
>
>**clientWidgetPath**
>
>The path of the DockUI widget JavaScript files
>
>
>**serverCorePath**
>
>The path to the files that will act as the DockUI core server >files
>
>**serverWidgetPath**
>
>The path to the files that will act as the DockUI widget server >files
>
>**globalDialogWidth**
>
>The value, in pixels, for the default width of the DockUI >Global Modal Dialog
>
>**globalDialogHeight**
>
>The value, in pixels, for the default height of the DockUI >Global Modal Dialog

Untested/Planned but Unsupported
-----------
>**parent**
>
>The parent HTML element that the DockUI system will be applied to


Default Values
-----------

>**parent:** 'body',
>
>**clientCorePath:** 'js/core/'
>
>**clientWidgetPath:** 'js/widgets/'
>
>**serverCorePath:** 'server/core/',
>
>**serverWidgetPath:** 'server/widgets/',
>
>**globalDialogWidth:** 300,
>
>**globalDialogHeight:** 300







Written by Justin Pradier.

Copyright (C) 2010 by Justin Pradier.
Released under the GPLv3 license (dual-licensed).