module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      user = User.find_by(username: cookies.signed[:username])
      if user.present?
        self.current_user = user
      else
        reject_unauthorized_connection
      end
      logger.add_tags 'ActionCable', current_user.username
    end

  end
end
