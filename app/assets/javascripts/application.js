// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require datetimepicker
//= require_tree .

var savedImage

var cardColors =
[
  "red lighten-5",
  "red lighten-4",
  "red lighten-3",
  "red lighten-2",
  "red lighten-1",
  "red",
  "pink lighten-5",
  "pink lighten-4",
  "pink lighten-3",
  "pink lighten-2",
  "pink lighten-1",
  "pink",
  "purple lighten-5",
  "purple lighten-4",
  "purple lighten-3",
  "purple lighten-2",
  "purple lighten-1",
  "purple",
  "indigo lighten-5",
  "indigo lighten-4",
  "indigo lighten-3",
  "indigo lighten-2",
  "indigo lighten-1",
  "indigo",
  "blue lighten-5",
  "blue lighten-4",
  "blue lighten-3",
  "blue lighten-2",
  "blue lighten-1",
  "blue",
  "light-blue lighten-5",
  "light-blue lighten-4",
  "light-blue lighten-3",
  "light-blue lighten-2",
  "light-blue lighten-1",
  "light-blue",
  "cyan lighten-5",
  "cyan lighten-4",
  "cyan lighten-3",
  "cyan lighten-2",
  "cyan lighten-1",
  "cyan",
  "teal lighten-5",
  "teal lighten-4",
  "teal lighten-3",
  "teal lighten-2",
  "teal lighten-1",
  "teal",
  "lime lighten-5",
  "lime lighten-4",
  "lime lighten-3",
  "lime lighten-2",
  "lime lighten-1",
  "lime",
  "orange lighten-5",
  "orange lighten-4",
  "orange lighten-3",
  "orange lighten-2",
  "orange lighten-1",
  "orange",
  "amber lighten-5",
  "amber lighten-4",
  "amber lighten-3",
  "amber lighten-2",
  "amber lighten-1",
  "amber",
  "yellow lighten-5",
  "yellow lighten-4",
  "yellow lighten-3",
  "yellow lighten-2",
  "yellow lighten-1",
  "yellow"
]
