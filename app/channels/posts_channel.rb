# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class PostsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "posts:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
  puts "posts:#{params[:room]} received #{data} from #{current_user}"
  # we can relay the received message without the model if we want.
  # ActionCable.server.broadcast("messages", data)
end
end
