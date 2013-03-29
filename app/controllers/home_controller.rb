class HomeController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json { head :no_content }
    end
  end
end
