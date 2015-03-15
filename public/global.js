window.onload = function() {
  // Declare variables shared by functions
  var squares = document.getElementsByClassName('height');
  var palettes = document.getElementsByClassName('palette-color');
  var style;
  var color;
  var js_req;

  // Define functions
  // Convert rgb to hex
  function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    };

  // Collect colors from canvas
  function return_colors() {
    var saved_colors_array = [];
    for(var i = 0; i < squares.length; i++) {
      var saved_style, saved_color;
      saved_style = window.getComputedStyle(squares[i]);
      saved_color = saved_style.getPropertyValue('background-color');
      saved_colors_array.push(rgb2hex(saved_color));
    };
    return saved_colors_array.join();
  };

  // Save mondrian to database
  function save_mondrian(colors_string) {
    // Retrieve params to send
    var mondrian_title = document.getElementById("mondrian_title").value;
    var params = "title=" + mondrian_title + "&colors=" + colors_string;
    // POST params to server
    js_req = new XMLHttpRequest();
    js_req.open("post", "/save_mondrian");
    js_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    js_req.send(params);
  }

// Load mondrian from database
  function load_mondrian(id) {
    var url = "/load_mondrian/" + id;
    js_req = new XMLHttpRequest();
    js_req.open("get", url);
    js_req.send();
  }

  // Set event listeners and corresponding events

  // Set color when clicking on palette color
  for(var i = 0; i < palettes.length; i++) {
    palettes[i].onclick = function() {
      style = window.getComputedStyle(this);
      color = style.getPropertyValue('background-color');
    };
  };

  // Set background color on canvas
  for(var i = 0; i < squares.length; i++) {
    squares[i].onclick = function() {
      this.style.backgroundColor = color;
    };
  };

  // Save mondrian on button click
  save_button = document.getElementById('save_mondrian');
  save_button.onclick = function() {
    colors = return_colors();
    save_mondrian(colors);
    js_req.addEventListener("load", function() {
      var container = document.getElementById("save-load-container");
      var exists_div = document.getElementById("message-div");
      if (exists_div != null) {
        container.removeChild(exists_div);
      }
      var message_div = document.createElement("div");
      message_div.setAttribute("id", "message-div");
      var message = document.createTextNode(js_req.response);
      message_div.appendChild(message);
      var mondrian_title = document.getElementById("mondrian_title");
      container.insertBefore(message_div, mondrian_title);
    });
  };

  // Load mondrian on button click
  load_button = document.getElementById('load_mondrian');
  load_button.onclick = function() {
    var datalist = document.getElementById("title_list_input");
    load_mondrian(datalist.value);
    js_req.addEventListener("load", function() {
      mondrian = JSON.parse(js_req.response);
      colors_array = mondrian.colors.split(",");
      for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors_array[i];
      }
    });
  };
};
