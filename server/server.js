// All Tomorrow's Parties -- server

Meteor.publish("directory", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});

Meteor.publish("parties", function () {
  return Parties.find(
    {$or: [{"public": true}, {invited: this.userId}, {owner: this.userId}]});
});
var sendMessage = function(){
      var from = contactEmail(Meteor.users.findOne(this.userId));
      var to = contactEmail(Meteor.users.findOne(userId));
        Email.send({
          from: "rajanand@fsftn.org",
          to: to,
          replyTo: from || undefined,
          subject: "Cryptoparty" + party.title,
          text:
"Hey, welcome to fsftn event planner '" + party.title + "' on Fsftn Event planner" +
"\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
        });
}
Meteor.methods({
  'sendMessage': function (userId, msg) {
    if (Meteor.isServer)
      sendMessage(this.userId, userId, msg);
  }
});
