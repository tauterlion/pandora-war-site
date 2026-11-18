const pages=[['home','Home','Welcome to Pandora'],['campaign','Campaign','Dates, War Score and victory'],['factions','Factions','Rosters, captains and membership'],['objectives','Objectives','Supply, Control and Relic'],['rules','Rules','Warfare, death and moderation'],['installation','Installation','Modpack, joining and troubleshooting']];
const cardIcons={campaign:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>',factions:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="3"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 4.13a4 4 0 0 1 0 7.75"/></svg>',objectives:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2"/></svg>',rules:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg>',installation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>'};
const navLinks=pages.map(([id,title])=>`<a href="#${id}" data-nav="${id}">${title}</a>`).join('');document.querySelector('.nav').innerHTML=navLinks;
const sidebarToggleIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16m7-12-4 4 4 4"/></svg>';
document.querySelectorAll('.sidebar').forEach(s=>{const id=s.closest('.page').id;s.innerHTML=`<div class="sidebar-heading"><span class="label">Player guide</span><button class="sidebar-toggle" type="button" aria-label="Collapse player guide" aria-expanded="true" aria-controls="guide-${id}" title="Collapse player guide">${sidebarToggleIcon}</button></div><nav class="sidebar-links" id="guide-${id}" aria-label="Player guide">${pages.slice(1).map(([p,title])=>`<a href="#${p}" data-nav="${p}" title="${title}" aria-label="${title}"><span class="sidebar-icon">${cardIcons[p]}</span><span class="sidebar-text">${title}</span></a>`).join('')}</nav>`;});
let guideCollapsed=false;try{guideCollapsed=localStorage.getItem('pandora-guide-collapsed')==='true';}catch(e){}
function setGuideCollapsed(value){guideCollapsed=value;document.body.classList.toggle('guide-collapsed',value);document.querySelectorAll('.sidebar-toggle').forEach(b=>{b.setAttribute('aria-expanded',String(!value));b.setAttribute('aria-label',value?'Expand player guide':'Collapse player guide');b.title=value?'Expand player guide':'Collapse player guide';});try{localStorage.setItem('pandora-guide-collapsed',String(value));}catch(e){}}
document.querySelectorAll('.sidebar-toggle').forEach(b=>b.addEventListener('click',()=>setGuideCollapsed(!guideCollapsed)));setGuideCollapsed(guideCollapsed);document.getElementById('homeLinks').innerHTML=pages.slice(1).map(([id,title,desc],i)=>`<a class="link-card" href="#${id}"><span class="card-watermark" aria-hidden="true">${cardIcons[id]||''}</span><div class="top"><span>0${i+1}</span><span aria-hidden="true">↗</span></div><strong>${title}</strong><p>${desc}</p></a>`).join('');
document.querySelector('.skip-link').addEventListener('click',e=>{e.preventDefault();const target=document.getElementById('main');target.focus({preventScroll:true});target.scrollIntoView({block:'start',behavior:'instant'});});
// Persistent photo layers allow crossfades without replacing a background-image URL.
const guidePhotos={campaign:['assets/photo-02.webp','50% 43%'],factions:['assets/photo-04.webp','50% 45%'],objectives:['assets/photo-01.webp','50% 48%'],rules:['assets/photo-06.webp','50% 45%'],installation:['assets/photo-05.webp','50% 47%']};
const guideBackdrops=document.createElement('div');
guideBackdrops.className='guide-backdrops';guideBackdrops.setAttribute('aria-hidden','true');guideBackdrops.hidden=true;
const guideLayers={};
for(const [id,[src,position]] of Object.entries(guidePhotos)){
  const layer=document.createElement('div');layer.className='guide-backdrop';layer.style.backgroundImage='url("'+src+'")';layer.style.backgroundPosition=position;guideBackdrops.append(layer);guideLayers[id]=layer;
}
const homeBackdrop=document.createElement('div');homeBackdrop.className='guide-backdrop';guideBackdrops.append(homeBackdrop);
document.getElementById('main').prepend(guideBackdrops);
const heroRouteCover=document.createElement('div');heroRouteCover.className='hero-route-cover';heroRouteCover.setAttribute('aria-hidden','true');document.querySelector('.hero-slides').append(heroRouteCover);
const backdropMotion=matchMedia('(prefers-reduced-motion: reduce)');
function showBackdrop(layer){for(const item of [...Object.values(guideLayers),homeBackdrop])item.classList.toggle('is-active',item===layer);}
function routeBackdrop(page,previous){
  if(page===previous)return;
  if(page==='home'){
    guideBackdrops.hidden=true;
    if(previous&&guidePhotos[previous]&&!backdropMotion.matches){
      const [src,position]=guidePhotos[previous];
      heroRouteCover.style.backgroundImage='url("'+src+'")';heroRouteCover.style.backgroundPosition=position;
      heroRouteCover.classList.add('is-instant','is-visible');
      void heroRouteCover.offsetWidth;
      heroRouteCover.classList.remove('is-instant','is-visible');
    }else heroRouteCover.classList.remove('is-instant','is-visible');
    return;
  }
  const incoming=guideLayers[page];if(!incoming)return;
  guideBackdrops.hidden=false;
  if(!previous||backdropMotion.matches){
    guideBackdrops.classList.add('is-instant');showBackdrop(incoming);void guideBackdrops.offsetWidth;guideBackdrops.classList.remove('is-instant');
  }else if(previous==='home'){
    const currentHero=document.querySelector('.hero-slide.is-active');
    if(currentHero){homeBackdrop.style.backgroundImage='url("'+currentHero.getAttribute('src')+'")';homeBackdrop.style.backgroundPosition='50% 55%';}
    guideBackdrops.classList.add('is-instant');showBackdrop(homeBackdrop);void guideBackdrops.offsetWidth;guideBackdrops.classList.remove('is-instant');showBackdrop(incoming);
  }else showBackdrop(incoming);
}

let previousPage=null;function route(){let [page,anchor]=(location.hash.slice(1)||'home').split('/');if(!pages.some(p=>p[0]===page))page='home';document.querySelectorAll('.page').forEach(p=>{p.hidden=p.id!==page;p.classList.toggle('page-enter',p.id===page&&page!==previousPage&&!anchor)});routeBackdrop(page,previousPage);previousPage=page;document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});document.title='Pandora — '+pages.find(p=>p[0]===page)[1];if(anchor){const target=document.getElementById(anchor);if(target&&target.closest('.page')?.id===page)requestAnimationFrame(()=>target.scrollIntoView({block:'start',behavior:'instant'}));else window.scrollTo({top:0,left:0,behavior:"instant"})}else window.scrollTo({top:0,left:0,behavior:"instant"})}window.addEventListener('hashchange',route);route();
const index=[...pages.slice(1).map(([p,t,d])=>({href:'#'+p,title:t,body:p==='factions'?d+' '+Array.from(document.querySelectorAll('#factions .roster li:not(.pending)')).map(li=>li.textContent.trim()).join(' '):d})),...Array.from(document.querySelectorAll('.article section[id],.objective[id]')).map(s=>({href:'#'+s.closest('.page').id+'/'+s.id,title:s.querySelector('h2').textContent,body:s.innerText||s.textContent}))];const dialog=document.getElementById('searchDialog'),input=document.getElementById('searchInput'),results=document.getElementById('searchResults');function search(){const terms=input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);const matches=terms.length?index.filter(i=>terms.every(t=>(i.title+' '+i.body).toLowerCase().includes(t))):index.slice(0,5);results.replaceChildren();if(!matches.length){results.textContent='No matching results.';return}matches.forEach(i=>{const a=document.createElement('a');a.className='result';a.href=i.href;const t=document.createElement('strong');t.textContent=i.title;const d=document.createElement('span');d.textContent=pages.find(p=>p[0]===i.href.slice(1).split('/')[0])[1];a.append(t,d);a.addEventListener('click',()=>{dialog.close();if(location.hash===i.href)route()});results.append(a)})}function openSearch(){dialog.showModal();input.value='';search();input.focus()}document.getElementById('searchOpen').addEventListener('click',openSearch);document.getElementById('searchClose').addEventListener('click',()=>dialog.close());input.addEventListener('input',search);document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(!dialog.open)openSearch()}});

