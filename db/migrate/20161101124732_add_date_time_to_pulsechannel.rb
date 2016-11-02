class AddDateTimeToPulsechannel < ActiveRecord::Migration[5.0]
  def change
    add_column :pulsechannels, :event_time, :datetime

  end
end
