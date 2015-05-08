class AuthenticationController < ApplicationController

  def authorize_user
    connection = FaradayBuilder.travel_api_authorize(
      'https://young-beyond-8772.herokuapp.com/auth',
      params[:name]
    )
    session[:api_token] = connection.post.body["token"]
    session[:user_name] = connection.post.body["name"]

    redirect_to home_index_path
  end

  def logout_user
    session.delete(:api_token)
    session.delete(:user_name)

    redirect_to root_path
  end

end