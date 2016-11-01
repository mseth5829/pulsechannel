class AddPublicPrivateOptionPulsechannel < ActiveRecord::Migration[5.0]
  def change
    add_column :pulsechannels, :channeltype, :string
  end
end
