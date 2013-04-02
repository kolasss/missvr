desc "This task is called by the Heroku scheduler add-on"

task :update_feed => :environment do
  puts "Updating info about participants"
  Participant.update_from_vk
  puts "done."
end

# task :send_reminders => :environment do
#   User.send_reminders
# end