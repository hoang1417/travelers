class HomeController < ApplicationController

  before_action :authorize_token, only: [:index]

  def welcome
  end

  def index
    connection = FaradayBuilder.travel_api_client(
      'https://young-beyond-8772.herokuapp.com/travelers.json',
      session[:user_hash]["token"]
    )
    response = connection.get.body

    @amos_destinations = response[0]["destinations"]
    @andy_destinations = response[1]["destinations"]
    @evie_destinations = response[2]["destinations"]
  end

end
