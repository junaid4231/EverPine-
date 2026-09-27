/**
 * Tiny inline script (no React dependency, runs before hydration):
 *  - marks <html class="js"> so [data-reveal] elements may start hidden,
 *  - reveals them with an IntersectionObserver as they enter the viewport,
 *  - arch reveals start fully clipped (zero visible area), which browsers never report
 *    as intersecting — so their PARENT is observed instead,
 *  - waits until React has hydrated the page before revealing anything, so the
 *    added classes never cause a hydration mismatch,
 *  - watches for elements added by client-side navigation,
 *  - a scroll sweep reveals anything already passed (fast flicks can skip the observer),
 *  - fails safe: if anything goes wrong, everything is revealed.
 */
const code = `(function(){try{var d=document.documentElement;d.classList.add('js');
function all(){document.querySelectorAll('[data-reveal]').forEach(function(e){e.classList.add('is-in')})}
if(!('IntersectionObserver' in window)){document.addEventListener('DOMContentLoaded',all);return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var t=e.target;(t.__rv||[t]).forEach(function(x){x.classList.add('is-in')});io.unobserve(t)})},{rootMargin:'0px 0px -6% 0px',threshold:0.01});
function scan(){document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function(e){if(e.__rvd)return;e.__rvd=1;var t=e.getAttribute('data-reveal')==='arch'&&e.parentElement?e.parentElement:e;if(t!==e){(t.__rv=t.__rv||[]).push(e)}io.observe(t)})}
function hydrated(){var m=document.getElementById('main');if(!m)return false;for(var k in m){if(k.indexOf('__react')===0)return true}return false}
var pend=0;function sweep(){pend=0;var h=innerHeight;document.querySelectorAll('[data-reveal]:not(.is-in)').forEach(function(e){var t=e.getAttribute('data-reveal')==='arch'&&e.parentElement?e.parentElement:e;var r=t.getBoundingClientRect();if(r.height&&r.top<h){e.classList.add('is-in')}})}
function start(){scan();new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});addEventListener('scroll',function(){if(!pend)pend=requestAnimationFrame(sweep)},{passive:true})}
document.addEventListener('DOMContentLoaded',function(){var t0=Date.now();(function wait(){if(hydrated()||Date.now()-t0>4000){start()}else{requestAnimationFrame(wait)}})()});
setTimeout(function(){if(document.visibilityState==='hidden')all()},4000);
}catch(e){document.documentElement.classList.remove('js')}})();`

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: code }} />
}
