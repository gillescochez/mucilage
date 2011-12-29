/*! mucilage (c) G.Cochez - github.com/gillescochez/mucilage */
(function(){function mucilage(templ,data,target){return new mucilage.init(templ,data,target)}mucilage.settings={special:false};mucilage.init=function(templ,data,target){if(isObject(templ)&&!isArray(templ)){extend(mucilage.settings,templ);return}mucilage._template(this,templ);mucilage.bind(this,data,target);if(target){target.innerHTML=this[0](this[1])}if(mucilage.settings.special){this._=function(obj){if(obj){extend(this[1],obj);if(target){target.innerHTML=this[0](this[1])}}else{return this[1]}};this.$=function(templ){if(!templ){return this[0](this[1])}else{mucilage._template(this,templ)}}}return this};mucilage._template=function(instance,templ){if(isArray(templ)){instance[0]=mucilage.template.apply(instance,templ)}else{instance[0]=mucilage.template(templ)}};function extend(target,options,newObj){if(!options){return target}var name,src,copy,obj={};for(name in target){src=target[name];copy=options[name];if(target===copy){continue}if(src!==undefined){obj[name]=src}if(copy!==undefined){if(!newObj){target[name]=copy}else{obj[name]=copy}}}return newObj?obj:target}function isString(it){return typeof it==="string"}function isObject(it){return typeof it==="object"}function isBoolean(it){return typeof it==="boolean"}function isArray(it){if(isObject(it)){return it.constructor==Array}else{return false}}mucilage.bind=function(instance,data,target){var name;instance[1]={};for(name in data){instance[1][name]=data[name]||null;(function(name){instance[name]=function(val){if(!val){return instance[1][name]}instance[1][name]=val;if(target){target.innerHTML=instance[0](instance[1])}}})(name)}};mucilage.templateEngine=function(){var resolveDefs=function(c,block,def){return((typeof block==="string")?block:block.toString()).replace(c.define,function(match,code,assign,value){if(code.indexOf("def.")===0){code=code.substring(4)}if(!(code in def)){if(assign===":"){def[code]=value}else{eval("def[code]="+value)}}return""}).replace(c.use,function(match,code){var v=eval(code);return v?resolveDefs(c,v,def):v})};return{init:function(tmpl,c,def){c=c?extend(mucilage.templateEngine.settings,c,true):mucilage.templateEngine.settings;var cstart=c.append?"'+(":"';out+=(",cend=c.append?")+'":");out+='",str=(c.use||c.define)?resolveDefs(c,tmpl,def||{}):tmpl;str=("var out='"+((c.strip)?str.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\n\t]|(\/\*[\s\S]*?\*\/)/g,""):str).replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(c.interpolate,function(match,code){return cstart+code.replace(/\\'/g,"'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g," ")+cend}).replace(c.encode,function(match,code){return cstart+code.replace(/\\'/g,"'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g," ")+").toString().replace(/&(?!\\w+;)/g, '&#38;').split('<').join('&#60;').split('>').join('&#62;').split('\"').join('&#34;').split(\"'\").join('&#39;').split('/').join('&#47;'"+cend}).replace(c.evaluate,function(match,code){return"';"+code.replace(/\\'/g,"'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g," ")+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").split("out+='';").join("").split("var out='';out+=").join("var out=");try{return new Function(c.varname,str)}catch(e){mucilage.log("Could not create a template function: "+str);throw e}}}}();mucilage.template=mucilage.templateEngine.init;mucilage.templateEngine.settings={evaluate:/\{\{([\s\S]+?)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,varname:"$",strip:true,append:true};mucilage.templateSettings=function(obj){extend(mucilage.templateEngine.settings,obj)};window.mucilage=mucilage})();