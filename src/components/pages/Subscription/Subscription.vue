<template>
    <b-row>
        <b-col offset-lg="3" lg="6">
            <b-card title="Minha assinatura" sub-title="Todos os detalhes da sua assinatura se encontram aqui">

                <hr>

                <div class="text-center" v-if="loadingSubscription">
                    <b-spinner label="Carregando informações"></b-spinner>
                </div>

                <div v-else>

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
                                    O último pagamento foi realizado no cartão com os 4 últimos digitos: <span class="font-weight-bold">{{subscription.data.current_transaction.card_last_digits}}</span>, no dia {{new Date(subscription.data.current_period_start).toLocaleDateString()}}.
                                </span>
                            </div>      
                            <div class="assinaturaExpirada" v-if="subscription.status == 1">
                                <span class="text-sm">Seu período de testes expirou! Se deseja continuar conosco, clique em "Assinar plano".</span>
                            </div>    
                        </b-col>
                        <b-col lg="12">
                            <div class="semAssinatura">
                                
                                <b-button class="mt-3" v-if="subscription.status == 1 || subscription.status == 3" @click="showingSubscribe = true">
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

                </div>

            </b-card>            
        </b-col>
        <Cancel 
            :v-if="showingCancel" 
            :showing="showingCancel" 
            @close="showingCancel = false"
            :data_expiracao="data_expiracao"
        />
        <Subscribe 
            :v-if="showingSubscribe" 
            :showing="showingSubscribe" 
            @close="showingSubscribe = false"
            @subscriptionComplete="validateSubscription()"
        />
    </b-row>
</template>

<script>
import Subscribe from './components/Subscribe/Subscribe.vue'
import Cancel from './components/Cancel.vue'
export default {
    components: {
        Subscribe,
        Cancel
    },
    // -- STATUS DA ASSINATURA
    // 0 - período de testes
    // 1 - periodo de testes expirou e nenhuma assinatura foi feita ainda
    // 2 - assinatura existente e está paga
    // 3 - assinatura existente mas não está paga
    async created() {
        this.validateSubscription()
    },
    data() {
        return {
            loadingSubscription: false,
            showingCancel: false,
            showingSubscribe: false,
            subscription: {}
        }
    },    
    methods: {
        async validateSubscription() {
            this.loadingSubscription = true
            let subscriptionResponse = await this.$store.dispatch('subscription/validateSubscription')
            console.log(subscriptionResponse.data.data);
            this.subscription = subscriptionResponse.status ? subscriptionResponse.data : subscriptionResponse.data.data
            this.loadingSubscription = false
        }
    },
    computed: {
        data_expiracao() {
            return !!this.subscription.data ? new Date(this.subscription.data.current_period_end).toLocaleDateString() : ""
        },
        plano() {
            if(!!this.subscription.data) {
                switch (this.subscription.status) {
                    case 0:
                        return `Período de testes (${this.subscription.data.dias_restantes} dias restantes)`
                    case 2:
                        return `Padrão`
                    default:
                        return ``
                }
            } else {
                return 'alo'
            }
        }
    },
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