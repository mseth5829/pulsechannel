require 'test_helper'

class AdmrightsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get admrights_create_url
    assert_response :success
  end

  test "should get new" do
    get admrights_new_url
    assert_response :success
  end

  test "should get edit" do
    get admrights_edit_url
    assert_response :success
  end

  test "should get show" do
    get admrights_show_url
    assert_response :success
  end

  test "should get update" do
    get admrights_update_url
    assert_response :success
  end

  test "should get destroy" do
    get admrights_destroy_url
    assert_response :success
  end

end
