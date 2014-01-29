# Simple Shift Editor


Written by Liam Relihan (resourcekraft.com).
Source code is hosted at: https://github.com/relihanl/jquery.shiftEditor

## Introduction
Shift editor is a simple little jquery plugin that pops up an editor that allows the creation and editing of weekly work shifts.

##Compatability

Shift Editor requires jQuery 1.10 or higher. So make sure to load it before Shift Editor (there's no other dependencies!). 

## Usage
For default styles of the color picker load the CSS file that comes with the plugin.
```
 <script language="javascript" type="text/javascript" src=jquery.min.js"></script>
 <script language="javascript" type="text/javascript" src="jquery.shiftEditor.js"/></script>

 <link rel="stylesheet" href="shiftEditor.css" type="text/css" />
```

Add a text field to take the shift input.
```
<div><label for="shift1">Shift 1</label> <input id="shift1" type="text" name="shift1" value="" /></div>
```
Then call 'shiftEditor' method on the text field when document loads.
```
<script language="javascript">
  jQuery(document).ready(function($) {
    $('#shift1').shiftEditor();
  }
</script>
```
## Moving Data In and Out
Data is passed to and from the plugin in the form of a "shift spec". A shift spec consists of a string of characters
where each character is used to 
represent a single hour in a week (Monday-Sunday, plus public holidays). The following are the only valid
characters:

| character     | meaning                  |
| ------------- | ------------------------ |
| 9             | is on duty ("red")       |
| 0             | is not on duty ("gray")  |

For instance, a shift string beginning
'09999999999999999000...' would indicate a shift beginning at 0100 on Monday.

To prepopulate the shift editor just supply a correctly formatted shift string into the 'value' attribute of 
the input field. Similarily, reading the value attribute of the input field will supply the shift spec to a form 
or javascript in the usual manner.

## To Do

* allow public holidays to be turned off individually
* quick links allowing the editor to be populated quickly with, for instance "9-5 Monday to Friday"
* 'invert' button to invert the shift such that working hours become non-working hours and vice-versa
* quick paint feature that allows the user to quickly color in the cells by holding down the mouse button (or similar)

