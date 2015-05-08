class AuthenticationController < ApplicationController

  def authorize_user
    connection = FaradayBuilder.travel_api_authorize(
      'https://young-beyond-8772.herokuapp.com/auth',
      params[:name]
    )
    session[:user_hash] = connection.post.body

    redirect_to home_index_path
  end

  def logout_user
    session.delete(:user_hash)

    redirect_to root_path
  end

end