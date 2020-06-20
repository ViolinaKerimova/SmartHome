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
    var html ="<div class='text'> THE LIGHT IS: " + data.light+ "</br>"+
	          "<div class='text'> THE HEATER IS: " + data.heater+
			  "<div class='text'> THE COOLER IS: " + data.cooler;
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
			"<td>" + html_escape(p.timestamp) + "</td>" +
			
		"</tr>";
	}
	html = "<div style='margin-left:auto; margin-right:auto;'>"+"<table class='grid'>"+html+"</table>"+ "</div>";
	return html;
}

function render_button_form_static() {
	var html = '';
	html += "<form action='#' method='post'>";
	html += "<p><label>Supported commands: LIGHTS_ON, LIGHTS_OFF, HEAT_ON, HEAT_OFF, COOL_ON, COOL_OFF"+
    "</label><input name='command' value='" + html_escape(command) + "'/></p>";
	html += "<p><button class='command'>Save</button></p>";
	html += "</form>";
	return html;
}
function render_button_form(commandJson) {
	var html = '';
	html += "<form action='#' method='post'>";
	html += "<p><label>Supported commands: LIGHTS_ON, LIGHTS_OFF, HEAT_ON, HEAT_OFF, COOL_ON, COOL_OFF"+
    "</label>";
	html += "<input name='comment'  value='" + html_escape(commandJson.address) +"'/></p>";
	html += "<p><button>Save</button></p>";
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
