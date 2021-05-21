<template>
    <div>
        <b-row class="my-2" align-v="end">     

                <b-col cols="6">
                    <b-input-group>
                        <b-form-input
                        size="sm"
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Digite algo para pesquisar"
                        ></b-form-input>
                        <b-input-group-append>
                        <b-button size="sm" :disabled="!filter" @click="filter = ''">Limpar</b-button>
                        </b-input-group-append>
                    </b-input-group>          
                </b-col>  

                <b-col cols="6" class="text-right">
                    <b-button size="sm" variant="primary" @click="modalNovoProdutoAberta = true">
                        Novo Produto
                    </b-button>        
                </b-col>  

        </b-row> 

        <b-row>
            <b-col>
                <b-table bordered hover
                        class="text-center align-items-center bg-light"
                        :busy="carregandoProdutosEmEstoque"
                        show-empty
                        responsive
                        stacked="md"
                        :fields="campos"
                        :items="listagemProdutosEmEstoque" 
                        :perPage="perPage"
                        :currentPage="currentPage"                                                    
                        :filter="filter"
                        empty-text="Nenhum registro encontrado"
                        empty-filtered-text="Não há registros para exibir com as configurações selecionadas">   

                        <div slot="table-busy" class="text-center text-secondary my-2">
                            <b-spinner class="align-middle mr-2"></b-spinner>
                            <strong>Carregando...</strong>
                        </div>

                        <template v-slot:cell(preco)="data">                            
                                {{data.item.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}}                                                                 
                        </template>  

                        <template v-slot:cell(acoes)="data">                            
                                <b-button class="mx-1" size="sm" variant="outline-primary" @click="vendeProduto(data.item.id)">
                                    <span>
                                    Vender
                                    </span>                                       
                                </b-button>                                                                     
                        </template>  

                </b-table>
            </b-col>
        </b-row>

		<b-pagination
            v-if="!carregandoProdutosEmEstoque"
			v-model="currentPage"
			:total-rows="totalRows"
			:per-page="perPage"
            class="pb-3"
		></b-pagination>        
        
        <NewProduct :showing="modalNovoProdutoAberta" @close="modalNovoProdutoAberta = false"/>

    </div>
</template>

<script>
import NewProduct from './NewProduct.vue'
export default {
    components: {
        NewProduct
    },
    data() {
        return {
            currentPage: 1,
            perPage: 5,            
            modalNovoProdutoAberta: false,
            filter: '',
            campos: [  
                {
                  key: 'nome',
                  label: 'Nome',
                  sortable: true
                },   
                {
                  key: 'preco',
                  label: 'Preço',
                  sortable: true
                },   
                {
                  key: 'descricao',
                  label: 'Descrição',
                  sortable: true
                },   
                {
                  key: 'acoes',
                  label: 'Ações',
                },   
            ]
        }
    },
    computed: {
        carregandoProdutosEmEstoque() {
            return this.$store.getters['products/carregandoProdutosEmEstoque']
        },
        listagemProdutosEmEstoque() {
            return this.$store.getters['products/listagemProdutosEmEstoque']
        },
        totalRows() {
            return this.listagemProdutosEmEstoque.length;
        },        
    },
    methods: {
        async vendeProduto(id) {
            this.$store.dispatch('products/vendeProduto', id)
        }
    }
}
</script>