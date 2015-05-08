function deleteDestination(currentUserCheckboxes, currentUserDeleteButtons) {
  $(currentUserDeleteButtons).on("click", function(e){
    e.preventDefault();
    // remove this element
    $(this).parents(".destination").remove();

    updateDestinations(currentUserCheckboxes);
  })
}

function toggleDestinationVisitedStatus(currentUserCheckboxes) {
  $(currentUserCheckboxes).on("click", function(){
    // toggle checked value
    if ( $(this).attr("checked") == "checked" ) {
      $(this).attr("checked", false);
    } else {
      $(this).attr("checked", true);
    }

    updateDestinations(currentUserCheckboxes);
  })
}

function addDestination(currentUserCheckboxes) {
  $("#add-destination-button").on("click", function(){
    // toggle checked value
    if ( $(this).attr("checked") == "checked" ) {
      $(this).attr("checked", false);
    } else {
      $(this).attr("checked", true);
    }

    updateDestinations(currentUserCheckboxes);
  })
}

// shared method for all 3 above actions
function updateDestinations(currentUserCheckboxes) {
  var destinations = [];
  var isChecked = false;
  $(currentUserCheckboxes).each(function() {
    // console.log($(this).attr('checked'));
    if ( $(this).attr('checked') == "checked" ) {
      isChecked = true;
    } else {
      isChecked = false;
    }
    var destination = {};
    destination["name"] = $(this).val();
    destination["visited"] = isChecked;

    destinations.push(destination);
  });
  destinations = JSON.stringify(destinations);
  // alert(destinations);

  $.ajax({
    url: '/destinations',
    type: 'POST',
    data: { destinations: destinations },
    traditional: true,
    success: function (result) {
      console.log(JSON.stringify(result));
    }
  });
}
