/* Academic-style homepage. Public content remains in the original content.js. */
(() => {
  'use strict';
  const C = window.SiteCore;
  const main = document.getElementById('main');
  if (!C || !window.SITE_CONTENT) { main.textContent = '无法读取 content.js 或 site-core.js。'; return; }
  let data;
  try { data = C.normalize(window.SITE_CONTENT); } catch (error) { main.textContent = error.message; return; }
  const pages = ['home', 'research', 'data', 'business'];
  const preview = !!window.EDITOR_PREVIEW && window.parent !== window;
  const requested = window.PREVIEW_LANG || new URLSearchParams(location.search).get('lang');
  let lang = ['zh', 'en'].includes(requested) ? requested : 'zh';
  if (!requested && !preview) { try { lang = localStorage.getItem('llw-academic-language') === 'en' ? 'en' : 'zh'; } catch (_) {} }
  const labels = {
    zh: {home:'首页', research:'学术科研', publications:'论文发表', data:'数据分析', business:'商业设计', education:'教育经历', hello:'你好！', interests:'研究方向', selected:'精选研究', allResearch:'全部研究 →', allPapers:'查看全部论文 →', email:'邮箱', location:'早稻田大学', edit:'编辑内容', top:'返回顶部 ↑', contents:'本页目录', full:'完整介绍', role:'我的角色与工作', paper:'论文 ↗', enlarge:'放大查看：', close:'关闭图片', skip:'跳转到正文', links:'联系方式', more:'也欢迎通过 ', contact:' 与我联系。', site:'个人主页', menu:'打开导航', nav:'主导航', profile:'个人信息', sourceNote:'本页保留原始中文内容。', strengths:'研究方法', empty:'内容整理中。'},
    en: {home:'Home', research:'Research', publications:'Publications', data:'Data Science', business:'Business', education:'Education', hello:'Hello!', interests:'Research interests', selected:'Selected research', allResearch:'All research →', allPapers:'All publications →', email:'Email', location:'Waseda University', edit:'Edit content', top:'Back to top ↑', contents:'ON THIS PAGE', full:'Full description', role:'My role and contributions', paper:'Paper ↗', enlarge:'Enlarge: ', close:'Close figure', skip:'Skip to content', links:'Contact', more:'You can also find my work on ', contact:'.', site:'Personal Homepage', menu:'Open navigation', nav:'Main navigation', profile:'Profile', sourceNote:'The original Chinese content is preserved on this page.', strengths:'Research approach', empty:'Content in preparation.'}
  };
  const E = C.node, L = value => C.local(value, lang), S = () => labels[lang];
  const pageName = id => data.tracks[id] ? L(data.tracks[id].label) || S()[id] : S()[id];
  const P = (value, className='') => C.paragraph(value, className);
  const visiblePapers = () => data.publications.filter(item => item.visible && L(item.title));
  const visibleProjects = (track='research') => data.tracks[track].projects.filter(item => item.visible && L(item.title));
  let active = routeForHash(location.hash.slice(1), 'home');
  function routeForHash(hash, fallback) {
    if (hash === 'education' || hash === 'sidebar-education') return 'home';
    if (pages.includes(hash)) return hash;
    if (/^ds-source-|^project-ds-|^data-/.test(hash)) return 'data';
    if (hash === 'publications' || hash === 'all-publications') return 'research';
    if (/^publication-|^year-/.test(hash)) return 'research';
    if (/^project-|^group-|^institution-/.test(hash) || ['key-idea','research-strengths','research-projects'].includes(hash)) return 'research';
    return fallback;
  }
  function localLink(text, hash, className='') { const a = E('a', className, text); a.href = '#' + hash; return a; }
  function icon(type) {
    const paths = {
      location:['M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z','M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0'],
      email:['M3 5h18v14H3Z','m3 6 9 7 9-7'],
      scholar:['m2 8 10-5 10 5-10 5Z','M6 10v7c4 3 8 3 12 0v-7','M22 8v9'],
      github:['M9 19c-4 1-4-2-6-2','M15 22v-4c0-1-.3-1.7-1-2 3-.4 6-1.5 6-6a5 5 0 0 0-1.3-3.5A5 5 0 0 0 18.5 3S17 2.5 15 4a13 13 0 0 0-6 0C7 2.5 5.5 3 5.5 3a5 5 0 0 0-.2 3.5A5 5 0 0 0 4 10c0 4.5 3 5.6 6 6-.7.3-1 1-1 2v4']
    };
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('class','icon'); svg.setAttribute('aria-hidden','true');
    for (const d of paths[type]) { const path = document.createElementNS('http://www.w3.org/2000/svg','path'); path.setAttribute('d',d); svg.append(path); }
    return svg;
  }
  function profile() {
    const s = S(), p = data.profile, name = L(p.name);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = name + ' | ' + (active === 'home' ? s.site : pageName(active));
    document.querySelector('meta[name="description"]').content = name + ' · ' + L(p.intro).replace(/\*\*/g,'');
    document.getElementById('site-name').textContent = name;
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-affiliation').textContent = L(p.affiliation);
    document.getElementById('skip-link').textContent = s.skip;
    document.getElementById('site-nav').setAttribute('aria-label',s.nav);
    document.getElementById('author-sidebar').setAttribute('aria-label',s.profile);
    document.getElementById('menu-toggle').setAttribute('aria-label',s.menu);
    const photo = document.getElementById('profile-photo'), src = C.safeImage(p.photo);
    photo.alt = name;
    document.getElementById('portrait-link').hidden = !src;
    if (src && photo.getAttribute('src') !== src) photo.src = src;
    photo.onerror = () => { document.getElementById('portrait-link').hidden = true; };
    const list = document.getElementById('profile-links'); list.replaceChildren();
    const affiliation = L(p.affiliation);
    if (/早稻田|Waseda/i.test(affiliation)) { const li=E('li','location-item');li.append(icon('location'),E('span','',s.location));list.append(li); }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) { const li=E('li'), a=E('a','',s.email);a.href='mailto:'+p.email;a.title=p.email;li.append(icon('email'),a);list.append(li); }
    for (const [type, title, url] of [['scholar','Google Scholar',p.scholar],['github','GitHub',p.github]]) { const a=C.link(url,title);if(a){const li=E('li');li.append(icon(type),a);list.append(li);} }
    const education=document.getElementById('sidebar-education');education.replaceChildren();
    const educationTitle=E('h2','sidebar-heading',s.education);educationTitle.id='sidebar-education-title';
    const schools=E('ul','sidebar-education-list'),seen=new Set();
    for(const group of data.tracks.research.groups){
      const school=L(group.institution),period=L(group.period),key=school+'|'+period;
      if(!school||seen.has(key))continue;seen.add(key);
      const item=E('li');item.append(E('span','education-school',school));if(period)item.append(E('span','education-period',period));schools.append(item);
    }
    education.append(educationTitle,schools);education.hidden=!seen.size;
    for (const a of document.querySelectorAll('[data-page]')) { a.textContent=pageName(a.dataset.page);if(a.dataset.page===active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current'); }
    for (const button of document.querySelectorAll('[data-lang]')) button.setAttribute('aria-pressed',String(button.dataset.lang===lang));
    document.getElementById('footer-text').textContent='© 2026 '+name;
    const scholar = document.getElementById('footer-scholar'); scholar.hidden=!C.link(p.scholar,''); if (!scholar.hidden) scholar.href=p.scholar;
    const edit=document.getElementById('edit-entry');edit.textContent=s.edit;edit.href='edit.html?section='+(['research','data','business','publications'].includes(active)?active:'profile');edit.hidden=preview||!!window.STANDALONE_PREVIEW;
    document.getElementById('back-top').textContent=s.top;
    document.getElementById('back-top').href='#'+active;
    document.getElementById('figure-close').setAttribute('aria-label',s.close);
  }
  function pageTitle(title) { main.append(E('h1','page-title',title)); }
  function heading(title, className='section-heading') { return E('h2',className,title); }
  function sectionHead(title, linkText, hash) { const row=E('div','section-heading-row');row.append(heading(title));if(linkText)row.append(localLink(linkText,hash,'small-link'));return row; }
  function home() {
    const s=S(), t=data.tracks.research;
    const intro=E('section','home-intro');intro.append(E('h1','greeting',s.hello));
    const bio=E('p','intro-lead');
    const name=E('strong','',L(data.profile.name));
    const affiliation=L(data.profile.affiliation).replace(' · ',lang==='zh'?'的':' at ');
    bio.append(document.createTextNode(lang==='zh'?'我是':'I’m '),name,document.createTextNode(lang==='zh'?'，'+affiliation+'。':', a '+affiliation.replace(/^Ph\.D\. Student/,'Ph.D. student')+'.'));
    const overview=L(t.summary).replace(/^我的研究围绕结构信息的表示展开：/,'我').replace(/^My research centres on representations of structural information\.\s*/,'');
    intro.append(bio,P(L(data.profile.intro)),P(overview));
    main.append(intro);
    const services=E('section','home-services');services.id='home-directions';services.setAttribute('aria-labelledby','services-title');
    const servicesTitle=heading(lang==='zh'?'我能做什么':'How I can help','services-title');servicesTitle.id='services-title';
    services.append(servicesTitle,P(lang==='zh'?'以研究理解问题，以数据支持判断。':'Understanding problems through research. Informing decisions with data.','services-intro'));
    const offerings=[
      {id:'research',title:{zh:'学术科研',en:'AI Research'},description:{zh:'围绕结构信息表示学习，研究脑网络分析与 MPI 血管重建中的问题。',en:'Learning representations of structural information, with applications in brain-network analysis and MPI vessel reconstruction.'}},
      {id:'data',title:{zh:'数据分析',en:'Data Analysis'},description:{zh:'从复杂数据中发现可复用的模式，检验特征对分类、分组与预测的价值。',en:'Finding reusable patterns in complex data and examining their value for classification, grouping, and prediction.'}},
      {id:'business',title:{zh:'商业模型',en:'Business Modeling'},description:{zh:'商业模型与价值分析相关内容正在整理中。',en:'Content on business models and value analysis is in preparation.'}}
    ];
    const grid=E('div','services-grid');
    for(const item of offerings){
      const card=E('article','service-item'),circle=E('div','service-icon'),img=E('img');img.src='assets/service-'+item.id+'.svg';img.alt='';img.width=58;img.height=58;circle.append(img);
      const link=localLink(lang==='zh'?'了解更多':'Read more',item.id,'service-link');link.setAttribute('aria-label',(lang==='zh'?'了解更多：':'Read more about ')+L(item.title));
      card.append(circle,E('h3','service-title',L(item.title)),P(L(item.description),'service-description'),link);grid.append(card);
    }
    services.append(grid);main.append(services);
    const foot=E('p','home-footnote');foot.append(document.createTextNode(s.more));
    const scholar=C.link(data.profile.scholar,'Google Scholar');if(scholar)foot.append(scholar);
    if(lang==='zh'){foot.append(document.createTextNode(' 了解我的论文，或通过 '));const mail=E('a','','Email');mail.href='mailto:'+data.profile.email;foot.append(mail);}
    foot.append(document.createTextNode(s.contact));main.append(foot);
  }
  function project(p, track='research') {
    const s=S(), article=E('article','project-entry');article.id='project-'+p.id;
    const copy=E('div','project-copy'), title=E('h2','project-title',L(p.shortTitle)||L(p.title));
    const papers=visiblePapers(), index=papers.findIndex(paper=>p.publicationId?paper.id===p.publicationId:!!p.url&&paper.url===p.url);
    if(index>=0){const citation=localLink('['+(index+1)+']','publication-'+papers[index].id,'project-citation');citation.setAttribute('aria-label',(lang==='zh'?'查看论文 ':'View publication ')+(index+1));title.append(citation);}
    copy.append(title);
    const context=[L(p.context),L(p.year)].filter(Boolean).filter((v,i,a)=>i===0||!a[0].includes(v)).join(' · ');
    if(context||p.url||L(p.modelName)){const meta=E('p','project-meta'),link=C.link(p.url,context||s.paper);if(L(p.modelName))meta.append(E('span','project-model',L(p.modelName)),document.createTextNode(context||p.url?' · ':''));meta.append(link||document.createTextNode(context));copy.append(meta);}
    if(L(p.brief)||L(p.takeaway))copy.append(P(L(p.brief)||L(p.takeaway),'project-brief'));
    if(L(p.result))copy.append(P(L(p.result),'project-result'));
    article.append(copy);
    const src=C.safeImage(p.modelImage);
    if(src){const b=E('button','model-thumb');b.type='button';b.dataset.figure=p.id;b.dataset.track=track;b.setAttribute('aria-label',s.enlarge+(L(p.modelCaption)||L(p.title)));b.setAttribute('aria-haspopup','dialog');const img=E('img');img.src=src;img.alt=L(p.modelCaption)||L(p.title);img.loading='lazy';b.append(img,E('span','enlarge-mark','↗'));article.append(b);}else article.classList.add('without-image');
    if(L(p.summary)||L(p.notes)){
      const details=E('details','entry-details');details.id='detail-'+p.id;details.append(E('summary','',s.full));
      const full=E('div','full-project-text');for(const paragraph of (L(p.summary)||L(p.takeaway)).split(/\n\s*\n/).filter(Boolean))full.append(P(paragraph));
      if(L(p.notes))full.append(P(L(p.notes)));details.append(full);article.append(details);
    }
    if(L(p.role)||L(p.contribution)){const role=E('section','project-contribution');role.append(E('h4','',s.role));if(L(p.role))role.append(P(L(p.role)));for(const text of L(p.contribution).split(/\n\s*\n/).filter(Boolean))role.append(P(text));article.append(role);}
    return article;
  }
  function research(track='research') {
    const t=data.tracks[track], s=S();pageTitle(pageName(track));
    const intro=E('section','page-deck');intro.id='key-idea';if(L(t.concept))intro.append(E('h2','concept',L(t.concept)));if(L(t.statement))intro.append(P(L(t.statement),'concept-statement'));if(L(t.summary))intro.append(P(L(t.summary)));main.append(intro);
    if(t.strengths[lang]?.length){const ul=E('ul','strength-list');ul.id='research-strengths';for(const item of t.strengths[lang])ul.append(C.inline(E('li'),item.replace(/\\u3000/g,' ')));main.append(ul);}
    const works=E('section','research-projects');works.id=track==='data'?'data-projects':'research-projects';main.append(works);
    const projects=visibleProjects(track);
    for(const p of projects)works.append(project(p,track));
    if(!projects.length)main.append(P(L(t.emptyMessage)||s.empty,'empty-state'));
    if(track==='research')main.append(publications());
  }
  function authors(value){const p=E('p','publication-authors');for(const part of value.split(/(\bL Liu\b)/g))p.append(part==='L Liu'?E('strong','',part):document.createTextNode(part));return p;}
  function publications(){
    const s=S(),section=E('section','research-publications');section.id='publications';section.setAttribute('aria-labelledby','publications-title');
    const heading=E('h2','section-heading',s.publications);heading.id='publications-title';section.append(heading);
    const intro=E('p','publication-intro');const scholar=C.link(data.profile.scholar,'Google Scholar ↗');if(scholar)intro.append(scholar);section.append(intro);
    const papers=visiblePapers(),list=E('ol','publication-list');
    for(const [index,p] of papers.entries()){
      const item=E('li','publication-item');item.id='publication-'+p.id;
      const title=E('h3'),link=C.link(p.url,p.title.en||L(p.title),'publication-title')||E('span','publication-title',p.title.en||L(p.title));
      link.lang=p.title.en?'en':document.documentElement.lang;link.prepend(E('span','publication-number','['+(index+1)+'] '));title.append(link);
      // Keep complete bibliographic data in content.js; omit years in this view.
      const venue=p.venue.replace(/\b(?:19|20)\d{2}\b/g,'').replace(/\s+/g,' ').replace(/^[\s,;·–—-]+|[\s,;·–—-]+$/g,'');
      item.append(title,authors(p.authors));if(venue)item.append(P(venue,'publication-venue'));list.append(item);
    }
    section.append(list);return section;
  }
  function sourceDocument(track='data'){
    pageTitle(pageName(track));if(lang==='en')main.append(P(S().sourceNote,'publication-intro'));
    const section=E('section','source-document');section.lang='zh-CN';
    const schoolIds=new Set(['ds-source-016','ds-source-019']);
    const subtitleIds=['ds-source-020','ds-source-023','ds-source-026','ds-source-028','ds-source-032'];
    const duplicateReferences=new Set(['all-publications','ds-source-040','ds-source-041','ds-source-042','ds-source-043','ds-source-044','ds-source-045','ds-source-046']);
    for(const block of data.tracks[track].sourceBlocks){
      if(schoolIds.has(block.id)||duplicateReferences.has(block.id)||!block.text.trim())continue;
      const p=E('p','source-paragraph');p.id=block.id;p.dataset.sourceStyle=block.style;
      if(block.id==='ds-source-002')p.classList.add('source-title');
      if(['data-approach','data-projects'].includes(block.id))p.classList.add('source-section');
      if(subtitleIds.includes(block.id))p.classList.add('source-subheading');
      if(/^project-ds-/.test(block.id))p.classList.add('source-project');
      if(block.runs.map(run=>run.text).join('')===block.text){for(const run of block.runs){let node=document.createTextNode(run.text);for(const [key,tag] of [['underline','u'],['italic','em'],['bold','strong']])if(run[key]){const wrapper=E(tag);wrapper.append(node);node=wrapper;}p.append(node);}}
      else p.textContent=block.text;
      section.append(p);
    }
    main.append(section);
  }
  function business(){
    const t=data.tracks.business;
    if(t.sourceBlocks.length){sourceDocument('business');return;}
    if(visibleProjects('business').length||t.groups.some(g=>L(g.description))){research('business');return;}
    pageTitle(pageName('business'));
    for(const k of ['concept','statement','summary'])if(L(t[k]))main.append(P(L(t[k])));
    if(t.steps[lang]?.length){const ol=E('ol');for(const step of t.steps[lang])ol.append(E('li','',step));main.append(ol);}
    main.append(P(L(t.emptyMessage)||S().empty,'empty-state'));
  }
  function contents(){
    const toc=document.getElementById('page-toc');toc.replaceChildren();toc.hidden=['home','business'].includes(active);if(toc.hidden)return;
    toc.setAttribute('aria-label',S().contents);toc.append(E('h2','toc-heading',S().contents));
    if(active==='research'){toc.append(localLink(S().strengths,'key-idea'));for(const p of visibleProjects())toc.append(localLink(L(p.shortTitle)||L(p.title),'project-'+p.id));toc.append(localLink(S().publications,'publications'));}
    if(active==='data')for(const [id,text] of [['data-approach',lang==='zh'?'分析思路':'Approach'],['data-projects',lang==='zh'?'项目案例':'Projects']])if(document.getElementById(id))toc.append(localLink(text,id));
  }
  function render(){
    const opened=[...main.querySelectorAll('details[open]')].map(e=>e.id);
    profile();main.replaceChildren();
    if(active==='home')home();else if(active==='research')research();else if(active==='business')business();else if(data.tracks.data.sourceBlocks.length)sourceDocument();else research('data');
    for(const id of opened){const el=document.getElementById(id);if(el)el.open=true;}
    contents();
  }
  function reveal(hash, focus=false){
    if(hash==='education')hash='sidebar-education';
    if(/^(group|institution)-/.test(hash)){
      const groupId=hash.replace(/^(group|institution)-/,'');
      const first=visibleProjects().find(p=>p.group===groupId);hash=first?'project-'+first.id:'research-projects';
    }
    if(/^year-/.test(hash)){const first=visiblePapers().find(p=>p.year===hash.slice(5));hash=first?'publication-'+first.id:'publications';}
    if(hash==='data-references')hash='data-projects';
    else if(hash==='all-publications')hash='publications';
    if(pages.includes(hash)||hash==='top'||!hash){window.scrollTo({top:0,behavior:'instant'});if(focus)main.focus({preventScroll:true});return;}
    const target=document.getElementById(hash);if(!target)return;
    for(let p=target.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true;
    target.scrollIntoView({block:'start',behavior:'instant'});
    if(focus){const heading=target.querySelector('h1,h2,h3')||target;heading.tabIndex=-1;heading.focus({preventScroll:true});}
  }
  function closeMenu(){document.getElementById('site-nav').classList.remove('is-open');document.getElementById('menu-toggle').setAttribute('aria-expanded','false');}
  function navigate(hash, push=true){
    const next=routeForHash(hash,active);if(push&&location.hash!=='#'+hash){try{history.pushState(null,'','#'+hash);}catch(_){location.hash=hash;}}
    closeMenu();if(next!==active){active=next;render();}reveal(hash,true);
  }
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');if(!a||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const hash=a.getAttribute('href').slice(1);if(hash==='main'){event.preventDefault();main.focus();return;}
    event.preventDefault();navigate(hash);
  });
  for(const button of document.querySelectorAll('[data-lang]'))button.addEventListener('click',()=>{
    lang=button.dataset.lang;if(!preview)try{localStorage.setItem('llw-academic-language',lang);}catch(_){}
    try{const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);}catch(_){}
    render();reveal(location.hash.slice(1));
  });
  const menu=document.getElementById('menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.getElementById('site-nav').classList.toggle('is-open',open);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();}});
  window.addEventListener('popstate',()=>{active=routeForHash(location.hash.slice(1),'home');render();closeMenu();reveal(location.hash.slice(1));});
  window.addEventListener('hashchange',()=>{const next=routeForHash(location.hash.slice(1),active);if(next!==active){active=next;render();}reveal(location.hash.slice(1));});
  const dialog=document.getElementById('figure-dialog');
  main.addEventListener('click',event=>{
    const button=event.target.closest('[data-figure]');if(!button)return;
    const p=data.tracks[button.dataset.track]?.projects.find(p=>p.id===button.dataset.figure);if(!p)return;
    document.getElementById('figure-title').textContent=L(p.modelCaption)||L(p.title);
    const img=document.getElementById('figure-image');img.alt=L(p.modelCaption)||L(p.title);img.src=C.safeImage(p.modelImage);
    document.getElementById('figure-source').textContent=p.modelSource;dialog.showModal();
  });
  document.getElementById('figure-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  if(preview){window.addEventListener('message',event=>{if(event.source!==window.parent||event.data?.type!=='llw-preview-content')return;try{data=C.normalize(event.data.content);if(pages.includes(event.data.track)||event.data.track==='publications')active=routeForHash(event.data.track,'home');if(['zh','en'].includes(event.data.lang))lang=event.data.lang;render();if(event.data.track==='publications')reveal('publications');}catch(error){main.textContent=error.message;}});window.parent.postMessage({type:'llw-preview-ready'},'*');}
  render();reveal(location.hash.slice(1));
})();
