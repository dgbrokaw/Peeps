var PeepGrid = (function() {
	var PeepGrid = function(container, options) {
		this.container = d3.select(container);
		// this.personSize = {width: 118, height: 118}
		this.personSize = {width: 118, height: 118}
		this.options = extend(PeepGrid.defaultOptions, options);
		this.initSVGAndDefs();
		this.initPeeps();
	}

	PeepGrid.defaultOptions = {
		rows: 10
	, peoplePerRow: 10
	, scale: 1
	}

	PeepGrid.prototype.initSVGAndDefs = function() {
		this.svgSize = { width: this.options.peoplePerRow * this.personSize.width
		               , height: this.options.rows * this.personSize.height }

	  console.log(this.personSize);

		this.svg = this.container.append('svg')
			// .attr('viewBox', '0 0 ' + this.svgSize.width + ' ' + this.svgSize.height);
			.attr('viewBox', '0 0 ' + this.personSize.width + ' ' + this.personSize.height);
			// .attr('viewBox', '0 0 ' + 10 + ' ' + 10);

		this.personDef = this.svg.append('defs')
			.append('g')
			.attr('id', 'person')
			// .attr('width', '100px')
			// .attr('height', '100px')

		// background (not visible)
		this.personDef.append('path')
			.attr('id', 'person-background')
			.attr('d', "M13.945,1.91c-6.758,0-12.25,5.5-12.25,12.258v94.039c0,6.734,5.492,12.227,12.25,12.227h94.023c6.766,0,12.258-5.492,12.258-12.227V14.168c0-6.758-5.492-12.258-12.258-12.258H13.945z")
			.attr('fill', '#FFFFFF');

		// head of the person
		this.personDef.append('path')
			.attr('id', 'person-head')
			.attr('d', "M60.727,27.41c4.555,0,8.273-3.688,8.273-8.273c0-4.57-3.719-8.281-8.273-8.281c-4.57,0-8.281,3.711-8.281,8.281C52.445,23.723,56.156,27.41,60.727,27.41z")
			.attr({stroke: '#000000', 'stroke-width': '2px'});

		// body of the person
		this.personDef.append('path')
			.attr('id', 'person-body')
			.attr('d', "M49.484,107.762c0,2.562,2.086,4.664,4.648,4.664s4.648-2.102,4.648-4.664V68.793h3.898v38.969c0,2.562,2.062,4.664,4.625,4.664s4.648-2.102,4.648-4.664l0.039-67.18h3.859v24.766c0,4.992,6.484,4.992,6.461,0V40.035c0-5.492-4.25-10.867-10.688-10.867l-21.992-0.039c-5.859,0-10.578,4.812-10.578,10.758v25.461c0,4.938,6.531,4.938,6.531,0V40.582h3.93L49.484,107.762z")
			.attr({stroke: '#000000', 'stroke-width': '2px'});
	}

	PeepGrid.prototype.initPeeps = function() {
		this.svg.append('use')
			.attr('xlink:href', '#person')
			.attr('x', 0)
			.attr('y', 0)
			// .attr('x', -(this.personSize.width * 0.5))
			// .attr('y', -(this.personSize.height * 0.5));

		// for (var j=0; j<this.options.rows; j++) {
		// 	for (var i=0; i<this.options.peoplePerRow; i++) {
		// 		console.log(i*this.personSize.width);
		// 		this.svg.append('use')
		// 			.attr('xlink:href', '#person')
		// 			.attr('x', i*this.personSize.width*0.5)
		// 			.attr('y', j*this.personSize.height*0.5);
		// 	}
		// }
	}

	return PeepGrid;
})();
