function deleteDestination() {
  alert("delete");
}

function toggleDestinationVisitedStatus(currentUserCheckboxes) {
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
  alert(destinations);

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

function addDestination() {
  alert("add");
}
