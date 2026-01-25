/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ne=globalThis,pe=t=>t,J=ne.trustedTypes,ue=J?J.createPolicy("lit-html",{createHTML:t=>t}):void 0,Se="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,ke="?"+$,Le=`<${ke}>`,E=document,B=()=>E.createComment(""),G=t=>t===null||typeof t!="object"&&typeof t!="function",ae=Array.isArray,Ce=t=>ae(t)||typeof t?.[Symbol.iterator]=="function",se=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,me=/-->/g,ge=/>/g,A=RegExp(`>|${se}(?:([^\\s"'>=/]+)(${se}*=${se}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fe=/'/g,ve=/"/g,Oe=/^(?:script|style|textarea|title)$/i,Be=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),d=Be(1),S=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),be=new WeakMap,P=E.createTreeWalker(E,129);function Te(t,e){if(!ae(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return ue!==void 0?ue.createHTML(e):e}const Ge=(t,e)=>{const r=t.length-1,i=[];let s,n=e===2?"<svg>":e===3?"<math>":"",a=U;for(let l=0;l<r;l++){const o=t[l];let c,u,h=-1,f=0;for(;f<o.length&&(a.lastIndex=f,u=a.exec(o),u!==null);)f=a.lastIndex,a===U?u[1]==="!--"?a=me:u[1]!==void 0?a=ge:u[2]!==void 0?(Oe.test(u[2])&&(s=RegExp("</"+u[2],"g")),a=A):u[3]!==void 0&&(a=A):a===A?u[0]===">"?(a=s??U,h=-1):u[1]===void 0?h=-2:(h=a.lastIndex-u[2].length,c=u[1],a=u[3]===void 0?A:u[3]==='"'?ve:fe):a===ve||a===fe?a=A:a===me||a===ge?a=U:(a=A,s=void 0);const y=a===A&&t[l+1].startsWith("/>")?" ":"";n+=a===U?o+Le:h>=0?(i.push(c),o.slice(0,h)+Se+o.slice(h)+$+y):o+$+(h===-2?l:y)}return[Te(t,n+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};let ie=class ze{constructor({strings:e,_$litType$:r},i){let s;this.parts=[];let n=0,a=0;const l=e.length-1,o=this.parts,[c,u]=Ge(e,r);if(this.el=ze.createElement(c,i),P.currentNode=this.el.content,r===2||r===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(s=P.nextNode())!==null&&o.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const h of s.getAttributeNames())if(h.endsWith(Se)){const f=u[a++],y=s.getAttribute(h).split($),q=/([.?@])?(.*)/.exec(f);o.push({type:1,index:n,name:q[2],strings:y,ctor:q[1]==="."?We:q[1]==="?"?Ve:q[1]==="@"?Fe:X}),s.removeAttribute(h)}else h.startsWith($)&&(o.push({type:6,index:n}),s.removeAttribute(h));if(Oe.test(s.tagName)){const h=s.textContent.split($),f=h.length-1;if(f>0){s.textContent=J?J.emptyScript:"";for(let y=0;y<f;y++)s.append(h[y],B()),P.nextNode(),o.push({type:2,index:++n});s.append(h[f],B())}}}else if(s.nodeType===8)if(s.data===ke)o.push({type:2,index:n});else{let h=-1;for(;(h=s.data.indexOf($,h+1))!==-1;)o.push({type:7,index:n}),h+=$.length-1}n++}}static createElement(e,r){const i=E.createElement("template");return i.innerHTML=e,i}};function k(t,e,r=t,i){if(e===S)return e;let s=i!==void 0?r._$Co?.[i]:r._$Cl;const n=G(e)?void 0:e._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(t),s._$AT(t,r,i)),i!==void 0?(r._$Co??=[])[i]=s:r._$Cl=s),s!==void 0&&(e=k(t,s._$AS(t,e.values),s,i)),e}class De{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:r},parts:i}=this._$AD,s=(e?.creationScope??E).importNode(r,!0);P.currentNode=s;let n=P.nextNode(),a=0,l=0,o=i[0];for(;o!==void 0;){if(a===o.index){let c;o.type===2?c=new j(n,n.nextSibling,this,e):o.type===1?c=new o.ctor(n,o.name,o.strings,this,e):o.type===6&&(c=new je(n,this,e)),this._$AV.push(c),o=i[++l]}a!==o?.index&&(n=P.nextNode(),a++)}return P.currentNode=E,s}p(e){let r=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,r),r+=i.strings.length-2):i._$AI(e[r])),r++}}class j{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,i,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=k(this,e,r),G(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==S&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ce(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&G(this._$AH)?this._$AA.nextSibling.data=e:this.T(E.createTextNode(e)),this._$AH=e}$(e){const{values:r,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ie.createElement(Te(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(r);else{const n=new De(s,this),a=n.u(this.options);n.p(r),this.T(a),this._$AH=n}}_$AC(e){let r=be.get(e.strings);return r===void 0&&be.set(e.strings,r=new ie(e)),r}k(e){ae(this._$AH)||(this._$AH=[],this._$AR());const r=this._$AH;let i,s=0;for(const n of e)s===r.length?r.push(i=new j(this.O(B()),this.O(B()),this,this.options)):i=r[s],i._$AI(n),s++;s<r.length&&(this._$AR(i&&i._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){const i=pe(e).nextSibling;pe(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,i,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=m}_$AI(e,r=this,i,s){const n=this.strings;let a=!1;if(n===void 0)e=k(this,e,r,0),a=!G(e)||e!==this._$AH&&e!==S,a&&(this._$AH=e);else{const l=e;let o,c;for(e=n[0],o=0;o<n.length-1;o++)c=k(this,l[i+o],r,o),c===S&&(c=this._$AH[o]),a||=!G(c)||c!==this._$AH[o],c===m?e=m:e!==m&&(e+=(c??"")+n[o+1]),this._$AH[o]=c}a&&!s&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class We extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}class Ve extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}}class Fe extends X{constructor(e,r,i,s,n){super(e,r,i,s,n),this.type=5}_$AI(e,r=this){if((e=k(this,e,r,0)??m)===S)return;const i=this._$AH,s=e===m&&i!==m||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==m&&(i===m||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class je{constructor(e,r,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}}const R={R:De,D:Ce,V:k,I:j,F:je},qe=ne.litHtmlPolyfillSupport;qe?.(ie,j),(ne.litHtmlVersions??=[]).push("3.3.2");const Me=(t,e,r)=>{const i=r?.renderBefore??e;let s=i._$litPart$;if(s===void 0){const n=r?.renderBefore??null;i._$litPart$=s=new j(e.insertBefore(B(),n),n,void 0,r??{})}return s._$AI(t),s},Ye={resolveDirective:R.V,ElementPart:R.F,TemplateInstance:R.R,isIterable:R.D,ChildPart:R.I};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I={ATTRIBUTE:1,PROPERTY:3,EVENT:5,ELEMENT:6};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Je=t=>t===null||typeof t!="object"&&typeof t!="function",Ze=(t,e)=>t?._$litType$!==void 0,Ke=t=>t?._$litType$?.h!=null,Qe=t=>t.strings===void 0;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{TemplateInstance:Xe,isIterable:et,resolveDirective:Ne,ChildPart:H,ElementPart:tt}=Ye,rt=(t,e,r={})=>{if(e._$litPart$!==void 0)throw Error("container already contains a live render");let i,s,n;const a=[],l=document.createTreeWalker(e,NodeFilter.SHOW_COMMENT);let o;for(;(o=l.nextNode())!==null;){const c=o.data;if(c.startsWith("lit-part")){if(a.length===0&&i!==void 0)throw Error(`There must be only one root part per container. Found a part marker (${o}) when we already have a root part marker (${s})`);n=st(t,o,a,r),i===void 0&&(i=n),s??=o}else if(c.startsWith("lit-node"))nt(o,a,r);else if(c.startsWith("/lit-part")){if(a.length===1&&n!==i)throw Error("internal error");n=it(o,n,a)}}if(i===void 0){const c=e instanceof ShadowRoot?"{container.host.localName}'s shadow root":e instanceof DocumentFragment?"DocumentFragment":e.localName;console.error(`There should be exactly one root part in a render container, but we didn't find any in ${c}.`)}e._$litPart$=i},st=(t,e,r,i)=>{let s,n;if(r.length===0)n=new H(e,null,void 0,i),s=t;else{const a=r[r.length-1];if(a.type==="template-instance")n=new H(e,null,a.instance,i),a.instance._$AV.push(n),s=a.result.values[a.instancePartIndex++],a.templatePartIndex++;else if(a.type==="iterable"){n=new H(e,null,a.part,i);const l=a.iterator.next();if(l.done)throw s=void 0,a.done=!0,Error("Unhandled shorter than expected iterable");s=l.value,a.part._$AH.push(n)}else n=new H(e,null,a.part,i)}if(s=Ne(n,s),s===S)r.push({part:n,type:"leaf"});else if(Je(s))r.push({part:n,type:"leaf"}),n._$AH=s;else if(Ze(s)){if(Ke(s))throw Error("compiled templates are not supported");const a="lit-part "+at(s);if(e.data!==a)throw Error("Hydration value mismatch: Unexpected TemplateResult rendered to part");{const l=H.prototype._$AC(s),o=new Xe(l,n);r.push({type:"template-instance",instance:o,part:n,templatePartIndex:0,instancePartIndex:0,result:s}),n._$AH=o}}else et(s)?(r.push({part:n,type:"iterable",value:s,iterator:s[Symbol.iterator](),done:!1}),n._$AH=[]):(r.push({part:n,type:"leaf"}),n._$AH=s??"");return n},it=(t,e,r)=>{if(e===void 0)throw Error("unbalanced part marker");e._$AB=t;const i=r.pop();if(i.type==="iterable"&&!i.iterator.next().done)throw Error("unexpected longer than expected iterable");if(r.length>0)return r[r.length-1].part},nt=(t,e,r)=>{const i=/lit-node (\d+)/.exec(t.data),s=parseInt(i[1]),n=t.nextElementSibling;if(n===null)throw Error("could not find node for attribute parts");n.removeAttribute("defer-hydration");const a=e[e.length-1];if(a.type!=="template-instance")throw Error("Hydration value mismatch: Primitive found where TemplateResult expected. This usually occurs due to conditional rendering that resulted in a different value or template being rendered between the server and client.");{const l=a.instance;for(;;){const o=l._$AD.parts[a.templatePartIndex];if(o===void 0||o.type!==I.ATTRIBUTE&&o.type!==I.ELEMENT||o.index!==s)break;if(o.type===I.ATTRIBUTE){const c=new o.ctor(n,o.name,o.strings,a.instance,r),u=Qe(c)?a.result.values[a.instancePartIndex]:a.result.values,h=!(c.type===I.EVENT||c.type===I.PROPERTY);c._$AI(u,c,a.instancePartIndex,h),a.instancePartIndex+=o.strings.length-1,l._$AV.push(c)}else{const c=new tt(n,a.instance,r);Ne(c,a.result.values[a.instancePartIndex++]),l._$AV.push(c)}a.templatePartIndex++}}},ye=new WeakMap,at=t=>{let e=ye.get(t.strings);if(e!==void 0)return e;const r=new Uint32Array(2).fill(5381);for(const s of t.strings)for(let n=0;n<s.length;n++)r[n%2]=33*r[n%2]^s.charCodeAt(n);const i=String.fromCharCode(...new Uint8Array(r.buffer));return e=btoa(i),ye.set(t.strings,e),e};globalThis.litElementHydrateSupport=({LitElement:t})=>{const e=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(t),"observedAttributes").get;Object.defineProperty(t,"observedAttributes",{get(){return[...e.call(this),"defer-hydration"]}});const r=t.prototype.attributeChangedCallback;t.prototype.attributeChangedCallback=function(a,l,o){a==="defer-hydration"&&o===null&&i.call(this),r.call(this,a,l,o)};const i=t.prototype.connectedCallback;t.prototype.connectedCallback=function(){this.hasAttribute("defer-hydration")||i.call(this)};const s=t.prototype.createRenderRoot;t.prototype.createRenderRoot=function(){return this.shadowRoot?(this._$AG=!0,this.shadowRoot):s.call(this)};const n=Object.getPrototypeOf(t.prototype).update;t.prototype.update=function(a){const l=this.render();if(n.call(this,a),this._$AG){this._$AG=!1;for(const o of this.getAttributeNames())if(o.startsWith("hydrate-internals-")){const c=o.slice(18);this.removeAttribute(c),this.removeAttribute(o)}rt(l,this.renderRoot,this.renderOptions)}else Me(l,this.renderRoot,this.renderOptions)}};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=globalThis,oe=Y.ShadowRoot&&(Y.ShadyCSS===void 0||Y.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),$e=new WeakMap;let Ue=class{constructor(e,r,i){if(this._$cssResult$=!0,i!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o;const r=this.t;if(oe&&e===void 0){const i=r!==void 0&&r.length===1;i&&(e=$e.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&$e.set(r,e))}return e}toString(){return this.cssText}};const ot=t=>new Ue(typeof t=="string"?t:t+"",void 0,le),v=(t,...e)=>{const r=t.length===1?t[0]:e.reduce((i,s,n)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1],t[0]);return new Ue(r,t,le)},lt=(t,e)=>{if(oe)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(const r of e){const i=document.createElement("style"),s=Y.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=r.cssText,t.appendChild(i)}},we=oe?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(const i of e.cssRules)r+=i.cssText;return ot(r)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:dt,getOwnPropertyDescriptor:ht,getOwnPropertyNames:pt,getOwnPropertySymbols:ut,getPrototypeOf:mt}=Object,ee=globalThis,xe=ee.trustedTypes,gt=xe?xe.emptyScript:"",ft=ee.reactiveElementPolyfillSupport,L=(t,e)=>t,Z={toAttribute(t,e){switch(e){case Boolean:t=t?gt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},ce=(t,e)=>!ct(t,e),_e={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol("metadata"),ee.litPropertyMetadata??=new WeakMap;class T extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=_e){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,r);s!==void 0&&dt(this.prototype,e,s)}}static getPropertyDescriptor(e,r,i){const{get:s,set:n}=ht(this.prototype,e)??{get(){return this[r]},set(a){this[r]=a}};return{get:s,set(a){const l=s?.call(this);n?.call(this,a),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??_e}static _$Ei(){if(this.hasOwnProperty(L("elementProperties")))return;const e=mt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(L("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(L("properties"))){const r=this.properties,i=[...pt(r),...ut(r)];for(const s of i)this.createProperty(s,r[s])}const e=this[Symbol.metadata];if(e!==null){const r=litPropertyMetadata.get(e);if(r!==void 0)for(const[i,s]of r)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[r,i]of this.elementProperties){const s=this._$Eu(r,i);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const r=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)r.unshift(we(s))}else e!==void 0&&r.push(we(e));return r}static _$Eu(e,r){const i=r.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,r=this.constructor.elementProperties;for(const i of r.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,i){this._$AK(e,i)}_$ET(e,r){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(i.converter?.toAttribute!==void 0?i.converter:Z).toAttribute(r,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,r){const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const n=i.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:Z;this._$Em=s;const l=a.fromAttribute(r,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,r,i,s=!1,n){if(e!==void 0){const a=this.constructor;if(s===!1&&(n=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??ce)(n,r)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,r,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:i,reflect:s,wrapped:n},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??r??this[e]),n!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,n]of i){const{wrapped:a}=n,l=this[s];a!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(r)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(r=>this._$ET(r,this[r])),this._$EM()}updated(e){}firstUpdated(e){}}T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[L("elementProperties")]=new Map,T[L("finalized")]=new Map,ft?.({ReactiveElement:T}),(ee.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const de=globalThis;class g extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}}g._$litElement$=!0,g.finalized=!0,de.litElementHydrateSupport?.({LitElement:g});const vt=de.litElementPolyfillSupport;vt?.({LitElement:g});(de.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bt={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:ce},yt=(t=bt,e,r)=>{const{kind:i,metadata:s}=r;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),i==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(r.name,t),i==="accessor"){const{name:a}=r;return{set(l){const o=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,o,t,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,t,l),l}}}if(i==="setter"){const{name:a}=r;return function(l){const o=this[a];e.call(this,l),this.requestUpdate(a,o,t,!0,l)}}throw Error("Unsupported decorator location: "+i)};function p(t){return(e,r)=>typeof r=="object"?yt(t,e,r):((i,s,n)=>{const a=s.hasOwnProperty(n);return s.constructor.createProperty(n,i),a?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,r)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function _(t){return p({...t,state:!0,attribute:!1})}var $t=Object.defineProperty,wt=Object.getOwnPropertyDescriptor,te=(t,e,r,i)=>{for(var s=i>1?void 0:i?wt(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&$t(e,r,s),s};const xt=[{title:"Overview",items:[{path:"/",label:"Dashboard",icon:"house"}]},{title:"Management",items:[{path:"/groves",label:"Groves",icon:"folder"},{path:"/agents",label:"Agents",icon:"cpu"}]},{title:"System",items:[{path:"/settings",label:"Settings",icon:"gear"}]}];let z=class extends g{constructor(){super(...arguments),this.user=null,this.currentPath="/",this.collapsed=!1}render(){return d`
      <div class="logo">
        <div class="logo-icon">S</div>
        <div class="logo-text">
          <h1>Scion</h1>
          <span>Agent Orchestration</span>
        </div>
      </div>

      <nav class="nav-container">
        ${xt.map(t=>d`
            <div class="nav-section">
              <div class="nav-section-title">${t.title}</div>
              <ul class="nav-list">
                ${t.items.map(e=>d`
                    <li class="nav-item">
                      <a
                        href="${e.path}"
                        class="nav-link ${this.isActive(e.path)?"active":""}"
                        @click=${r=>this.handleNavClick(r,e.path)}
                      >
                        <sl-icon name="${e.icon}"></sl-icon>
                        <span class="nav-link-text">${e.label}</span>
                      </a>
                    </li>
                  `)}
              </ul>
            </div>
          `)}
      </nav>

      <div class="nav-footer">
        <button
          class="theme-toggle"
          @click=${()=>this.toggleTheme()}
          title="Toggle theme"
          aria-label="Toggle dark mode"
        >
          <sl-icon name="sun-moon"></sl-icon>
        </button>
      </div>
    `}isActive(t){return t==="/"?this.currentPath==="/":this.currentPath.startsWith(t)}handleNavClick(t,e){this.dispatchEvent(new CustomEvent("nav-click",{detail:{path:e},bubbles:!0,composed:!0}))}toggleTheme(){const t=document.documentElement,r=t.getAttribute("data-theme")==="dark"?"light":"dark";t.setAttribute("data-theme",r),r==="dark"?t.classList.add("sl-theme-dark"):t.classList.remove("sl-theme-dark"),localStorage.setItem("scion-theme",r),this.dispatchEvent(new CustomEvent("theme-change",{detail:{theme:r},bubbles:!0,composed:!0}))}};z.styles=v`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: var(--scion-sidebar-width, 260px);
      background: var(--scion-surface, #ffffff);
      border-right: 1px solid var(--scion-border, #e2e8f0);
    }

    :host([collapsed]) {
      width: var(--scion-sidebar-collapsed-width, 64px);
    }

    .logo {
      padding: 1.25rem 1rem;
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--scion-primary, #3b82f6) 0%, #1d4ed8 100%);
      border-radius: 0.5rem;
      color: white;
      font-weight: 700;
      font-size: 1rem;
      flex-shrink: 0;
    }

    .logo-text {
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    :host([collapsed]) .logo-text {
      display: none;
    }

    .logo-text h1 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
      line-height: 1.2;
    }

    .logo-text span {
      font-size: 0.6875rem;
      color: var(--scion-text-muted, #64748b);
      white-space: nowrap;
    }

    .nav-container {
      flex: 1;
      padding: 1rem 0.75rem;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .nav-section {
      margin-bottom: 1.5rem;
    }

    .nav-section:last-child {
      margin-bottom: 0;
    }

    .nav-section-title {
      font-size: 0.6875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--scion-text-muted, #64748b);
      margin-bottom: 0.5rem;
      padding: 0 0.75rem;
    }

    :host([collapsed]) .nav-section-title {
      display: none;
    }

    .nav-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-item {
      margin-bottom: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.5rem;
      color: var(--scion-text, #1e293b);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.15s ease;
    }

    :host([collapsed]) .nav-link {
      justify-content: center;
      padding: 0.75rem;
    }

    .nav-link:hover {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    .nav-link.active {
      background: var(--scion-primary, #3b82f6);
      color: white;
    }

    .nav-link.active:hover {
      background: var(--scion-primary-hover, #2563eb);
    }

    .nav-link sl-icon {
      font-size: 1.125rem;
      flex-shrink: 0;
    }

    .nav-link-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    :host([collapsed]) .nav-link-text {
      display: none;
    }

    .nav-footer {
      padding: 0.75rem;
      border-top: 1px solid var(--scion-border, #e2e8f0);
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .theme-toggle:hover {
      background: var(--scion-border, #e2e8f0);
    }
  `;te([p({type:Object})],z.prototype,"user",2);te([p({type:String})],z.prototype,"currentPath",2);te([p({type:Boolean,reflect:!0})],z.prototype,"collapsed",2);z=te([b("scion-nav")],z);var _t=Object.defineProperty,At=Object.getOwnPropertyDescriptor,M=(t,e,r,i)=>{for(var s=i>1?void 0:i?At(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&_t(e,r,s),s};let w=class extends g{constructor(){super(...arguments),this.user=null,this.currentPath="/",this.pageTitle="Dashboard",this.showMobileMenu=!1,this._menuOpen=!1}render(){return d`
      <div class="header-left">
        ${this.showMobileMenu?d`
              <button
                class="mobile-menu-btn"
                @click=${()=>this.handleMobileMenuClick()}
                aria-label="Open navigation menu"
              >
                <sl-icon name="list" style="font-size: 1.25rem;"></sl-icon>
              </button>
            `:""}
        <h1 class="page-title">${this.pageTitle}</h1>
      </div>

      <div class="header-right">
        <div class="header-actions">
          <sl-tooltip content="Notifications">
            <sl-icon-button name="bell" label="Notifications"></sl-icon-button>
          </sl-tooltip>
          <sl-tooltip content="Help">
            <sl-icon-button name="question-circle" label="Help"></sl-icon-button>
          </sl-tooltip>
        </div>

        <div class="user-section">${this.renderUserSection()}</div>
      </div>
    `}renderUserSection(){if(!this.user)return d`
        <a href="/auth/login" class="sign-in-link">
          <sl-icon name="box-arrow-in-right"></sl-icon>
          Sign in
        </a>
      `;const t=this.getInitials(this.user.name);return d`
      <span class="user-name">${this.user.name}</span>
      <sl-dropdown class="user-dropdown" placement="bottom-end">
        <button slot="trigger" class="user-button" aria-label="User menu">
          <sl-avatar
            class="user-avatar"
            initials="${t}"
            image="${this.user.avatar||""}"
            label="${this.user.name}"
          ></sl-avatar>
          <sl-icon name="chevron-down" class="dropdown-icon"></sl-icon>
        </button>
        <sl-menu>
          <sl-menu-item>
            <sl-icon slot="prefix" name="person"></sl-icon>
            Profile
          </sl-menu-item>
          <sl-menu-item>
            <sl-icon slot="prefix" name="gear"></sl-icon>
            Settings
          </sl-menu-item>
          <sl-divider></sl-divider>
          <sl-menu-item @click=${()=>this.handleLogout()}>
            <sl-icon slot="prefix" name="box-arrow-right"></sl-icon>
            Sign out
          </sl-menu-item>
        </sl-menu>
      </sl-dropdown>
    `}getInitials(t){return t.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)}handleMobileMenuClick(){this.dispatchEvent(new CustomEvent("mobile-menu-toggle",{bubbles:!0,composed:!0}))}handleLogout(){this.dispatchEvent(new CustomEvent("logout",{bubbles:!0,composed:!0}))}};w.styles=v`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: var(--scion-header-height, 60px);
      padding: 0 1.5rem;
      background: var(--scion-surface, #ffffff);
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .mobile-menu-btn {
      display: none;
      padding: 0.5rem;
      background: transparent;
      border: none;
      border-radius: 0.375rem;
      cursor: pointer;
      color: var(--scion-text, #1e293b);
    }

    .mobile-menu-btn:hover {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: flex;
      }
    }

    .page-title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    @media (max-width: 640px) {
      .header-actions {
        display: none;
      }
    }

    .user-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--scion-text, #1e293b);
    }

    @media (max-width: 640px) {
      .user-name {
        display: none;
      }
    }

    .sign-in-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background: var(--scion-primary, #3b82f6);
      color: white;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: background 0.15s ease;
    }

    .sign-in-link:hover {
      background: var(--scion-primary-hover, #2563eb);
    }

    /* User dropdown styles */
    .user-dropdown {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem;
      background: transparent;
      border: none;
      border-radius: 9999px;
      cursor: pointer;
      transition: background 0.15s ease;
    }

    .user-button:hover {
      background: var(--scion-bg-subtle, #f1f5f9);
    }

    .user-avatar {
      --size: 2rem;
    }

    .dropdown-icon {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      transition: transform 0.15s ease;
    }

    .user-dropdown[open] .dropdown-icon {
      transform: rotate(180deg);
    }
  `;M([p({type:Object})],w.prototype,"user",2);M([p({type:String})],w.prototype,"currentPath",2);M([p({type:String})],w.prototype,"pageTitle",2);M([p({type:Boolean})],w.prototype,"showMobileMenu",2);M([_()],w.prototype,"_menuOpen",2);w=M([b("scion-header")],w);var Pt=Object.defineProperty,Et=Object.getOwnPropertyDescriptor,he=(t,e,r,i)=>{for(var s=i>1?void 0:i?Et(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&Pt(e,r,s),s};const St={"/":"Dashboard","/groves":"Groves","/agents":"Agents","/settings":"Settings"};let W=class extends g{constructor(){super(...arguments),this.path="/",this.currentLabel=""}render(){const t=this.generateBreadcrumbs();return t.length<=1?d``:d`
      <sl-breadcrumb>
        ${t.map((e,r)=>d`
            <sl-breadcrumb-item
              href="${e.current?"":e.href}"
              ?aria-current=${e.current?"page":!1}
            >
              ${r===0?d`<sl-icon name="house" class="breadcrumb-icon"></sl-icon>`:""}
              ${e.label}
            </sl-breadcrumb-item>
          `)}
      </sl-breadcrumb>
    `}generateBreadcrumbs(){const t=[];if(t.push({label:"Home",href:"/",current:this.path==="/"}),this.path==="/")return t;const e=this.path.split("/").filter(Boolean);let r="";return e.forEach((i,s)=>{r+=`/${i}`;const n=s===e.length-1;let a=St[r];a||(this.isId(i)?a=this.currentLabel&&n?this.currentLabel:this.formatId(i):a=this.formatSegment(i)),t.push({label:a,href:r,current:n})}),t}isId(t){return/^[0-9a-f-]{8,}$/i.test(t)||/^\d+$/.test(t)}formatId(t){return t.length>8?t.slice(0,8)+"...":t}formatSegment(t){return t.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}};W.styles=v`
    :host {
      display: block;
    }

    sl-breadcrumb {
      --separator-color: var(--scion-text-muted, #64748b);
    }

    sl-breadcrumb-item::part(label) {
      font-size: 0.875rem;
    }

    sl-breadcrumb-item::part(label):hover {
      color: var(--scion-primary, #3b82f6);
    }

    sl-breadcrumb-item[aria-current='page']::part(label) {
      color: var(--scion-text, #1e293b);
      font-weight: 500;
    }

    .breadcrumb-icon {
      font-size: 0.875rem;
      vertical-align: middle;
      margin-right: 0.25rem;
    }
  `;he([p({type:String})],W.prototype,"path",2);he([p({type:String})],W.prototype,"currentLabel",2);W=he([b("scion-breadcrumb")],W);var kt=Object.defineProperty,Ct=Object.getOwnPropertyDescriptor,re=(t,e,r,i)=>{for(var s=i>1?void 0:i?Ct(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&kt(e,r,s),s};const Ae={"/":"Dashboard","/groves":"Groves","/agents":"Agents","/settings":"Settings"};let D=class extends g{constructor(){super(...arguments),this.user=null,this.currentPath="/",this._drawerOpen=!1}render(){const t=this.getPageTitle();return d`
      <!-- Desktop Sidebar -->
      <aside class="sidebar">
        <scion-nav .user=${this.user} .currentPath=${this.currentPath}></scion-nav>
      </aside>

      <!-- Mobile Drawer -->
      <sl-drawer
        class="mobile-drawer"
        ?open=${this._drawerOpen}
        placement="start"
        @sl-hide=${()=>this.handleDrawerClose()}
      >
        <scion-nav
          .user=${this.user}
          .currentPath=${this.currentPath}
          @nav-click=${()=>this.handleNavClick()}
        ></scion-nav>
      </sl-drawer>

      <!-- Main Content -->
      <main class="main">
        <scion-header
          .user=${this.user}
          .currentPath=${this.currentPath}
          .pageTitle=${t}
          ?showMobileMenu=${!0}
          @mobile-menu-toggle=${()=>this.handleMobileMenuToggle()}
          @logout=${()=>this.handleLogout()}
        ></scion-header>

        <div class="content">
          <div class="content-inner">
            <slot></slot>
          </div>
        </div>
      </main>
    `}getPageTitle(){return Ae[this.currentPath]?Ae[this.currentPath]:this.currentPath.startsWith("/groves/")?"Grove Details":this.currentPath.startsWith("/agents/")?this.currentPath.includes("/terminal")?"Terminal":"Agent Details":"Page Not Found"}handleMobileMenuToggle(){this._drawerOpen=!this._drawerOpen}handleDrawerClose(){this._drawerOpen=!1}handleNavClick(){this._drawerOpen=!1}handleLogout(){fetch("/auth/logout",{method:"POST",credentials:"include"}).then(()=>{window.location.href="/auth/login"}).catch(t=>{console.error("Logout failed:",t)})}};D.styles=v`
    :host {
      display: flex;
      min-height: 100vh;
      background: var(--scion-bg, #f8fafc);
    }

    /* Desktop sidebar */
    .sidebar {
      display: flex;
      flex-shrink: 0;
      position: sticky;
      top: 0;
      height: 100vh;
    }

    @media (max-width: 768px) {
      .sidebar {
        display: none;
      }
    }

    /* Mobile drawer */
    .mobile-drawer {
      --size: 280px;
    }

    .mobile-drawer::part(panel) {
      background: var(--scion-surface, #ffffff);
    }

    .mobile-drawer::part(close-button) {
      color: var(--scion-text, #1e293b);
    }

    .mobile-drawer::part(close-button):hover {
      color: var(--scion-primary, #3b82f6);
    }

    /* Main content area */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0; /* Prevent flex overflow */
    }

    /* Content wrapper */
    .content {
      flex: 1;
      padding: 1.5rem;
      overflow: auto;
    }

    @media (max-width: 640px) {
      .content {
        padding: 1rem;
      }
    }

    /* Max width container */
    .content-inner {
      max-width: var(--scion-content-max-width, 1400px);
      margin: 0 auto;
      width: 100%;
    }

    /* Loading overlay */
    .loading-overlay {
      position: fixed;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.8);
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.2s ease,
        visibility 0.2s ease;
    }

    .loading-overlay.visible {
      opacity: 1;
      visibility: visible;
    }

    @media (prefers-color-scheme: dark) {
      .loading-overlay {
        background: rgba(15, 23, 42, 0.8);
      }
    }
  `;re([p({type:Object})],D.prototype,"user",2);re([p({type:String})],D.prototype,"currentPath",2);re([_()],D.prototype,"_drawerOpen",2);D=re([b("scion-app")],D);var Ot=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,N=(t,e,r,i)=>{for(var s=i>1?void 0:i?Tt(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&Ot(e,r,s),s};const Pe={running:{variant:"success",icon:"play-circle",pulse:!1},stopped:{variant:"neutral",icon:"stop-circle",pulse:!1},provisioning:{variant:"warning",icon:"hourglass-split",pulse:!0},starting:{variant:"warning",icon:"arrow-repeat",pulse:!0},stopping:{variant:"warning",icon:"arrow-repeat",pulse:!0},error:{variant:"danger",icon:"exclamation-triangle",pulse:!1},healthy:{variant:"success",icon:"check-circle",pulse:!1},unhealthy:{variant:"danger",icon:"x-circle",pulse:!1},pending:{variant:"warning",icon:"clock",pulse:!0},active:{variant:"success",icon:"circle-fill",pulse:!1},inactive:{variant:"neutral",icon:"circle",pulse:!1},success:{variant:"success",pulse:!1},warning:{variant:"warning",pulse:!1},danger:{variant:"danger",pulse:!1},info:{variant:"primary",pulse:!1},neutral:{variant:"neutral",pulse:!1}};let x=class extends g{constructor(){super(...arguments),this.status="neutral",this.label="",this.size="medium",this.showIcon=!0,this.showPulse=!0}render(){const t=Pe[this.status]||Pe.neutral,e=this.label||this.status,r=this.showPulse&&t.pulse;return d`
      <span class="badge ${t.variant} ${this.size} ${r?"pulse":""}">
        ${this.showIcon&&t.icon?d`<sl-icon name="${t.icon}"></sl-icon>`:""}
        ${e}
      </span>
    `}};x.styles=v`
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      font-weight: 500;
      text-transform: capitalize;
      white-space: nowrap;
    }

    /* Size variants */
    .badge.small {
      font-size: 0.6875rem;
      padding: 0.125rem 0.5rem;
      gap: 0.25rem;
    }

    .badge.medium {
      font-size: 0.75rem;
    }

    .badge.large {
      font-size: 0.875rem;
      padding: 0.375rem 0.75rem;
    }

    .badge sl-icon {
      font-size: 0.875em;
    }

    .badge.small sl-icon {
      font-size: 0.75em;
    }

    .badge.large sl-icon {
      font-size: 1em;
    }

    /* Variant colors */
    .badge.success {
      background: var(--scion-success-100, #dcfce7);
      color: var(--scion-success-700, #15803d);
    }

    .badge.warning {
      background: var(--scion-warning-100, #fef3c7);
      color: var(--scion-warning-700, #b45309);
    }

    .badge.danger {
      background: var(--scion-danger-100, #fee2e2);
      color: var(--scion-danger-700, #b91c1c);
    }

    .badge.primary {
      background: var(--scion-primary-100, #dbeafe);
      color: var(--scion-primary-700, #1d4ed8);
    }

    .badge.neutral {
      background: var(--scion-neutral-100, #f1f5f9);
      color: var(--scion-neutral-600, #475569);
    }

    /* Pulse indicator */
    .pulse {
      position: relative;
    }

    .pulse::before {
      content: '';
      position: absolute;
      left: 0.5rem;
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .pulse.success::before {
      background: var(--scion-success-500, #22c55e);
      box-shadow: 0 0 0 0 var(--scion-success-400, #4ade80);
    }

    .pulse.warning::before {
      background: var(--scion-warning-500, #f59e0b);
      box-shadow: 0 0 0 0 var(--scion-warning-400, #fbbf24);
    }

    .pulse.danger::before {
      background: var(--scion-danger-500, #ef4444);
      box-shadow: 0 0 0 0 var(--scion-danger-400, #f87171);
    }

    @keyframes pulse {
      0% {
        box-shadow:
          0 0 0 0 rgba(34, 197, 94, 0.5),
          0 0 0 0 rgba(34, 197, 94, 0.3);
      }
      70% {
        box-shadow:
          0 0 0 6px rgba(34, 197, 94, 0),
          0 0 0 10px rgba(34, 197, 94, 0);
      }
      100% {
        box-shadow:
          0 0 0 0 rgba(34, 197, 94, 0),
          0 0 0 0 rgba(34, 197, 94, 0);
      }
    }

    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .badge.success {
        background: rgba(34, 197, 94, 0.2);
        color: #86efac;
      }

      .badge.warning {
        background: rgba(245, 158, 11, 0.2);
        color: #fcd34d;
      }

      .badge.danger {
        background: rgba(239, 68, 68, 0.2);
        color: #fca5a5;
      }

      .badge.primary {
        background: rgba(59, 130, 246, 0.2);
        color: #93c5fd;
      }

      .badge.neutral {
        background: rgba(100, 116, 139, 0.2);
        color: #cbd5e1;
      }
    }
  `;N([p({type:String})],x.prototype,"status",2);N([p({type:String})],x.prototype,"label",2);N([p({type:String})],x.prototype,"size",2);N([p({type:Boolean})],x.prototype,"showIcon",2);N([p({type:Boolean})],x.prototype,"showPulse",2);x=N([b("scion-status-badge")],x);var zt=Object.defineProperty,Dt=Object.getOwnPropertyDescriptor,Re=(t,e,r,i)=>{for(var s=i>1?void 0:i?Dt(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&zt(e,r,s),s};let K=class extends g{constructor(){super(...arguments),this.pageData=null}render(){const t=this.pageData?.user?.name?.split(" ")[0]||"there";return d`
      <div class="hero">
        <h1>Welcome back, ${t}!</h1>
        <p>Here's what's happening with your agents today.</p>
      </div>

      <div class="stats">
        <div class="stat-card">
          <h3>Active Agents</h3>
          <div class="stat-value">
            <span>--</span>
          </div>
          <div class="stat-change">
            <scion-status-badge status="success" label="Ready" size="small"></scion-status-badge>
          </div>
        </div>
        <div class="stat-card">
          <h3>Groves</h3>
          <div class="stat-value">--</div>
          <div class="stat-change">Project workspaces</div>
        </div>
        <div class="stat-card">
          <h3>Tasks Completed</h3>
          <div class="stat-value">--</div>
          <div class="stat-change">This week</div>
        </div>
        <div class="stat-card">
          <h3>System Status</h3>
          <div class="stat-value">
            <scion-status-badge status="healthy" size="large" label="Healthy"></scion-status-badge>
          </div>
          <div class="stat-change">All systems operational</div>
        </div>
      </div>

      <h2 class="section-title">Quick Actions</h2>
      <div class="quick-actions">
        <a href="/agents" class="action-card">
          <div class="action-icon">
            <sl-icon name="plus-lg"></sl-icon>
          </div>
          <div class="action-text">
            <h4>Create Agent</h4>
            <p>Spin up a new AI agent</p>
          </div>
        </a>
        <a href="/groves" class="action-card">
          <div class="action-icon">
            <sl-icon name="folder"></sl-icon>
          </div>
          <div class="action-text">
            <h4>View Groves</h4>
            <p>Browse project workspaces</p>
          </div>
        </a>
        <a href="/agents" class="action-card">
          <div class="action-icon">
            <sl-icon name="terminal"></sl-icon>
          </div>
          <div class="action-text">
            <h4>Open Terminal</h4>
            <p>Connect to running agent</p>
          </div>
        </a>
      </div>

      <div class="activity-section">
        <h2 class="section-title">Recent Activity</h2>
        <div class="activity-list">
          <div class="empty-state">
            <sl-icon name="clock-history"></sl-icon>
            <p>No recent activity to display.<br />Start by creating your first agent.</p>
            <sl-button variant="primary" href="/agents" style="margin-top: 1rem;">
              <sl-icon slot="prefix" name="plus-lg"></sl-icon>
              Create Agent
            </sl-button>
          </div>
        </div>
      </div>
    `}};K.styles=v`
    :host {
      display: block;
    }

    .hero {
      background: linear-gradient(
        135deg,
        var(--scion-primary, #3b82f6) 0%,
        var(--scion-primary-700, #1d4ed8) 100%
      );
      color: white;
      padding: 2rem;
      border-radius: var(--scion-radius-lg, 0.75rem);
      margin-bottom: 2rem;
    }

    .hero h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
    }

    .hero p {
      font-size: 1rem;
      opacity: 0.9;
      margin: 0;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--scion-surface, #ffffff);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.5rem;
      box-shadow: var(--scion-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
      border: 1px solid var(--scion-border, #e2e8f0);
    }

    .stat-card h3 {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 0.5rem 0;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-change {
      font-size: 0.875rem;
      margin-top: 0.5rem;
      color: var(--scion-text-muted, #64748b);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: var(--scion-text, #1e293b);
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }

    .action-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      transition: all var(--scion-transition-fast, 150ms ease);
      text-decoration: none;
      color: inherit;
    }

    .action-card:hover {
      border-color: var(--scion-primary, #3b82f6);
      box-shadow: var(--scion-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      transform: translateY(-2px);
    }

    .action-icon {
      width: 3rem;
      height: 3rem;
      border-radius: var(--scion-radius, 0.5rem);
      background: var(--scion-primary-50, #eff6ff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--scion-primary, #3b82f6);
      flex-shrink: 0;
    }

    .action-icon sl-icon {
      font-size: 1.5rem;
    }

    .action-text h4 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      color: var(--scion-text, #1e293b);
    }

    .action-text p {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin: 0;
    }

    /* Recent activity section */
    .activity-section {
      margin-top: 2rem;
    }

    .activity-list {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      overflow: hidden;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--scion-border, #e2e8f0);
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      background: var(--scion-bg-subtle, #f1f5f9);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--scion-text-muted, #64748b);
      flex-shrink: 0;
    }

    .activity-content {
      flex: 1;
      min-width: 0;
    }

    .activity-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .activity-time {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.125rem;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .empty-state sl-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  `;Re([p({type:Object})],K.prototype,"pageData",2);K=Re([b("scion-page-home")],K);var jt=Object.defineProperty,Mt=Object.getOwnPropertyDescriptor,V=(t,e,r,i)=>{for(var s=i>1?void 0:i?Mt(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&jt(e,r,s),s};let C=class extends g{constructor(){super(...arguments),this.pageData=null,this.loading=!0,this.groves=[],this.error=null}connectedCallback(){super.connectedCallback(),this.loadGroves()}async loadGroves(){this.loading=!0,this.error=null;try{const t=await fetch("/api/groves");if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.message||`HTTP ${t.status}: ${t.statusText}`)}const e=await t.json();this.groves=Array.isArray(e)?e:e.groves||[]}catch(t){console.error("Failed to load groves:",t),this.error=t instanceof Error?t.message:"Failed to load groves"}finally{this.loading=!1}}getStatusVariant(t){switch(t){case"active":return"success";case"inactive":return"neutral";case"error":return"danger";default:return"neutral"}}formatDate(t){try{const e=new Date(t);return new Intl.RelativeTimeFormat("en",{numeric:"auto"}).format(Math.round((e.getTime()-Date.now())/(1e3*60*60*24)),"day")}catch{return t}}render(){return d`
      <div class="header">
        <h1>Groves</h1>
        <sl-button variant="primary" size="small" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          New Grove
        </sl-button>
      </div>

      ${this.loading?this.renderLoading():this.error?this.renderError():this.renderGroves()}
    `}renderLoading(){return d`
      <div class="loading-state">
        <sl-spinner></sl-spinner>
        <p>Loading groves...</p>
      </div>
    `}renderError(){return d`
      <div class="error-state">
        <sl-icon name="exclamation-triangle"></sl-icon>
        <h2>Failed to Load Groves</h2>
        <p>There was a problem connecting to the API.</p>
        <div class="error-details">${this.error}</div>
        <sl-button variant="primary" @click=${()=>this.loadGroves()}>
          <sl-icon slot="prefix" name="arrow-clockwise"></sl-icon>
          Retry
        </sl-button>
      </div>
    `}renderGroves(){return this.groves.length===0?this.renderEmptyState():d`
      <div class="grove-grid">${this.groves.map(t=>this.renderGroveCard(t))}</div>
    `}renderEmptyState(){return d`
      <div class="empty-state">
        <sl-icon name="folder2-open"></sl-icon>
        <h2>No Groves Found</h2>
        <p>
          Groves are project workspaces that contain your agents. Create your first grove to get
          started, or run
          <code>scion init</code> in a project directory.
        </p>
        <sl-button variant="primary" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          Create Grove
        </sl-button>
      </div>
    `}renderGroveCard(t){return d`
      <a href="/groves/${t.id}" class="grove-card">
        <div class="grove-header">
          <div>
            <h3 class="grove-name">
              <sl-icon name="folder-fill"></sl-icon>
              ${t.name}
            </h3>
            <div class="grove-path">${t.path}</div>
          </div>
          <scion-status-badge
            status=${this.getStatusVariant(t.status)}
            label=${t.status}
            size="small"
          >
          </scion-status-badge>
        </div>
        <div class="grove-stats">
          <div class="stat">
            <span class="stat-label">Agents</span>
            <span class="stat-value">${t.agentCount}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Updated</span>
            <span class="stat-value" style="font-size: 0.875rem; font-weight: 500;">
              ${this.formatDate(t.updatedAt)}
            </span>
          </div>
        </div>
      </a>
    `}};C.styles=v`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .grove-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .grove-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.5rem;
      transition: all var(--scion-transition-fast, 150ms ease);
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .grove-card:hover {
      border-color: var(--scion-primary, #3b82f6);
      box-shadow: var(--scion-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
      transform: translateY(-2px);
    }

    .grove-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .grove-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .grove-name sl-icon {
      color: var(--scion-primary, #3b82f6);
    }

    .grove-path {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.25rem;
      font-family: var(--scion-font-mono, monospace);
      word-break: break-all;
    }

    .grove-stats {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--scion-border, #e2e8f0);
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-label {
      font-size: 0.75rem;
      color: var(--scion-text-muted, #64748b);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .stat-value {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px dashed var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .empty-state sl-icon {
      font-size: 4rem;
      color: var(--scion-text-muted, #64748b);
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1.5rem 0;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .loading-state sl-spinner {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-state {
      text-align: center;
      padding: 3rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--sl-color-danger-200, #fecaca);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .error-state sl-icon {
      font-size: 3rem;
      color: var(--sl-color-danger-500, #ef4444);
      margin-bottom: 1rem;
    }

    .error-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .error-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1rem 0;
    }

    .error-details {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.875rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.75rem 1rem;
      border-radius: var(--scion-radius, 0.5rem);
      color: var(--sl-color-danger-700, #b91c1c);
      margin-bottom: 1rem;
    }
  `;V([p({type:Object})],C.prototype,"pageData",2);V([_()],C.prototype,"loading",2);V([_()],C.prototype,"groves",2);V([_()],C.prototype,"error",2);C=V([b("scion-page-groves")],C);var Nt=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,F=(t,e,r,i)=>{for(var s=i>1?void 0:i?Ut(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&Nt(e,r,s),s};let O=class extends g{constructor(){super(...arguments),this.pageData=null,this.loading=!0,this.agents=[],this.error=null}connectedCallback(){super.connectedCallback(),this.loadAgents()}async loadAgents(){this.loading=!0,this.error=null;try{const t=await fetch("/api/agents");if(!t.ok){const r=await t.json().catch(()=>({}));throw new Error(r.message||`HTTP ${t.status}: ${t.statusText}`)}const e=await t.json();this.agents=Array.isArray(e)?e:e.agents||[]}catch(t){console.error("Failed to load agents:",t),this.error=t instanceof Error?t.message:"Failed to load agents"}finally{this.loading=!1}}getStatusVariant(t){switch(t){case"running":return"success";case"stopped":return"neutral";case"provisioning":return"warning";case"error":return"danger";default:return"neutral"}}render(){return d`
      <div class="header">
        <h1>Agents</h1>
        <sl-button variant="primary" size="small" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          New Agent
        </sl-button>
      </div>

      ${this.loading?this.renderLoading():this.error?this.renderError():this.renderAgents()}
    `}renderLoading(){return d`
      <div class="loading-state">
        <sl-spinner></sl-spinner>
        <p>Loading agents...</p>
      </div>
    `}renderError(){return d`
      <div class="error-state">
        <sl-icon name="exclamation-triangle"></sl-icon>
        <h2>Failed to Load Agents</h2>
        <p>There was a problem connecting to the API.</p>
        <div class="error-details">${this.error}</div>
        <sl-button variant="primary" @click=${()=>this.loadAgents()}>
          <sl-icon slot="prefix" name="arrow-clockwise"></sl-icon>
          Retry
        </sl-button>
      </div>
    `}renderAgents(){return this.agents.length===0?this.renderEmptyState():d`
      <div class="agent-grid">${this.agents.map(t=>this.renderAgentCard(t))}</div>
    `}renderEmptyState(){return d`
      <div class="empty-state">
        <sl-icon name="cpu"></sl-icon>
        <h2>No Agents Found</h2>
        <p>
          Agents are AI-powered workers that can help you with coding tasks. Create your first agent
          to get started.
        </p>
        <sl-button variant="primary" disabled>
          <sl-icon slot="prefix" name="plus-lg"></sl-icon>
          Create Agent
        </sl-button>
      </div>
    `}renderAgentCard(t){return d`
      <div class="agent-card">
        <div class="agent-header">
          <div>
            <h3 class="agent-name">
              <sl-icon name="cpu"></sl-icon>
              ${t.name}
            </h3>
            <div class="agent-template">${t.template}</div>
          </div>
          <scion-status-badge
            status=${this.getStatusVariant(t.status)}
            label=${t.status}
            size="small"
          >
          </scion-status-badge>
        </div>

        ${t.taskSummary?d` <div class="agent-task">${t.taskSummary}</div> `:""}

        <div class="agent-actions">
          <sl-button variant="primary" size="small" ?disabled=${t.status!=="running"}>
            <sl-icon slot="prefix" name="terminal"></sl-icon>
            Terminal
          </sl-button>
          ${t.status==="running"?d`
                <sl-button variant="danger" size="small" outline>
                  <sl-icon slot="prefix" name="stop-circle"></sl-icon>
                  Stop
                </sl-button>
              `:d`
                <sl-button variant="success" size="small" outline>
                  <sl-icon slot="prefix" name="play-circle"></sl-icon>
                  Start
                </sl-button>
              `}
        </div>
      </div>
    `}};O.styles=v`
    :host {
      display: block;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .header h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--scion-text, #1e293b);
      margin: 0;
    }

    .agent-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .agent-card {
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
      padding: 1.5rem;
      transition: all var(--scion-transition-fast, 150ms ease);
    }

    .agent-card:hover {
      border-color: var(--scion-primary, #3b82f6);
      box-shadow: var(--scion-shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
    }

    .agent-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 0.75rem;
    }

    .agent-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .agent-name sl-icon {
      color: var(--scion-primary, #3b82f6);
    }

    .agent-template {
      font-size: 0.875rem;
      color: var(--scion-text-muted, #64748b);
      margin-top: 0.25rem;
    }

    .agent-task {
      font-size: 0.875rem;
      color: var(--scion-text, #1e293b);
      margin-top: 0.75rem;
      padding: 0.75rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      border-radius: var(--scion-radius, 0.5rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .agent-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--scion-border, #e2e8f0);
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px dashed var(--scion-border, #e2e8f0);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .empty-state sl-icon {
      font-size: 4rem;
      color: var(--scion-text-muted, #64748b);
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .empty-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .empty-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1.5rem 0;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: var(--scion-text-muted, #64748b);
    }

    .loading-state sl-spinner {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-state {
      text-align: center;
      padding: 3rem 2rem;
      background: var(--scion-surface, #ffffff);
      border: 1px solid var(--sl-color-danger-200, #fecaca);
      border-radius: var(--scion-radius-lg, 0.75rem);
    }

    .error-state sl-icon {
      font-size: 3rem;
      color: var(--sl-color-danger-500, #ef4444);
      margin-bottom: 1rem;
    }

    .error-state h2 {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.5rem 0;
    }

    .error-state p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 1rem 0;
    }

    .error-details {
      font-family: var(--scion-font-mono, monospace);
      font-size: 0.875rem;
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.75rem 1rem;
      border-radius: var(--scion-radius, 0.5rem);
      color: var(--sl-color-danger-700, #b91c1c);
      margin-bottom: 1rem;
    }
  `;F([p({type:Object})],O.prototype,"pageData",2);F([_()],O.prototype,"loading",2);F([_()],O.prototype,"agents",2);F([_()],O.prototype,"error",2);O=F([b("scion-page-agents")],O);var Rt=Object.defineProperty,It=Object.getOwnPropertyDescriptor,Ie=(t,e,r,i)=>{for(var s=i>1?void 0:i?It(e,r):e,n=t.length-1,a;n>=0;n--)(a=t[n])&&(s=(i?a(e,r,s):a(s))||s);return i&&s&&Rt(e,r,s),s};let Q=class extends g{constructor(){super(...arguments),this.pageData=null}render(){const t=this.pageData?.path||"unknown";return d`
      <div class="container">
        <div class="illustration">
          <sl-icon name="emoji-frown"></sl-icon>
        </div>
        <div class="code">404</div>
        <h1>Page Not Found</h1>
        <p>
          Sorry, we couldn't find the page you're looking for. The path
          <span class="path">${t}</span> doesn't exist.
        </p>
        <div class="actions">
          <sl-button variant="primary" href="/">
            <sl-icon slot="prefix" name="house"></sl-icon>
            Back to Dashboard
          </sl-button>
          <sl-button variant="default" @click=${()=>this.handleGoBack()}>
            <sl-icon slot="prefix" name="arrow-left"></sl-icon>
            Go Back
          </sl-button>
        </div>
      </div>
    `}handleGoBack(){window.history.back()}};Q.styles=v`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 200px);
    }

    .container {
      text-align: center;
      max-width: 480px;
      padding: 2rem;
    }

    .code {
      font-size: 8rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, var(--scion-primary, #3b82f6) 0%, #8b5cf6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--scion-text, #1e293b);
      margin: 0 0 0.75rem 0;
    }

    p {
      color: var(--scion-text-muted, #64748b);
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }

    .path {
      font-family: var(--scion-font-mono, monospace);
      background: var(--scion-bg-subtle, #f1f5f9);
      padding: 0.25rem 0.5rem;
      border-radius: var(--scion-radius-sm, 0.25rem);
      font-size: 0.875rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    sl-button::part(base) {
      font-weight: 500;
    }

    .illustration {
      margin-bottom: 1.5rem;
    }

    .illustration sl-icon {
      font-size: 6rem;
      color: var(--scion-neutral-300, #cbd5e1);
    }
  `;Ie([p({type:Object})],Q.prototype,"pageData",2);Q=Ie([b("scion-page-404")],Q);async function Ee(){console.info("[Scion] Initializing client...");const t=Ht();t&&console.info("[Scion] Initial page data:",t.path),await Promise.all([customElements.whenDefined("scion-app"),customElements.whenDefined("scion-nav"),customElements.whenDefined("scion-header"),customElements.whenDefined("scion-breadcrumb"),customElements.whenDefined("scion-status-badge"),customElements.whenDefined("scion-page-home"),customElements.whenDefined("scion-page-groves"),customElements.whenDefined("scion-page-agents"),customElements.whenDefined("scion-page-404")]),console.info("[Scion] Components defined, setting up router..."),Lt(),console.info("[Scion] Client initialization complete")}function Ht(){const t=document.getElementById("__SCION_DATA__");if(!t)return console.warn("[Scion] No initial data found"),null;try{return JSON.parse(t.textContent||"{}")}catch(e){return console.error("[Scion] Failed to parse initial data:",e),null}}function Lt(){if(!document.querySelector("scion-app")){console.error("[Scion] App shell not found");return}document.addEventListener("click",e=>{const i=e.target.closest("a");if(!i)return;const s=i.getAttribute("href");s&&(s.startsWith("http")||s.startsWith("//")||s.startsWith("javascript:")||s.startsWith("#")||s.startsWith("/api/")||s.startsWith("/auth/")||s.startsWith("/events")||(e.preventDefault(),Bt(s)))}),window.addEventListener("popstate",()=>{He(window.location.pathname)})}function Bt(t){t!==window.location.pathname&&(window.history.pushState({},"",t),He(t),window.location.href=t)}function He(t){const e=document.querySelector("scion-app");e&&(e.currentPath=t)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{Ee()}):Ee();
//# sourceMappingURL=main.js.map
