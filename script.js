//! пример анимации "солнечная система": https://developer.mozilla.org/ru/docs/Web/API/Canvas_API/Tutorial/Basic_animations#%D0%B0%D0%BD%D0%B8%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0
// Создаёт новый элемент изображения
var sun = new Image();
var moon = new Image();
var earth = new Image();
function init(){
  
 // Устанавливает путь 
  sun.src = 'canvas_sun.png'; // космос и солнце
  moon.src = 'canvas_moon.png'; // луна
  earth.src = 'canvas_earth.png'; // земля

  window.requestAnimationFrame(draw); //! первый запуск draw (функции с анимацией)
}

function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
// чтобы земля и луна были НАД фоном солца
  ctx.globalCompositeOperation = 'destination-over'; 
  ctx.clearRect(0,0,300,300); // clear canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)'; // цвет тени
  ctx.strokeStyle = 'rgba(0,153,255,0.4)'; // цвет орбиты
  ctx.save(); // сохранить все свойства (состояние)
//Перемещение холста на сетке. x и y - смещение по горизонтали и вертикали соответственно.
  ctx.translate(150,150); // тень поварачивается вокруг своей оси

  // Earth
  var time = new Date();
// Поворачивает наш холст по часовой стрелке вокруг начальной точки на угол anglе в радианах.
//! в rotate - используется время, основовываясь на нем положение меняется, и будет тоже, если обновить страницу, время же тоже самое осталось
//! данные поворота, со временем меняются - и функция их фоткает в разных положениях
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  ctx.translate(105,0); // (x, y) - движение земли по орбите
  ctx.fillRect(0,-12,50,15); // прямоугольник тени
  ctx.drawImage(earth,-12,-12);

  // Moon
  ctx.save();
// Поворачивает наш холст по часовой стрелке вокруг начальной точки на угол anglе в радианах.
  ctx.rotate( ((2*Math.PI)/6)*time.getSeconds() + ((2*Math.PI)/6000)*time.getMilliseconds() );
  // перемещение холста
  ctx.translate(0,28.5); 
  ctx.drawImage(moon,-3.5,-3.5);
  ctx.restore(); // если убрать восстановление - будет всё крутится - почему 2 я хз

  ctx.restore(); // если убрать восстановление - будет всё крутится

  ctx.beginPath();
  ctx.arc(150,150,105,0,Math.PI*2,false); // орбита
  ctx.stroke(); // обводит текущий или данный контур цветом strokeStyle (который уже задан в начале).

  ctx.drawImage(sun,0,0,300,300); // размер и позиция солнца
// метод, как кадры, зависит от монитора, но обычно 60кадров / сек
  window.requestAnimationFrame(draw); //! следущий запуск draw и так по циклу
}

init();