const installImageDialog=document.getElementById('installImageDialog');
const installImageFull=document.getElementById('installImageFull');
document.querySelectorAll('.install-shot').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');installImageFull.src=img.src;installImageFull.alt=img.alt;document.getElementById('installImageTitle').textContent=button.closest('figure').querySelector('figcaption').textContent;installImageDialog.showModal();}));
document.getElementById('installImageClose').addEventListener('click',()=>installImageDialog.close());
installImageDialog.addEventListener('click',event=>{if(event.target===installImageDialog){const r=installImageDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)installImageDialog.close();}});

const heroSlides=[...document.querySelectorAll('.hero-slide')],heroPause=document.querySelector('.hero-pause'),heroMotion=matchMedia('(prefers-reduced-motion: reduce)'),heroStage=document.querySelector('.hero-slides');const HERO_INTERVAL=6000,HERO_FADE=2000;let heroIndex=0,heroTimer=null,heroPaused=heroMotion.matches,heroRemaining=HERO_INTERVAL,heroStarted=0;
const pauseIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>',playIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m8 5 12 7-12 7z"/></svg>';
function advanceHero(){heroTimer=null;const old=heroSlides[heroIndex];heroIndex=(heroIndex+1)%heroSlides.length;const next=heroSlides[heroIndex];old.classList.add('is-leaving');next.classList.add('is-active');old.classList.remove('is-active');setTimeout(()=>{old.classList.remove('is-leaving')},heroMotion.matches?0:HERO_FADE+50);heroRemaining=HERO_INTERVAL;updateHeroTimer();}
function updateHeroTimer(){if(heroTimer!==null){clearTimeout(heroTimer);heroRemaining=Math.max(0,heroRemaining-(performance.now()-heroStarted));heroTimer=null;}heroPause.innerHTML=heroPaused?playIcon:pauseIcon;heroPause.setAttribute('aria-label',heroPaused?'Play background slideshow':'Pause background slideshow');heroPause.title=heroPause.getAttribute('aria-label');const running=!heroPaused&&!document.hidden&&!document.getElementById('home').hidden;heroStage.classList.toggle('is-paused',!running);if(running&&heroSlides.length>1){heroStarted=performance.now();heroTimer=setTimeout(advanceHero,heroRemaining);}}
heroPause.addEventListener('click',()=>{heroPaused=!heroPaused;updateHeroTimer();});heroMotion.addEventListener('change',e=>{heroPaused=e.matches;updateHeroTimer();});document.addEventListener('visibilitychange',updateHeroTimer);window.addEventListener('hashchange',updateHeroTimer);updateHeroTimer();

