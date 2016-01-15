class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :completed

      t.timestamps null: false
    end
    add_index :todos, :title
  end
end
