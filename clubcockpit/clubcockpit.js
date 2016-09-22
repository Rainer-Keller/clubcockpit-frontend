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
    $("#events").html('<button type="button" class="btn btn-sm btn-primary" onclick="createNewEvent()"><i class="fa fa-plus" aria-hidden="true"></i> Neues Event anlegen</button><div class="list-group"></div>');

    if (this.events.length == 0) {
          $("#events div:first").append('\
              <a class="list-group-item"> keine Events vorhanden </a> '
              );
    }

    for (var i in this.events) {
      var item = this.events[i];
      $("#events div:first").append('\
          <a class="list-group-item"> \
            <b>' + item.title + '</b>' +
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
  }
  )
    .fail(function(obj) {
      $("#events").text("Fehler beim Laden der Daten: " + obj.statusText + ":" + obj.status);
    })
}

function Classes() {
  this.classes = [];
  this.counter = 0;
}

Classes.prototype.updateView = function() {
    $("#classes").html('<button type="button" class="btn btn-sm btn-primary" onClick="createNewClass()"><i class="fa fa-plus" aria-hidden="true"></i> Neue Class anlegen</button><div class="list-group"></div>');

    if (this.classes.length == 0) {
          $("#classes div:first").append('\
              <a class="list-group-item"> keine Classes vorhanden </a> '
              );
    }
    for (var i in this.classes) {
      var item = this.classes[i];
    $("#classes div:first").append('\
        <a class="list-group-item"> \
          <b>' + item.title + '</b>' +
          '<br><span class="fa fa-calendar"></span> ' + item.date +
          '<br><span class="fa fa-map-marker"></span> ' + item.location +
          '<div class="btn-group pull-right">' +

          (!item.disabled ? '\
              <button type="button" class="btn btn-sm btn-primary" onclick="editClassDialog(' + i + ')"><i class="fa fa-pencil" aria-hidden="true"></i></button>\
              <button type="button" class="btn btn-sm btn-danger" onclick="removeClassDialog(' + i + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>\
              '
              :
              ' <button type="button" class="btn btn-sm btn-primary" onclick="viewClassDialog(' + i + ')"><i class="fa fa-eye" aria-hidden="true"></i></button>') +
          '</div> \
          </a> \
          ');
    }

      if (this.classes.length) {
          $('#classesBadge').show();
          $('#classesBadge').text(this.classes.length);
      } else
          $('#classesBadge').hide();
}

Classes.prototype.addClass = function(item) {
  this.classes.push(item);
}

Classes.prototype.removeClass = function(index) {
    this.classes.splice(index, 1);
}

Classes.prototype.load = function() {
  var self = this;

  var jqx = $.getJSON("classes.json", function() {})
  .done(function( data ) {
    for(var i in data) {
        Classes.prototype.addClass.call(self, data[i]);
    }
    Classes.prototype.updateView.call(self);
  }
  )
    .fail(function(obj) {
      $("#classes").text("Fehler beim Laden der Daten: " + obj.statusText + ":" + obj.status);
    })
}

function Workshops() {
  this.workshops = [];
  this.counter = 0;
}

Workshops.prototype.updateView = function() {
    $("#workshops").html('<button type="button" class="btn btn-sm btn-primary" onclick="createNewWorkshop()"><i class="fa fa-plus" aria-hidden="true"></i> Neuen Workshop anlegen</button><div class="list-group"></div>');

    if (this.workshops.length == 0) {
          $("#workshops div:first").append('\
              <a class="list-group-item"> keine Workshops vorhanden </a> '
              );
    }

    for (var i in this.workshops) {
      var item = this.workshops[i];
    $("#workshops div:first").append('\
        <a class="list-group-item"> \
          <b>' + item.title + '</b>' +
          '<br><span class="fa fa-calendar"></span> ' + item.date +
          '<br><span class="fa fa-map-marker"></span> ' + item.location +
          '<div class="btn-group pull-right">' +

          (!item.disabled ? '\
              <button type="button" class="btn btn-sm btn-primary" onclick="editWorkshopDialog(' + i + ')"><i class="fa fa-pencil" aria-hidden="true"></i></button>\
              <button type="button" class="btn btn-sm btn-danger" onclick="removeWorkshopDialog(' + i + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>\
              '
              :
              ' <button type="button" class="btn btn-sm btn-primary" onclick="viewWorkshopDialog(' + i + ')"><i class="fa fa-eye" aria-hidden="true"></i></button>') +
          '</div> \
          </a> \
          ');
    }

      if (this.workshops.length) {
          $('#workshopsBadge').show();
          $('#workshopsBadge').text(this.workshops.length);
      } else
          $('#workshopsBadge').hide();
}

Workshops.prototype.addWorkshop = function(item) {
    this.workshops.push(item);
}

Workshops.prototype.removeWorkshop = function(index) {
    this.workshops.splice(index, 1);
}

Workshops.prototype.load = function() {
  var self = this;

  var jqx = $.getJSON("workshops.json", function() {})
  .done(function( data ) {
    for (var i in data)
        Workshops.prototype.addWorkshop.call(self, data[i]);
    Workshops.prototype.updateView.call(self);
  }
  )
    .fail(function(obj) {
      $("#workshops").text("Fehler beim Laden der Daten: " + obj.statusText + ":" + obj.status);
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

function editClassDialog(i) {
    setupDialog("Class bearbeiten", classes.classes[i]);

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialogToObject();
      item.disabled = events.events[i].disabled;
      classes.classes[i] = item;
      classes.updateView();
      $('#eventModal #save').off('click');
      $('#eventModal').modal('hide');
    })
}

function editWorkshopDialog(i) {
    setupDialog("Workshop bearbeiten", workshops.workshops[i]);

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialogToObject();
      item.disabled = workshops.workshops[i].disabled;
      workshops.workshops[i] = item;
      workshops.updateView();
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

function createNewClass()
{
    setupDialog("Class anlegen", { 'disabled': false});

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialogToObject();
      item.disabled = false;
      classes.classes.push(item);
      classes.updateView();
      $('#eventModal #save').off('click');
      $('#eventModal').modal('hide');
    })
}

function createNewWorkshop()
{
    setupDialog("Workshop anlegen", { 'disabled': false});

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialogToObject();
      item.disabled = false;
      workshops.workshops.push(item);
      workshops.updateView();
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

function removeClassDialog(i) {
  var item = classes.classes[i];
  $('#removeModal #title').text(item.title);
  $('#removeModal').modal('show');
  $('#removeModal #ok').on('click', function(event) {
    classes.removeClass(i);
    classes.updateView();
    $('#removeModal #ok').off('click');
  });
}

function removeWorkshopDialog(i) {
  var item = workshops.workshops[i];
  $('#removeModal #title').text(item.title);
  $('#removeModal').modal('show');
  $('#removeModal #ok').on('click', function(event) {
    workshops.removeWorkshop(i);
    workshops.updateView();
    $('#removeModal #ok').off('click');
  });
}

var events = new Events();
var classes = new Classes();
var workshops = new Workshops();

$(document).ready(function(){
    events.load();
    classes.load();
    workshops.load();

    $("#date").datepicker();
});

