(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{XcCt:function(n,e,t){"use strict";t.r(e),t.d(e,"ShoppingCartModule",(function(){return c}));var o=t("ofXK"),i=t("tyNb"),r=t("fXoL");const p=[{path:"",component:(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=r.Kb({type:n,selectors:[["app-shopping-cart"]],decls:54,vars:0,consts:[[1,"basket-wrapper"],[1,"info"],[1,"elem-title"],[1,"elem-description"],[1,"person-info"],[1,"person-info-inner"],[1,"person-info-group"],["for","firstName"],["type","text","id","firstName","placeholder","Firs name","autocomplete","off"],["for","email"],["type","text","id","email","placeholder","Firs name","autocomplete","off"],["for","address"],["type","text","id","address","placeholder","Firs name","autocomplete","off"],["for","country"],["type","text","id","country","placeholder","Firs name","autocomplete","off"],["for","lastName"],["type","text","id","lastName","placeholder","Firs name","autocomplete","off"],["for","phone"],["type","text","id","phone","placeholder","Firs name","autocomplete","off"],["for","city"],["type","text","id","city","placeholder","Firs name","autocomplete","off"],["for","postalCode"],["type","text","id","postalCode","placeholder","Firs name","autocomplete","off"],[1,"notes"],["for","notes"],["name","","id","notes","cols","30","rows","10","placeholder","Need a specific delivery day?"],[1,"summary"]],template:function(n,e){1&n&&(r.Vb(0,"div",0),r.Vb(1,"div",1),r.Vb(2,"h2",2),r.zc(3,"Billing info"),r.Ub(),r.Vb(4,"p",3),r.zc(5,"Please enter your binding info"),r.Ub(),r.Vb(6,"div",4),r.Vb(7,"div",5),r.Vb(8,"div",6),r.Vb(9,"label",7),r.zc(10,"First name"),r.Ub(),r.Rb(11,"input",8),r.Ub(),r.Vb(12,"div",6),r.Vb(13,"label",9),r.zc(14,"Email address"),r.Ub(),r.Rb(15,"input",10),r.Ub(),r.Vb(16,"div",6),r.Vb(17,"label",11),r.zc(18,"Address"),r.Ub(),r.Rb(19,"input",12),r.Ub(),r.Vb(20,"div",6),r.Vb(21,"label",13),r.zc(22,"State/Country"),r.Ub(),r.Rb(23,"input",14),r.Ub(),r.Ub(),r.Vb(24,"div",5),r.Vb(25,"div",6),r.Vb(26,"label",15),r.zc(27,"Last name"),r.Ub(),r.Rb(28,"input",16),r.Ub(),r.Vb(29,"div",6),r.Vb(30,"label",17),r.zc(31,"Phone number"),r.Ub(),r.Rb(32,"input",18),r.Ub(),r.Vb(33,"div",6),r.Vb(34,"label",19),r.zc(35,"Town/City"),r.Ub(),r.Rb(36,"input",20),r.Ub(),r.Vb(37,"div",6),r.Vb(38,"label",21),r.zc(39,"ZIP/Postal code"),r.Ub(),r.Rb(40,"input",22),r.Ub(),r.Ub(),r.Ub(),r.Vb(41,"h2",2),r.zc(42,"Additional information"),r.Ub(),r.Vb(43,"p",3),r.zc(44,"Please enter your binding info"),r.Ub(),r.Vb(45,"div",23),r.Vb(46,"label",24),r.zc(47,"Order notes"),r.Ub(),r.Rb(48,"textarea",25),r.Ub(),r.Ub(),r.Vb(49,"div",26),r.Vb(50,"h2",2),r.zc(51,"Order Summary"),r.Ub(),r.Vb(52,"p",3),r.zc(53,"Price can change depending on shipping method and taxes of your state."),r.Ub(),r.Ub(),r.Ub())},styles:[".basket-wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:3fr 2fr;grid-gap:1.5em;max-width:1260px;margin:30px auto 0}.elem-title[_ngcontent-%COMP%]{font-size:22px;font-family:PoppinsReg}.elem-description[_ngcontent-%COMP%]{font-size:12px;line-height:16px;color:#a9a9a9}.info[_ngcontent-%COMP%]{padding:0 5px}.info[_ngcontent-%COMP%]   .person-info[_ngcontent-%COMP%]{display:flex;justify-content:space-between;flex-wrap:wrap;margin-top:30px}.info[_ngcontent-%COMP%]   .person-info-inner[_ngcontent-%COMP%]{width:50%}.info[_ngcontent-%COMP%]   .person-info-inner[_ngcontent-%COMP%]:first-child{padding-right:1em}.info[_ngcontent-%COMP%]   .person-info-inner[_ngcontent-%COMP%]:last-child{padding-left:1em}.info[_ngcontent-%COMP%]   .person-info-group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-bottom:30px}.info[_ngcontent-%COMP%]   .person-info-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:12px;font-family:PoppinsReg}.info[_ngcontent-%COMP%]   .person-info-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;border-radius:1em;background-color:#f9f9f9;padding:10px 15px;font-size:14px;line-height:19px;border:1px solid #d1d1d1}.info[_ngcontent-%COMP%]   .person-info-group[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #bdbdbd}.info[_ngcontent-%COMP%]   .notes[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:30px}.info[_ngcontent-%COMP%]   .notes[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{font-size:12px;font-family:PoppinsReg}.info[_ngcontent-%COMP%]   .notes[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{resize:none;height:100px;border-radius:1em;background-color:#f9f9f9;padding:10px 15px;font-size:14px;line-height:19px}.info[_ngcontent-%COMP%]   .notes[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:focus{outline:none;border:1px solid #bdbdbd}.summary[_ngcontent-%COMP%]{border:1px solid #d1d1d1;border-radius:1em;padding:32px 16px}"]}),n})()}];let a=(()=>{class n{}return n.\u0275mod=r.Ob({type:n}),n.\u0275inj=r.Nb({factory:function(e){return new(e||n)},imports:[[i.f.forChild(p)],i.f]}),n})(),c=(()=>{class n{}return n.\u0275mod=r.Ob({type:n}),n.\u0275inj=r.Nb({factory:function(e){return new(e||n)},imports:[[o.b,a]]}),n})()}}]);