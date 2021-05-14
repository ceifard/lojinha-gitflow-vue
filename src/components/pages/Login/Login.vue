<template>

    <div class="d-flex justify-content-center">
        <div class="loginContainer p-3 rounded shadow p-4">
                <form novalidate @submit.prevent="signIn()" data-vv-scope="signIn">

                    <b-form-row>
                        <b-col>
                            <h4 class="text-center my-2">
                                Login
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
                            <b-form-group :state="!errors.has('signIn.email')"
                                        :invalid-feedback="errors.first('signIn.email')"
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
                                                :class="{ 'is-invalid': errors.has('signIn.email') }">
                                                </b-form-input>  
                                            </b-input-group>                                                                           
                            </b-form-group>
                        </b-col> 
                    </b-form-row>

                    <b-form-row>
                        <b-col lg="12">
                            <b-form-group :state="!errors.has('signIn.senha')"
                                        :invalid-feedback="errors.first('signIn.senha')"
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
                                                :class="{ 'is-invalid': errors.has('signIn.senha') }">
                                                </b-form-input>  
                                            </b-input-group>                                                                               
                            </b-form-group>
                        </b-col> 
                    </b-form-row>

                    <div class="d-flex justify-content-center">
                        <b-form-row class="footer-container w-100 mt-2 align-items-center">
                            <div class="align-items-center">
                                <input type="radio" name="rememberme" id="rememberme" @click="lembrarLogin = true">
                            </div>        
                            <div class="ml-2 align-items-center">
                                <label for="rememberme" class="font-weight-normal  mb-0">Lembre-se de mim</label>
                            </div>            
                            <b-col class="text-right">
                                <router-link to="/esqueciminhasenha">
                                    <span class=" underline">Esqueci minha senha</span>
                                </router-link>  
                            </b-col>                   
                        </b-form-row>            
                    </div> 

                    <hr class="bg-white">

                    <b-form-row class="mt-4">
                        <b-col lg="12">
                            <b-button size="sm" block :disabled="carregando" class="action_btn font-weight-bold" variant="secondary" type="submit">
                            <span v-if="!carregando">Fazer login</span>
                                <template v-else>
                                    <span>Logando</span>
                                    <b-spinner class="ml-2" :style="{ 'margin-bottom': '1px' }" small label="Logando...aguarde"></b-spinner>            
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
            lembrarLogin: false,
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
        signIn() {
            this.$validator.validateAll('signIn').then( async success => {    
                if(!success) { //se não passar na validação...
                window.scrollTo({
                    top: 1,
                    behavior: 'smooth',
                })
                //focar no campo que há erro
                //this.$refs[`${this.$validator.errors.items[0].field}`].$el.focus()
                } else {  
                    let {
                        status,
                        message,
                        data
                    } = await this.$store.dispatch('login/realizaLogin', {lembrarLogin: this.lembrarLogin}) 
                    this.errors.clear()
                    if(!status) {
                        this.msgErro = message
                        return false
                    }
                    this.$router.push('/')
                }
            })   
            
        }   
    }
}
</script>

<style lang="scss" scoped>
    .loginContainer {
        background-color: #fff;
        margin-top: 80px;
        min-width: 420px;
        max-width: 768px;
    }
</style>