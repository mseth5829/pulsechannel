class CreateRatings < ActiveRecord::Migration[5.0]
  def change
    create_table :ratings do |t|
      t.decimal :rating, :precision => 10, :scale => 2
      t.belongs_to :user, index: true
      t.belongs_to :pulsechannel, index: true

      t.timestamps
    end
  end
end
