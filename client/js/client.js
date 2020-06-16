// This is a global variable with all rows of the "teltypes" table.

function reload_Light() {
	$.get('http://localhost:8090/smarthome/measurements/light/latest').done(function(data) {
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
$(document).ready(function() {
	reload_Light();
	reload_Temp();
    //reload_picturesman();
    //reload_pictureswoman();
	$(document).on('click', 'a.persons-refresh', function() {
		reload_measurement();
		return false; // disables default browser behavior when a hyper-link is clicked.
	});

	$(document).on('click', 'a.person-add', function() {
		var new_person = { id: '', fname: '', lname: '',	address: '' };
		$('#person-edit').html(render_person_form(new_person));
		$('#person-messages').html('');
		return false;
	});

	$(document).on('click', 'a.person-edit', function() {
		var person_id = $(this).attr('data-person-id');
		$.get('persons/'+person_id).done(function(data) {
			$('#person-edit').html(render_person_form(data.person));	
			$('#person-messages').html(render_messages(data.messages));
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#person-messages').html(render_messages(data.messages));
		});
		return false;
	});
	$(document).on('click', 'a.Shoppingcar', function() {
		var picture_id = $(this).attr('data-shopping-id');
		//var count = $(this).attr('data-count-id');
		var price = $(this).attr('data-price-id');
		var selected = $(this).serializeObject();
		console.log();
		var car = { picture_id: picture_id, count: 1, price:price };
		$('#car').html('');
		$.postJSON('car/' + picture_id, car).done(function(data) {
			$('#car').html('');
			$('#car-messages').html(render_messages(data.messages));
			reload_car();
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#car-messages').html(render_messages(data.messages));
		});
		return false;
	});
	$(document).on('click', 'a.Shoppingcar-delete', function() {
		var picture_id = $(this).attr('data-picture-id');
		$.delete('car/' + picture_id).done(function(data) {
			reload_car();
			$('#car-messages').html(render_messages(data.messages));
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#car-messages').html(render_messages(data.messages));
		});
		return false;
	});


	// TELEPHONES
	$(document).on('click', 'a.person-telephones, a.telephones-refresh', function() {
		var person_id = $(this).attr('data-person-id');
		reload_telephones(person_id);
		$('#telephone-edit').html('');
		$('#telephone-messages').html('');
		return false;
	});

	$(document).on('click', 'a.telephone-delete', function() {
		var telephone_id = $(this).attr('data-telephone-id');
		var person_id = $(this).attr('data-person-id');
		$.delete('telephones/' + telephone_id).done(function(data) {
			reload_telephones(person_id);
		});
		return false;
	});

	$(document).on('click', 'a.telephone-edit', function() {
		var telephone_id = $(this).attr('data-telephone-id');
		$.get('telephones/'+telephone_id).done(function(data){
			$('#telephone-edit').html(render_telephone_form(data.telephone));
			$('#telephone-messages').html(render_messages(data.messages));					
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#telephone-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('click', 'a.addToCart', function() {
		var product = $(this).serializeObject();
		var car = { id: '', product_id: product_id, number: '', teltype_id: '' };
		$('#telephone-edit').html(render_telephone_form(new_telephone));
		$('#telephone-messages').html('');
		return false;
	});

	$(document).on('submit', '#babyman-edit > form', function() {
		var telephone = $(this).serializeObject();
		$.postJSON('car/' + pictures.id, telephone).done(function(data) {
			$('#telephone-edit').html('');
			$('#telephone-messages').html(render_messages(data.messages));
			reload_telephones(telephone.person_id);
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#telephone-messages').html(render_messages(data.messages));
		});
		return false;
	});
});