# Simple Shift Editor


Written by Liam Relihan (resourcekraft.com)
Source code is hosted at: https://github.com/relihanl/jquery.shiftEditor

## Introduction
Shift editor is a simple little jquery plugin that pops up an editor that allows the creation and editing of weekly work shifts.

##Compatability

Shift Editor requires jQuery 1.10 or higher. So make sure to load it before Shift Editor (there's no other dependencies!). 

## Usage
For default styles of the color picker load the CSS file that comes with the plugin.

 <script language="javascript" type="text/javascript" src=jquery.min.js"></script>
 <script language="javascript" type="text/javascript" src="jquery.shiftEditor.js"/></script>

 <link rel="stylesheet" href="shiftEditor.css" type="text/css" />


Add a text field to take the shift input.
  <div><label for="shift1">Shift 1</label> <input id="shift1" type="text" name="shift1" value="" /></div>

Then call 'shiftEditor' method on the text field when document loads.
<script language="javascript">
  jQuery(document).ready(function($) {
    $('#shift1').shiftEditor();
  }
</script>

## Moving Data In and Out
...more details here...

string format
ajax,
etc
