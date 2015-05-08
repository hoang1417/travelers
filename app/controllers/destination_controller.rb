class DestinationController < ApplicationController

  before_action :authorize_token, only: [:update]

  def update
    user_hash = session[:user_hash]

    connection = FaradayBuilder.travel_api_update_destinations(
      "https://young-beyond-8772.herokuapp.com/travelers/#{user_hash["id"]}",
      user_hash["token"],
      '[{"name":"Tokyo", "visited": true}, {"name": "Bali", "visited": false}]'
    )

    response = connection.patch.body
  end

  def list
  end

end
