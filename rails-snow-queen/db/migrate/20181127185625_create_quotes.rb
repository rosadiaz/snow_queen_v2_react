class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.string :address
      t.string :email
      t.float :area
      t.float :sub_total

      t.timestamps
    end
  end
end
