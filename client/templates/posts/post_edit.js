Template.postEdit.created = function() {
    Session.set('postEditErrors', {});
}
Template.postEdit.helpers({
    errorMessage: function(field) {
        return Session.get('postEditErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
    }
});

Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            title: $(e.target).find('[name=title]').val(),
            descripcion: $(e.target).find('[name=descripcion]').val()
        }
        var errors = validatePost(postProperties);
        if (errors.title || errors.descripcion) 
          return Session.set('postEditErrors', errors);
        
        Posts.update(currentPostId, {
            $set: postProperties
        }, function(error) {
            if (error) {
                // display the error to the user
                throwError(error.reason);
            } else {
                /*Router.go('postPage', {
                    _id: currentPostId
                });*/
                Router.go('postsList', {
                });
                throwMessage(this.title + ' editado exitosamente');
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("¿Borrar este juego?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});