const copyAddress=document.getElementById('copyAddress');const copyStatus=document.getElementById('copyStatus');if(copyAddress&&copyStatus&&document.getElementById('serverAddress'))copyAddress.addEventListener('click',async()=>{const value=document.getElementById('serverAddress').textContent.trim();let ok=false;try{if(navigator.clipboard){await navigator.clipboard.writeText(value);ok=true;}}catch{}if(!ok){const input=document.createElement('textarea');input.value=value;input.style.cssText='position:fixed;left:-9999px;top:0';document.body.append(input);input.select();try{ok=document.execCommand('copy')}catch{}input.remove();}copyStatus.textContent=ok?'Server address copied.':'Copy unavailable — select the address manually.';copyAddress.querySelector('span').textContent=ok?'Copied':'Copy';if(ok)setTimeout(()=>{copyAddress.querySelector('span').textContent='Copy';copyStatus.textContent='';},2500);});
// Sequential reading links, without introducing extra pages.
pages.slice(1).forEach(([id],i)=>{const article=document.querySelector('#'+id+' .article'),prev=pages[i],next=pages[i+2],nav=document.createElement('nav');nav.className='guide-page-nav';nav.setAttribute('aria-label','Continue reading');nav.innerHTML=`<a href="#${prev[0]}"><span>← Previous</span><strong>${prev[1]}</strong></a>`+(next?`<a href="#${next[0]}"><span>Next →</span><strong>${next[1]}</strong></a>`:'');article.append(nav);});


// Countdown uses an absolute AST timestamp rather than the visitor's local date.
const launchTarget=document.getElementById('launch-target');
if(launchTarget){
  const deadline=Date.parse(launchTarget.dateTime);
  const hours=document.getElementById('launch-hours'),minutes=document.getElementById('launch-minutes'),seconds=document.getElementById('launch-seconds');
  const status=document.getElementById('launch-countdown-status'),heading=document.getElementById('launch-countdown-heading');
  let launchTimer=null;
  function updateLaunchCountdown(){
    const remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));
    hours.textContent=String(Math.floor(remaining/3600)).padStart(2,'0');
    minutes.textContent=String(Math.floor(remaining/60)%60).padStart(2,'0');
    seconds.textContent=String(remaining%60).padStart(2,'0');
    if(remaining===0){
      heading.textContent='SCHEDULED LAUNCH';status.hidden=false;
      if(launchTimer!==null){clearInterval(launchTimer);launchTimer=null;}
    }
    return remaining;
  }
  if(updateLaunchCountdown()>0)launchTimer=setInterval(updateLaunchCountdown,250);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateLaunchCountdown();});
  window.addEventListener('pageshow',updateLaunchCountdown);
}

