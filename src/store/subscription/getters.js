export const getters = {
    step: state => state.step,
    creatingCustomer: state => state.creatingCustomer,
    newCustomer: state => state.newCustomer,
    newCustomerName: state => state.newCustomer.name,
    newCustomerDocumentNumber: state => state.newCustomer.documents[0].number,
    newCustomerPhoneNumber: state => state.newCustomer.phone_numbers[0],
    newCustomerBirthday: state => state.newCustomer.birthday,
    newCard: state => state.newCard,
    gettingCustomerCardList: state => state.gettingCustomerCardList,
    customerCardList: state => state.customerCardList,
}