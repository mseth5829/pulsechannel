class AddLocationToPulseChannels < ActiveRecord::Migration[5.0]
  def change
    add_column :pulsechannels, :locationLongitude, :decimal
    add_column :pulsechannels, :locationLatitude, :decimal
    add_column :pulsechannels, :detail, :string
  end
end
