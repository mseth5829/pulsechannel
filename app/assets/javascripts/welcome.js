
$(document).ready(function(){
  console.log("click functionality loaded")
  $('#create-channel-form').click(function(){
    $('#create-channel-dropdown').slideDown( "slow");
    $('#add-location-dropdown').slideDown( "slow");
  })
})
