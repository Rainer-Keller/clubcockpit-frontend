// security.fileuri.strict_origin_policy
//
// TODO:
// Dialog field check
// Copy Paste zu classes und workshops
//
function Events() {
  this.events = [];
  this.counter = 0;
  return this;
}

Events.prototype.updateView = function() {
    $("#events").html('<div class="list-group"></div>');

    if (this.events.length == 0) {
          $("#events div:first").append('\
              <a class="list-group-item"> keine Events vorhanden </a> '
              );
    }

    for (var i in this.events) {
      var item = this.events[i];
      var icon;

      if (item.type == "class") {
        icon = '<i class="fa fa-certificate"></i>';
      } else if (item.type == "workshop") {
        icon = '<i class="fa fa-graduation-cap"></i>';
      } else if (item.type == "event") {
        icon = '<i class="fa fa-bolt"></i>';
      }

      icon += ' ';

      $("#events div:first").append('\
          <a class="list-group-item"> \
            <b>' + icon + item.title + '</b>' +
            '<br><span class="fa fa-calendar"></span> ' + item.date +
            '<br><span class="fa fa-map-marker"></span> ' + item.location +
            '<div class="btn-group pull-right">' +

            (!item.disabled ? '\
                <button type="button" class="btn btn-sm btn-primary" onclick="editEventDialog(' + i + ')"><i class="fa fa-pencil" aria-hidden="true"></i></button>\
                <button type="button" class="btn btn-sm btn-danger" onclick="removeEventDialog(' + i + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>\
                '
                :
                ' <button type="button" class="btn btn-sm btn-primary" onclick="viewEventDialog(' + i + ')"><i class="fa fa-eye" aria-hidden="true"></i></button>') +
            '</div> \
            </a> \
            ');
    }

      if (this.events.length) {
          $('#eventsBadge').show();
          $('#eventsBadge').text(this.events.length);
      } else
          $('#eventsBadge').hide();
}

Events.prototype.addEvent = function(item) {
    this.events.push(item);
}

Events.prototype.removeEvent = function(index) {
    this.events.splice(index, 1);
}

Events.prototype.load = function() {
  var self = this;

  var jqx = $.getJSON("events.json", function() {})
  .done(function( data ) {
    for(var i in data) {
        Events.prototype.addEvent.call(self, data[i]);
    }
    Events.prototype.updateView.call(self);
    $("#buttonNew").removeAttr("disabled");
  }
  )
    .fail(function(obj) {
      $("#events").text("Fehler beim Laden der Daten: " + obj.statusText + ":" + obj.status);
    })
}

function setupDialog(title, item) {
  $('#eventModal .modal-title').text(title);
  $('#eventModal #title').val(item.title);
  $('#eventModal #location').val(item.location);
  $('#eventModal #date').val(item.date);
  $('#eventModal #time').val(item.time);
  $('#eventModal #description').val(item.description);

  $('#eventModal #title').attr('disabled', item.disabled);
  $('#eventModal #location').attr('disabled', item.disabled);
  $('#eventModal #date').attr('disabled', item.disabled);
  $('#eventModal #time').attr('disabled', item.disabled);
  $('#eventModal #description').attr('disabled', item.disabled);

  $('#eventModal #title').removeClass("highlightInvalid");
  $('#eventModal #location').removeClass("highlightInvalid");
  $('#eventModal #date').removeClass("highlightInvalid");
  $('#eventModal #time').removeClass("highlightInvalid");
  $('#eventModal #description').removeClass("highlightInvalid");

  $('#eventModal #errors').empty();

  if (item.disabled)
     $('#eventModal #save').hide();
  else
     $('#eventModal #save').show();
  $('#eventModal').modal('show');
}

function dialogToObject()
{
    var rc = {};
    rc.title = $('#eventModal #title').val();
    rc.location = $('#eventModal #location').val();
    rc.date = $('#eventModal #date').val();
    rc.time = $('#eventModal #time').val();
    rc.description = $('#eventModal #description').val();
    return rc;
}

function viewEventDialog(i) {
    setupDialog("Event ansehen", events.events[i]);
}

function validateEventDialog() {
    var rc = true;
    $('#eventModal #errors').empty();

    if (!$('#eventModal #title').val().length) {
        $('#eventModal #title').addClass("highlightInvalid");
        $('#eventModal #errors').append('<p>Titel muss angegeben werden.</p>');
        rc = false;
    } else
        $('#eventModal #title').removeClass("highlightInvalid");

    if (!$('#eventModal #location').val().length) {
        $('#eventModal #location').addClass("highlightInvalid");
        $('#eventModal #errors').append('<p>Ort muss angegeben werden.</p>');
        rc = false;
    }
    else
        $('#eventModal #location').removeClass("highlightInvalid");

    if (!$('#eventModal #date').val().length) {
        $('#eventModal #date').addClass("highlightInvalid");
        $('#eventModal #errors').append('<p>Datum muss angegeben werden.</p>');
        rc = false;
    }
    else
        $('#eventModal #date').removeClass("highlightInvalid");

    return rc;
}

function editEventDialog(i) {
    setupDialog("Event bearbeiten", events.events[i]);

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialogToObject();
      item.disabled = events.events[i].disabled;
      events.events[i] = item;
      events.updateView();
      $('#eventModal #save').off('click');
      $('#eventModal').modal('hide');
    })
}

function createNewEvent()
{
    setupDialog("Event anlegen", { 'disabled': false});

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialogToObject();
      item.disabled = false;
      events.events.push(item);
      events.updateView();
      $('#eventModal #save').off('click');
      $('#eventModal').modal('hide');
    })
}

function removeEventDialog(i) {
  var item = events.events[i];
  $('#removeModal #title').text(item.title);
  $('#removeModal').modal('show');
  $('#removeModal #ok').on('click', function(event) {
    events.removeEvent(i);
    events.updateView();
    $('#removeModal #ok').off('click');
  });
}

var events = new Events();

$(document).ready(function(){
    events.load();

    $("#date").datepicker();
});

