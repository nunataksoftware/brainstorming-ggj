if ( Meteor.users.find().count() === 0 ) {
    var userId = Accounts.createUser({
        username: 'root',
        email: 'gui.nunez@gmail.com',
        password: 'root',
        profile: {
            first_name: 'Root',
            last_name: 'Root',
            company: 'Nunatak Software S.A.',
            can_edit: true,
        }
    });
};