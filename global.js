window.onload = function() {
  var squares = document.getElementsByClassName('square');
  var palettes = document.getElementsByClassName('palette-color');
  var style;
  var color;

  for(var i = 0; i < palettes.length; i++) {
    palettes[i].onclick = function() {
      style = window.getComputedStyle(this);
      color = style.getPropertyValue('background-color');
    };
  }

  for(var i = 0; i < squares.length; i++) {
    squares[i].onclick = function() {
      this.style.backgroundColor = color;
    };
  }
}
