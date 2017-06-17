var render_event = function(description) {
  return "<li class='list-group-item'>" + description + "</li>";
}

$(document).ready(function() {
  var current_date = new Date().toISOString().slice(0,10);
  $('input[type="date"]').val(current_date);

  $('#reset-btn').click(function() {
    localStorage.clear();
    $('#descriptions-wrap').html('No events found');
  });

  $('input[type="date"]').change(function(){
    var date = new Date(this.value);

    if (localStorage.descriptions) {
      var data = JSON.parse(localStorage['descriptions']);
      descriptions = data[date.toString()];

      if (typeof(descriptions) !== "undefined") {
        $('#descriptions-wrap').empty();
        $.each(descriptions, function(index, value) {
          $('#descriptions-wrap').append(render_event(value));
        });
      } else {
        $('#descriptions-wrap').html('No events found');
      }

    }
  });

  $('#event-form').submit(function(event) {
    event.preventDefault();
    var description = $('#event-description').val();
    var date = new Date($('input[type="date"]').val());

    if (typeof(Storage) !== "undefined") {

      if (localStorage.descriptions) {
        var data = JSON.parse(localStorage['descriptions']);
      } else {
        var data = {};
        $('#descriptions-wrap').empty();
      }

      if (typeof(data[date.toString()]) !== "undefined") {
        data[date.toString()].push(description);
      } else {
        data[date.toString()] = [description];
        $('#descriptions-wrap').empty();
      }

      $('#descriptions-wrap').append(render_event(description));
      $('#event-description').val('');
      localStorage['descriptions'] = JSON.stringify(data);
    }

    return false;
  });
})
