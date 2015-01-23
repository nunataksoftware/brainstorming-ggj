
Template.messages.helpers({
    messages: function() {
        return Messages.find();
    }
});

Template.message.rendered = function() {
    var message = this.data;
    Meteor.setTimeout(function() {
        Messages.remove(message._id);
    }, 3000);
};
