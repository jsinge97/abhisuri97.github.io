/*global List, $, jQuery, timing*/
/*jslint devel:true browser:true plusplus:false*/
//TODO kill this
var options = {
    item: '<li><hr class="separator" /><div style="float: left;"><h4 class="name"></h4></div><div style="float: right;"><img onclick="removeSpeakerButton(event)" src="img/remove.png"></div></li>'
};
var values = [{
    id: 0,
    name: 'Country'
}];
var speakersList = new List('speakers-list', options, values);
var currentID = 0;
var timereg = /^((\d:)?\d?\d:)?\d*$/; //I had a problem, so I used a regex. now it's the next guy's problem
function removeSpeakerButton(e) {
    console.log("removing: " + e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML);
    speakersList.remove("name", e.target.parentNode.parentNode.firstChild.nextSibling.firstChild.innerHTML);
}

function nextId() {
    "use strict";
    currentID = currentID + 1;
    return currentID;
}

function addSpeaker() {
    "use strict";
    var sent = $("#namebox").val();
    //I needed an array, so I hacked one in
    //each id property is an index number, they should not conflict
    speakersList.add({
        id: nextId(),
        name: sent
    });
    $("#namebox").val('');
}

function removeNextSpeaker() {
    //list shouldn't get big enough that this becomes a problem
    /* TODO make this into final MAX_COUNTRIES for readability / NK's expulsion from U.N. */"use strict";
    var lowest = 200,
        items = speakersList.items,
        x = 0;
    console.log(items.length);
    for (x in items) {
        console.log(items[x].values());
        if (items[x].values().id < lowest) {
            lowest = items[x].values().id;
        }
    };
    console.log("removing id: " + lowest);
    speakersList.remove("id", lowest);
}
//Event Listener
$("#namebox").on("keydown", function (event) {
    // Enter is pressed
    "use strict";
    if (event.keyCode === 13) {
        addSpeaker();
    }
});

$(document).ready(function (){
    "use strict";
    console.log("setting up typeahead");
    $('#namebox').typeahead({
        name: 'countries',
        local: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Republic of the)', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic People’s Republic of Korea', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Lao People’s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia (Federated States of)', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Republic of Korea', 'Republic of Moldova', 'Romania', 'Russian Federation', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Switzerland', 'Sweden', 'Syria', 'Tajikistan', 'Thailand', 'The former Yugoslav Republic of Macedonia', 'Timor Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United Republic of Tanzania', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Viet Nam', 'YemenZambia', 'Zimbabwe'],
        limit: 3
    });
});