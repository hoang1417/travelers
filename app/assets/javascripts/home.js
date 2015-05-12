function addDestination(userHash, currentUserCheckboxes, currentUserDestinationTable, currentUserDestinations) {
  $("#add-destination-button").unbind("click").on("click", function(e){
    e.preventDefault();

    // get new destination
    var destinationName = $(".new-destination .select2-chosen").html();

    // add new destination to the list
    var destinations = getCurrentDestinations(currentUserCheckboxes);
    var destination = {};
    destination["name"] = destinationName;
    destination["visited"] = false;
    destinations.push(destination);

    var isUpdated = updateDestinations(userHash, currentUserCheckboxes, destinations);
    if (isUpdated) {
      $(currentUserDestinationTable).append(
        '<tr class="destination"><td><div class="checkbox"><label><input type="checkbox" value="' + destinationName + '">' + destinationName +'</label></div></td><td><a class="delete-destination-button" href="javascript:void(0)"><i class="fa fa-times"></i></a></td></tr>'
      );

      // rebind event handlers for all elements, including new ones
      actionsHandler(currentUserDestinations, userHash);
    } else {
      alert("Service has been apperently down. Please try again!");
    }

  })
}

function deleteDestination(userHash, currentUserCheckboxes, currentUserDeleteButtons) {
  $(currentUserDeleteButtons).unbind("click").on("click", function(e){
    e.preventDefault();

    // remove destination to the list
    var destinations = getCurrentDestinations(currentUserCheckboxes);
    var destinationName = $(this).parents(".destination").find(".checkbox input").val();
    removeByAttr(destinations, "name", destinationName);

    var isUpdated = updateDestinations(userHash, currentUserCheckboxes, destinations);
    if (isUpdated) {
      // remove this element
      $(this).parents(".destination").remove();
    } else {
      alert("Service has been apperently down. Please try again!");
    }
  })
}

function toggleDestinationVisitedStatus(userHash, currentUserCheckboxes) {
  $(currentUserCheckboxes).unbind("click").on("click", function(e){
    // toggle destination status and update the list
    var destinations = getCurrentDestinations(currentUserCheckboxes);
    var destinationName = $(this).val();
    var destinationVisited = $(this).attr("checked");
    for (var n = 0 ; n < destinations.length ; n++) {
      if (destinations[n]["name"] == destinationName) {
        destinations[n]["visited"] = !destinationVisited;
        break;
      }
    }

    var isUpdated = updateDestinations(userHash, currentUserCheckboxes, destinations);
    if (isUpdated) {
      // toggle checked value
      if ( $(this).attr("checked") == "checked" ) {
        $(this).attr("checked", false);
      } else {
        $(this).attr("checked", true);
      }
    } else {
      e.preventDefault();
      alert("Service has been apperently down. Please try again!");
    }
  })
}

// shared method for all 3 above actions
function updateDestinations(userHash, currentUserCheckboxes, destinations) {
  var isUpdated = true;

  // Call API from client side
  var authorizationToken = "Token token=" + userHash["token"];

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", authorizationToken);
    },
    async: false, // get api response before do the next step
    type: "PATCH",
    data: { destinations: destinations },
    url: "https://young-beyond-8772.herokuapp.com/travelers/" + userHash["id"],
    dataType: "json",
    success: function (result) {
      console.log(JSON.stringify(result));
    },
    error: function (request, error) {
      console.log(error);
      isUpdated = false;
    },
  });

  return isUpdated;
}

function getCurrentDestinations(currentUserCheckboxes) {
  var destinations = [];
  var isChecked = false;
  $(currentUserCheckboxes).each(function() {
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

  return destinations
}

// Main event handlers for all actions
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

// Javascript helper
function removeByAttr(arr, attr, value) {
  var i = arr.length;
  while(i--){
    if ( arr[i]
      && arr[i].hasOwnProperty(attr)
      && (arguments.length > 2 && arr[i][attr] === value )
    ) {
      arr.splice(i,1);
    }
  }
  return arr;
}