window.onload=function(){

const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

/*
// Listeners
cargarEventListeners();
function cargarEventListeners() {
  // При натискане на „Добави кошница“
  cursos.addEventListener('click', comprarCurso);
  // Когато курсо е премахнат от количката
  carrito.addEventListener('click', eliminarCurso);
  // Al Vaciar el carrito
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  // Al cargar el documento, mostrar LocalStorage
  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}
*/
function cargarEventListeners() { 

  // При натискане на „Добави в кошницата“ 

  cursos.addEventListener('click', comprarCurso); 

  // Когато премахваме продукт  от количката 

  carrito.addEventListener('click', eliminarCurso); 

  // Изпразваме цялата количка 

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito); 

  // При зареждане на документа показваме LocalStorage 

  document.addEventListener('DOMContentLoaded', leerLocalStorage); 

} 
  

// Функции 

function comprarCurso(e) { 

  e.preventDefault(); 

  //  

  if(e.target.classList.contains('agregar-carrito')) { 

    const curso = e.target.parentElement.parentElement; 

    // Изпращаме избрания продукт  

    leerDatosCurso(curso); 

  } 

} 

// Вземаме данните на продукта, който е избран 

function leerDatosCurso(curso) { 

  const infoCurso = { 

    imagen: curso.querySelector('img').src, 

    titulo: curso.querySelector('h4').textContent, 

    precio: curso.querySelector('.discount').textContent, 

    id: curso.querySelector('a').getAttribute('data-id') 

  } 

  insertarCarrito(infoCurso); 

} 

//Въвеждаме данните в  кощницата 

function insertarCarrito(curso) { 

  const row = document.createElement('tr'); 

  row.innerHTML = ` 

  <td> 

  <img src="${curso.imagen}" width=100> 

  </td> 

  <td>${curso.titulo}</td> 

  <td>${curso.precio}</td> 

  <td> 

  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> 

  </td> 

  `; 

  listaCursos.appendChild(row); 

  guardarCursoLocalStorage(curso); 

} 

 function eliminarCurso(e) { 

  e.preventDefault(); 

  let curso, 

      cursoId; 

  if(e.target.classList.contains('borrar-curso') ) { 

    e.target.parentElement.parentElement.remove(); 

    curso = e.target.parentElement.parentElement; 

    cursoId = curso.querySelector('a').getAttribute('data-id'); 

  } 

  eliminarCursoLocalStorage(cursoId); 

} 

  

// Премахнете продуктите от количката 

function vaciarCarrito() { 

  // forma lenta 

  // listaCursos.innerHTML = ''; 

  // forma rapida (recomendada) 

  while(listaCursos.firstChild) { 

    listaCursos.removeChild(listaCursos.firstChild); 

  } 

  

  // Изпразваме съдържанието от колчката 

  vaciarLocalStorage(); 

  return false; 

} 

  

// Функция,която съхранява данните в количката 

function guardarCursoLocalStorage(curso) { 

  let cursos; 

  // Вземат се стойността на масив  или празни данни 

  cursos = obtenerCursosLocalStorage(); 

  // Избраните данни се добавят към масива 

  cursos.push(curso); 

  localStorage.setItem('cursos', JSON.stringify(cursos) ); 

} 

  

// Проверява се дали има елементи в Local Storage 

function obtenerCursosLocalStorage() { 

  let cursosLS; 

  // проверяваме дали има нещо в localStorage 

  if(localStorage.getItem('cursos') === null) { 

    cursosLS = []; 

  } else { 

    cursosLS = JSON.parse( localStorage.getItem('cursos') ); 

  } 

  return cursosLS; 

} 

  

// Поставя продукта в количката 

