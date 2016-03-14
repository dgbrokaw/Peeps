var PeepGrid = (function() {
	var PeepGrid = function(container, options) {
		this.container = d3.select(container);
		this.options = extend(PeepGrid.defaultOptions, options);
		this.personSize = {width: 118, height: 118}
		this.tally = 0;
		this.initSVGAndDefs();
		this.initPeeps();
		this.initEvents();
	}

	function extend(a, b) {
	  if (typeof(b) === 'object') for (var key in b) a[key] = b[key];
	  return a;
	}

	PeepGrid.defaultOptions = {
		rows: 10
	, peoplePerRow: 10
	, scale: 0.75
	}

	PeepGrid.prototype.initSVGAndDefs = function() {
		this.svgSize = { width: this.options.peoplePerRow * this.personSize.width
		               , height: this.options.rows * this.personSize.height }

		this.svg = this.container.append('svg')
			.attr('width', this.svgSize.width*this.options.scale)
			.attr('height', this.svgSize.height*this.options.scale)
			.attr('viewBox', '0 0 ' + this.svgSize.width + ' ' + this.svgSize.height);

		this.personDef = this.svg.append('symbol')
			.attr('viewBox', '0 0 ' + this.personSize.width + ' ' + this.personSize.height)
			.append('g')
			.attr('id', 'person');

		// background (not visible)
		this.personDef.append('path')
			.attr('d', "M13.945,1.91c-6.758,0-12.25,5.5-12.25,12.258v94.039c0,6.734,5.492,12.227,12.25,12.227h94.023c6.766,0,12.258-5.492,12.258-12.227V14.168c0-6.758-5.492-12.258-12.258-12.258H13.945z")
			.attr('fill', '#FFFFFF');

		// head of the person
		this.personDef.append('path')
			.attr('d', "M60.727,27.41c4.555,0,8.273-3.688,8.273-8.273c0-4.57-3.719-8.281-8.273-8.281c-4.57,0-8.281,3.711-8.281,8.281C52.445,23.723,56.156,27.41,60.727,27.41z")
			.attr({stroke: '#000000', 'stroke-width': '2px'});

		// body of the person
		this.personDef.append('path')
			.attr('d', "M49.484,107.762c0,2.562,2.086,4.664,4.648,4.664s4.648-2.102,4.648-4.664V68.793h3.898v38.969c0,2.562,2.062,4.664,4.625,4.664s4.648-2.102,4.648-4.664l0.039-67.18h3.859v24.766c0,4.992,6.484,4.992,6.461,0V40.035c0-5.492-4.25-10.867-10.688-10.867l-21.992-0.039c-5.859,0-10.578,4.812-10.578,10.758v25.461c0,4.938,6.531,4.938,6.531,0V40.582h3.93L49.484,107.762z")
			.attr({stroke: '#000000', 'stroke-width': '2px'});
	}

	PeepGrid.prototype.initPeeps = function() {
		this.grid = [];
		for (var j=0; j<this.options.rows; j++) {
			var row = [];
			for (var i=0; i<this.options.peoplePerRow; i++) {
				var peep = this.svg.append('use')
					.attr('xlink:href', '#person')
					.attr('x', i*this.personSize.width)
					.attr('y', j*this.personSize.height)
					.style('fill', 'none');
				row.push(peep);
			}
			this.grid.push(row);
		}
	}

	PeepGrid.prototype.initEvents = function() {
		var dragB = this.setupDrag();
		var pane = this.svg.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', this.svgSize.width)
			.attr('height', this.svgSize.height)
			.style({'fill': 'none', 'pointer-events': 'all'});
		pane.call(dragB);
	}

	PeepGrid.prototype.setupDrag = function() {
		var drag = d3.behavior.drag()
    	.on('drag', this.dragmove.bind(this));
		return drag;
	}

	PeepGrid.prototype.dragmove = function() {
		var x = d3.event.x
		  , y = d3.event.y;
		var peep = this.getPeepAndTally(x, y);
		if (peep) peep.style('fill', '#000000');
	}

	PeepGrid.prototype.getPeepAndTally = function(x, y) {
		var r_x = Math.floor(x/(this.personSize.width))
		  , r_y = Math.floor(y/(this.personSize.width));
		var peep = this.grid[r_y][r_x]
		if (peep) {
			this.tally++;
			this.grid[r_y][r_x] = false;
		}
		return peep;
	}

	PeepGrid.prototype.getTally = function() {
		return this.tally;
	}

	return PeepGrid;
})();
