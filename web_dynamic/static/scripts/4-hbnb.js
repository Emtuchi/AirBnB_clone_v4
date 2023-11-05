/* Script that checks for changes on each INPUT checkbox tag */
$(document).ready(function () {
        const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
        $.get(url, function (res) {
                if (res.status === 'OK') {
                        $('#api_status').addClass('available');
                } else {
                        $('#api_status').removeClass('available');
                }
        });

        const amenities = {};
        $('INPUT[type="checkbox"]').change(function () {
                if ($(this).is(':checked')) {
                        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
                } else {
                        delete amenities[$(this).attr('data-id')];
                }
                $('.amenities H4').text(Object.values(amenities).join(', '));
        });

	$.ajax({
    url: api + ':5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<ARTICLE>
                  <DIV class="title">
                    <H2>${place.name}</H2>
                    <DIV class="price_by_night">
                      ${place.price_by_night}
                    </DIV>
                  </DIV>
                  <DIV class="information">
                    <DIV class="max_guest">
                      <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.max_guest} Guests
                    </DIV>
                    <DIV class="number_rooms">
                      <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_rooms} Bedrooms
                    </DIV>
                    <DIV class="number_bathrooms">
                      <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_bathrooms} Bathrooms
                    </DIV>
                  </DIV>
                  <DIV class="description">
                    ${place.description}
                  </DIV>
                </ARTICLE>`;
      }));
    }
  });
	$('button').click(function () {
		$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://localhost:5001/api/v1/places_search/',
		data: JSON.stringify({ amenities: Object.keys(amenitiesId) }),
		dataType: 'json',
		success: function (places) {
			$('.places').empty();
			$.each(places, function (index, place) {
				$('.places').append(
					'<article>' +
					'<div class="title_box">' +
					'<h2>' + place.name + '</h2>' +
					'<div class="price_by_night">' + '$' + place.price_by_night +
					'</div>' +
					'</div>' +
					'<div class="information">' +
					'<div class="max_guest">' +
					'<br />' + place.max_guest + ' Guests' +
					'</div>' +
					'<div class="number_rooms">' +
					'<br />' + place.number_rooms + ' Bedrooms' +
					'</div>' +
					'<div class="number_bathrooms">' +
					'<br />' + place.number_bathrooms + ' Bathroom' +
					'</div>' +
					'</div>' +
					'<div class="description">' + place.description +
					'</div>' +
					'</article>');
			});
		}
		});
	});
});
