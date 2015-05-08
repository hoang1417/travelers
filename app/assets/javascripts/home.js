function addDestination(currentUserCheckboxes, currentUserDestinationTable, currentUserDestinations) {
  $("#add-destination-button").on("click", function(e){
    e.preventDefault();

    // add new destination
    var destinationName = $(".new-destination .select2-chosen").html();

    $(currentUserDestinationTable).append(
      '<tr class="destination"><td><div class="checkbox"><label><input type="checkbox" value="' + destinationName + '">' + destinationName +'</label></div></td><td><a class="delete-destination-button" href="javascript:void(0)"><i class="fa fa-times"></i></a></td></tr>'
    )

    updateDestinations(currentUserCheckboxes);
    actionsHandler(currentUserDestinations);
  })
}

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

function actionsHandler(currentUserDestinations) {
  var currentUserCheckboxes = currentUserDestinations + " input";
  toggleDestinationVisitedStatus(currentUserCheckboxes);

  var currentUserDeleteButtons = currentUserDestinations + " .delete-destination-button";
  deleteDestination(currentUserCheckboxes, currentUserDeleteButtons);

  var currentUserDestinationTable = currentUserDestinations + " tbody";
  addDestination(currentUserCheckboxes, currentUserDestinationTable, currentUserDestinations);
}
