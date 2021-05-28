<template>
    <b-row>
        <b-col offset-lg="3" lg="6">
            <b-card title="Minha assinatura" sub-title="Todos os detalhes da sua assinatura se encontram aqui">

                <hr>

                <b-row>
                    <b-col>
                        <h5 class="mt-2 mb-3">
                            <span v-if="(subscription.status == 2 || subscription.status == 0)" class="text-success">
                                Sua assinatura está ok!
                            </span>
                            <span v-else class="text-secondary">
                                Sem assinatura
                            </span>
                        </h5>
                    </b-col>
                </b-row>
                
                <b-row>
                    <b-col lg="12">
                        <h6 v-if="!!plano">Plano: {{plano}}</h6>
                        <div class="cartao" v-if="subscription.status == 2 || subscription.status == 3">
                            <span class="text-sm">
                                O último pagamento foi realizado no cartão com os 4 últimos digitos: <span class="font-weight-bold">8088</span>, no dia {{new Date(subscription.data.current_period_start).toLocaleDateString()}}.
                            </span>
                        </div>      
                        <div class="assinaturaExpirada" v-if="subscription.status == 1">
                            <span class="text-sm">Seu período de testes expirou! Se deseja continuar conosco, clique em "Assinar plano".</span>
                        </div>    
                    </b-col>
                    <b-col lg="12">
                        <div class="semAssinatura">
                            
                            <b-button class="mt-3" v-if="subscription.status == 1 || subscription.status == 3">
                                {{subscription.status == 3 ? 'Renovar plano' : 'Assinar plano'}}
                            </b-button>
                            <small v-if="subscription.status == 0">Você ainda está em seu período de testes, aproveite!</small>
                        </div>
                        <div v-if="subscription.status == 2" class="assinaturaOk my-2">
                            <small>Seu plano irá renovar em {{data_expiracao}}.</small>
                            <span class="text-sm">
                                <button @click="showingCancel = true" class="d-block mt-2 btn p-0 btn-link">Quero cancelar minha assinatura</button> 
                            </span>                        
                        </div>
                    </b-col>
                </b-row>

            </b-card>            
        </b-col>
        <Cancel 
            :showing="showingCancel" 
            @close="showingCancel = false"
            :data_expiracao="data_expiracao"
        />
    </b-row>
</template>

