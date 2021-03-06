class PostsController < ApplicationController

  def create
    post = Post.new(post_params)
    post.user = current_user

    if post.save
      # broadcast the newely created message
      PostsChannel.broadcast_to(post.pulsechannel_id, {message: post.message, user: post.user.username, created_at: post.created_at.to_formatted_s(:short), image: post.image})
      head :ok
    end
  end

  def update
    pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    redirect_to pulsechannel
  end

  private

    def post_params
      params.require(:post).permit(:message, :pulsechannel_id, :image)
    end
end
