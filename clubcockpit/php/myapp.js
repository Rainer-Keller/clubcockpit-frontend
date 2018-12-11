function addieren()
{
  var anfrage = {};
  anfrage['wert1'] = $('#wert1').val();
  anfrage['wert2'] = $('#wert2').val();

  $.ajax( 
	{ method: "GET",
	  url: "/cgi-bin/api.cgi/myapp/zusammenrechnen",
	  data: anfrage,
	  cache: false,
	})
	.done( function(data) {
		$('#ergebnis').val(data['ergebnis']);
	});
}

function anfangsdatenHolen()
{
  $.getJSON("/cgi-bin/api.cgi/myapp/anfangsDaten", function() {
  })
  .done(function( data ) {
    $('#wert1').val(data['wert1']);
    $('#wert2').val(data['wert2']);
  }
  );
}

$(document).ready(function(){
    $('button').on('click', addieren);
    anfangsdatenHolen();
});

