var readStore1 = "colorsChecked";

/* Gets selected source website from storage */
chrome.storage.local.get(readStore1, function(data) {
  if(data !== undefined || data[readStore1] !== undefined){
	if(data[readStore1]==1)  $("#colors_checkbox").prop('checked', true);
      }
});


var readStore = "scoreSource";

/* Gets selected source website from storage */
chrome.storage.local.get(readStore, function(data) {
  var mod=0;
  if(data !== undefined || data[readStore] !== undefined){
    var keyValue = Object.keys(data)[0];
    if(keyValue !== undefined){
      if(data[keyValue]){
        console.log("BOOOM");
        mod=1;
        $("#"+data[keyValue]+"_radio").prop('checked', true);
      }
    }
  }
});

$("#new_user").show();

var servicesArray = ["filmweb", "imdb", "tmdb", "metacritic", "nflix"];
var count=0;
for(var service of servicesArray){
  count++;
  chrome.storage.local.get("scoreChecked_"+service, function(data) {
      if(data !== undefined || data[readStore] !== undefined){
        var keyValue = Object.keys(data)[0];
        if(keyValue !== undefined){
          if(data[keyValue].checked == 0){
            console.log("#"+keyValue.replace(/scoreChecked_/,"")+"_check");
            $("#"+keyValue.replace(/scoreChecked_/,"")+"_check").prop('checked', false);
          }
        }
      }
  });
}

$("#save_default").click(function() {
   $("#new_user").hide();
   var save = {};
   save['scoreSource'] = $("input[name='default']:checked").attr('id').replace(/_radio/,"");
   chrome.storage.local.set(save);
   for(var service of servicesArray){
     var checked=0;
     if($('#'+service+"_check").prop('checked')) checked=1;
     var save = {};
     save['scoreChecked_'+service] = {checked};
     chrome.storage.local.set(save);
   }
     var save = {};
     if($('#colors_checkbox').prop('checked'))
         save['colorsChecked'] = 1;
     else save['colorsChecked'] = 0;
	console.log(save);
     chrome.storage.local.set(save);
});


$("#config").click(function() {
   $("#new_user").show();
});
