(function(e){function t(t){for(var a,i,c=t[0],r=t[1],u=t[2],l=0,d=[];l<c.length;l++)i=c[l],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);m&&m(t);while(d.length)d.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],a=!0,i=1;i<n.length;i++){var c=n[i];0!==o[c]&&(a=!1)}a&&(s.splice(t--,1),e=r(r.s=n[0]))}return e}var a={},i={app:0},o={app:0},s=[];function c(e){return r.p+"js/"+({}[e]||e)+"."+{"chunk-42f0e65e":"1da5d83f","chunk-511df963":"8dc30651","chunk-1d642610":"ead94214","chunk-4439f7f6":"7f41c79f","chunk-19d38bf0":"2e8fdcd7","chunk-05e023f5":"10f754a0","chunk-4903079b":"94079920","chunk-5e3f49d0":"c4067ed8","chunk-614fadc4":"9b6dbbdd","chunk-3a73ab5b":"76be7358","chunk-6daec780":"1b12b4da","chunk-2d0c9349":"c6eb3deb","chunk-d29567d4":"fcc9d389","chunk-3d702fe7":"fca29434","chunk-2d0bacb6":"cc468e5b","chunk-88bb3658":"8c4ef31f"}[e]+".js"}function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.e=function(e){var t=[],n={"chunk-42f0e65e":1,"chunk-511df963":1,"chunk-1d642610":1,"chunk-4439f7f6":1,"chunk-19d38bf0":1,"chunk-05e023f5":1,"chunk-4903079b":1,"chunk-5e3f49d0":1,"chunk-614fadc4":1,"chunk-3a73ab5b":1,"chunk-d29567d4":1,"chunk-3d702fe7":1,"chunk-88bb3658":1};i[e]?t.push(i[e]):0!==i[e]&&n[e]&&t.push(i[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-42f0e65e":"d9cfc292","chunk-511df963":"bbf81eab","chunk-1d642610":"86fd2b72","chunk-4439f7f6":"e979ea6a","chunk-19d38bf0":"c3723b0a","chunk-05e023f5":"d37a3c29","chunk-4903079b":"cfdf353b","chunk-5e3f49d0":"ab1ef08c","chunk-614fadc4":"ab1ef08c","chunk-3a73ab5b":"ab1ef08c","chunk-6daec780":"31d6cfe0","chunk-2d0c9349":"31d6cfe0","chunk-d29567d4":"ab1ef08c","chunk-3d702fe7":"4e80b81b","chunk-2d0bacb6":"31d6cfe0","chunk-88bb3658":"ce9a8b96"}[e]+".css",o=r.p+a,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var u=s[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===a||l===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var a=t&&t.target&&t.target.src||o,s=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete i[e],m.parentNode.removeChild(m),n(s)},m.href=o;var p=document.getElementsByTagName("head")[0];p.appendChild(m)})).then((function(){i[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var s=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=s);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.src=c(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+i+")",d.name="ChunkLoadError",d.type=a,d.request=i,n[1](d)}o[e]=void 0}};var m=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},r.m=e,r.c=a,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var m=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},1771:function(e,t,n){var a={"./dentist.jpg":"50c9","./mri.jpg":"7578","./scope.jpg":"2be3","./scope2.jpg":"a35c"};function i(e){var t=o(e);return n(t)}function o(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}i.keys=function(){return Object.keys(a)},i.resolve=o,e.exports=i,i.id="1771"},"2be3":function(e,t,n){e.exports=n.p+"img/scope.e347c4c0.jpg"},"50c9":function(e,t,n){e.exports=n.p+"img/dentist.0d897e1f.jpg"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{staticClass:"appBar",attrs:{"clipped-left":"",app:""}},[e.user?n("v-app-bar-nav-icon",{on:{click:function(t){e.drawer=!e.drawer}}}):e._e(),n("v-toolbar-title",{staticClass:"appName",on:{click:e.goToHome}},[n("v-icon",[e._v("mdi-stethoscope")]),e._v(" CliniMed ")],1),n("v-spacer"),e.user?n("div",{staticClass:"d-flex align-center"},[n("div",{staticClass:"body-2 text-right d-none d-sm-flex"},[e._v(" "+e._s(e.user.nome)+" "),n("br"),e._v(" Acesso: "+e._s(e.user.role)+" ")]),n("v-menu",{attrs:{bottom:"",rounded:"","offset-y":"","min-width":"220px"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-btn",e._g({attrs:{icon:"","x-large":""}},a),[n("v-avatar",{attrs:{color:"blue darken-4",size:"30"}},[n("span",{staticClass:"white--text text-h6"},[e._v(e._s(e.user.nome.charAt(0)))])])],1)]}}])},[n("v-card",[n("v-list-item-content",{staticClass:"justify-center"},[n("div",{staticClass:"mx-auto text-center"},[n("div",{staticClass:"d-md-none body-2 mx-2"},[e._v(" "+e._s(e.user.nome)+" "),n("br"),e._v(" "+e._s(e.user.role)+" "),n("v-divider",{staticClass:"my-2"})],1),n("v-btn",{attrs:{small:"",depressed:"",rounded:"",text:""},on:{click:e.logOut}},[e._v(" Desconectar ")])],1)])],1)],1)],1):n("v-btn",{attrs:{small:"",text:"",color:"grey darken-2"},on:{click:function(t){return e.loadRoute("Login")}}},[e._v(" Login ")])],1),e.showDrawer?n("v-navigation-drawer",{attrs:{app:"",clipped:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},[n("v-list-item-group",{attrs:{color:"primary"},model:{value:e.selectedItem,callback:function(t){e.selectedItem=t},expression:"selectedItem"}},e._l(e.items,(function(t,a){return n("v-list-item",{directives:[{name:"show",rawName:"v-show",value:t.acesso.includes(e.user.role)&&(e.emAndamento||!t.consultaAtiva),expression:"\n            item.acesso.includes(user.role) &&\n            (emAndamento || !item.consultaAtiva)\n          "}],key:a,on:{click:function(n){return e.loadRoute(t.link)}}},[n("v-list-item-icon",[n("v-icon",{domProps:{textContent:e._s(t.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:e._s(t.text)}})],1)],1)})),1)],1)],1):e._e(),n("v-main",{staticClass:"fillWidth"},[n("router-view")],1),n("vtoast",{ref:"vtoast"}),n("v-footer",{staticClass:"appBar",attrs:{app:""}},[e._v(" CliniMed v. 1.0 "),n("v-spacer"),e._v(" "+e._s((new Date).toLocaleDateString("pt-br"))+" ")],1)],1)},o=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-snackbar",{attrs:{color:e.color,timeout:e.timer,top:"",center:""},scopedSlots:e._u([{key:"action",fn:function(t){return[n("v-icon",{attrs:{color:"white"},on:{click:function(t){e.showSnackbar=!1}}},[e._v(" mdi-close ")])]}}]),model:{value:e.showSnackbar,callback:function(t){e.showSnackbar=t},expression:"showSnackbar"}},[n("v-icon",{attrs:{left:""}},[e._v(e._s(e.icon))]),e._v(e._s(e.message)+" ")],1)},c=[],r={name:"vtoast",data:function(){return{showSnackbar:!1,message:"",color:"success",icon:"mdi-check",timer:3e3}},methods:{show:function(e){this.showSnackbar=!0,this.message=(e.message.erro?e.message.erro:e.message)||"Erro desconhecido",this.color=e.color||"success",this.timer=e.timer||3e3,this.icon=e.icon||"mdi-check"}}},u=r,l=n("2877"),d=n("6544"),m=n.n(d),p=n("132d"),f=n("2db4"),h=Object(l["a"])(u,s,c,!1,null,null,null),v=h.exports;m()(h,{VIcon:p["a"],VSnackbar:f["a"]});var b=n("bc3a"),g=n.n(b),k={computed:{user:function(){return this.$store.getters.getUser},showDrawer:function(){return this.user&&this.drawer},emAndamento:function(){return this.$store.getters.getPatient}},data:function(){return{drawer:!1,selectedItem:-1,items:[{text:"Agenda",icon:"mdi-calendar",link:"Schedule",acesso:["Recepção","Médico","Administrador"],consultaAtiva:!1},{text:"Pacientes",icon:"mdi-account",link:"Patients",acesso:["Recepção","Médico","Administrador"],consultaAtiva:!1},{text:"Consulta",icon:"mdi-alarm-check",link:"Appointment",acesso:["Médico"],consultaAtiva:!0},{text:"Usuários",icon:"mdi-account-edit",link:"Admin",acesso:["Administrador"],consultaAtiva:!1},{text:"Medicamentos",icon:"mdi-pill",link:"Medications",acesso:["Administrador"],consultaAtiva:!1},{text:"Exames",icon:"mdi-inbox-multiple",link:"Exams",acesso:["Administrador"],consultaAtiva:!1},{text:"Resultados",icon:"mdi-inbox",link:"Resultados",acesso:["Médico"],consultaAtiva:!1}],links:[]}},components:{vtoast:v},mounted:function(){this.$root.vtoast=this.$refs.vtoast,this.checkLogged(),this.$store.dispatch("LOAD_MEMORY")},methods:{loadRoute:function(e){this.$router.push({name:e})},checkLogged:function(){var e=this;g.a.get("/auth/user").then((function(t){t.data.nome&&e.$store.dispatch("SET_USER",t.data)})).catch((function(t){e.$store.dispatch("SET_USER",null)}))},logOut:function(){var e=this;g.a.get("/auth/logout").then((function(){e.$store.dispatch("SET_USER",null),e.$router.push("/")})).catch((function(t){e.$root.vtoast.show({color:"orange",message:t.response.data,icon:"mdi-alert"})}))},goToHome:function(){this.selectedItem=-1,this.$router.push("/")}}},x=k,_=(n("034f"),n("7496")),w=n("40dc"),S=n("5bc1"),y=n("8212"),A=n("8336"),C=n("b0af"),P=n("ce7e"),E=n("553a"),j=n("8860"),O=n("da13"),N=n("5d23"),I=n("1baa"),M=n("34c3"),V=n("f6c4"),L=n("e449"),T=n("f774"),q=n("2fa4"),D=n("2a7f"),R=Object(l["a"])(x,i,o,!1,null,null,null),$=R.exports;m()(R,{VApp:_["a"],VAppBar:w["a"],VAppBarNavIcon:S["a"],VAvatar:y["a"],VBtn:A["a"],VCard:C["a"],VDivider:P["a"],VFooter:E["a"],VIcon:p["a"],VList:j["a"],VListItem:O["a"],VListItemContent:N["a"],VListItemGroup:I["a"],VListItemIcon:M["a"],VListItemTitle:N["c"],VMain:V["a"],VMenu:L["a"],VNavigationDrawer:T["a"],VSpacer:q["a"],VToolbarTitle:D["a"]});n("d3b7"),n("3ca3"),n("ddb0"),n("caad"),n("b0c0");var U=n("8c4f"),F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("ImageHolder",{attrs:{asset:"scope2.jpg",title:"Venha para a CliniMed BH",subtitle:"Preços acessíveis e qualidade no atendimento",color:"black"}}),n("v-row",{staticClass:"d-flex justify-space-around"},[n("v-col",{staticClass:"px-6 mt-4 text-justify",attrs:{cols:"12",lg:"8"}},[n("p",{staticClass:"homeText"},[e._v(" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt odio nibh, non tincidunt lacus molestie id. Duis ut bibendum massa. Nulla aliquam maximus eros aliquet vehicula. Vivamus dapibus euismod iaculis. Morbi sed enim mollis, congue ante sit amet, tincidunt velit. Sed vitae lectus eu ligula dictum ultricies. Etiam pellentesque commodo leo a posuere. Suspendisse fermentum libero quis elit congue, non hendrerit dolor tincidunt. Suspendisse ut fermentum leo. Suspendisse venenatis magna a dui pulvinar, vitae placerat sapien pharetra. Quisque eu ligula id magna ultrices tincidunt. ")])])],1),n("ImageHolder",{attrs:{asset:"dentist.jpg",title:"Nosso corpo técnico",subtitle:"Conheça nossa equipe",color:"white",height:300}}),n("v-row",{staticClass:"d-flex justify-space-around"},[n("v-col",{staticClass:"px-6 mt-4 text-justify",attrs:{cols:"12",lg:"8"}},[n("p",{staticClass:"homeText"},[e._v(" Sed mollis suscipit metus, nec ultrices velit fringilla in. Nulla efficitur, enim maximus condimentum volutpat, erat orci malesuada dui, sit amet bibendum dolor urna sit amet elit. Curabitur vitae nunc ipsum. Fusce sit amet lacus in dui consequat eleifend a eget purus. Etiam scelerisque eros felis, ac porttitor ante placerat vitae. Donec mattis mattis risus in lacinia. Vestibulum fermentum lectus sem, sed congue urna pulvinar vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ornare lobortis velit in luctus. ")])])],1),n("ImageHolder",{attrs:{asset:"mri.jpg",title:"Nossas instalações",subtitle:"Atendendo aos mais altos padrões internacionais",color:"white",height:300}}),n("v-row",{staticClass:"d-flex justify-space-around"},[n("v-col",{staticClass:"px-6 mt-4 text-justify",attrs:{cols:"12",lg:"8"}},[n("p",{staticClass:"homeText"},[e._v(" In varius vulputate lectus et condimentum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed sed euismod sem, eget pharetra urna. Nunc leo sapien, porta ut orci id, consequat tincidunt ligula. Morbi venenatis aliquam diam sit amet aliquam. Suspendisse placerat, enim eget condimentum varius, ligula tortor venenatis nunc, ut tincidunt justo diam non urna. Proin consequat leo arcu. Morbi vel malesuada lorem. Praesent non urna in mi tempus pretium at id nisi. Suspendisse bibendum risus sed posuere rutrum. Integer vehicula iaculis enim. Maecenas viverra quam nec venenatis pretium. Mauris mattis fringilla nibh, volutpat bibendum diam accumsan non. Praesent placerat, augue ut finibus sollicitudin, orci nisl blandit elit, eget malesuada tellus erat non nulla. Ut non risus lacus. Phasellus ultrices dignissim risus ut pretium. ")])])],1)],1)},H=[],B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-parallax",{attrs:{dark:"",src:n("1771")("./"+e.asset),height:e.height}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{class:"text-center "+e.color+"--text",attrs:{cols:"12"}},[a("h1",{staticClass:"text-h4 mb-4"},[e._v(e._s(e.title))]),a("h4",{staticClass:"subheading"},[e._v(e._s(e.subtitle))])])],1)],1)},J=[],G=(n("a9e3"),{props:{asset:{type:String,default:""},title:{type:String,default:""},subtitle:{type:String,default:""},color:{type:String,default:"black"},height:{type:Number,default:500}}}),Y=G,z=n("62ad"),K=n("8b9c"),Q=n("0fd9"),W=Object(l["a"])(Y,B,J,!1,null,"1204f036",null),X=W.exports;m()(W,{VCol:z["a"],VParallax:K["a"],VRow:Q["a"]});var Z={components:{ImageHolder:X},methods:{checkLogged:function(){var e=this;g.a.get("/auth/user").then((function(t){t.data.nome&&e.$store.dispatch("SET_USER",t.data)})).catch((function(t){e.$store.dispatch("SET_USER",null)}))}},mounted:function(){this.checkLogged()}},ee=Z,te=(n("7c27"),Object(l["a"])(ee,F,H,!1,null,"9139730a",null)),ne=te.exports;m()(te,{VCol:z["a"],VRow:Q["a"]});var ae=n("2f62");a["a"].use(ae["a"]);var ie=new ae["a"].Store({state:{user:null,appointment:{_id:null,date:null,start:null,end:null,patientId:null,prescription:[],exams:[],doctorNotes:{queixaPrincipal:"",historicoMolestia:"",historicoFamiliar:"",exameFisico:"",examesApresentados:"",hipoteseDiagnostica:"",Condutas:""}}},getters:{getUser:function(e){return e.user},getPatient:function(e){return e.appointment.patientId},getNotes:function(e){return e.appointment.doctorNotes},getPrescriptions:function(e){return e.appointment.prescription},getExams:function(e){return e.appointment.exams}},mutations:{setUser:function(e,t){e.user=t},loadAppointment:function(e,t){e.appointment=t,localStorage.setItem("appointment",JSON.stringify(e.appointment))},editAppointment:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;t&&(e.appointment[t.header]=t.payload),localStorage.setItem("appointment",JSON.stringify(e.appointment))},loadLocalStorage:function(e){localStorage.getItem("appointment")&&(e.appointment=JSON.parse(localStorage.getItem("appointment")))},saveToDatabase:function(e){e.appointment={_id:null,date:null,start:null,end:null,patient:null,prescription:[],exams:[],doctorNotes:{queixaPrincipal:"",historicoMolestia:"",historicoFamiliar:"",exameFisico:"",examesApresentados:"",hipoteseDiagnostica:"",Condutas:""}},localStorage.setItem("appointment",JSON.stringify(e.appointment))}},actions:{SET_USER:function(e,t){e.commit("setUser",t)},LOAD_APPOINTMENT:function(e,t){e.commit("loadAppointment",t)},SAVE_CHANGES:function(e,t){e.commit("editAppointment",t)},LOAD_MEMORY:function(e){e.commit("loadLocalStorage")},SAVE_APPOINTMENT:function(e){e.context;var t=e.state;return new Promise((function(e,n){g.a.put("/appointment/appointmentResults",t.appointment).then((function(n){t.appointment={_id:null,date:null,start:null,end:null,patient:null,prescription:[],exams:[],doctorNotes:{queixaPrincipal:"",historicoMolestia:"",historicoFamiliar:"",exameFisico:"",examesApresentados:"",hipoteseDiagnostica:"",Condutas:""}},localStorage.setItem("appointment",JSON.stringify(t.appointment)),e(n)})).catch((function(e){n(e)}))}))}}});a["a"].use(U["a"]);var oe=[{path:"/",name:"Home",component:ne},{path:"/admin",name:"Admin",meta:{access:"Administrador"},component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-19d38bf0"),n.e("chunk-05e023f5"),n.e("chunk-5e3f49d0")]).then(n.bind(null,"3530"))}},{path:"/consulta",name:"Appointment",component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-6daec780"),n.e("chunk-3d702fe7")]).then(n.bind(null,"cccc"))}},{path:"/exames",name:"Exams",meta:{access:"Administrador"},component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-19d38bf0"),n.e("chunk-3a73ab5b")]).then(n.bind(null,"0dbe"))}},{path:"/medicamentos",name:"Medications",meta:{access:"Administrador"},component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-19d38bf0"),n.e("chunk-d29567d4")]).then(n.bind(null,"ffc5"))}},{path:"/agenda",name:"Schedule",component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-19d38bf0"),n.e("chunk-05e023f5"),n.e("chunk-4903079b")]).then(n.bind(null,"6b7b"))}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-88bb3658")]).then(n.bind(null,"a55b"))}},{path:"/pacientes",name:"Patients",component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-19d38bf0"),n.e("chunk-05e023f5"),n.e("chunk-614fadc4")]).then(n.bind(null,"2887"))}},{path:"/upload/:id",name:"Upload",component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-1d642610")]).then(n.bind(null,"2679"))}},{path:"/download/:id",name:"Download",component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-6daec780"),n.e("chunk-2d0bacb6")]).then(n.bind(null,"3971"))}},{path:"/resultados",name:"Resultados",meta:{access:"Médico"},component:function(){return Promise.all([n.e("chunk-511df963"),n.e("chunk-4439f7f6"),n.e("chunk-19d38bf0"),n.e("chunk-6daec780"),n.e("chunk-2d0c9349")]).then(n.bind(null,"57c4"))}},{path:"*",name:"PageNotFound",component:function(){return n.e("chunk-42f0e65e").then(n.bind(null,"9703"))}}],se=new U["a"]({mode:"history",base:"/",routes:oe});se.beforeEach((function(e,t,n){["Home","Login","Upload","Download"].includes(e.name)?n():ie.state.user?e.meta.access?ie.state.user.role===e.meta.access?n():n("/"):n():n("/")}));var ce=U["a"].prototype.push;U["a"].prototype.push=function(e){return ce.call(this,e).catch((function(e){return e}))};var re=se,ue=n("f309");a["a"].use(ue["a"]);var le=new ue["a"]({theme:{themes:{light:{app:"#03fcb6",app2:"#fc0349",app3:"#C5FC03",app4:"#3A03FC"}},options:{customProperties:!0}}}),de=(n("8d01"),n("8d35")),me=n.n(de);g.a.defaults.baseURL="/api",g.a.defaults.withCredentials=!0,me.a.locale("pt-br"),a["a"].config.productionTip=!1,new a["a"]({router:re,store:ie,vuetify:le,render:function(e){return e($)}}).$mount("#app")},7578:function(e,t,n){e.exports=n.p+"img/mri.513c4f0b.jpg"},"7c27":function(e,t,n){"use strict";n("bc4d")},"85ec":function(e,t,n){},a35c:function(e,t,n){e.exports=n.p+"img/scope2.54950d52.jpg"},bc4d:function(e,t,n){}});
//# sourceMappingURL=app.d65e0e16.js.map