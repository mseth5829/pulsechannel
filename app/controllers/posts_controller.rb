class PostsController < ApplicationController

  def create
    post = Post.new(post_params)
    post.user = current_user
    if post.save
        puts "POST CONTROLLER GOING OFF (POST CREATED)-SENDING DATA TO CHANNEL"
        # broadcast the newely created message
        PostsChannel.broadcast_to(post.pulsechannel_id, {message: post.message, user: post.user.username, created_at: post.created_at.to_formatted_s(:short)})
        head :ok
    end
  end

  private

    def post_params
      params.require(:post).permit(:message, :pulsechannel_id)
    end
end
