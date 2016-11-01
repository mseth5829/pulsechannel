$(document).ready(function(){
  $('select').material_select();
  $('#create-channel-form').click(function(){
    $('#create-channel-dropdown').slideDown( "slow");
    $('#add-location-dropdown').slideDown( "slow");
  })
})
