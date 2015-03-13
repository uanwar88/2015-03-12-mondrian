window.onload = function() {
  var squares = document.getElementsByClassName('height');
  var palettes = document.getElementsByClassName('palette-color');
  var style;
  var color;

  for(var i = 0; i < palettes.length; i++) {
    palettes[i].onclick = function() {
      style = window.getComputedStyle(this);
      color = style.getPropertyValue('background-color');
    };
  };

  for(var i = 0; i < squares.length; i++) {
    squares[i].onclick = function() {
      this.style.backgroundColor = color;
    };
  };

  function save_colors() {
    var saved_colors_array = [];
    for(var i = 0; i < squares.length; i++) {
      var saved_style, saved_color;
      saved_style = window.getComputedStyle(squares[i]);
      saved_color = saved_style.getPropertyValue('background-color');
      saved_colors_array.push(saved_color);
    };
    return saved_colors_array;
  };

  function load() {

  };
};
