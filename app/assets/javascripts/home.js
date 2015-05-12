function addDestination(userHash, currentUserCheckboxes, currentUserDestinationTable, currentUserDestinations) {
  $("#add-destination-button").unbind("click").on("click", function(e){
    e.preventDefault();

    // add new destination
    var destinationName = $(".new-destination .select2-chosen").html();

    $(currentUserDestinationTable).append(
      '<tr class="destination"><td><div class="checkbox"><label><input type="checkbox" value="' + destinationName + '">' + destinationName +'</label></div></td><td><a class="delete-destination-button" href="javascript:void(0)"><i class="fa fa-times"></i></a></td></tr>'
    )

    updateDestinations(userHash, currentUserCheckboxes);

    // rebind event handlers for all elements, including new ones
    actionsHandler(currentUserDestinations, userHash);
  })
}

function deleteDestination(userHash, currentUserCheckboxes, currentUserDeleteButtons) {
  $(currentUserDeleteButtons).unbind("click").on("click", function(e){
    e.preventDefault();
    // remove this element
    $(this).parents(".destination").remove();

    updateDestinations(userHash, currentUserCheckboxes);
  })
}

function toggleDestinationVisitedStatus(userHash, currentUserCheckboxes) {
  $(currentUserCheckboxes).unbind("click").on("click", function(){
    // toggle checked value
    if ( $(this).attr("checked") == "checked" ) {
      $(this).attr("checked", false);
    } else {
      $(this).attr("checked", true);
    }

    updateDestinations(userHash, currentUserCheckboxes);
  })
}

// shared method for all 3 above actions
function updateDestinations(userHash, currentUserCheckboxes) {
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

  // Call API from client side
  var authorizationToken = "Token token=" + userHash["token"];

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", authorizationToken);
    },
    type: "PATCH",
    data: { destinations: destinations },
    url: "https://young-beyond-8772.herokuapp.com/travelers/" + userHash["id"],
    dataType: "json",
    success: function (result) {
      console.log(JSON.stringify(result));
    }
  });
}

function actionsHandler(currentUserDestinations, userHash, option) {
  var currentUserCheckboxes = currentUserDestinations + " input";
  toggleDestinationVisitedStatus(userHash, currentUserCheckboxes);

  var currentUserDeleteButtons = currentUserDestinations + " .delete-destination-button";
  deleteDestination(userHash, currentUserCheckboxes, currentUserDeleteButtons);

  if ( option == "full" ) {
    var currentUserDestinationTable = currentUserDestinations + " tbody";
    addDestination(userHash, currentUserCheckboxes, currentUserDestinationTable, currentUserDestinations);
  }
}

// Call API from server side
// destinations = JSON.stringify(destinations);
// $.ajax({
//   url: '/destinations',
//   type: 'POST',
//   data: { destinations: destinations },
//   traditional: true,
//   success: function (result) {
//     console.log(JSON.stringify(result));
//   }
// });