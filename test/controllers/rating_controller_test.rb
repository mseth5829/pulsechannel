require 'test_helper'

class RatingControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get rating_create_url
    assert_response :success
  end

  test "should get update" do
    get rating_update_url
    assert_response :success
  end

end
