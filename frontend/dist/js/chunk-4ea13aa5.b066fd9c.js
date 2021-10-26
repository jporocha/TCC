(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ea13aa5"],{"6fae":function(e,t,a){},7820:function(e,t,a){},"98a5":function(e,t,a){"use strict";a("6fae")},a523:function(e,t,a){"use strict";a("4de4"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85");var s=a("e8f2"),n=a("d9f7");t["a"]=Object(s["a"])("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var a,s=t.props,o=t.data,i=t.children,r=o.attrs;return r&&(o.attrs={},a=Object.keys(r).filter((function(e){if("slot"===e)return!1;var t=r[e];return e.startsWith("data-")?(o.attrs[e]=t,!1):t||"string"===typeof t}))),s.id&&(o.domProps=o.domProps||{},o.domProps.id=s.id),e(s.tag,Object(n["a"])(o,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(a||[])}),i)}})},a55b:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"d-flex fill-height justify-center align-center cardBG",attrs:{fluid:""}},[a("v-spacer"),a("transition",{attrs:{name:"rotate",mode:"out-in"}},[1===e.modo?a("LoginCard",{on:{ForgotPass:e.changeToPass}}):2===e.modo?a("ForgotPass",{on:{Login:e.changeToLogin}}):e._e()],1),a("v-spacer")],1)},n=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"pa-2",attrs:{width:"300px"}},[a("v-card-title",{staticClass:"d-flex justify-center"},[e._v(" Login ")]),a("v-divider"),a("v-card-text",[a("v-form",{ref:"form",model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-email-outline",label:"E-mail",required:"",outlined:"",rules:e.emailRules,dense:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("v-text-field",{attrs:{"prepend-icon":"mdi-account-key-outline","append-icon":e.showPass?"mdi-eye":"mdi-eye-off",type:e.showPass?"text":"password",label:"Senha",required:"",outlined:"",dense:"",rules:e.passwordRules},on:{"click:append":function(t){e.showPass=!e.showPass}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("div",{staticClass:"d-flex justify-center"},[a("v-btn",{attrs:{color:"green","min-width":"150px",small:""},on:{click:e.login}},[e._v("Entrar")])],1),a("div",{staticClass:"link caption text-center mt-4",on:{click:function(t){return e.newEvent("ForgotPass")}}},[e._v(" Redefina sua senha. ")]),a("div",{staticClass:"link caption text-center mt-4",on:{click:e.sendAccessToken}},[e._v(" Receber token de acesso único. ")])],1)],1)],1)},i=[],r=a("bc3a"),l=a.n(r),c={data:function(){return{email:"",password:"",showPass:!1,valid:null,emailRules:[function(e){return!!e||"Forneça um e-mail"},function(e){return/.+@.+\..+/.test(e)||"E-mail inválido"}],passwordRules:[function(e){return e&&e.length>=8||"Senha inválida"}]}},methods:{login:function(){var e=this,t={username:this.email,password:this.password};l.a.post("/auth/login",t).then((function(t){e.$root.vtoast.show({message:"Login realizado com sucesso."}),e.$router.push("/")})).catch((function(){e.$root.vtoast.show({message:"Falha no login do usuário",color:"red lighten-2",icon:"mdi-account-alert"})}))},sendAccessToken:function(){var e=this,t={email:this.email};l.a.post("/users/accessToken",t).then((function(t){e.$root.vtoast.show({message:t.data})})).catch((function(t){e.$root.vtoast.show({message:t.response.data.erro,color:"red lighten-2",icon:"mdi-account-alert"})}))},newEvent:function(e){this.$emit(e)}}},d=c,u=(a("98a5"),a("2877")),f=a("6544"),m=a.n(f),p=a("8336"),h=a("b0af"),v=a("99d9"),w=a("ce7e"),g=a("4bd4"),b=a("8654"),k=Object(u["a"])(d,o,i,!1,null,"f04ad020",null),x=k.exports;m()(k,{VBtn:p["a"],VCard:h["a"],VCardText:v["c"],VCardTitle:v["d"],VDivider:w["a"],VForm:g["a"],VTextField:b["a"]});var y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{staticClass:"pa-2",attrs:{width:"300px"}},[a("v-card-title",{staticClass:"d-flex justify-center"},[e._v(" Recuperação de senha ")]),a("v-divider"),a("v-card-text",[a("v-form",{model:{value:e.form1,callback:function(t){e.form1=t},expression:"form1"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-email-outline",label:"Digite seu e-mail",rules:e.emailRules,required:"",outlined:"",dense:"",disabled:e.disableMail},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.requestToken.apply(null,arguments)}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),a("div",{staticClass:"d-flex justify-center mb-3"},[a("v-btn",{attrs:{disabled:e.disableMail||!e.form1,color:"blue","min-width":"150px",small:""},on:{click:e.requestToken}},[e._v("Enviar código")])],1)],1),a("transition",{attrs:{name:"slide"}},[e.sentCode?a("v-form",{model:{value:e.form2,callback:function(t){e.form2=t},expression:"form2"}},[a("v-divider",{staticClass:"mb-4 mt-4"}),a("v-text-field",{attrs:{"prepend-icon":"mdi-account-key-outline",label:"Token",rules:e.tokenRules,outlined:"",dense:""},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),a("v-text-field",{attrs:{"prepend-icon":"mdi-shield-key","append-icon":e.showPass?"mdi-eye":"mdi-eye-off",label:"Nova senha",rules:e.passwordRules,type:e.showPass?"text":"password",outlined:"",dense:""},on:{"click:append":function(t){e.showPass=!e.showPass}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),a("v-text-field",{attrs:{"prepend-icon":"mdi-shield-key","append-icon":e.showPass2?"mdi-eye":"mdi-eye-off",type:e.showPass2?"text":"password",label:"Repita a senha",rules:e.passwordCheckRules,outlined:"",dense:""},on:{"click:append":function(t){e.showPass2=!e.showPass2}},model:{value:e.password2,callback:function(t){e.password2=t},expression:"password2"}}),a("div",{staticClass:"d-flex justify-center"},[a("v-btn",{attrs:{disabled:!e.form2,color:"green","min-width":"150px",small:""},on:{click:e.changePassword}},[e._v("Redefinir senha")])],1)],1):e._e()],1)],1),a("v-divider"),a("v-card-actions",{staticClass:"justify-center mt-2"},[a("v-btn",{attrs:{"min-width":"150px",color:"red darken-2",small:""},on:{click:e.returnToLogin}},[e._v(" Cancelar")])],1)],1)},C=[],P={data:function(){var e=this;return{form1:!1,form2:!1,sentCode:!1,email:"",code:"",password:"",password2:"",disableMail:!1,showPass:!1,showPass2:!1,emailRules:[function(e){return!!e||"Forneça um e-mail"},function(e){return/.+@.+\..+/.test(e)||"E-mail inválido"}],passwordRules:[function(e){return e&&e.length>=8||"Senha inválida"}],tokenRules:[function(e){return e&&e.length>=20||"Token inválido"}],passwordCheckRules:[function(e){return e&&e.length>=8||"Senha muito curta"},function(){return e.password===e.password2||"Senhas inválida"}]}},methods:{returnToLogin:function(){this.$emit("Login")},requestToken:function(){var e=this,t={email:this.email};this.disableMail=!0,l.a.post("/users/recoverPassword",t).then((function(t){e.sentCode=!0,e.$root.vtoast.show({message:t.data})})).catch((function(t){e.disableMail=!1,e.$root.vtoast.show({color:"red",message:t.response.data})}))},changePassword:function(){var e=this;if(this.password!=this.password2)return this.$root.vtoast.show({color:"red",message:"Confira sua senha."});var t={email:this.email,token:this.code,password:this.password};l.a.post("/users/resetPassword",t).then((function(t){e.$root.vtoast.show({message:t.data}),e.$emit("Login")})).catch((function(t){e.$root.vtoast.show({color:"red",message:t.response.data})}))}}},T=P,$=(a("f821"),Object(u["a"])(T,y,C,!1,null,"1f8ce2e8",null)),R=$.exports;m()($,{VBtn:p["a"],VCard:h["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VDivider:w["a"],VForm:g["a"],VTextField:b["a"]});var V={components:{LoginCard:x,ForgotPass:R},data:function(){return{email:"",password:"",valid:null,modo:1}},methods:{changeToPass:function(){this.modo=2},changeToLogin:function(){this.modo=1}},mounted:function(){this.$store.getters.getUser&&this.$router.push("/")}},_=V,j=(a("a5f0"),a("a523")),E=a("2fa4"),F=Object(u["a"])(_,s,n,!1,null,"208ffc3a",null);t["default"]=F.exports;m()(F,{VContainer:j["a"],VSpacer:E["a"]})},a5f0:function(e,t,a){"use strict";a("7820")},c018:function(e,t,a){},e8f2:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a("498a"),a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("a15b");var s=a("2b0e");function n(e){return s["a"].extend({name:"v-".concat(e),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,a){var s=a.props,n=a.data,o=a.children;n.staticClass="".concat(e," ").concat(n.staticClass||"").trim();var i=n.attrs;if(i){n.attrs={};var r=Object.keys(i).filter((function(e){if("slot"===e)return!1;var t=i[e];return e.startsWith("data-")?(n.attrs[e]=t,!1):t||"string"===typeof t}));r.length&&(n.staticClass+=" ".concat(r.join(" ")))}return s.id&&(n.domProps=n.domProps||{},n.domProps.id=s.id),t(s.tag,n,o)}})}},f821:function(e,t,a){"use strict";a("c018")}}]);
//# sourceMappingURL=chunk-4ea13aa5.b066fd9c.js.map