$(document).ready(function(){
  $('select').material_select();
  var dropdown = false
  $('#create-channel-form').click(function(){
    if(dropdown == false){
      $('#create-channel-dropdown').slideDown( "slow");
      dropdown = true
    }else {
      $('#create-channel-dropdown').slideUp( "slow");
      dropdown = false
    }
  })
  //Add datetimepicker
  $('#eventTimePicker').datetimepicker()
})
