(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9349"],{"57c4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ResultsTable")],1)},o=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{attrs:{width:"100%"}},[a("v-card-title",{staticClass:"py-3 my-0"},[a("v-text-field",{staticClass:"white",staticStyle:{"max-width":"600px"},attrs:{outlined:"",dense:"","append-icon":"mdi-magnify",label:"Busca","hide-details":""},model:{value:t.busca,callback:function(e){t.busca=e},expression:"busca"}}),a("v-spacer")],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.header,items:t.resultados,search:t.busca,dense:"","item-key":"_id",loading:t.loading,"loading-text":"Carregando exames...","no-data-text":"Não há exames a exibir...","items-per-page":20,"footer-props":{"items-per-page-all-text":"Todos","items-per-page-text":"Exames por página:","items-per-page-options":[10,20,30,-1]},"header-props":{"sort-by-text":"Organizar por"}},scopedSlots:t._u([{key:"item.date",fn:function(e){var a=e.item;return[t._v(" "+t._s(t.formatDate(a.date))+" ")]}},{key:"item.actions",fn:function(e){var n=e.item;return[n.filename?a("div",[a("v-tooltip",{scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,s=e.attrs;return[a("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(e){return t.downloadItem(n)}}},"v-btn",s,!1),o),[a("v-icon",{attrs:{small:"",color:"blue"}},[t._v("mdi-download")])],1)]}}],null,!0)},[a("span",[t._v("Visualizar exame")])]),a("v-tooltip",{scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,s=e.attrs;return[a("v-btn",t._g(t._b({attrs:{icon:""},on:{click:function(e){return t.sendItem(n)}}},"v-btn",s,!1),o),[a("v-icon",{attrs:{small:"",color:n.patientEmail?"green":"red"}},[t._v("mdi-mail")])],1)]}}],null,!0)},[a("span",[t._v("Enviar para paciente")])])],1):t._e()]}}],null,!0)}),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.sendMail,callback:function(e){t.sendMail=e},expression:"sendMail"}},[a("SendResults",{attrs:{item:t.selectedItem},on:{close:t.closeDialog}})],1)],1)},i=[],l=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861"),a("d81d"),a("bc3a")),r=a.n(l),c=a("8d35"),d=a.n(c),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-card",[a("v-card-title",[t._v("Enviar resultados")]),a("v-card-text",[a("v-text-field",{attrs:{dense:"",outlined:"",label:"E-mail do paciente"},model:{value:t.patientMail,callback:function(e){t.patientMail=e},expression:"patientMail"}})],1),a("v-card-actions",[a("v-btn",{attrs:{small:"",text:"",color:"red"},on:{click:t.closeDialog}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{small:"",text:"",color:"green",disabled:!t.validEmail||t.busy},on:{click:t.sendData}},[t._v(" Enviar ")])],1)],1)],1)},m=[],p={methods:{closeDialog:function(){this.$emit("close",!1)},sendData:function(){var t=this;this.busy=!0;var e={patientEmail:this.patientMail,id:this.item._id};r.a.post("/file/sendToPatient",e).then((function(e){t.$root.vtoast.show({color:"green",message:e.data}),t.busy=!1,t.$emit("close",!0)})).catch((function(e){t.$root.vtoast.show({color:"orange",message:e.response.data,icon:"mdi-alert"}),t.busy=!1}))}},computed:{validEmail:function(){var t=/.+@.+\..+/.test(this.patientMail);return t}},props:{item:{type:Object,default:function(){return{}}}},data:function(){return{patientMail:"",busy:!1}},mounted:function(){console.log(this.item)}},v=p,f=a("2877"),b=a("6544"),h=a.n(b),g=a("8336"),x=a("b0af"),_=a("99d9"),w=a("2fa4"),E=a("8654"),y=Object(f["a"])(v,u,m,!1,null,"2c60822f",null),V=y.exports;h()(y,{VBtn:g["a"],VCard:x["a"],VCardActions:_["a"],VCardText:_["c"],VCardTitle:_["d"],VSpacer:w["a"],VTextField:E["a"]});var k={components:{SendResults:V},data:function(){return{selectedItem:null,loading:!0,sendMail:!1,resultados:[],header:[{text:"Data da solicitação",value:"date",sortable:!0},{text:"Paciente",value:"patientId.name",sortable:!0},{text:"Exame",value:"nameOfExam",sortable:!1},{text:"Enviado para",value:"patientEmail",sortable:!1},{text:"Ações",value:"actions",sortable:!1,align:"center"}],busca:""}},methods:{sendItem:function(t){this.selectedItem=Object.assign({},t),this.sendMail=!0},closeDialog:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];t&&this.fetchExams(),this.sendMail=!1},downloadItem:function(t){var e=this;r.a.post("/file/download",t,{responseType:"blob"}).then((function(e){var a=window.URL.createObjectURL(new Blob([e.data])),n=document.createElement("a");n.href=a,n.setAttribute("download",t.filename),document.body.appendChild(n),n.click()})).catch((function(t){e.$root.vtoast.show({color:"orange",message:t.response.data})}))},formatDate:function(t){return d()(t).format("DD/MM/YYYY")},fetchExams:function(){var t=this;r.a.get("/file/all/byDoctor").then((function(e){t.resultados=e.data.map((function(t){var e=1e3*parseInt(t._id.substr(0,8),16),a=d()(e).format("YYYY-MM-DD");return t.date=a,t})),t.loading=!1,t.$root.vtoast.show({color:"green",message:"Exames carregados"})})).catch((function(e){t.$root.vtoast.show({color:"orange",message:e.response.data,icon:"mdi-alert"}),t.loading=!1}))}},mounted:function(){this.fetchExams()}},D=k,M=a("8fea"),C=a("169a"),T=a("132d"),I=a("3a2f"),$=Object(f["a"])(D,s,i,!1,null,"35c753d4",null),O=$.exports;h()($,{VBtn:g["a"],VCard:x["a"],VCardTitle:_["d"],VDataTable:M["a"],VDialog:C["a"],VIcon:T["a"],VSpacer:w["a"],VTextField:E["a"],VTooltip:I["a"]});var S={components:{ResultsTable:O}},Y=S,j=Object(f["a"])(Y,n,o,!1,null,"d3377b0a",null);e["default"]=j.exports}}]);
//# sourceMappingURL=chunk-2d0c9349.c6eb3deb.js.map