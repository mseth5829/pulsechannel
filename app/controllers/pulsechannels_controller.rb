class PulsechannelsController < ApplicationController

  def index
    @pulsechannel = Pulsechannel.new
    @pulsechannels = Pulsechannel.all
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
    pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    pulsechannel.update(channel_params)
    redirect_to pulsechannel
  end

  def show
    @pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    @post = Post.new
  end

  private

    def channel_params
      params.require(:pulsechannel).permit(:event)
    end
end
