// var c = document.querySelector('canvas'),
// 		ct = c.getContext('2d'),
// 		w = c.width, h = c.height,
// 		k = .64,
// 		cell_size = 10, real_size = k*cell_size,
// 		nx = ~~(w/cell_size), offx = .5*(w%cell_size),
// 		ny = ~~(h/cell_size), offy = .5*(h%cell_size),
// 		cells = [], n;
// var rand = function(max, min, is_int) {
// 	var max = (max || max === 0)?max:1,
// 			min = min || 0,
// 			gen = min + (max - min)*Math.random();
// 	return (is_int)?Math.round(gen):gen;
// };
// var Cell = function(x, y) {
// 	this.x = x;
// 	this.y = y;
// 	this.f = .08/(1 + rand())*Math.PI;
// 	this.φ = rand(2*Math.PI);
// 	this.update = function(t) {
// 		var hue = (this.x/w*360 + 6.5*t)%360,
// 				l = 40 - 30*Math.cbrt(Math.sin(this.φ + t*this.f));
// 		ct.shadowColor = ct.fillStyle =
// 			'hsl(' + hue + ',100%,' + l + '%)';
// 		ct.shadowBlur = ~~((1 - k)*cell_size*l/10);
// 		ct.fillRect(this.x, this.y, real_size, real_size);
// 	}
// };
//
// for(var i = 0; i < nx; i++) {
// 	for(var j = 0; j < ny; j++) {
// 		cells.push(new Cell(offx + (i + .5*(1 - k))*cell_size, offy + (j + .5*(1 - k))*cell_size));
// 	}
// }
// n = cells.length;
// (function ani(t) {
// 	ct.clearRect(0, 0, w, h);
// 	for(var i = 0; i < n; i++) {
// 		cells[i].update(t);
// 	}
// 	requestAnimationFrame(ani.bind(this, ++t));
// })(0);
