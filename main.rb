require 'pry'
require 'sqlite3'
require 'sinatra'
require 'sinatra/activerecord'
require 'slim'
require 'json'

#database
require_relative 'database/database_setup'

#models and helpers
require_relative 'models/mondrian'
#require_relative 'helpers/main_helper'

#controllers
require_relative 'controllers/main_controller'

binding.pry
