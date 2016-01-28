require 'test_helper'

class Tag2sControllerTest < ActionController::TestCase
  setup do
    @tag2 = tag2s(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tag2s)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create tag2" do
    assert_difference('Tag2.count') do
      post :create, tag2: { tagName: @tag2.tagName }
    end

    assert_redirected_to tag2_path(assigns(:tag2))
  end

  test "should show tag2" do
    get :show, id: @tag2
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @tag2
    assert_response :success
  end

  test "should update tag2" do
    patch :update, id: @tag2, tag2: { tagName: @tag2.tagName }
    assert_redirected_to tag2_path(assigns(:tag2))
  end

  test "should destroy tag2" do
    assert_difference('Tag2.count', -1) do
      delete :destroy, id: @tag2
    end

    assert_redirected_to tag2s_path
  end
end
