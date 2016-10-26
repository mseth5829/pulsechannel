$(document).on('turbolinks:load', function () {
  submitNewPost()
})

function submitNewPost () {
  $('#trythis').keydown(function (event) {
    if (event.keyCode == 13) {
      console.log("WE GOT TO THE SUBMIT POST PART THIS IS THE EVENT: "+  event)
      // can send post to actioncable, as well as triggering from the model creation
      App.posts.send({ user: current_username, post: $('[data-textarea="post"]').val() })
      $('[data-send="post"]').click()
      $('[data-textarea="post"]').val(' ')

      return false
    }
  })
}
