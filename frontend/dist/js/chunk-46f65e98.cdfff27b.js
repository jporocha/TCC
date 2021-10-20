(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46f65e98"],{5291:function(e,s,t){},"7b5c":function(e,s,t){"use strict";t("5291")},a55b:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-container",{staticClass:"d-flex fill-height justify-center align-center cardBG",attrs:{fluid:""}},[t("v-spacer"),t("transition",{attrs:{name:"rotate",mode:"out-in"}},[1===e.modo?t("LoginCard",{on:{Register:e.changeToRegister,ForgotPass:e.changeToPass}}):2===e.modo?t("ForgotPass",{on:{Login:e.changeToLogin}}):e._e()],1),t("v-spacer")],1)},o=[],n=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-card",{staticClass:"pa-2",attrs:{width:"300px"}},[t("v-card-title",{staticClass:"d-flex justify-center"},[e._v(" Login ")]),t("v-divider"),t("v-card-text",[t("v-form",{ref:"form",model:{value:e.valid,callback:function(s){e.valid=s},expression:"valid"}},[t("v-text-field",{attrs:{"prepend-icon":"mdi-email-outline",label:"E-mail",required:"",outlined:"",rules:e.emailRules,dense:""},model:{value:e.email,callback:function(s){e.email=s},expression:"email"}}),t("v-text-field",{attrs:{"prepend-icon":"mdi-account-key-outline","append-icon":e.showPass?"mdi-eye":"mdi-eye-off",type:e.showPass?"text":"password",label:"Senha",required:"",outlined:"",dense:"",rules:e.passwordRules},on:{"click:append":function(s){e.showPass=!e.showPass}},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),t("div",{staticClass:"d-flex justify-center"},[t("v-btn",{attrs:{color:"green","min-width":"150px",small:""},on:{click:e.login}},[e._v("Entrar")])],1),t("div",{staticClass:"link caption text-center mt-4",on:{click:function(s){return e.newEvent("ForgotPass")}}},[e._v(" Redefina sua senha. ")]),t("div",{staticClass:"link caption text-center mt-4",on:{click:e.sendAccessToken}},[e._v(" Receber token de acesso único. ")])],1)],1)],1)},i=[],r=t("bc3a"),l=t.n(r),c={data:function(){return{email:"",password:"",showPass:!1,valid:null,emailRules:[function(e){return!!e||"Forneça um e-mail"},function(e){return/.+@.+\..+/.test(e)||"E-mail inválido"}],passwordRules:[function(e){return e&&e.length>=8||"Senha inválida"}]}},methods:{login:function(){var e=this,s={username:this.email,password:this.password};l.a.post("/auth/login",s).then((function(s){e.$root.vtoast.show({message:"Login realizado com sucesso."});var t="admin"===s.data?"Dashboard":"Cliente";e.$router.push(t)})).catch((function(){e.$root.vtoast.show({message:"Falha no login do usuário",color:"red lighten-2",icon:"mdi-account-alert"})}))},sendAccessToken:function(){var e=this,s={email:this.email};l.a.post("/users/accessToken",s).then((function(s){e.$root.vtoast.show({message:s.data})})).catch((function(s){e.$root.vtoast.show({message:s.response.data.erro,color:"red lighten-2",icon:"mdi-account-alert"})}))},newEvent:function(e){this.$emit(e)}}},d=c,u=(t("a7cc"),t("2877")),m=t("6544"),f=t.n(m),p=t("8336"),h=t("b0af"),v=t("99d9"),w=t("ce7e"),g=t("4bd4"),b=t("8654"),k=Object(u["a"])(d,n,i,!1,null,"e5d2d182",null),x=k.exports;f()(k,{VBtn:p["a"],VCard:h["a"],VCardText:v["b"],VCardTitle:v["c"],VDivider:w["a"],VForm:g["a"],VTextField:b["a"]});var C=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("v-card",{staticClass:"pa-2",attrs:{width:"300px"}},[t("v-card-title",{staticClass:"d-flex justify-center"},[e._v(" Recuperação de senha ")]),t("v-divider"),t("v-card-text",[t("v-form",{model:{value:e.form1,callback:function(s){e.form1=s},expression:"form1"}},[t("v-text-field",{attrs:{"prepend-icon":"mdi-email-outline",label:"Digite seu e-mail",rules:e.emailRules,required:"",outlined:"",dense:"",disabled:e.disableMail},on:{keydown:function(s){return!s.type.indexOf("key")&&e._k(s.keyCode,"enter",13,s.key,"Enter")?null:e.requestToken.apply(null,arguments)}},model:{value:e.email,callback:function(s){e.email=s},expression:"email"}}),t("div",{staticClass:"d-flex justify-center mb-3"},[t("v-btn",{attrs:{disabled:e.disableMail||!e.form1,color:"blue","min-width":"150px",small:""},on:{click:e.requestToken}},[e._v("Enviar código")])],1)],1),t("transition",{attrs:{name:"slide"}},[e.sentCode?t("v-form",{model:{value:e.form2,callback:function(s){e.form2=s},expression:"form2"}},[t("v-divider",{staticClass:"mb-4 mt-4"}),t("v-text-field",{attrs:{"prepend-icon":"mdi-account-key-outline",label:"Token",rules:e.tokenRules,outlined:"",dense:""},model:{value:e.code,callback:function(s){e.code=s},expression:"code"}}),t("v-text-field",{attrs:{"prepend-icon":"mdi-shield-key","append-icon":e.showPass?"mdi-eye":"mdi-eye-off",label:"Nova senha",rules:e.passwordRules,type:e.showPass?"text":"password",outlined:"",dense:""},on:{"click:append":function(s){e.showPass=!e.showPass}},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),t("v-text-field",{attrs:{"prepend-icon":"mdi-shield-key","append-icon":e.showPass2?"mdi-eye":"mdi-eye-off",type:e.showPass2?"text":"password",label:"Repita a senha",rules:e.passwordCheckRules,outlined:"",dense:""},on:{"click:append":function(s){e.showPass2=!e.showPass2}},model:{value:e.password2,callback:function(s){e.password2=s},expression:"password2"}}),t("div",{staticClass:"d-flex justify-center"},[t("v-btn",{attrs:{disabled:!e.form2,color:"green","min-width":"150px",small:""},on:{click:e.changePassword}},[e._v("Redefinir senha")])],1)],1):e._e()],1)],1),t("v-divider"),t("v-card-actions",{staticClass:"justify-center mt-2"},[t("v-btn",{attrs:{"min-width":"150px",color:"red darken-2",small:""},on:{click:e.returnToLogin}},[e._v(" Cancelar")])],1)],1)},y=[],P={data:function(){var e=this;return{form1:!1,form2:!1,sentCode:!1,email:"",code:"",password:"",password2:"",disableMail:!1,showPass:!1,showPass2:!1,emailRules:[function(e){return!!e||"Forneça um e-mail"},function(e){return/.+@.+\..+/.test(e)||"E-mail inválido"}],passwordRules:[function(e){return e&&e.length>=8||"Senha inválida"}],tokenRules:[function(e){return e&&e.length>=20||"Token inválido"}],passwordCheckRules:[function(e){return e&&e.length>=8||"Senha muito curta"},function(){return e.password===e.password2||"Senhas inválida"}]}},methods:{returnToLogin:function(){this.$emit("Login")},requestToken:function(){var e=this,s={email:this.email};this.disableMail=!0,l.a.post("/users/recoverPassword",s).then((function(s){e.sentCode=!0,e.$root.vtoast.show({message:s.data})})).catch((function(s){e.disableMail=!1,e.$root.vtoast.show({color:"red",message:s.response.data})}))},changePassword:function(){var e=this;if(this.password!=this.password2)return this.$root.vtoast.show({color:"red",message:"Confira sua senha."});var s={email:this.email,token:this.code,password:this.password};l.a.post("/users/resetPassword",s).then((function(s){e.$root.vtoast.show({message:s.data}),e.$emit("Login")})).catch((function(s){e.$root.vtoast.show({color:"red",message:s.response.data})}))}}},T=P,R=(t("f821"),Object(u["a"])(T,C,y,!1,null,"1f8ce2e8",null)),V=R.exports;f()(R,{VBtn:p["a"],VCard:h["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VDivider:w["a"],VForm:g["a"],VTextField:b["a"]});var _={components:{LoginCard:x,ForgotPass:V},data:function(){return{email:"",password:"",valid:null,modo:1}},methods:{changeToPass:function(){this.modo=2},changeToLogin:function(){this.modo=1}}},$=_,E=(t("7b5c"),t("a523")),F=t("2fa4"),L=Object(u["a"])($,a,o,!1,null,"b6511434",null);s["default"]=L.exports;f()(L,{VContainer:E["a"],VSpacer:F["a"]})},a7cc:function(e,s,t){"use strict";t("b085")},b085:function(e,s,t){},c018:function(e,s,t){},f821:function(e,s,t){"use strict";t("c018")}}]);
//# sourceMappingURL=chunk-46f65e98.cdfff27b.js.map