<script>
import Cancel from './components/Cancel.vue'
export default {
    components: {
        Cancel
    },
    // -- STATUS DA ASSINATURA
    // 0 - período de testes
    // 1 - periodo de testes expirou e nenhuma assinatura foi feita ainda
    // 2 - assinatura existente e está paga
    // 3 - assinatura existente mas não está paga
    computed: {
        data_expiracao() {
            return new Date(this.subscription.data.current_period_end).toLocaleDateString()
        },
        plano() {
            switch (this.subscription.status) {
                case 0:
                    return `Período de testes (${this.subscription.data.dias_restantes} dias restantes)`
                case 2:
                    return `Padrão`
                default:
                    return ``
            }
        }
    },
    data() {
        return {
            showingCancel: false,
            subscription: {
                status: 2, 
                data: {
                    "expira_em": "26/06/2021",
                    "dias_restantes": 29,
                    "object": "subscription",
                    "plan": {
                        "object": "plan",
                        "id": 573355,
                        "amount": 31000,
                        "days": 30,
                        "name": "Plano ouro",
                        "trial_days": 0,
                        "date_created": "2021-04-15T20:57:08.437Z",
                        "payment_methods": [
                            "boleto",
                            "credit_card"
                        ],
                        "color": null,
                        "charges": null,
                        "installments": 1,
                        "invoice_reminder": null,
                        "payment_deadline_charges_interval": 1
                    },
                    "id": 587620,
                    "current_transaction": {
                        "object": "transaction",
                        "status": "paid",
                        "refuse_reason": null,
                        "status_reason": "acquirer",
                        "acquirer_response_code": "0000",
                        "acquirer_name": "pagarme",
                        "acquirer_id": "607722b1dde1a8001165aad5",
                        "authorization_code": "217027",
                        "soft_descriptor": null,
                        "tid": 12002189,
                        "nsu": 12002189,
                        "date_created": "2021-04-15T21:25:53.747Z",
                        "date_updated": "2021-04-15T21:25:54.099Z",
                        "amount": 31000,
                        "authorized_amount": 31000,
                        "paid_amount": 31000,
                        "refunded_amount": 0,
                        "installments": 1,
                        "id": 12002189,
                        "cost": 120,
                        "card_holder_name": "Aardvark Silva",
                        "card_last_digits": "8048",
                        "card_first_digits": "401872",
                        "card_brand": "visa",
                        "card_pin_mode": null,
                        "card_magstripe_fallback": false,
                        "cvm_pin": false,
                        "postback_url": null,
                        "payment_method": "credit_card",
                        "capture_method": "ecommerce",
                        "antifraud_score": null,
                        "boleto_url": null,
                        "boleto_barcode": null,
                        "boleto_expiration_date": null,
                        "referer": "api_key",
                        "ip": "177.184.232.94",
                        "subscription_id": 587620,
                        "metadata": {},
                        "antifraud_metadata": {},
                        "reference_key": null,
                        "device": null,
                        "local_transaction_id": null,
                        "local_time": null,
                        "fraud_covered": false,
                        "fraud_reimbursed": null,
                        "order_id": null,
                        "risk_level": "very_low",
                        "receipt_url": null,
                        "payment": null,
                        "addition": null,
                        "discount": null,
                        "private_label": null,
                        "pix_qr_code": null,
                        "pix_expiration_date": null
                    },
                    "postback_url": null,
                    "payment_method": "credit_card",
                    "card_brand": "mastercard",
                    "card_last_digits": "3198",
                    "current_period_start": "2021-04-15T21:25:53.720Z",
                    "current_period_end": "2021-05-15T21:25:53.720Z",
                    "charges": 0,
                    "soft_descriptor": null,
                    "status": "canceled",
                    "date_created": "2021-04-15T21:25:54.078Z",
                    "date_updated": "2021-04-20T22:18:52.038Z",
                    "phone": {
                        "object": "phone",
                        "ddi": "55",
                        "ddd": "11",
                        "number": "987654321",
                        "id": 998661
                    },
                    "address": {
                        "object": "address",
                        "street": "Rua Drogon",
                        "complementary": null,
                        "street_number": "240",
                        "neighborhood": "Dragon Village",
                        "city": "São Paulo",
                        "state": "SP",
                        "zipcode": "04571020",
                        "country": "Brasil",
                        "id": 4329071
                    },
                    "customer": {
                        "object": "customer",
                        "id": 5200119,
                        "external_id": null,
                        "type": null,
                        "country": null,
                        "document_number": "18152564000105",
                        "document_type": "cnpj",
                        "name": "Daenerys Targaryen",
                        "email": "daenerys.targaryen@gmail.com",
                        "phone_numbers": null,
                        "born_at": null,
                        "birthday": null,
                        "gender": null,
                        "date_created": "2021-04-15T21:25:53.659Z",
                        "documents": []
                    },
                    "card": {
                        "object": "card",
                        "id": "card_cknqkrbry0arp0h9tw93am39x",
                        "date_created": "2021-04-20T22:04:23.518Z",
                        "date_updated": "2021-04-20T22:04:23.672Z",
                        "brand": "mastercard",
                        "holder_name": "Audrey Walker",
                        "first_digits": "518697",
                        "last_digits": "3198",
                        "country": "FINLAND",
                        "fingerprint": "cknqkrbdk2zpv0m78jr99sriw",
                        "valid": true,
                        "expiration_date": "0730"
                    },
                    "metadata": null,
                    "fine": {},
                    "interest": {},
                    "settled_charges": null,
                    "manage_token": "test_subscription_TQK7oAyi0TOepJwKKbo7WCtUvT6dlF",
                    "manage_url": "https://pagar.me/customers/#/subscriptions/587620?token=test_subscription_TQK7oAyi0TOepJwKKbo7WCtUvT6dlF"
                }
            }
        }
    }
}
</script>

<style>
.assinaturaExpirada {
    display: flex;
    align-items: center;
}
.text-sm {
    font-size: 0.8em;
}
</style>