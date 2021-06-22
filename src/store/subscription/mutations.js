import { 
    capitalize
} from '@/utils/input'

export const mutations = {
    step: (state, obj) => state.step = obj,
    cancelling: (state, obj) => state.cancelling = obj,
    userSubscription: (state, obj) => state.userSubscription = obj,
    subscribing: (state, obj) => state.subscribing = obj,
    newSubscription: (state, obj) => state.newSubscription = obj,
    customer: (state, obj) => state.newSubscription.customer = obj,
    email: (state, obj) => state.newSubscription.customer.email = obj,
    name: (state, obj) => state.newSubscription.customer.name = obj,
    document_number: (state, obj) => state.newSubscription.customer.document_number = obj,
    zipcode: (state, obj) => state.newSubscription.customer.address.zipcode = obj,
    neighborhood: (state, obj) => state.newSubscription.customer.address.neighborhood = obj,
    street: (state, obj) => state.newSubscription.customer.address.street = obj,
    street_number: (state, obj) => state.newSubscription.customer.address.street_number = obj,
    number: (state, obj) => state.newSubscription.customer.phone.number = obj,
    ddd: (state, obj) => state.newSubscription.customer.phone.ddd = obj,
    card_number: (state, obj) => state.newSubscription.card_number = obj,
    card_holder_name: (state, obj) => state.newSubscription.card_holder_name = obj,
    card_expiration_date: (state, obj) => state.newSubscription.card_expiration_date = obj,
    card_cvv: (state, obj) => state.newSubscription.card_cvv = obj,
}