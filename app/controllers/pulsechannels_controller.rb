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
        @admright = Admright.new
        @admright.pulsechannel_id = @pulsechannel.id
        @admright.user_id = @current_user.id
        @admright.save
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
    gon.inChannel = "true"
    gon.allUsers = User.all
    @pulsechannel = Pulsechannel.find_by(slug: params[:slug])
    @eventTime = @pulsechannel.event_time.strftime("%m/%d/%Y, at %I:%M%p")
    @adm_channels = Admright.find_by(pulsechannel_id: @pulsechannel.id)
    @current_slug = @pulsechannel.slug
    @current_location_coordinates=[@pulsechannel.locationLatitude,@pulsechannel.locationLongitude]
    gon.current_location_coordinates=[@pulsechannel.locationLatitude,@pulsechannel.locationLongitude]
    @post = Post.new
    @currentAdm = @pulsechannel.users
    @users = User.all
    @admright = Admright.new
    @adm_pulsechannel_id = @pulsechannel.id
    @channels = @pulsechannels
  end

  def destroy
    Pulsechannel.find_by(slug: params[:slug]).delete
    redirect_to pulsechannels_path
  end


  private

    def channel_params
      params.require(:pulsechannel).permit(:event, :detail, :channeltype, :locationLatitude, :locationLongitude, :event_time)
    end
end
