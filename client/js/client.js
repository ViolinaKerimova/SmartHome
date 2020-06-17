// This is a global variable with all rows of the "teltypes" table.
var light=[];
var heater=[];
var cooler=[];
function reload_Light() {
	$.get('http://localhost:8090/smarthome/measurements/light/latest').done(function(data) {
		//$.get('http://localhost:8090/smarthome/measurements/light/latest').done(function(data) {
		$('#Light').html(render_Light(data));
		$('#Light-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#Light-messages').html(render_messages(data.messages));
	});
}
function reload_Temp() {
	$.get('http://localhost:8090/smarthome/measurements/temperature/latest').done(function(data) {
		$('#Temp').html(render_Temp(data));
		$('#Temp-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#Temp-messages').html(render_messages(data.messages));
	});
}
function reload_Command(light,heater,cooler){
	$.get('http://localhost:8090/smarthome/device?light='+ light  +'&heater=' +heater +'&cooler='+ cooler ).done(function(data) {
		$('#command').html(render_Getcommand(data.light, data.heater,data.cooler));
		$('#command-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#command-messages').html(render_messages(data.messages));
	});
}
$(document).ready(function() {
	setTimeout(function(){
		reload_Light();
		reload_Temp();
		reload_Command(light,heater,cooler);
		
	/*
		$(document).on('click', 'button.light', function() {
			var new_light= { command: '' };
			$('#light').html(render_light(new_light));
			$('#light-messages').html('');
			return false;
		});
*/
		
		$(document).on('click', 'button.command', function() {
			var command = $(this).attr('switch');
			var commandJson = { command: command };
			console.log(commandJson);
			$('#commandJson').html('');
			$.postJSON('http://localhost:8090/smarthome/device/command/' + commandJson).done(function(data) {
				$('#commandJson').html('');
				$('#commandJson-messages').html(render_messages(data.messages));
				reload_Command();
			}).fail(function(response) {
				var data = response.responseJSON;
				$('#commandJson-messages').html(render_messages(data.messages));
			});
			return false;
		});
		

	},400);
});