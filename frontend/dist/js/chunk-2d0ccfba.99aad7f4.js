(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ccfba"],{"4ff8":function(t,n,a){"use strict";a.r(n);var e=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",[t._v(" Prontuário do paciente "),t._l(t.consultas,(function(t,n){return a("div",{key:t._id,staticClass:"mx-auto my-auto"},[a("Consulta",{attrs:{consulta:t,index:n}}),a("v-divider",{staticClass:"my-4"})],1)}))],2)},o=[],c=a("bc3a"),s=a.n(c),i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",[t._v(" Consulta "+t._s(t.index+1)+" "),a("v-row",[t._l(t.fields,(function(n){return[t.showProp(n.model)?a("v-col",{key:n.model,attrs:{cols:"12",lg:"6"}},[a("v-row",[a("v-col",{attrs:{cols:"6"}},[t._v(t._s(n.name))]),a("v-col",{attrs:{cols:"6"},domProps:{innerHTML:t._s(t.showVal(n))}})],1)],1):t._e()]}))],2)],1)},r=[],d=(a("a9e3"),a("b0c0"),a("159b"),a("99af"),a("d81d"),a("a15b"),a("8d35")),l=a.n(d),u={props:{consulta:{type:Object,default:function(){return{}}},index:{type:Number,default:1}},methods:{showProp:function(t){return!(!this.consulta[t]||!this.consulta[t].length&&!this.consulta[t].name)},showVal:function(t){var n="doctorId"===t.model?this.consulta.doctorId.name:this.consulta[t.model];if("date"===t.type)return l()(n).format("DD/MM/YY[ às ]HH:mm");if("array"===t.type){var a=[];return"prescription"===t.model?n.forEach((function(t){a.push("".concat(t.medicine," - ").concat(t.dosage,"<br />").concat(t.posologia))})):n.map((function(t){a.push("".concat(t.name))})),a.join("<br />")}return n}},data:function(){return{fields:[{model:"date",type:"date",name:"Data da consulta"},{model:"doctorId",type:"string",name:"Médico"},{model:"tipo",type:"string",name:"Tipo de consulta"},{model:"start",type:"date",name:"Início da consulta"},{model:"end",type:"date",name:"Término da consulta"},{model:"prescription",type:"array",name:"Medicamentos prescritos"},{model:"exams",type:"array",name:"Exames solicitados"}]}}},p=u,m=a("2877"),f=a("6544"),h=a.n(f),v=a("62ad"),y=a("0fd9"),b=Object(m["a"])(p,i,r,!1,null,"7da142e1",null),_=b.exports;h()(b,{VCol:v["a"],VRow:y["a"]});var w={props:{pacientId:{type:String,default:"6172b42c5851939d12037d60"}},data:function(){return{consultas:[],patient:null}},components:{Consulta:_},methods:{loadAppointments:function(){var t=this;s.a.get("/appointment/byPatient/".concat(this.pacientId)).then((function(n){t.consultas=n.data})).catch((function(t){console.log(t)}))},patientData:function(){var t=this;s.a.get("/patients/".concat(this.pacientId)).then((function(n){t.patient=n.data})).catch((function(t){console.log(t)}))}},mounted:function(){this.loadAppointments(),this.patientData()}},g=w,x=a("ce7e"),I=Object(m["a"])(g,e,o,!1,null,"06f3e2af",null);n["default"]=I.exports;h()(I,{VDivider:x["a"]})}}]);
//# sourceMappingURL=chunk-2d0ccfba.99aad7f4.js.map