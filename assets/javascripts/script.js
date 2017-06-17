$(document).ready(function() {
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
          $('#descriptions-wrap').append('<p>' + value + '</p>');
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
      $('#descriptions-wrap').empty();

      if (localStorage.descriptions) {
        var data = JSON.parse(localStorage['descriptions']);
      } else {
        var data = {};
      }

      if (typeof(data[date.toString()]) !== "undefined") {
        data[date.toString()].push(description);
      } else {
        data[date.toString()] = [description];
      }

      $('#descriptions-wrap').append('<p>' + description + '</p>');
      localStorage['descriptions'] = JSON.stringify(data);
    }

    return false;
  });
})
