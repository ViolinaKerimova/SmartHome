// All these function render piece of HTML to plug into the DOM tree.
// The HTML can be plugged using $('#id').html(new_html);

function render_measurements(measurements) {
var html = "";
	for(var i=0; i<measurements.length; i++) {
			var m = measurements[i];
			html += "<tr>" +
		   "<div class='row'>"+
		   "<div class='column' style='background-color:pink;'>"+	
			 "<h4>" + html_escape(m.type) +"</h4>"+
			 "<h4>" + html_escape(m.unit) +"</h4>"+
		    "<h4>" + m.value +"</h4>"+
		    "<h4>" + html_escape(m.timestamp) +"</h4>"+
			"</div>" +
			"</div>"
			"</tr>"
			
	}
	html = "<table class='grid'>"+html+"</table>";
	return html;
}
function render_picturesman(man) {
	var a=15;
var html = "";
	for(var i=0; i<man.length; i++) {
		var p = man[i];
		html += "<form action='#' method='post'>"+
	"<div class='cursos__container'>"+
          "<div class='curso__item'>"+
          "<div class='curso__card'>"+
          //"<img src='"+ html_escape(p.name) +"' class='imagen__curso'>"+class='agregar-carrito' id= 'addToCart' 
          "<div class='info__card'>"+
            "<h4>HTML5, CSS3, JavaScript para Principiantes</h4>"+
            "<img src='"+ html_escape(p.name) +"' class='imagen__curso'>"+
			"<p><label>Count:</label><input name='data-count-id' value='"  + "'/></p>"+
			
            "<p><span class='precio'>$" + (p.price*1+(a+1)) + "</span> <span class='discount'>$" + p.price +"</span></p>"+
          //  "<a href='#' class='agregar-carrito' data-id=" + p.id +"><i class='fa fa-cart-plus'></i>&nbsp;  ADD TO CART</a>"+
             "<a href='#' class='Shoppingcar'  data-price-id=" + p.price+" data-shopping-id=" + p.id +"><i class='fa fa-cart-plus'></i>&nbsp;  ADD TO CART</a>"+
		  "</div>"+
       " </div>"+
      "</div>"+"</form>";
	}
	return html;
}
function render_car(car) {
var html = "";
var total=0;
	for(var i=0; i<car.length; i++) {
		var p = car[i];
		total=total + p.price;
		html +=    "<tbody>"+
		"<tr>"+
			"<td>" + p.picture_id +"</td>"+
			  "<td>"+ p.price +"</td>"+
			  "<td>"+ p.count +"</td>"+
            "<td>" + "<a href='#'  class= 'Shoppingcar-delete' data-picture-id=" + p.picture_id +"> X </a>"+"</td>"+
          "</tr>"+
		 "</tbody>";
	}
	//html += "Total price: "+ total ;
	return html;
}
function render_pictureswoman(woman) {
	var a=15;
var html = "";
	for(var i=0; i<woman.length; i++) {
		var p = woman[i];
		html +=  "<div class='cursos__container'>"+
          "<div class='curso__item'>"+
          "<div class='curso__card'>"+
          //"<img src='"+ html_escape(p.name) +"' class='imagen__curso'>"+
          "<div class='info__card'>"+
            "<h4 >"+ html_escape(p.color) + " ViolaStyle..."+"</h4>"+
            "<img src='"+ html_escape(p.name) +"' class='imagen__curso'>"+
            "<p><span class='precio'>$" + (p.price*1+(a+1)) + "</span> <span class='discount'>$" + p.price +"</span></p>"+
            "<a href='#' class='agregar-carrito' data-id=" + p.id +"><i class='fa fa-cart-plus'></i>&nbsp;  ADD TO CART</a>"+
          "</div>"+
       " </div>"+
      "</div>";
	}
	return html;
}
/*
function render_pictureswoman(woman) {
var html = "";
		
	for(var i=0; i<woman.length-3; i++) {
			var p = woman[i];
			i++;
			html += "<tr>" +
		   "<div class='col'>"+
		   "<div class='cont' style='background-color:pink;'>"+	
			  "<img src="+ html_escape(p.name) +" alt='Lights' style='background-color:pink;width:100%'>"+
			  "<h4>" + p.price +"</h4>"+
			  "<p>"+ p.category +"</p>"+
			"</div>" +
			"</div>"
			"</tr>"
			
	}
	html = "<table class='grid'>"+html+"</table>";
	return html;
}*/
/*
function render_person_form(person) {
	if(!person) return 'Empty person.';
	
	var html = '';
	var title = (person.id) ? 'Edit Person' : 'Add Person';
	
	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(person.id) + "' readonly='readonly' /></p>";
	html += "<p><label>First Name</label><input name='fname' value='" + html_escape(person.fname) + "'/></p>";
	html += "<p><label>Last Name</label><input name='lname' value='" + html_escape(person.lname) + "'/></p>";
	html += "<p><label>Address</label><input name='address' value='" + html_escape(person.address) + "'/></p>";
	html += "<p><button>Save</button></p>";
	html += "</form>";
	
	return html;
}

// TELEPHONES
function render_telephones(person, telephones) {	
	var html = '';
	
	html += "<p class='user_icon'>"+
			"<b>" + html_escape(person.fname + " " + person.lname) + "</b>, "+ 
			html_escape(person.address) + 
		"</p>";
	
	html += "<table class='grid'>";
	html += "<tr>"+
		"<th>ID</td>"+
		"<th>Number</th>"+
		"<th>Type</th>"+
		"<th></th>"+
	"</tr>";
	for(var i=0; i<telephones.length; i++) {
		var tel = telephones[i];
		var teltype = get_teltype(tel.teltype_id);
		html += "<tr>"+
			"<td>" + tel.id + "</td>" +
			"<td>" + html_escape(tel.number) + "</td>" +
			"<td>" + html_escape(teltype.name) + "</td>" +
			"<td>" +
				"<a href='#' data-person-id='" + person.id + "' data-telephone-id='" + tel.id + "' class='edit_icon telephone-edit'>Edit</a> " +
				"<a href='#' data-person-id='" + person.id + "' data-telephone-id='" + tel.id + "' class='delete_icon telephone-delete'>Delete</a>" +
			"</td>"+
		"</tr>";
	}
	html += "</table>";
	
	html += "<p>" +
		"<a href='#' data-person-id='" + person.id + "' class='add_icon telephone-add'>Add New Telephone</a> " +
		"<a href='#' data-person-id='" + person.id + "' class='refresh_icon telephones-refresh'>Refresh</a>" +
		"</p>";

	return html;
}
*/
function render_pictures_form(car) {
	if(!car) return 'Empty car.';
	
	var html = '';
	var title = (car.id) ? 'Edit car' : 'Add car';
	
	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(car.id) + "' readonly='readonly' /></p>";
	html += "<p><label>PICTURE_ID</label><input name='picture_id' value='" + html_escape(car.picture_id) + "' readonly='readonly' /></p>";
	html += "<p><label>Number</label><input name='number' value='" + html_escape(car.number) + "'/></p>";
	
	html += "<p><label>Type</label>";
	html += "<select name='teltype_id' class='txt medium'>";
	html += "<option value=''> </option>";
	for(var i = 0; i < TELTYPES.length; i++) {
		var teltype = TELTYPES[i];
		var selected = (car.teltype_id === teltype.id) ? 'selected' : '';
		html += "<option value='" + teltype.id + "' " + selected + ">" + teltype.name + "</option>";
	}
	html += "</select>";
	html += "</p>";

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
/*
function get_teltype(teltype_id) {
	// TELTYPES is global variable preloaded on client start.
	for(var i=0; i < TELTYPES.length; i++) {
		if(TELTYPES[i].id == teltype_id) {
			return TELTYPES[i];
		}
	}
	return null;
}
	*/
function html_escape(val) {
	return (val+'')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&apos;');
}
