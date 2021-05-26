<template>
  <b-modal :visible="showing"
           centered
           title="Novo produto"
           hide-footer>

        <form autocomplete="off" @submit.prevent="enviar()">
            <b-form-group
                label="Nome:"
                label-for="nome"
            >
                <b-form-input
                    id="nome"
                    v-model="produto.nome"
                    type="text"
                    placeholder="Digite o nome do produto"
                    required
                ></b-form-input>
                
            </b-form-group>

            <b-form-group
                label="Preço:"
                label-for="preco"
            >
                <b-form-input
                    id="preco"
                    v-model.lazy="produto.preco"
                    v-money="money"
                    type="text"
                    placeholder="Digite o preço"
                    required
                ></b-form-input>

            </b-form-group>

            <b-form-group
                label="Descrição:"
                label-for="descricao"
            >
                <b-textarea
                    id="descricao"
                    v-model="produto.descricao"
                    type="text"
                    placeholder="Escreva uma descrição"
                    required
                ></b-textarea>

            </b-form-group>

            <div class="text-right">
                <b-button size="sm" variant="danger" @click="$emit('close')">
                    <i class="fa fa-times"></i> Fechar 
                </b-button>  

                <b-button size="sm" class="mx-2" type="submit">
                    Enviar
                </b-button>                
            </div>

        </form>

  </b-modal> 
</template>

<script>
import {VMoney} from 'v-money'
export default {  
    directives: {money: VMoney},
    props: {
        showing: Boolean,
    },
    data() {
        return {
            produto: {
                nome: "",
                preco: "",
                descricao: ""
            },
            money: {
                decimal: '.',
                prefix: 'R$ ',
                precision: 2,
                masked: false
            }            
        }
    },
    async mounted() {
        this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
            this.$emit('close')
        })   
    },
    methods: {
        async enviar() {
            await this.$store.dispatch('products/adicionaProduto', this.produto)
            this.$emit('close')
        }
    }
}
</script>