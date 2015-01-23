Posts = new Meteor.Collection('posts');
Posts.allow({
    update: function(userId, post) {
        return ownsDocument(userId, post);
    },
    remove: function(userId, post) {
        return ownsDocument(userId, post);
    },
});
Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'descripcion', 'title').length > 0);
    }
});
Posts.deny({
    update: function(userId, post, fieldNames, modifier) {
        var errors = validatePost(modifier.$set);
        return errors.title || errors.descripcion;
    }
});
Meteor.methods({
    postInsert: function(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            descripcion: String
        });
        var errors = validatePost(postAttributes);
        if (errors.title || errors.descripcion)
            throw new Meteor.Error('invalid-post', "Debes ingresar un Nombre y una descripción a tu juego");

        var postWithSameLink = Posts.findOne({
            descripcion: postAttributes.descripcion
        });
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }
        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});

validatePost = function(post) {
    var errors = {};
    if (!post.title) errors.title = "Por favor, colocar un nombre";
    if (!post.descripcion) errors.descripcion = "Por favor, colocar una descripción";
    return errors;
}
