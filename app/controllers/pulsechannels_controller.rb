class PulsechannelsController < ApplicationController

  def index
    @pulsechannel = Pulsechannel.new
    @pulsechannels = Pulsechannel.all
    @posts = Post.all
    gon.posts = Post.all
  end

  def new
    # if request.referrer.split("/").last == "chatrooms"
    #   flash[:notice] = nil
    # end
    @pulsechannel = Pulsechannel.new
  end

  def edit
    @pulsechannel = Pulsechannel.find_by(slug: params[:slug])
  end

  def create
    @pulsechannel = Pulsechannel.new(channel_params)
    if @pulsechannel.save
      respond_to do |format|
        format.html { redirect_to @pulsechannel }
        format.js
      end
    else
      respond_to do |format|
        flash[:notice] = {error: ["a channel with this event already exists"]}
        format.html { redirect_to new_pulsechannel_path }
      end
    end
  end

  def update
    puts "  THIS IS PARAMS" + params[:locationLongitude].to_s
    pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    pulsechannel.update(channel_params)
    redirect_to pulsechannel
  end

  def show
    gon.inChannel = "true"
    @pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    gon.current_slug = @pulsechannel.slug
    gon.current_location_coordinates=[@pulsechannel.locationLatitude,@pulsechannel.locationLongitude]
    @post = Post.new
  end

  private

    def channel_params
      params.require(:pulsechannel).permit(:event, :detail, :locationLatitude, :locationLongitude)
    end
end
