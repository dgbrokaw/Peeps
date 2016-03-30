var PeepGrid = (function() {
	var PeepGrid = function(container, options) {
		this.container = d3.select(container);

		this.options = extend(PeepGrid.defaultOptions, options);
		this.personSize = {width: 44, height: 102}
		this.tally = 0;
		this.selectMode = true;

		if (this.options.textbox) {
			this.textbox = d3.select(this.options.textbox);
			this.textbox.property('value', this.tally);
		}

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
	, scale: 1
	, margin_right: 10
	, margin_bottom: 10
	}

	PeepGrid.prototype.initSVGAndDefs = function() {
		this.svgSize = { width: (this.options.peoplePerRow * this.personSize.width) + 2
		               , height: (this.options.rows * this.personSize.height) + 12 }
		this.svgSize.width += (this.options.peoplePerRow - 1) * this.options.margin_right;
		this.svgSize.height += (this.options.rows - 1) * this.options.margin_bottom;

		this.svg = this.container.append('svg')
			.attr('width', this.svgSize.width*this.options.scale)
			.attr('height', this.svgSize.height*this.options.scale)
			.attr('viewBox', '0 0 ' + this.svgSize.width + ' ' + this.svgSize.height);

		this.personDef = this.svg.append('symbol')
			.attr('viewBox', '0 0 ' + this.personSize.width + ' ' + this.personSize.height)
			.append('g')
			.attr('id', 'person');

		// head of the person
		this.personDef.append('path')
			.attr('d', "M60.727,27.41c4.555,0,8.273-3.688,8.273-8.273c0-4.57-3.719-8.281-8.273-8.281c-4.57,0-8.281,3.711-8.281,8.281C52.445,23.723,56.156,27.41,60.727,27.41z")
			.attr('transform', 'translate(-37,0)')
			.attr({stroke: '#000000', 'stroke-width': '2px'});

		// body of the person
		this.personDef.append('path')
			.attr('d', "M49.484,107.762c0,2.562,2.086,4.664,4.648,4.664s4.648-2.102,4.648-4.664V68.793h3.898v38.969c0,2.562,2.062,4.664,4.625,4.664s4.648-2.102,4.648-4.664l0.039-67.18h3.859v24.766c0,4.992,6.484,4.992,6.461,0V40.035c0-5.492-4.25-10.867-10.688-10.867l-21.992-0.039c-5.859,0-10.578,4.812-10.578,10.758v25.461c0,4.938,6.531,4.938,6.531,0V40.582h3.93L49.484,107.762z")
			.attr('transform', 'translate(-37,0)')
			.attr({stroke: '#000000', 'stroke-width': '2px'});
	}

	PeepGrid.prototype.initPeeps = function() {
		this.grid = [];
		for (var j=0; j<this.options.rows; j++) {
			var row = [];
			for (var i=0; i<this.options.peoplePerRow; i++) {
				var x = i*this.personSize.width
				  , y = j*this.personSize.height;
				if (x > 0) x += i * this.options.margin_right;
				if (y > 0) y += j * this.options.margin_bottom;
				var peep = { el: this.svg.append('use')
										       .attr('xlink:href', '#person')
					                 .attr('x', x)
					                 .attr('y', y)
					                 .style('fill', 'none')
									 , filled: false }
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
			.on('dragstart', this.dragstart.bind(this))
    	.on('drag', this.dragmove.bind(this));
		return drag;
	}

	// If the drag starts on a filled peep, we switch off select mode and all peeps
	// we drag over will be unfilled and the tally will be decreased.
	PeepGrid.prototype.dragstart = function() {
		this.selectMode = true;
		var peep = this.getPeep(d3.event.sourceEvent.x, d3.event.sourceEvent.y);
		if (peep.filled) this.selectMode = false;
	}

	// Fills the peep, increments the tally.
	PeepGrid.prototype.dragmove = function() {
		console.log(d3.event);
		var peep = this.getPeep(d3.event.x, d3.event.y);
		if (this.selectMode && !peep.filled) {
			peep.el.style('fill', '#000000');
			peep.filled = true;
			this.tally++;
		} else if (!this.selectMode && peep.filled) {
			peep.el.style('fill', 'none');
			peep.filled = false;
			this.tally--;
		}
		if (this.textbox) this.textbox.property('value', this.tally);
	}

	PeepGrid.prototype.getPeep = function(x, y) {
		var r_x = Math.max(0, Math.min(Math.floor(x/(this.personSize.width+this.options.margin_right)), this.grid[0].length-1))
		  , r_y = Math.max(0, Math.min(Math.floor(y/(this.personSize.height+this.options.margin_bottom)), this.grid.length-1));
		var peep = this.grid[r_y][r_x];
		return peep;
	}

	PeepGrid.prototype.getTally = function() {
		return this.tally;
	}

	return PeepGrid;
})();
