export default {
    //User Reducer
    userStatus: (state) => state.user.status,
    user: (state) => state.user.data,
    //Confirmation Reducer
    confirmationStatus: (state) => state.confirmation.status,
    confirmationType: (state) => state.confirmation.type,
};
