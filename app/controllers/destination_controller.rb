class DestinationController < ApplicationController

  before_action :authorize_token, only: [:update]

  def update
    connection = FaradayBuilder.travel_api_update_destinations(
      "https://young-beyond-8772.herokuapp.com/travelers/#{user_hashsession[:user_hash]["id"]}",
      session[:user_hash]["token"],
      [{"name" => "Tokyo", "visited" => true}, {"name" => "Bali", "visited" => false}]
    )
    response = connection.patch.body

    session[:destination_list] = response["destinations"]
  end

  def list
  end

end
