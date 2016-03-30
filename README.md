# peeps
A grid of stick figures that are colored when dragged over.
If you start dragging on a filled figure, it will be unfilled and all others dragged over in the same motion will be unfilled.

To test, open `index.html`.

To use:

1) Include the files `peep-grid.js` and `d3.min.js`.

2) You need to create a div on the page, this will contain the grid.

3) Instantiate the grid with the call `new PeepGrid(<id-of-container>, options)`.

4) The options is an object (OPTIONAL).  

5) To get the number of highlighted people, call the method `getTally` on the object returned from the constructor.

Available options:

- "scale": size of people (default: 0.75)
- "rows": number of rows (default: 10)
- "peoplePerRow": the number of people in each row (default: 10)
- "margin_right": pixel count of space between each person horizontally (default: 10)
- "margin_bottom": pixel count of space between each person vertically (default: 10)
- "textbox": id of a textbox. the value of the textbox will be updated to the current tally (example: '#tally') (default: none)
