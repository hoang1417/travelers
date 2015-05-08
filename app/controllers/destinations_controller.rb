class DestinationsController < ApplicationController

  before_action :authorize_token, only: [:update]

  def update

    connection = FaradayBuilder.travel_api_update_destinations(
      "https://young-beyond-8772.herokuapp.com/travelers/#{session[:user_hash]["id"]}",
      session[:user_hash]["token"],
      JSON.parse(params[:destinations])
    )
    response = connection.patch.body

    respond_to do |format|
      format.json { render json: { status: :ok, destinations: response["destinations"] }}
    end
  end

  def list
  end

end
