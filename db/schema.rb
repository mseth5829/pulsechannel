# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161103063937) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admrights", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "pulsechannel_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["pulsechannel_id"], name: "index_admrights_on_pulsechannel_id", using: :btree
    t.index ["user_id"], name: "index_admrights_on_user_id", using: :btree
  end

  create_table "posts", force: :cascade do |t|
    t.string   "message"
    t.text     "image"
    t.integer  "user_id"
    t.integer  "pulsechannel_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["pulsechannel_id"], name: "index_posts_on_pulsechannel_id", using: :btree
    t.index ["user_id"], name: "index_posts_on_user_id", using: :btree
  end

  create_table "pulsechannels", force: :cascade do |t|
    t.string   "event"
    t.string   "slug"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.decimal  "locationLongitude"
    t.decimal  "locationLatitude"
    t.string   "detail"
    t.string   "channeltype"
    t.datetime "event_time"
    t.string   "channelImage"
  end

  create_table "ratings", force: :cascade do |t|
    t.decimal  "rating",          precision: 10, scale: 2
    t.integer  "user_id"
    t.integer  "pulsechannel_id"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["pulsechannel_id"], name: "index_ratings_on_pulsechannel_id", using: :btree
    t.index ["user_id"], name: "index_ratings_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "posts", "pulsechannels"
  add_foreign_key "posts", "users"
end
