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

    for (let i in this.events) {
      let item = this.events[i];
      let icon;

      if (item.type == "class") {
        icon = '<i class="fa fa-certificate"></i>';
      } else if (item.type == "workshop") {
        icon = '<i class="fa fa-graduation-cap"></i>';
      } else if (item.type == "event") {
        icon = '<i class="fa fa-bolt"></i>';
      }

      icon += ' ';

      $("#events div:first").append('\
          <div class="list-group-item"> \
            <b>' + icon + item.title + '</b>' +
            '<br><span class="fa fa-calendar"></span> ' + item.date +
            '<br><span class="fa fa-map-marker"></span> ' + item.location +
            '<br><a href="#">MFL Formular</a>' +
            '<div class="btn-group pull-right">' +

            (!item.disabled ? '\
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
  let self = this;

  let jqx = $.getJSON("events.json", function() {})
  .done(function( data ) {
    for(let i in data) {
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
    let rc = {};
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
    let rc = true;
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
      let item = dialogToObject();
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
      let item = dialogToObject();
      item.disabled = false;
      events.events.push(item);
      events.updateView();
      $('#eventModal #save').off('click');
      $('#eventModal').modal('hide');
    })
}

function removeEventDialog(i) {
  let item = events.events[i];
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

  $('#fqdn').on('input', function() {
    if ($(this).val().length != 0) {
      $('#ip').val('').attr('disabled', 'disabled');
      $('#fqdn, #ip').parents('.form-group').removeClass('has-error has-success');
    } else {
      $('#ip').val('').removeAttr('disabled');
    }
  });

  let pattern = /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
  x = 46;

  $('#ip').on('input', function() {
    if ($(this).val().length != 0) {
      $('#fqdn').val('').attr('disabled', 'disabled');
    } else {
      $('#fqdn').val('').removeAttr('disabled');
    }
  }).keypress(function(e) {
    if (e.which != 8 && e.which != 0 && e.which != x && (e.which < 48 || e.which > 57)) {
      console.log(e.which);
      return false;
    }
  }).keyup(function() {
    let $this = $(this);
    if (!pattern.test($this.val())) {
      //$('#validate_ip').text('Not Valid IP');
      console.log('Not Valid IP');
      $this.parents('.form-group').removeClass('has-error has-success').addClass('has-error');
      while ($this.val().indexOf("..") !== -1) {
        $this.val($this.val().replace('..', '.'));
      }
      x = 46;
    } else {
      x = 0;
      let lastChar = $this.val().substr($this.val().length - 1);
      if (lastChar == '.') {
        $this.val($this.val().slice(0, -1));
      }
      let ip = $this.val().split('.');
      if (ip.length == 4) {
        //$('#validate_ip').text('Valid IP');
        console.log('Valid IP');
        $this.parents('.form-group').removeClass('has-error').addClass('has-success');
      }
    }
  });

  wizard.on('closed', function() {
    wizard.reset();
  });

  wizard.on("reset", function() {
    wizard.modal.find(':input').val('').removeAttr('disabled');
    wizard.modal.find('.form-group').removeClass('has-error').removeClass('has-succes');
    wizard.modal.find('#fqdn').data('is-valid', 0).data('lookup', 0);
  });

  wizard.on("submit", function(wizard) {
    let submit = {
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
    }, 2000);
  });

  wizard.el.find(".wizard-success .im-done").click(function() {
    wizard.hide();
    setTimeout(function() {
      wizard.reset();
    }, 250);

  });

  wizard.el.find(".wizard-success .create-another-server").click(function() {
    wizard.reset();
  });

  $(".wizard-group-list").click(function() {
    alert("Disabled for demo.");
  });

  $('#buttonNew').click(function(e) {
    e.preventDefault();

  wizard.cards["EventType"].on("deselect", function() { enableOptionalCards(); updateDateListOptions();});
  wizard.cards["EventType"].on("reset", disableOptionalCards);
  wizard.cards["EventType"].on("selected", disableOptionalCards);
  wizard.cards["date"].on("deselect", updateHallList);

  disableOptionalCards();
  wizard.show();

  $("#eventAddDateButton").on("click", eventDateAddDateItem);
  $("#openHouseAddDateButton").on("click", openHouseAddDateItem);

  });
});

function validateEventTitle(el) {
  let name = el.val();
  let retValue = {};

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

    let type = currentEventType();
    if (type === "C") {
        wizard.cards["Classes"].enable();
        wizard.cards["Gema"].disable(true /* hide */);
    } else if (type === "CCN") {
        wizard.cards["CCN"].enable();
    } else if (type === "WS") {
        wizard.cards["Workshop"].enable();
    } else if (type === "S") {
        wizard.cards["Halls"].enable();
    }
}

function getDates()
{
    let rc = [];
    let i = 0;

    do {
        let elem = $('#eventDateItem' + i + ' input');
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

    let button = document.getElementById("eventAddDateButton");

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

    let dates = getDates();
    let beginDate = dates[0][0];
    let endDate = dates[0][1];
    if (!endDate)
        endDate = new Date(beginDate);
    let days = 1 + Math.round((endDate-beginDate)/(1000*60*60*24));

    for (let i = 0; i < days; i++) {
        let item = $("#hallItemTemplate").clone()
                   .attr("id", "hallItem" + i)
                   .removeClass("hidden")
                   .appendTo("#hallItemList");
        item.find("#hallItemDate").html(new Date(beginDate.getTime() + i*86400000).toLocaleDateString());
    }
}

function getHalls()
{
    let rc = [];
    let i = 0;

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
    let e = document.getElementById("eventType");
    return e.value;
}

function eventDateRemoveDateItem(index)
{
    let count = document.getElementById("eventDateList").childElementCount;
    if (count === 1)
        return;

    $("#eventDateItem" + index).remove();

    if (count <= 7)
        document.getElementById("eventAddDateButton").classList.remove("hidden");
}

function eventDateAddDateItem()
{
    let count = document.getElementById("eventDateList").childElementCount;
    if (count > 6)
        return;

    let item = $("#eventDateItemTemplate").clone()
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

    item.find('[type="date"]').datepicker();
    item.find('#secondDate').addClass("hidden");

    let eventType = currentEventType();
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

    if (count === 6)
        document.getElementById("eventAddDateButton").classList.add("hidden");
}

function calulateGemaContribution()
{
    if (document.getElementById("gemabackingOtherwise").checked)
        return "0 €";

    let type = currentEventType();
    console.log(type);
    if (type === "C") {
        return "unbekannt";
    } else if (type === "CCN") {
        return "0 €";
    } else if (type === "WS") {
        let size = document.getElementById("workshopsize").value;
        if (size === "mini") {
            return "8 €";
        } else if (size == "midi") {
            return "25 €";
        } else if (size == "maxi") {
            return "40 €";
        } else if (size == "super") {
            return "60 €";
        }
    } else if (type === "SCN") {
        return "17 €";
    } else if (type === "S") {
        let firstHalls = days;
        let additionalHalls = totalHalls - fristHalls;
        if (additionalHalls > 5) // maximum of 5 additional halls
            additionalHalls = 5;
        return firstHalls * 80 + additionalHalls * 50 + " €";
    } else {
        return "unbekannt";
    }
}

function openHouseRemoveDateItem(index)
{
    let count = document.getElementById("openHouseDateList").childElementCount;

    $("#openHouseDateItem" + index).remove();

    if (count-1 < 4)
        document.getElementById("openHouseAddDateButton").classList.remove("hidden");
}

function openHouseAddDateItem()
{
    let count = document.getElementById("openHouseDateList").childElementCount;
    if (count >= 4)
        return;

    let item = $("#openHouseDateItemTemplate").clone()
               .attr("id", "openHouseDateItem" + count)
               .removeClass("hidden")
               .appendTo("#openHouseDateList");

    item.find('button').on('click', function() { openHouseRemoveDateItem(count); });
    item.find('[type="date"]').datepicker();

    if (count+1 === 4)
        document.getElementById("openHouseAddDateButton").classList.add("hidden");
}
