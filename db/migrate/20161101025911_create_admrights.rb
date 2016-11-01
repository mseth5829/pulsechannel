class CreateAdmrights < ActiveRecord::Migration[5.0]
  def change
    create_table :admrights do |t|
      t.belongs_to :user, index: true
      t.belongs_to :pulsechannel, index: true

      t.timestamps
    end
  end
end
