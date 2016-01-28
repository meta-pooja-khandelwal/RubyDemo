require 'test_helper'

class Tag1sControllerTest < ActionController::TestCase
  setup do
    @tag1 = tag1s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tag1s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tag1" do
    assert_difference('Tag1.count') do
      post :create, tag1: { description: @tag1.description }
    end

    assert_redirected_to tag1_path(assigns(:tag1))
  end

  test "should show tag1" do
    get :show, id: @tag1
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tag1
    assert_response :success
  end

  test "should update tag1" do
    patch :update, id: @tag1, tag1: { description: @tag1.description }
    assert_redirected_to tag1_path(assigns(:tag1))
  end

  test "should destroy tag1" do
    assert_difference('Tag1.count', -1) do
      delete :destroy, id: @tag1
    end

    assert_redirected_to tag1s_path
  end
end
