class CreatePulsechannels < ActiveRecord::Migration[5.0]
  def change
    create_table :pulsechannels do |t|
      t.string :event
      t.string :slug

      t.timestamps
    end
  end
end