function leerLocalStorage() { 

  let cursosLS; 

  cursosLS = obtenerCursosLocalStorage(); 

  cursosLS.forEach(function(curso){ 

  // Създаваме темплейта 

  const row = document.createElement('tr'); 

  row.innerHTML = ` 

  <td> 

  <img src="${curso.imagen}" width=100> 

  </td> 

  <td>${curso.titulo}</td> 

  <td>${curso.precio}</td> 

  <td> 

  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a> 

  </td> 

  `; 

  listaCursos.appendChild(row); 

  }); 

} 

  

function eliminarCursoLocalStorage(curso) { 

  let cursosLS; 

  // Получаваме  продукта 

  cursosLS = obtenerCursosLocalStorage(); 

  // Сравняваме id-то на продукта с това от LocalStoragе 

  cursosLS.forEach(function(cursoLS, index) { 

    if(cursoLS.id === curso) { 

      cursosLS.splice(index, 1); 

    } 

  }); 

  localStorage.setItem('cursos', JSON.stringify(cursosLS) ); 

} 

function vaciarLocalStorage() { 

  localStorage.clear(); 

} 

} 


/*
// Funciones
// Función que añade el curso al carrito
function comprarCurso(e) {
  e.preventDefault();
  // Delegation para agregar-carrito
  if(e.target.classList.contains('agregar-carrito')) {
    const curso = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
  }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.discount').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
  }
  insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el Carrito
function insertarCarrito(curso) {
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${curso.imagen}" width=100>
  </td>
  <td>${curso.titulo}</td>
  <td>${curso.precio}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
  </td>
  `;
  listaCursos.appendChild(row);
  guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
  e.preventDefault();
  let curso,
      cursoId;
  if(e.target.classList.contains('borrar-curso') ) {
    e.target.parentElement.parentElement.remove();
    curso = e.target.parentElement.parentElement;
    cursoId = curso.querySelector('a').getAttribute('data-id');
  }
  eliminarCursoLocalStorage(cursoId);
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
  // forma lenta
  // listaCursos.innerHTML = '';
  // forma rapida (recomendada)
  while(listaCursos.firstChild) {
    listaCursos.removeChild(listaCursos.firstChild);
  }

  // Vaciar Local Storage
  vaciarLocalStorage();
  return false;
}

// Almacena cursos en el carrito a Local Storage
function guardarCursoLocalStorage(curso) {
  let cursos;
  // Toma el valor de un arreglo con datos de LS o vacio
  cursos = obtenerCursosLocalStorage();
  // el curso seleccionado se agrega al arreglo
  cursos.push(curso);
  localStorage.setItem('cursos', JSON.stringify(cursos) );
}

// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage() {
  let cursosLS;
  // comprobamos si hay algo en localStorage
  if(localStorage.getItem('cursos') === null) {
    cursosLS = [];
  } else {
    cursosLS = JSON.parse( localStorage.getItem('cursos') );
  }
  return cursosLS;
}

// Imprime los cursos de Local Storage en el carrito
function leerLocalStorage() {
  let cursosLS;
  cursosLS = obtenerCursosLocalStorage();
  cursosLS.forEach(function(curso){
  // constrir el template
  const row = document.createElement('tr');
  row.innerHTML = `
  <td>
  <img src="${curso.imagen}" width=100>
  </td>
  <td>${curso.titulo}</td>
  <td>${curso.precio}</td>
  <td>
  <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
  </td>
  `;
  listaCursos.appendChild(row);
  });
}

// Elimina el curso por el ID en Local Storage
function eliminarCursoLocalStorage(curso) {
  let cursosLS;
  // Obtenemos el arreglo de cursos
  cursosLS = obtenerCursosLocalStorage();
  // Iteramos comparando el ID del curso borrado con los del LS
  cursosLS.forEach(function(cursoLS, index) {
    if(cursoLS.id === curso) {
      cursosLS.splice(index, 1);
    }
  });
  // Añadimos el arreglo actual a storage
  localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

// Elimina todos los cursos de Local Storage
function vaciarLocalStorage() {
  localStorage.clear();
}
}
*/