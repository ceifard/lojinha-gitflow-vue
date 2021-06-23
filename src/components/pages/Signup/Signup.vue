<template>

    <div class="d-flex justify-content-center">
        <div class="signupContainer p-3 rounded shadow p-4">
                <form novalidate @submit.prevent="signUp()" data-vv-scope="signUp">

                    <b-form-row>
                        <b-col>
                            <h4 class="text-center my-2">
                                Cadastro
                            </h4>
                        </b-col>
                    </b-form-row>

                    <hr class="bg-white">

                    <b-form-row class="my-3" v-if="!!msgErro">
                        <b-col class="text-center">
                            <span class="d-block text-danger">
                                <b-icon-patch-exclamation-fill></b-icon-patch-exclamation-fill> 
                                <span class="ml-1">
                                    {{msgErro}}
                                </span>
                            </span>
                        </b-col>
                    </b-form-row>    

                    <b-form-row>
                        <b-col lg="12">
                            <b-form-group :state="!errors.has('signUp.email')"
                                        :invalid-feedback="errors.first('signUp.email')"
                                        label-for="email">
                                            <label class=" ">
                                            Digite seu e-mail abaixo:
                                            </label>                             
                                            <b-input-group>
                                                <template v-slot:prepend>
                                                    <b-input-group-text style="font-size: 12px;">
                                                        <b-icon-envelope></b-icon-envelope>
                                                    </b-input-group-text>
                                                </template>
                                                <b-form-input 
                                                size="sm"
                                                ref="email"
                                                name="email"  
                                                @focus="msgErro = '' "              
                                                v-model="email"
                                                placeholder="exemplo@xxxx.com"
                                                v-validate="'required|email'"
                                                :class="{ 'is-invalid': errors.has('signUp.email') }">
                                                </b-form-input>  
                                            </b-input-group>                                                                           
                            </b-form-group>
                        </b-col> 
                    </b-form-row>

                    <b-form-row>
                        <b-col lg="12">
                            <b-form-group :state="!errors.has('signUp.senha')"
                                        :invalid-feedback="errors.first('signUp.senha')"
                                        label-for="senha">
                                            <label class=" ">
                                            Digite sua senha:
                                            </label>                             
                                            <b-input-group>
                                                <template v-slot:prepend>
                                                    <b-input-group-text style="font-size: 12px;">
                                                        <b-icon-asterisk></b-icon-asterisk>
                                                    </b-input-group-text>
                                                </template>
                                                <b-form-input 
                                                size="sm"
                                                type="password"
                                                @focus="msgErro = '' "   
                                                placeholder="******"
                                                ref="senha"
                                                name="senha"                
                                                v-model="senha"
                                                v-validate="'required|min:6'"
                                                :class="{ 'is-invalid': errors.has('signUp.senha') }">
                                                </b-form-input>  
                                            </b-input-group>                                                                               
                            </b-form-group>
                        </b-col> 
                    </b-form-row>

                    <div class="d-flex justify-content-center">
                        <b-form-row class="footer-container w-100 mt-2 align-items-center">
                            <b-col class="text-center">
                                <router-link to="/signin">
                                    <span class=" underline">Já possuo cadastro</span>
                                </router-link>  
                            </b-col>                   
                        </b-form-row>            
                    </div> 

                    <hr class="bg-white">

                    <b-form-row class="mt-4">
                        <b-col lg="12">
                            <b-button size="sm" block :disabled="carregando" class="action_btn font-weight-bold" variant="secondary" type="submit">
                            <span v-if="!carregando">Cadastrar</span>
                                <template v-else>
                                    <span>Cadastrando</span>
                                    <b-spinner class="ml-2" :style="{ 'margin-bottom': '1px' }" small label="Cadastrando...aguarde"></b-spinner>            
                                </template>
                            </b-button>                             
                        </b-col>
                    </b-form-row>                             

                </form>
        </div>
    </div>

</template>

<script>
export default {
    created() {
        let tokenError = this.$route.params.tokenError
        if(!!tokenError) this.msgErro = tokenError        
    },
    data() {
        return {
            carregando: false,
        }
    },    
    inject: ['$validator'],
    computed: {
        msgErro: {
            get() {
                return this.$store.getters['login/msgErro']
            }, 
            set(value) {
                this.$store.commit('login/msgErro', value)
            }            
        },
        email: {
            get() {
                return this.$store.getters['login/email']
            }, 
            set(value) {
                this.$store.commit('login/email', value)
            }            
        },
        senha: {
            get() {
                return this.$store.getters['login/senha']
            }, 
            set(value) {
                this.$store.commit('login/senha', value)
            }            
        },
    },
    methods: {
        signUp() {
            this.$validator.validateAll('signUp').then( async success => {    
                if(!success) { //se não passar na validação...
                window.scrollTo({
                    top: 1,
                    behavior: 'smooth',
                })
                //focar no campo que há erro
                //this.$refs[`${this.$validator.errors.items[0].field}`].$el.focus()
                } else {  
                    this.carregando = true
                    let response = await this.$store.dispatch('login/cadastraUsuario') 
                    this.errors.clear()
                    if(!response.status) {
                        this.msgErro = response.message
                        this.carregando = false
                        return false
                    }
                    let {
                        status,
                        message,
                        data
                    } = await this.$store.dispatch('login/realizaLogin', {lembrarLogin: false}) 
                    if(!status) {
                        this.msgErro = message
                        this.carregando = false
                        return false
                    }
                    this.$router.push('/')    
                    this.carregando = false                
                }
            })   
            
        }   
    }
}
</script>

<style lang="scss" scoped>
    .signupContainer {
        background-color: #fff;
        margin-top: 80px;
        min-width: 420px;
        max-width: 768px;
    }
</style>