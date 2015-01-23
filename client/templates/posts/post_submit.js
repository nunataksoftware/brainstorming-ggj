Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            title: $(e.target).find('[name=title]').val(),
            descripcion: $(e.target).find('[name=descripcion]').val()
        };
        var errors = validatePost(post);
        if (errors.title || errors.descripcion) 
            return Session.set('postSubmitErrors', errors);
        
        Meteor.call('postInsert', post, function(error, result) {
            // display the error to the user and abort
            if (error)
                return throwError(error.reason);

            // show this result but route anyway
            if (result.postExists)
                throwError('Este juego ya existe');
/*
            Router.go('postPage', {
                _id: result._id
            });
*/
            Router.go('postsList', {
            });
            throwMessage(this.title + ' agregado exitosamente');

        });
    }
});


Template.postSubmit.created = function() {
    Session.set('postSubmitErrors', {});
}

Template.postSubmit.helpers({
    errorMessage: function(field) {
        return Session.get('postSubmitErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
    }
});