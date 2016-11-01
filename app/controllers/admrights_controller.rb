class AdmrightsController < ApplicationController
  def index
  end

  def create
    @pulsechannel = Pulsechannel.find_by(slug: params[:current_slug])
    @newAdm = User.find_by(username: params[:newAdm])

    @admright = Admright.new
    @admright.pulsechannel_id = @pulsechannel.id
    @admright.user_id = @newAdm.id
    @admright.save
  end

  def new
  end

  def edit
  end

  def show
  end

  def update

  end

  def destroy
  end

  private
    def adm_params
      params.require(:admrights).permit(:user_id, :pulsechannel_id)
    end
end
