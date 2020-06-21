// All these function render piece of HTML to plug into the DOM tree.
// The HTML can be plugged using $('#id').html(new_html);

function render_Light(measurements) {
var html = "<tr>"+
			"<th>Timestamp</th>"+
			"<th>Unit</th>"+
			"<th>Type</th>"+
			"<th>Value</th>"+
		"</tr>";

	for(var i=0; i<measurements.length; i++) {
		var p = measurements[i];
		html += "<tr>" +
			"<td><a href='#' data-person-id='" + p.id + "' class='person-telephones'>" +
				html_escape(p.timestamp) +
			"</a></td>"+
			"<td>" + p.unit + "</td>" +
			"<td>" + html_escape(p.type) + "</td>" +
			"<td>" + p.value + "</td>" +
		"</tr>";
	}
	html = "<div style='margin-left:auto; margin-right:auto;'>"+"<table class='grid'>"+html+"</table>"+ "</div>";
	return html;
}
function render_Temp(measurements) {
var html = "<tr>"+
			"<th>Timestamp</th>"+
			"<th>Unit</th>"+
			"<th>Type</th>"+
			"<th>Value</th>"+
		"</tr>";

	for(var i=0; i<measurements.length; i++) {
		var p = measurements[i];
		html += "<tr>" +
			"<td><a href='#' data-person-id='" + p.id + "' class='person-telephones'>" +
				html_escape(p.timestamp) +
			"</a></td>"+
			"<td>" + p.unit + "</td>" +
			"<td>" + html_escape(p.type) + "</td>" +
			"<td>" + p.value + "</td>" +
		"</tr>";
	}
	html = "<table class='grid'>"+html+"</table>";
	return html;
}
function render_Getcommand(data) {
    var html ="<div  class='text'> THE LIGHT IS: " + data.light+ "</br>"+
	          "<div class='text'> THE HEAT IS: " + data.heater+
			  "<div class='text'> THE COOL IS: " + data.cooler;
	return html;
}

function render_History(measurements) {
var html = "<tr>"+
			"<th>Timestamp</th>"+
			"<th>CommandType</th>"+
		"</tr>";

	for(var i=0; i<measurements.length; i++) {
		var p = measurements[i];
		html += "<tr>" +
			"<td><a href='#' data-person-id='" + p.id + "' class='person-telephones'>" +
				html_escape(p.timestamp) +
			"</a></td>"+
			"<td>" + html_escape(p.commandType) + "</td>" +
			
		"</tr>";
	}
	html = "<div style='margin-left:auto; margin-right:auto;'>"+"<table class='grid'>"+html+"</table>"+ "</div>";
	return html;
}


function render_button_form(commandJson) {
	var html = '';
	html += "<form action='#' method='post'>";
	
    html +=" <label for='command'>Choose a command:</label> " + " <select id='myselect'> "+
		"<option value='LIGHTS_ON'>LIGHTS_ON</option> "+
		"<option value='LIGHTS_OFF'>LIGHTS_OFF</option>"+
		"<option value='HEAT_ON'>HEAT_ON</option>"+
		"<option value='HEAT_OFF'>HEAT_OFF</option>"+
		"<option value='COOL_ON'>COOL_ON</option>"+
		"<option value='COOL_OFF'>COOL_OFF</option>"+
    " </select>";
	html += "<p><button style='color:black;' class='command'>Send</button></p>";
	html += "</form>";
	return html;
}
function render_messages(messages) {
	var html = '';
	if(messages) {	
		for(var i = 0; i < messages.length; i++) {
			var m = messages[i];
			var css = (m.type === 'error') ? 'error_icon' : 'info_icon';
			html += "<p class='" + css + "'>" + m.text + "</p>";
		}
	}
	return html;
}

function html_escape(val) {
	return (val+'')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&apos;');
}
