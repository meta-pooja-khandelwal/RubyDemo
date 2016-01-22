class CreateModels < ActiveRecord::Migration
  def change
    create_table :models do |t|
      t.string :todo
      t.string :title
      t.boolean :done

      t.timestamps null: false
    end
  end
end
