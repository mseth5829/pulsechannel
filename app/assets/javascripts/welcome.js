$(document).on('turbolinks:load', function () {
console.log("turbolinks loaded on welcome page")
});

$(document).ready(function(){
  function trythisone(){
  }
  console.log("click functionality loaded")
  $('#create-channel-form').click(function(){
    $('#create-channel-dropdown').slideDown( "slow");
    $('#add-location-dropdown').slideDown( "slow");
  })
})
