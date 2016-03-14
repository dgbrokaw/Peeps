# peeps
A grid of stick figures that are colored when dragged over.

To test, open `index.html`.

To use:
1) Include the files `peep-grid.js` and `d3.min.js`.
2) You need to create a div on the page, this will contain the grid.
3) Instantiate the grid with the call `new PeepGrid(<id-of-container>, options)`.
4) The options is an object.  You can change the size by passing in the option "scale."  The default is 0.75.
