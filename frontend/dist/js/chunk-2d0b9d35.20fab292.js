(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b9d35"],{3530:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("EmployeeTable")],1)},i=[],o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{width:"100%"}},[a("v-card-title",{staticClass:"py-3 my-0"},[a("v-text-field",{staticClass:"white",staticStyle:{"max-width":"600px"},attrs:{outlined:"",dense:"","append-icon":"mdi-magnify",label:"Busca","hide-details":""},model:{value:e.busca,callback:function(t){e.busca=t},expression:"busca"}}),a("v-spacer"),a("v-btn",{staticClass:"my-2",attrs:{small:"",color:"app"},on:{click:e.createEmployee}},[e._v("Inserir funcionário")])],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.employeeHeader,items:e.employees,search:e.busca,dense:"","item-key":"_id",loading:e.loading,"loading-text":"Carregando funcionários...","no-data-text":"Não há funcionários a exibir...","items-per-page":10,"footer-props":{"items-per-page-all-text":"Todos","items-per-page-text":"Funcionários por página:","items-per-page-options":[5,10,15,-1]},"header-props":{"sort-by-text":"Organizar por"}},scopedSlots:e._u([{key:"item.actions",fn:function(t){var l=t.item;return[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-btn",e._g(e._b({attrs:{icon:""},on:{click:function(t){return e.editEmployee(l)}}},"v-btn",o,!1),i),[a("v-icon",{attrs:{small:"",color:"purple"}},[e._v("mdi-account-edit")])],1)]}}],null,!0)},[a("span",[e._v("Editar funcionário")])])]}}],null,!0)}),a("v-dialog",{attrs:{"max-width":"500"},model:{value:e.employeeDialog,callback:function(t){e.employeeDialog=t},expression:"employeeDialog"}},[a("EditEmployee",{key:e.employeeKey,attrs:{employee:e.employee},on:{close:e.closeEmployee}})],1)],1)},n=[],s=a("bc3a"),c=a.n(s),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-card",{attrs:{"max-width":"800"}},[a("v-card-title",[e._v(e._s(e.CardTitle))]),a("v-divider"),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{"prepend-icon":"mdi-account",outlined:"",dense:"",label:"Nome"},model:{value:e.client.name,callback:function(t){e.$set(e.client,"name",t)},expression:"client.name"}}),a("v-text-field",{attrs:{"prepend-icon":"mdi-email",outlined:"",dense:"",label:"E-mail"},model:{value:e.client.email,callback:function(t){e.$set(e.client,"email",t)},expression:"client.email"}}),a("v-row",[a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-text-field",{attrs:{"prepend-icon":"mdi-phone",outlined:"",dense:"",label:"Telefone"},model:{value:e.client.cellPhone,callback:function(t){e.$set(e.client,"cellPhone",t)},expression:"client.cellPhone"}})],1),a("v-col",{attrs:{cols:"12",lg:"6"}},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-right":40,transition:"scale-transition","offset-y":"","min-width":"auto"},scopedSlots:e._u([{key:"activator",fn:function(t){var l=t.on,i=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{dense:"",outlined:"",readonly:"",label:"Data de nascimento","prepend-icon":"mdi-calendar"},model:{value:e.formattedDate,callback:function(t){e.formattedDate=t},expression:"formattedDate"}},"v-text-field",i,!1),l))]}}]),model:{value:e.menuNascimento,callback:function(t){e.menuNascimento=t},expression:"menuNascimento"}},[a("v-date-picker",{attrs:{locale:"pt-br",max:e.today},on:{input:function(t){e.menuNascimento=!1}},model:{value:e.client.dateOfBirth,callback:function(t){e.$set(e.client,"dateOfBirth",t)},expression:"client.dateOfBirth"}})],1)],1)],1),a("v-divider",{staticClass:"mb-6"}),a("v-select",{attrs:{"prepend-icon":"mdi-account-group",outlined:"",dense:"",label:"Função",items:e.roles},model:{value:e.client.role,callback:function(t){e.$set(e.client,"role",t)},expression:"client.role"}}),"Médico"===e.client.role?a("v-select",{attrs:{"prepend-icon":"mdi-account-details",outlined:"",multiple:"",dense:"",label:"Especialidade",items:e.emphasis},model:{value:e.client.emphasis,callback:function(t){e.$set(e.client,"emphasis",t)},expression:"client.emphasis"}}):e._e(),"Médico"===e.client.role?a("v-select",{attrs:{"prepend-icon":"mdi-account-details",outlined:"",dense:"",multiple:"",label:"Convênios",items:e.partners},model:{value:e.client.partners,callback:function(t){e.$set(e.client,"partners",t)},expression:"client.partners"}}):e._e(),"Médico"===e.client.role?a("v-select",{attrs:{"prepend-icon":"mdi-calendar",outlined:"",dense:"","item-text":"dia","item-value":"value",multiple:"",label:"Dias de trabalho",items:e.dias},model:{value:e.client.disponibilidade,callback:function(t){e.$set(e.client,"disponibilidade",t)},expression:"client.disponibilidade"}}):e._e(),a("v-divider",{staticClass:"mb-6"}),a("v-row",[a("v-col",{staticClass:"mb-n4 pb-0 col-12"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"Rua"},model:{value:e.client.addr.rua,callback:function(t){e.$set(e.client.addr,"rua",t)},expression:"client.addr.rua"}})],1),a("v-col",{staticClass:"mb-n4 pb-0 col-4"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"Número"},model:{value:e.client.addr.numero,callback:function(t){e.$set(e.client.addr,"numero",t)},expression:"client.addr.numero"}})],1),a("v-col",{staticClass:"mb-n4 pb-0 col-8"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"Complemento"},model:{value:e.client.addr.complemento,callback:function(t){e.$set(e.client.addr,"complemento",t)},expression:"client.addr.complemento"}})],1),a("v-col",{staticClass:"mb-n4 pb-0 col-6"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"Bairro"},model:{value:e.client.addr.bairro,callback:function(t){e.$set(e.client.addr,"bairro",t)},expression:"client.addr.bairro"}})],1),a("v-col",{staticClass:"mb-n4 pb-0 col-6"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"CEP"},model:{value:e.client.addr.cep,callback:function(t){e.$set(e.client.addr,"cep",t)},expression:"client.addr.cep"}})],1),a("v-col",{staticClass:"mb-n4 pb-0 col-8"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"Cidade"},model:{value:e.client.addr.cidade,callback:function(t){e.$set(e.client.addr,"cidade",t)},expression:"client.addr.cidade"}})],1),a("v-col",{staticClass:"mb-n4 pb-0 col-4"},[a("v-text-field",{attrs:{outlined:"",dense:"",label:"Estado"},model:{value:e.client.addr.estado,callback:function(t){e.$set(e.client.addr,"estado",t)},expression:"client.addr.estado"}})],1)],1),a("v-divider",{staticClass:"my-6"}),a("v-card-actions",{staticClass:"d-flex"},[a("v-btn",{attrs:{text:"",color:"red"},on:{click:e.closeUser}},[e._v("Fechar")]),a("v-spacer"),a("v-btn",{attrs:{text:"",color:"green"},on:{click:e.saveUser}},[e._v("Salvar")])],1)],1)],1)],1)],1)},d=[],m=a("8d35"),u=a.n(m),p={props:["employee"],computed:{CardTitle:function(){return this.employee?"Editar funcionário":"Inserir funcionário"},formattedDate:function(){return u()(this.client.dateOfBirth).format("DD/MM/YYYY")}},data:function(){return{client:{name:"",email:"",role:"",emphasis:"",partners:"",dateOfBirth:u()().subtract(14,"years").format("YYYY-MM-DD"),cellPhone:"",disponibilidade:[],addr:{rua:"",numero:"",complemento:"",bairro:"",cep:"",cidade:"",estado:""}},roles:["Recepção","Médico","Administrador"],emphasis:["Cardiologista","Ortopedista","Pediatra","Psiquiatra"],partners:["Unimed-BH","Qualicorp","Vitallis"],dias:[{dia:"Segunda-feira",value:1},{dia:"Terça-feira",value:2},{dia:"Quarta-feira",value:3},{dia:"Quinta-feira",value:4},{dia:"Sexta-feira",value:5}],menuNascimento:!1,today:u()().subtract(14,"years").format("YYYY-MM-DD")}},methods:{saveUser:function(){var e=this,t=this.employee?"put":"post",a=this.employee?this.employee._id:"createUser";c.a[t]("/users/".concat(a),this.client).then((function(t){e.$root.vtoast.show({color:"green",message:t.data}),e.$emit("close",!0)})).catch((function(t){e.$root.vtoast.show({color:"orange",message:t.response.data,icon:"mdi-alert"})}))},closeUser:function(){this.$emit("close",!1)}},mounted:function(){this.employee&&(this.client=Object.assign({},this.employee))}},v=p,f=a("2877"),b=a("6544"),h=a.n(b),y=a("8336"),x=a("b0af"),g=a("99d9"),k=a("62ad"),C=a("2e4b"),_=a("ce7e"),E=a("4bd4"),V=a("e449"),$=a("0fd9"),D=a("b974"),w=a("2fa4"),T=a("8654"),M=Object(f["a"])(v,r,d,!1,null,"2c148493",null),Y=M.exports;h()(M,{VBtn:y["a"],VCard:x["a"],VCardActions:g["a"],VCardText:g["c"],VCardTitle:g["d"],VCol:k["a"],VDatePicker:C["a"],VDivider:_["a"],VForm:E["a"],VMenu:V["a"],VRow:$["a"],VSelect:D["a"],VSpacer:w["a"],VTextField:T["a"]});var O={components:{EditEmployee:Y},computed:{employeeHeader:function(){var e=[{text:"Nome",value:"name",sortable:!1},{text:"E-mail",value:"email",sortable:!1},{text:"Função",value:"role",sortable:!1},{text:"Ações",value:"actions",sortable:!1,align:"center"}];return e}},data:function(){return{employees:[],loading:!0,busca:"",employee:null,employeeDialog:!1,employeeKey:Math.random()}},methods:{fetchEmployees:function(){var e=this;c.a.get("/users").then((function(t){e.employees=t.data,e.loading=!1,e.$root.vtoast.show({color:"green",message:"Usuários carregados"})})).catch((function(t){e.$root.vtoast.show({color:"orange",message:t.response.data,icon:"mdi-alert"}),e.loading=!1}))},closeEmployee:function(e){e&&this.fetchEmployees(),this.employeeDialog=!1},editEmployee:function(e){this.employee=e,this.employeeKey=e._id,this.employeeDialog=!0},createEmployee:function(){this.employee=null,this.employeeKey=Math.random(),this.employeeDialog=!0}},mounted:function(){this.fetchEmployees()}},B=O,S=a("8fea"),N=a("169a"),P=a("132d"),F=a("3a2f"),U=Object(f["a"])(B,o,n,!1,null,"029e1b74",null),j=U.exports;h()(U,{VBtn:y["a"],VCard:x["a"],VCardTitle:g["d"],VDataTable:S["a"],VDialog:N["a"],VIcon:P["a"],VSpacer:w["a"],VTextField:T["a"],VTooltip:F["a"]});var K={components:{EmployeeTable:j}},A=K,H=Object(f["a"])(A,l,i,!1,null,null,null);t["default"]=H.exports}}]);
//# sourceMappingURL=chunk-2d0b9d35.20fab292.js.map