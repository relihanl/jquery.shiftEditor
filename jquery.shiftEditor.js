/**
 * Work Shift Editor
 * A really simple little editor that allows the definition of a work shift for a generic week.
 *
 * TODO:
 * Still not possible to have separate options for multiple widget instances on a single page
 * 
 * Copyright (c) 2014 ResourceKraft Ltd. (www.resourcekraft.com)
 * Written By: Liam Relihan
 *
 * Licensed under the MIT (MIT-LICENSE.txt) licenses.
 * 
 */
 
'use strict';
(function ($) {
	var selectorOwner;
	var selectorShowing = false;
	var settings;
	var numCells;
  
	$.fn.shiftEditor = function(options){ 
		 settings = $.extend({
				showPublicHolidays: true
			}, options);

		if (!document.getElementById("time-selector")){
			buildSelector();
		}

		numCells=168;
		
		if (settings.showPublicHolidays) {
			numCells+=24;
		}


		return this.each(
			function(i) { 
				buildPicker(this);
			}
		); 
	}
  

  
	// toggles the class of the cell between 'cell-on' and 'cell-off'
	function toggleCellValue(id) {
		
		var cell = document.getElementById(id);

		if (cell.className == 'cell-on') {
			cell.className = 'cell-off';
		} else {
			cell.className = 'cell-on';
		}
		console.log("after className="+cell.className);
	
	}
	
	function clearAll() {
		for ( var i = 0; i < numCells; i++) {
			var cellJQ=$("#cell_"+i);
			cellJQ.removeClass('cell-on').addClass('cell-off');
		}
	}
	
	function populateTableFromString(hoursString) {
		for ( var i = 0; i < numCells; i++) {
			var cellJQ=$("#cell_"+i);
	
			console.log(cellJQ);
			switch(hoursString.charAt(i)){
				case '0': 
					cellJQ.removeClass('cell-on').addClass('cell-off');
					break;
				case '9':
					cellJQ.removeClass('cell-off').addClass('cell-on');
					break;
				default:
					cellJQ.removeClass('cell-on').addClass('cell-off');
			}
			console.log(cellJQ);
		}
	}
	
	function getStringFromTable() {
		var string="";

		for ( var i = 0; i < numCells; i++) {
			var cellJQ=$("#cell_"+i);
			switch(cellJQ.attr("class")){
				case 'cell-on': 
					string += '9';
					break;
				case 'cell-off':
					string += '0';
					break;
				default:
					string += '0';
			}
		}

		return string;
	}
	
	function buildPicker(element){
		var control = populatePicker(element);
		
		//add the shift editor section
		$(element).after(control);

		//add event listener to input box
		$(element).bind("change", function() {
		  var selectedValue = $(element).val();
		  $(element).value= selectedValue;
		  console.log("populating "+element.id);
		  var control=populatePicker(element);
		  // replace the previous control
		  $(element).next("div").remove();
		  $(element).after(control);
		});
		
		//hide the input box
		$(element).hide();
	}
  
 	function populatePicker(element){
		console.log("populate picker "+element.id);

		var control = $("<div class='picker'></div>");
		
		var hoursString=element.value;
		
		var cell_num=0;
		
		//add days of week
		for (var day=0;day<8;day++){
			var day_row = $("<div class='picker-day-row'></div>");

			for (var hours=0;hours<24;hours++){
				switch(hoursString.charAt(cell_num)){
				case '0':
					$("<span class='picker-cell-off'></span>").appendTo(day_row);
					break;
				case '9':
					$("<span class='picker-cell-on'></span>").appendTo(day_row);
					break;
				default:
					$("<span class='picker-cell-off'></span>").appendTo(day_row);
					break;
				}
				cell_num++;
			}
			day_row.appendTo(control);
		}
		
		//bind click event to shiftEditor
		control.bind("click", toggleSelector);
		
		console.log("populate picker "+element.id+ "end");
		return control;
	}
  
  
	function buildSelector(){

		var selector = $("<div id='time-selector'></div>");
		var selector_grid = $("<div id='selector-grid'></div>");
		
		var days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		
		if (settings.showPublicHolidays)
		days_of_week.push("Public Hols");
		
		// draw header row
		var header_row = $("<div class='header-row'></div>");
		var empty_day_label = $("<span class='day_label'>&nbsp;</span>");
		empty_day_label.appendTo(header_row);
		header_row.appendTo(selector_grid);
		
		for (var hours=0;hours<24;hours++){
			  var header_cell = $("<span class='header-cell'>"+hours+"</span>")
			  header_cell.css("background-color", "#" + this);
			  header_cell.appendTo(header_row);
		}
		header_row.appendTo(selector_grid);
		var $cell_num=0;
		
		 //add days of week
		 days_of_week.forEach( function(i){
			var day_row = $("<div class='day-row'></div>");
			var day_label = $("<span class='day_label'>"+i+"</span>");
			day_label.appendTo(day_row);
			for (var hours=0;hours<24;hours++){
				var time_cell = $("<span id='cell_"+$cell_num+"' class='cell-off'>&nbsp;</span>");
				time_cell.css("background-color", "#" + this);
				time_cell.bind("click", 
					function(e){ 
						toggleCellValue(this.id);
					}
				);
				time_cell.appendTo(day_row);
				$cell_num++;
			}
			day_row.appendTo(selector_grid);
		});
		selector_grid.appendTo(selector)
		 
		var ok_button = $("<button type='button'>OK</button>");
		ok_button.bind("click", function(e){
			$(selectorOwner).prev("input").val(getStringFromTable()).change();
			toggleSelector();
		});
		ok_button.appendTo(selector);

		var clear_button = $("<button type='button'>Clear</button>");
		clear_button.bind("click", function(e){
			clearAll();
		});
		 
		clear_button.appendTo(selector);
		 
		$("body").append(selector); 
		selector.hide();
		$("cell_0").class="cell-on";
	}
  
	function checkMouse(event){
		//check the click was on selector itself or on selectorOwner
		var selector = "div#time-selector";
		var selectorParent = $(event.target).parents(selector).length;
		if(event.target == $(selector)[0] || event.target == selectorOwner || selectorParent > 0) return
		
		hideSelector();   
	}
  
	function hideSelector(){
		var selector = $("div#time-selector");
		$(document).unbind("mousedown", checkMouse);
		selector.hide();
		selectorShowing = false
	}
  
	function showSelector(){
		var selector = $("div#time-selector");
		
		//alert($(selectorOwner).offset().top);
		
		selector.css({
		  top: $(selectorOwner).offset().top + ($(selectorOwner).outerHeight()),
		  left: $(selectorOwner).offset().left
		}); 
	   	
		console.log("string="+$(selectorOwner).prev("input")[0].value);
		// lets get some data into the table
		populateTableFromString($(selectorOwner).prev("input")[0].value);
		
		selector.show();
		
		//bind close event handler
		$(document).bind("mousedown", checkMouse);
		selectorShowing = true 
	}
  
	function toggleSelector(event){
		console.log("toggling");
		selectorOwner = this; 
		selectorShowing ? hideSelector() : showSelector();
		console.log("end toggling");
	}
  
  
  
  //public methods


})(jQuery);


