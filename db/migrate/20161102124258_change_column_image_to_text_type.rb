class ChangeColumnImageToTextType < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :image, :text
  end
end
