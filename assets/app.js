const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.append(t)}t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600)}
$('#menu')?.addEventListener('click',e=>{const o=$('nav').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)});
$$('.pw button').forEach(b=>b.addEventListener('click',()=>{const i=b.previousElementSibling,h=i.type==='password';i.type=h?'text':'password';b.textContent=h?'Hide':'Show'}));
// hero demo
$$('[data-demo]').forEach(b=>b.addEventListener('click',()=>{const s=$('#demo-state');s.textContent='Checking your device…';setTimeout(()=>s.textContent=b.dataset.demo==='pass'?'✓ Passkey verified. Welcome back, Maya.':'✓ Code accepted. You are in.',900)}));
// pricing toggle
$$('.tog button').forEach(b=>b.addEventListener('click',()=>{$$('.tog button').forEach(x=>x.classList.toggle('on',x===b));const y=b.dataset.p==='y';$$('[data-m]').forEach(e=>e.textContent=y?e.dataset.y:e.dataset.m)}));
// strength meter
const pw=$('#password[data-meter]');pw?.addEventListener('input',()=>{const v=pw.value;let n=0;if(v.length>=8)n++;if(v.length>=12)n++;if(/[A-Z]/.test(v)&&/[a-z]/.test(v))n++;if(/\d/.test(v))n++;if(/[^A-Za-z0-9]/.test(v))n++;const m=$('.meter b');m.style.width=n*20+'%';m.style.background=n<3?'#B3382C':n<4?'#F0B44C':'#2E9E6B';$('#hint').textContent=['Start typing','Too short','Weak: add length','Okay: add a symbol or number','Strong','Excellent'][n]});
function check(f){let ok=true;$$('.err',f).forEach(e=>e.textContent='');$$('input[required],textarea[required]',f).forEach(i=>{const e=i.closest('.f')?.querySelector('.err');let m='';if(!i.value.trim())m='This field is required.';else if(i.type==='email'&&!/^\S+@\S+\.\S+$/.test(i.value))m='Enter a valid email like you@example.com.';else if(i.id==='password'&&i.dataset.meter&&i.value.length<8)m='Use at least 8 characters.';if(m){ok=false;if(e)e.textContent=m}});return ok}
$$('form[data-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!check(f))return;const k=f.dataset.form,em=$('#email',f)?.value;
if(k==='login'||k==='signup'){sessionStorage.setItem('latchly',em);toast(k==='login'?'Signed in. Taking you to your dashboard…':'Account created. Welcome!');setTimeout(()=>location.href='dashboard.html',900)}
else{toast('Message sent. We reply within one business day.');f.reset()}}));
// dashboard guard
if(document.body.dataset.page==='dashboard'){const u=sessionStorage.getItem('latchly');if(!u)location.replace('login.html');else $('#user').textContent=u;$('#logout')?.addEventListener('click',()=>{sessionStorage.removeItem('latchly');location.href='index.html'});$$('[data-revoke]').forEach(b=>b.addEventListener('click',()=>{b.closest('tr').remove();toast('Session signed out.')}));$$('[data-sw]').forEach(c=>c.addEventListener('change',()=>toast(c.dataset.sw+(c.checked?' turned on':' turned off'))))}
