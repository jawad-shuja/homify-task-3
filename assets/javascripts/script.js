var render_event = function(description) {
  return "<li class='list-group-item'>" + description + "</li>";
}

$(document).ready(function() {
  var current_date = new Date().toISOString().slice(0,10);
  $('input[type="date"]').val(current_date);

  if (typeof(Storage) == "undefined") {
    $('#descriptions-wrap').hide();
  }

  $('#reset-btn').click(function() {
    if (typeof(Storage) !== "undefined") {
      localStorage.clear();
    } else {
      $('.dynamic-list').remove();
    }
    $('#descriptions-wrap').html('No events found');
  });

  $('input[type="date"]').change(function(){
    var date = new Date(this.value);

    if (typeof(Storage) !== "undefined") {
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
    } else {
      $('.dynamic-list').hide();
      $('.dynamic-list#list-' + date.toISOString().slice(0,10)).show();
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
    } else { // If Local Storage not supported
      $('.dynamic-list').hide();
      var selector = '#list-' + date.toISOString().slice(0,10);
      if ($(selector + ' > li').length > 0) {
        $(selector).show()
      } else {
        $('#descriptions-wrap').after("<ul class='dynamic-list' id='list-" + date.toISOString().slice(0,10) + "'></ul>");
      }
      $(selector).append(render_event(description));
    }

    return false;
  });
})
