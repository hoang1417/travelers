class HomeController < ApplicationController

  before_action :authorize_token, only: [:index]

  def welcome
  end

  def index
    if session[:destination_list].blank?
      connection = FaradayBuilder.travel_api_client(
        'https://young-beyond-8772.herokuapp.com/travelers.json',
        session[:user_hash]["token"]
      )
      session[:destination_list] = connection.get.body
    end

    @amos_destinations = session[:destination_list][0]["destinations"]
    @andy_destinations = session[:destination_list][1]["destinations"]
    @evie_destinations = session[:destination_list][2]["destinations"]

    @destinations = Country.all.map { |c| c.first }
  end

end
