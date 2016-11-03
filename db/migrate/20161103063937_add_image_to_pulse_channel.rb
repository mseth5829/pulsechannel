class AddImageToPulseChannel < ActiveRecord::Migration[5.0]
  def change
    add_column :pulsechannels, :channelImage, :string
  end
end
