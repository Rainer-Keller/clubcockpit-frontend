// security.fileuri.strict_origin_policy
//
// TODO:
// Dialog field check
// Copy Paste zu classes und workshops
//

var wizard;

function Events() {
  this.events = [];
  this.counter = 0;
  return this;
}

Events.prototype.updateView = function() {
    $("#eventcontent").html('<div class="list-group"></div>');

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
      } else if (item.type == "WS") {
        icon = '<i class="fa fa-graduation-cap"></i>';
      } else if (item.type == "S") {
        icon = '<i class="fa fa-bolt"></i>';
      }

      icon += ' ';

      $("#events div:first").append('\
          <div class="list-group-item"> \
            <b>' + icon + item.title + '</b>' +
            '<br><span class="fa fa-calendar"></span> ' + item.dates +
            '<br><span class="fa fa-map-marker"></span> ' + item.location.postcode + ' ' + item.location.city +
            /* '<br><a href="#">MFL Formular</a>' + */
            '<div class="btn-group pull-right">' +

            (!item.disabled ? '\
				<button type="button" class="btn btn-sm btn-info" onclick="showEventDialog(' + i + ')"><i class="fa fa-list" aria-hidden="true"></i></button>\
                <button type="button" class="btn btn-sm btn-primary" onclick="editEventDialog(' + i + ')"><i class="fa fa-pencil" aria-hidden="true"></i></button>\
                <button type="button" class="btn btn-sm btn-danger" onclick="removeEventDialog(' + i + ')"><i class="fa fa-trash" aria-hidden="true"></i></button>\
                '
                :
                ' <button type="button" class="btn btn-sm btn-primary" onclick="viewEventDialog(' + i + ')"><i class="fa fa-eye" aria-hidden="true"></i></button>') +
            '</div> \
            </div> \
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

  // var jqx = $.getJSON("events.json", function() {})
  var jqx = $.getJSON("https://eaasdc.eu/eu/json_events.php?eventid=30", function() {})
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
  $('#eventModal #location').val(item.location.name + ' --- ' + item.location.country + ' ' + item.location.postcode + ' ' + item.location.city);
  $('#eventModal #date').val(item.dates);
  $('#eventModal #time').val(item.time);
  $('#eventModal #description').val(item.club.clubname);

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

function dialog2ToObject()
{
    var rc = {};
    rc.title = $('#eventModal #title').val();
    rc.location = $('#eventModal #location.#city').val();
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

function showEventDialog(i) {
    setupDialog("Event anzeigen", events.events[i]);

    $('#eventModal #save').on('click', function(event) {
      if (!validateEventDialog())
          return;
      var item = dialog2ToObject();
      item.disabled = events.events[i].disabled;
      events.events[i] = item;
      events.updateView();
      $('#eventModal #save').off('click');
      $('#eventModal').modal('hide');
    })
}

function initializeDialog()
{
    wizard.cards["EventType"].on("deselect", function() { enableOptionalCards(); updateDateListOptions();});
    wizard.cards["EventType"].on("reset", disableOptionalCards);
    wizard.cards["EventType"].on("selected", disableOptionalCards);
    wizard.cards["date"].on("deselect", updateHallList);
    wizard.cards["Gema"].on("selected", updateGemaContribution);
    wizard.cards["Summary"].on("selected", updateSummary);
    $("#gemabackingOtherwise").on("click", updateGemaContribution);
    $("#eventAddDateButton").on("click", eventDateAddDateItem);
    $("#openHouseAddDateButton").on("click", openHouseAddDateItem);
    disableOptionalCards();
}

function createNewEvent(e)
{
    if (e)
        e.preventDefault();

    wizard.show();
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

//-- add new values for chosen --
// Function generator for keyhandler
function newValueRegister(id) {
    return function(evt) {
      var stroke;
      stroke = (_ref = evt.which) != null ? _ref : evt.keyCode;

      if (stroke == 13) { // 13 = enter
        if (evt.target.value.length === 0)
          return;

        $(id).append('<option value="' + evt.target.value + '" selected="selected">' + evt.target.value + '</option>');
        $(id).trigger('chosen:updated');
        evt.target.value = '';
    }
    }
}

var events = new Events();

$(document).ready(function() {
    events.load();

  $.fn.wizard.logging = true;
  wizard = $('#eventWizard').wizard({
    keyboard : false,
    contentHeight : 650,
    contentWidth : 700,
    backdrop: 'static',
    progressBarCurrent: false,
    buttons: {
      cancelText: "Abbrechen",
      nextText: "Weiter",
      backText: "Zurück",
      submitText: "Absenden",
      submittingText: "Übertrage Daten...",
    },
  });

  $(".chzn-select").select2();
  $("#leader").bind( "keyup", newValueRegister('#leaderselection'));

  wizard.on('closed', function() {
    wizard.reset();
  });

  wizard.on("reset", function() {
  });

  wizard.on("submit", function(wizard) {
    var submit = {
      "hostname": $("#new-server-fqdn").val()
    };

    this.log('seralize()');
    this.log(this.serialize());
    this.log('serializeArray()');
    this.log(this.serializeArray());

    setTimeout(function() {
      wizard.trigger("success");
      wizard.hideButtons();
      wizard._submitting = false;
      wizard.showSubmitCard("success");
      wizard.updateProgressBar(0);
      wizard.hide();
      setTimeout(function() {
          wizard.reset();
      }, 250);

    }, 2000);
  });

  $('#buttonNew').click(createNewEvent);
  $('#ccnDateMoved').datepicker();
  fetchCaller();
  initializeDialog();
  createNewEvent();
});

function validateNotEmpty(el) {
  var content = el.val();
  var retValue = {};

  if (content.length === 0) {
    retValue.status = false;
    retValue.msg = "Feld darf nicht leer sein";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateComboboxSelected(el) {
    var content = el.val();
    var retValue = {};

    if (!content) {
        retValue.status = false;
        retValue.msg = "Bitte auswählen";
    } else {
        retValue.status = true;
    }
    return retValue;
}

function validateFloatGreaterOrEqualZero(el) {
  var content = parseFloat(el.val());
  var retValue = {};

  if (isNaN(content) || content < 0) {
    retValue.status = false;
    retValue.msg = "Ungültige Zahl";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateIntegerGreaterOrEqualZero(el) {
  var content = parseInt(el.val(), 10);
  var retValue = {};

  if (isNaN(content) || content < 0) {
    retValue.status = false;
    retValue.msg = "Ungültige Zahl";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateDate(el) {
  var content = Date.parse(el.val());
  var retValue = {};

  if (isNaN(content)) {
    retValue.status = false;
    retValue.msg = "Ungültiges Datum";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateDateOrEmpty(el) {
  var content = el.val();
  var retValue = {};

  if (content.length === 0) {
      retValue.status = true;
  } else {
      retValue = validateDate(el);
  }

  return retValue;
};

function validateDebug(el) {
  console.log("break");
}

function validateTime(el) {
  var content = el.val();
  var retValue = {};

  if (!content.match("^[0-2]\\d:[0-5]\\d$")) {
    retValue.status = false;
    retValue.msg = "Ungültige Uhrzeit";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateLeader() {
    var levels = $('#leaderselection').val();
    var retValue = {}

    if (!levels || levels.length == 0) {
        retValue.status = false;
        retValue.msg = "Bitte die Leader auswählen";
    } else {
        retValue.status = true;
    }

    return retValue;
}

function validateDanceLevel() {
    var levels = $('#levelsselection').val();
    var retValue = {}

    if (!levels || levels.length == 0) {
        retValue.status = false;
        retValue.msg = "Bitte die Tanzlevel auswählen";
    } else if ((currentEventType() === "WS" || currentEventType() === "C") && levels.length > 1) {
        retValue.msg = "Bitte maximal ein Programm angeben";
        retValue.status = false;
    } else {
        retValue.status = true;
    }

    return retValue;
}

function validateHallCount(el) {
  var content = parseInt(el.val(), 10);
  var retValue = {};

  if (isNaN(content) || content < 0|| content > 10) {
    retValue.status = false;
    retValue.msg = "Zahl von 0 bis 10";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function validateEventTitle(el) {
  var name = el.val();
  var retValue = {};

  if (name == "") {
    retValue.status = false;
    retValue.msg = "Bitte einen Namen für das Event eingeben";
  } else {
    retValue.status = true;
  }

  return retValue;
};

function disableOptionalCards()
{
    wizard.cards["Classes"].disable(true /* hide */);
    wizard.cards["CCN"].disable(true /* hide */);
    wizard.cards["Workshop"].disable(true /* hide */);
    wizard.cards["Halls"].disable(true /* hide */);
}

function enableOptionalCards()
{
    disableOptionalCards(wizard);

    var type = currentEventType();
    if (type === "C") {
        wizard.cards["Classes"].enable();
        wizard.cards["Gema"].disable(true /* hide */);
    } else if (type === "CCN") {
        wizard.cards["CCN"].enable();
        wizard.cards["Gema"].enable();
    } else if (type === "WS") {
        wizard.cards["Workshop"].enable();
        wizard.cards["Gema"].enable();
    } else if (type === "S") {
        wizard.cards["Halls"].enable();
        wizard.cards["Gema"].enable();
    }
}

function getDates()
{
    var rc = [];
    var i = 0;

    do {
        var elem = $('#eventDateItem' + i + ' input');
        if (elem.length === 0)
            break;

        if (elem[2].checked)
            rc.push([new Date(elem[0].value), new Date(elem[1].value)]);
        else
            rc.push([new Date(elem[0].value)]);
        i = i + 1;
    } while(true);
    return rc;
}

Date.prototype.isValid = function () {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

function updateDateListOptions()
{
    $("#eventDateList").empty(); // clear all existing dates

    var button = document.getElementById("eventAddDateButton");

    if (currentEventType() === "WS")
        button.classList.remove("hidden");
    else
        button.classList.add("hidden");

    eventDateAddDateItem(); // add one date by default
}

function updateHallList()
{
    if (currentEventType() !== "S")
        return;

    $("#hallItemList").empty(); // clear all

    var dates = getDates();
    var beginDate = dates[0][0];
    var endDate = dates[0][1];
    if (!endDate)
        endDate = new Date(beginDate);
    var days = 1 + Math.round((endDate-beginDate)/(1000*60*60*24));

    for (var i = 0; i < days; i++) {
        var item = $("#hallItemTemplate").clone()
                   .attr("id", "hallItem" + i)
                   .removeClass("hidden")
                   .appendTo("#hallItemList");
        item.find("#hallItemDate").html(new Date(beginDate.getTime() + i*86400000).toLocaleDateString());
        item.find("input").val(1);
        item.find("input").attr("data-validate", "validateHallCount");
    }
}

function getHalls()
{
    var rc = [];
    var i = 0;

    do {
        var elem = $('#hallItem' + i + ' input');
        if (elem.length === 0)
            break;
        rc.push(parseInt(elem[0].value));
        i = i + 1;
    } while(true);
    return rc;
}

function currentEventType()
{
    var e = document.getElementById("eventType");
    return e.value;
}

function eventDateRemoveDateItem(index)
{
    var count = document.getElementById("eventDateList").childElementCount;
    if (count === 1)
        return;

    $("#eventDateItem" + index).remove();

    if (count <= 7)
        document.getElementById("eventAddDateButton").classList.remove("hidden");
}

// first and second date parameters are optional
function eventDateAddDateItem(firstDate, secondDate)
{
    var count = document.getElementById("eventDateList").childElementCount;
    if (count > 6)
        return;

    var item = $("#eventDateItemTemplate").clone()
               .attr("id", "eventDateItem" + count)
               .removeClass("hidden")
               .appendTo("#eventDateList");

    item.find('button').on('click', function() { eventDateRemoveDateItem(count); });
    item.find('.checkbox').on('click', function(ev) {
      if (ev.target.checked)
          item.find('#secondDate').removeClass('hidden');
      else
          item.find('#secondDate').addClass('hidden');
    });

    item.find('.datepicker').datepicker();
    item.find('#secondDate').addClass("hidden");
    item.attr("data-validate", "validateEventDate");

    var eventType = currentEventType();
    if (eventType === "S") {
        item.find('button').addClass('hidden');
    } else if (eventType === "CCN" || eventType === "SCN") {
        item.find('.checkbox').addClass('hidden');
        item.find('button').addClass('hidden');
    } else if (eventType === "WS") {
        // empty
    } else if (eventType === "C") {
        // force date range
        item.find('.checkbox input').prop('checked', true);
        item.find('.checkbox').addClass('hidden');
        item.find('#secondDate').removeClass('hidden');
        item.find('button').addClass('hidden');
    }

    if (firstDate) { // set date, if any
        $('#eventDateItem' + i + ' input')[0].value = firstDate;
        $('#eventDateItem' + i + ' input')[2].checked = false;
    }
    if (secondDate) { // set date, if any
        $('#eventDateItem' + i + ' input')[1].value = secondDate;
        $('#eventDateItem' + i + ' input')[1].removeClass('hidden');
        $('#eventDateItem' + i + ' input')[2].value = true;
    }

    if (count === 6)
        document.getElementById("eventAddDateButton").classList.add("hidden");
}

function calculateGemaContribution()
{
    if (document.getElementById("gemabackingOtherwise").checked)
        return "0 €";

    var type = currentEventType();
    if (type === "C") {
        return "0 €";
    } else if (type === "CCN") {
        return "0 €";
    } else if (type === "WS") {
        var size = document.getElementById("workshopSize").value;
        if (size === "mini") {
            return "8 €";
        } else if (size == "midi") {
            return "25 €";
        } else if (size == "maxi") {
            return "40 €";
        } else if (size == "super") {
            return "60 €";
        } else {
          console.log("Unknown workshop size:", size);
        }
    } else if (type === "SCN") {
        return "17 €";
    } else if (type === "S") {
        var halls = getHalls();
        var firstHalls = 0;
        var totalHalls = 0;

        for (var i = 0; i < halls.length; i++) {
            if (halls[i] > 0)
                firstHalls++;
            totalHalls += halls[i];
        }

        var additionalHalls = totalHalls - firstHalls;
        if (additionalHalls > 5) // maximum of 5 additional halls
            additionalHalls = 5;
        return firstHalls * 80 + additionalHalls * 50 + " €";
    } else {
        return "unbekannt";
    }
}

function openHouseRemoveDateItem(index)
{
    var count = document.getElementById("openHouseDateList").childElementCount;

    $("#openHouseDateItem" + index).remove();

    if (count-1 < 4)
        document.getElementById("openHouseAddDateButton").classList.remove("hidden");
}

// date is optional
function openHouseAddDateItem(date)
{
    var count = document.getElementById("openHouseDateList").childElementCount;
    if (count >= 4)
        return;

    var item = $("#openHouseDateItemTemplate").clone()
               .attr("id", "openHouseDateItem" + count)
               .removeClass("hidden")
               .appendTo("#openHouseDateList");

    item.find('button').on('click', function() { openHouseRemoveDateItem(count); });
    item.find('.datepicker').datepicker();
    item.find('.datepicker').attr("data-validate", "validateDate");
    if (date)
        item.find('.datepicker').value = date;

    if (count+1 === 4)
        document.getElementById("openHouseAddDateButton").classList.add("hidden");
}

function getOpenHouseDateList()
{
    var rc = [];
    var items = document.getElementById("openHouseDateList").children;
    for (var item of items) {
        rc.push(item.getElementsByTagName('input')[0].value);
    }
    return rc;
}

function updateGemaContribution()
{
    var value = calculateGemaContribution();
    document.getElementById("gemaContribution").innerHTML = value;
}

function previewFlyerUrl()
{
    var url = document.getElementById("flyerUrl").value;
    if (!(url.startsWith("http://") || url.startsWith("https://")))
      url = "http://" + url;
    window.open(url, 'Flyer-Vorschau', 'status=no,titlebar=no,toolbar=no');
}

function fromDict(data)
{
    if (data.version !== 1) {
        console.log("Invalid version");
        return;
    }

    document.getElementById('eventType').value = data.type;
    document.getElementById('eventTitle').value = data.title;
    if (data.location) {
        document.getElementById('dancelocationName').value = data.location.name;
        document.getElementById('dancelocationAddress').value = data.location.address;
        document.getElementById('dancelocationPostcode').value = data.location.postcode;
        document.getElementById('dancelocationCity').value = data.location.city;
        document.getElementById('dancelocationCountry').value = data.location.country;
    }
    // clear dates and add new ones
    var dateCount = document.getElementById('eventDateList').childElementCount;
    for (var i = 0; i < dateCount; i++)
        document.getElementById('eventDateItem' + i).remove();
    for (var i = 0; i < dates.length; i++)
        eventDateAddDateItem(date[i][0], date[i][1]);

    $('#leader').val(null).trigger('change');
    $('#leader').val(data.leader).trigger('change');

    $('#dancelevels').val(null).trigger('change');
    $('#dancelevels').val(data.dancelevels).trigger('change');

    if (data.class) {
        document.getElementById('classType').value = data.class.type;
        document.getElementById('classWeekday').value = data.class.weekday;
        document.getElementById('classTime').value = data.class.time;
        document.getElementById('classDuringClubnight').checked = data.class.duringClubnight;
        document.getElementById('classEndsWithGraduation').checked = data.class.endsWithGraduation;
        document.getElementById('classStudentCount').value = data.class.studentCount;

        // clear dates and add new ones
        var dateCount = document.getElementById('openHouseDateList').childElementCount;
        for (var i = 0; i < dateCount; i++)
            document.getElementById('openHouseDateItem' + i).remove();
        for (var i = 0; i < data.class.openHouseDates.length; i++)
            openHouseAddDateItem(data.class.openHouseDates[i]);
    }
    if (data.ccn) {
        document.getElementById('ccnDateMoved').value = data.ccn.dateMoved;
    }
    if (data.ws) {
        document.getElementById('workshopSize').value = data.ws.size;
        document.getElementById('workshopType').value = data.ws.type;
        document.getElementById('workshopParticipants').value = data.ws.participants;
        document.getElementById('workshopRevenue').value = data.ws.revenue;
    }
    if (data.special) {
        updateHallList(); // When calling this function the dates have to be set
        for (var i; i < data.special.halls.length; i++) {
            document.getElementById('hallItem' + i).value = data.special.halls[i];
        }
    }

    document.getElementById('gemabackingOtherwise').checked = data..gemaBackingOtherwise;
    document.getElementById('contactData').value = data.contact;
    document.getElementById('flyerUrl').value = data.publish.url;
    document.getElementById('publishCalendar').checked = data.publish.calendar;
}

function toDict()
{
    var event = {};
    var eventType = currentEventType();
    event.version = 1;
    event.type = eventType;
    event.title = document.getElementById('eventTitle').value;
    var location = {};
    location.name = document.getElementById('dancelocationName').value;
    location.address = document.getElementById('dancelocationAddress').value;
    location.postcode = document.getElementById('dancelocationPostcode').value;
    location.city = document.getElementById('dancelocationCity').value;
    location.country = document.getElementById('dancelocationCountry').value;
    event.location = location;
    event.dates = getDates();
    event.leader = $('#leader').val();
    event.dancelevels = $('#levels').val();
    if (eventType === 'C') {
        event.class = {};
        event.class.type = document.getElementById('classType').value;
        event.class.openHouseDates = getOpenHouseDateList();
        event.class.weekday = document.getElementById('classWeekday').value;
        event.class.time = document.getElementById('classTime').value;
        event.class.duringClubnight = document.getElementById('classDuringClubnight').checked;
        event.class.endsWithGraduation = document.getElementById('classEndsWithGraduation').checked;
        event.class.studentCount = document.getElementById('classStudentCount').value;
    } else if (eventType === 'CCN') {
        event.ccn = {};
        event.ccn.dateMoved = new Date(document.getElementById('ccnDateMoved').value);
    } else if (eventType === 'WS') {
        var ws = {};
        ws.size = document.getElementById('workshopSize').value;
        ws.type = document.getElementById('workshopType').value;
        ws.participants = document.getElementById('workshopParticipants').value;
        ws.revenue = document.getElementById('workshopRevenue').value;
        event.workshop = ws;
    } else if (eventType === "S") {
        event.special = {};
        event.special.halls = getHalls();
    }
    event.gemaBackingOtherwise = document.getElementById('gemabackingOtherwise').checked;
    event.contact = document.getElementById('contactData').value;
    event.publish = {};
    event.publish.url = document.getElementById('flyerUrl').value;
    event.publish.calendar = document.getElementById('publishCalendar').checked;
    return event;
}

weekdayUserString = { 'mo': "Montag", 'tu': 'Dienstag', 'we': 'Mittwoch', 'th': 'Donnerstag', 'fr': 'Freitag', 'sa': 'Samstag', 'su': 'Sonntag', 'xx': 'wechselnder Wochentag'};

function updateSummary()
{
    var event = toDict();
    var rc = '';

    rc += 'Event:' + event.title + ' (' + event.type + ')';
    rc += '<br>';
    rc += event.location.name + ', '
        + event.location.address + ', '
        + event.location.postcode + ' '
        + event.location.city + ', '
        + event.location.country;

    rc += "<br>Datum<br>";
    for (var i = 0; i < event.dates.length; i++) {
        if (event.dates[i].length == 2) {
            rc += event.dates[i][0].toLocaleDateString() + ' - ' + event.dates[i][1].toLocaleDateString();
        } else {
            rc += event.dates[i][0].toLocaleDateString();
        }
        rc += "<br>";
    }

    if (event.leader && event.leader.length > 0)
        rc += "Leader: " + event.leader.join();
    if (event.levels && event.levels.length > 0)
        rc += "Levels: " + event.levels.join();
    if (event.class) {
        rc += "Class: " + event.class.type + "<br>";
        rc += weekdayUserString[event.class.weekday] + " " + event.class.time; + " Uhr<br>";
        rc += "Open House: " + event.class.openHouseDates.join() + "<br>";
        if (event.class.duringClubnight)
            rc += "Class während Clubabend";
        else
            rc += "Class nicht während Clubabend";
        rc += "<br>";
        if (event.class.endsWithGraduation)
            rc += "Class endet mit Graduation";
        else
            rc += "Class endet <b>nicht</b> mit Graduation";
        rc += "<br>";
    }
    if (event.ccn) {
        rc += "Verschobener Clubabend vom " + event.ccn.dateMoved + "<br>";
    }
    if (event.workshop) {
        rc += event.workshop.type + " Workshop " + event.workshop.size + "<br>";
        rc += event.workshop.participants + " Teilnehmer" + "<br>";
        rc += event.workshop.revenue + " € Einnahmen"+ "<br>";
    }
    if (event.special) {
        rc += "Hallen:" + event.special.halls.join();
    }
    if (event.gemaBackingOtherwise)
        rc += "GEMA Deckung anderweitig"
    else
        rc += 'GEMA Umlage: ' + calculateGemaContribution();
    rc += "<br>"
    rc += "Kontakt: " + event.contact.person;
    if (event.contact.email)
        rc += ", " + event.contact.email;
    if (event.contact.phone)
        rc += ", " + event.contact.phone;
    rc += "<br>";
    if (event.publish.url)
    rc += "Url: " + event.publish.url + "<br>";
    if (event.publish.calendar)
        rc += "Event wird im Kalender veröffentlicht";
    else
        rc += "Event wird <b>nicht</b> im Kalender veröffentlicht";
    rc += "<br>";

    document.getElementById("eventSummary").innerHTML = rc;
}

function fetchCaller() {
    var query;
    var jqxhr = new XMLHttpRequest();
    jqxhr.open("GET", "http://squaredance.net/api/events/caller", true);
    jqxhr.onreadystatechange = function() {
        if (jqxhr.readyState != 4)
            return;
        if (jqxhr.status != 200) {
            console.log("error");
            return;
        }
        var caller = JSON.parse(jqxhr.responseText);
        caller.forEach(function(item) {
            $("#leaderselection").append('<option value="' + item + '">' + item + '</option>');
        })
    };
  jqxhr.send();
}

function validateEventDate(el) {
    var retValue = {};
    retValue.status = true;

    var elem = el[0].getElementsByTagName('input');
    if (elem.length !== 3) {
        retValue.msg = "Invalid date elements found";
        retValue.status = false;
        return retValue;
    }

    var checkBoth = elem[2].checked;
    var beginDate = new Date(elem[0].value);
    var endDate = new Date(elem[1].value);

    if (!beginDate || beginDate === '') {
        retValue.status = false;
        retValue.msg = "Bitte ein Datum angeben";
    } else if (isNaN(Date.parse(beginDate))) {
        retValue.status = false;
        retValue.msg = "Bitte ein gültiges Datum angeben";
    }

    if (checkBoth) {
        if (!endDate || endDate === '') {
            retValue.status = false;
            retValue.msg = "Bitte ein Enddatum angeben";
        } else if (isNaN(Date.parse(endDate))) {
            retValue.status = false;
            retValue.msg = "Bitte ein gültiges Enddatum angeben";
        } else if (beginDate >= endDate) {
            retValue.status = false;
            retValue.msg = "Enddatum muss nach dem Startdatum liegen";
        } else if(endDate - beginDate > 2332800000) { // 28 days in future
          retValue.status = false;
          retValue.msg = 'Event darf nicht Länger als 28 Tage sein';
        }
    }

    return retValue;
};