// Wind simulation: shared gusts, local eddies and independent particle inertia.
function createCountdownWind(canvas){
  const ctx=canvas.getContext('2d');
  if(!ctx)return {setRunning(){}};
  const rand=(a,b)=>a+Math.random()*(b-a);
  const colors=['#e3e9ca','#b6cbaa','#e4c589','#8db5aa','#d6deba'];
  let w=0,h=0,ratio=1,particles=[],frame=null,last=null,time=0,running=false;
  function spawn(p,initial=false){
    p.depth=rand(.35,1.3);p.phase=rand(0,Math.PI*2);p.spin=rand(.8,3.7);
    p.size=rand(.6,1.75)*p.depth;p.alpha=rand(.2,.78);p.color=colors[Math.floor(rand(0,colors.length))];
    if(initial){p.x=rand(0,w);p.y=rand(0,h);}
    else if(Math.random()<.75){p.x=rand(-65,-5);p.y=rand(-h*.1,h*1.2);}
    else{p.x=rand(-w*.12,w*.86);p.y=h+rand(5,60);}
    p.vx=rand(90,230)*p.depth;p.vy=rand(-90,25)*p.depth;
    return p;
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      const speed=Math.hypot(p.vx,p.vy)||1;
      const trail=Math.min(24,speed*.035)*p.depth;
      const dx=p.vx/speed*trail,dy=p.vy/speed*trail;
      ctx.strokeStyle=p.color;ctx.fillStyle=p.color;ctx.lineWidth=p.size;
      ctx.globalAlpha=p.alpha*.52;ctx.beginPath();ctx.moveTo(p.x-dx,p.y-dy);ctx.lineTo(p.x,p.y);ctx.stroke();
      ctx.globalAlpha=p.alpha;ctx.beginPath();ctx.arc(p.x,p.y,p.size*.48,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
  }
  function resize(){
    const bounds=canvas.getBoundingClientRect();
    if(bounds.width<1||bounds.height<1)return;
    w=bounds.width;h=bounds.height;ratio=Math.min(window.devicePixelRatio||1,1.5);
    canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
    const count=Math.max(55,Math.min(220,Math.round(w*h/2300)));
    particles=Array.from({length:count},()=>spawn({},true));draw();
  }
  function animate(now){
    frame=null;
    if(!running)return;
    const dt=last===null?0:Math.min(.04,(now-last)/1000);last=now;time+=dt;
    // Gusts build and collapse; turbulence varies with location and each particle's depth.
    const gust=180+135*Math.pow(.5+.5*Math.sin(time*1.16),3)+85*Math.pow(.5+.5*Math.sin(time*2.37+1.4),4);
    for(const p of particles){
      const eddy=Math.sin(p.x*.009+p.y*.018-time*2.1+p.phase);
      const cross=Math.cos(p.y*.025-p.x*.007+time*1.45+p.phase);
      const targetX=(gust+92*eddy+47*Math.sin(time*p.spin+p.phase))*p.depth;
      const targetY=(-48+115*cross+60*Math.sin(time*2.5+p.phase)+.16*(180-gust))*p.depth;
      const response=Math.min(1,dt*(2.2+p.depth*2));
      p.vx+=(targetX-p.vx)*response;p.vy+=(targetY-p.vy)*response;
      p.x+=p.vx*dt;p.y+=p.vy*dt;
      if(p.x>w+70||p.x<-100||p.y<-100||p.y>h+100)spawn(p);
    }
    draw();frame=requestAnimationFrame(animate);
  }
  function setRunning(value){
    if(value===running)return;
    running=value;last=null;
    if(running){if(!w||!h)resize();frame=requestAnimationFrame(animate);}
    else if(frame!==null){cancelAnimationFrame(frame);frame=null;}
  }
  if(typeof ResizeObserver==='function')new ResizeObserver(resize).observe(canvas);
  else window.addEventListener('resize',resize);
  resize();
  return {setRunning};
}

// Pause both background layers and the canvas outside the visible home page.
const countdownSection=document.querySelector('.launch-countdown');
const countdownPause=document.querySelector('.countdown-pause');
if(countdownSection&&countdownPause){
  const countdownMotion=matchMedia('(prefers-reduced-motion: reduce)');
  const countdownCanvas=countdownSection.querySelector('.countdown-wind');
  const wind=countdownCanvas?createCountdownWind(countdownCanvas):{setRunning(){}};
  let countdownPaused=false,countdownVisible=true;
  function updateCountdownAtmosphere(){
    const paused=countdownPaused||countdownMotion.matches;
    const running=!paused&&!document.hidden&&!document.getElementById('home').hidden&&countdownVisible;
    countdownSection.classList.toggle('is-paused',!running);
    wind.setRunning(running);
    countdownPause.innerHTML=paused?playIcon:pauseIcon;
    countdownPause.setAttribute('aria-label',paused?'Play countdown background animation':'Pause countdown background animation');
    countdownPause.title=countdownPause.getAttribute('aria-label');
    countdownPause.hidden=countdownMotion.matches;
  }
  countdownPause.addEventListener('click',()=>{countdownPaused=!countdownPaused;updateCountdownAtmosphere();});
  countdownMotion.addEventListener('change',updateCountdownAtmosphere);
  document.addEventListener('visibilitychange',updateCountdownAtmosphere);
  window.addEventListener('hashchange',updateCountdownAtmosphere);
  if(typeof IntersectionObserver==='function')new IntersectionObserver(entries=>{countdownVisible=entries[0].isIntersecting;updateCountdownAtmosphere();}).observe(countdownSection);
  updateCountdownAtmosphere();
}
