/* Personal homepage and concise CV. Only public content.js is read here. */
(() => {
  'use strict';
  const C=window.SiteCore;
  const root=document.getElementById('tab-panels');
  if(!C || !window.SITE_CONTENT){root.textContent='无法读取内容，请确认 content.js、site-core.js 和 app.js 在同一目录。';return;}
  let data;
  try{data=C.normalize(window.SITE_CONTENT);}catch(e){root.textContent=e.message;return;}
  const ids=['research','data','business'];
  const preview=(!!window.EDITOR_PREVIEW || new URLSearchParams(location.search).get('preview')==='1') && window.parent!==window;
  const strings={zh:{site:'个人主页',skip:'跳转到正文',about:'关于我',choose:'选择专业方向',email:'邮箱',core:'研究宗旨',notes:'补充说明',info:'论文信息',paper:'论文 ↗',read:'相关链接 ↗',empty:'内容整理中。',papers:n=>'全部发表论文（'+n+'）',editor:'编辑内容',other:'其他项目',steps:'工作流程'},
                 en:{site:'Personal Homepage',skip:'Skip to content',about:'About me',choose:'Choose a focus area',email:'Email',core:'Key idea',notes:'Notes',info:'Paper details',paper:'Paper ↗',read:'Read more ↗',empty:'Content in preparation.',papers:n=>'All publications ('+n+')',editor:'Edit content',other:'Other projects',steps:'Workflow'}};
  let lang='zh';
  const requested=window.PREVIEW_LANG || new URLSearchParams(location.search).get('lang');
  if(['en','zh'].includes(requested))lang=requested;
  else if(!preview){try{if(localStorage.getItem('llw-site-language')==='en')lang='en';}catch(_) {}}
  function trackForHash(hash,fallback){
    if(ids.includes(hash))return hash;
    if(/^data-(approach|strengths|projects)$/.test(hash)||/^(project|group|institution|overview)-ds-/.test(hash))return 'data';
    if(['key-idea','research-strengths','research-projects'].includes(hash)||/^(project|group|institution)-/.test(hash))return 'research';
    return fallback;
  }
  let active=trackForHash(location.hash.slice(1),'research');
  const L=v=>C.local(v,lang), E=C.node;
  function trackSections(){
    const ds=active==='data';
    return {
      idea:ds?'data-approach':'key-idea',
      strengths:ds?'data-strengths':'research-strengths',
      projects:ds?'data-projects':'research-projects',
      core:ds?(lang==='zh'?'分析思路':'Approach'):strings[lang].core,
      strengthsLabel:ds?(lang==='zh'?'分析能力':'Analytical skills'):(lang==='zh'?'研究能力':'Research strengths')
    };
  }

  // Keep an older cached HTML shell usable while the static files are updated.
  document.getElementById('main').classList.add('cv-layout');
  document.querySelector('.site-name')?.remove();
  if(document.getElementById('profile-experience')?.tagName!=='SECTION'){
    const previous=document.getElementById('profile-experience');
    const experience=E('section','profile-experience');experience.id='profile-experience';experience.setAttribute('aria-labelledby','experience-label');
    const label=E('h2','sidebar-heading');label.id='experience-label';const list=E('div');list.id='experience-list';
    experience.append(label,list);if(previous)previous.replaceWith(experience);else document.querySelector('.intro-copy').append(experience);
  }
  if(!document.getElementById('page-toc')){
    const toc=E('nav','page-toc');toc.id='page-toc';toc.setAttribute('aria-labelledby','toc-label');document.querySelector('.intro-copy').append(toc);
  }
  let tocTargets=[],tocFrame=0;

  const modelDialog=E('dialog','model-dialog');modelDialog.id='model-dialog';
  const modelBar=E('div','model-bar'),modelTitle=E('h2','model-title'),modelClose=E('button','model-close','×');
  modelTitle.id='model-dialog-title';modelDialog.setAttribute('aria-labelledby',modelTitle.id);modelClose.type='button';
  modelBar.append(modelTitle,modelClose);
  const modelFigure=E('figure'),modelImage=E('img','model-full-image'),modelSource=E('figcaption','model-source');
  modelFigure.append(modelImage,modelSource);modelDialog.append(modelBar,modelFigure);document.body.append(modelDialog);
  modelClose.addEventListener('click',()=>modelDialog.close());
  modelDialog.addEventListener('click',event=>{if(event.target===modelDialog)modelDialog.close();});
  function showModel(p){
    const src=C.safeImage(p.modelImage);if(!src)return;
    modelTitle.textContent=L(p.modelCaption)||L(p.title);modelImage.alt=modelTitle.textContent;modelImage.src=src;
    modelSource.textContent=p.modelSource;modelClose.setAttribute('aria-label',lang==='zh'?'关闭模型图':'Close figure');modelDialog.showModal();
  }

  function profile() {
    const p=data.profile,name=L(p.name)||'LIU Lingwen',s=strings[lang];
    document.title=name+' | '+s.site;
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.querySelector('meta[name="description"]').content=name+' · '+ids.map(id=>L(data.tracks[id].label)).join(' · ');
    document.getElementById('profile-name').textContent=name;
    document.getElementById('profile-affiliation').textContent=L(p.affiliation);
    const bio=document.getElementById('profile-bio');bio.replaceChildren();C.inline(bio,L(p.intro));
    document.getElementById('skip-link').textContent=s.skip;
    document.querySelector('.intro').setAttribute('aria-label',s.about);
    document.getElementById('focus-tabs').setAttribute('aria-label',s.choose);
    document.getElementById('footer-text').textContent=name+' · '+s.site;
    document.getElementById('edit-entry').textContent=s.editor;
    document.getElementById('edit-entry').href='edit.html?section='+active;
    document.getElementById('edit-entry').hidden=preview || !!window.STANDALONE_PREVIEW;
    const contacts=document.getElementById('profile-links');contacts.replaceChildren();
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) {
      const a=E('a','contact-email',p.email);a.href='mailto:'+p.email;contacts.append(a);
    }
    for(const [label,url] of [['Google Scholar',p.scholar],['GitHub',p.github]]) {
      const a=C.link(url,label);if(a)contacts.append(a);
    }
    const avatar=document.getElementById('portrait');avatar.hidden=true;avatar.replaceChildren();
    const src=C.safeImage(p.photo);
    if(src){const img=E('img');img.alt=name;img.onload=()=>{avatar.hidden=false;};img.onerror=()=>{avatar.hidden=true;};img.src=src;avatar.append(img);}
    const experience=document.getElementById('profile-experience'),list=document.getElementById('experience-list');list.replaceChildren();
    document.getElementById('experience-label').textContent=lang==='zh'?'教育经历':'Education';
    const seen=new Set();
    for(const g of data.tracks.research.groups){
      const institution=L(g.institution),period=L(g.period),key=institution+'|'+period;
      if(!institution||seen.has(key))continue;seen.add(key);
      const item=E('p','experience-item');item.append(E('span','experience-name',institution));if(period)item.append(E('span','experience-period',period));list.append(item);
    }
    experience.hidden=!seen.size;
  }
  function descriptionParagraphs(value) {
    const paragraphs=value.trim().split(/\n\s*\n/).map(text=>text.trim()).filter(Boolean);
    if(paragraphs.length!==1)return paragraphs;
    const sentences=typeof Intl.Segmenter==='function'
      ?Array.from(new Intl.Segmenter(lang,{granularity:'sentence'}).segment(paragraphs[0]),part=>part.segment)
      :paragraphs[0].match(/[^。！？]+[。！？]*\s*/g)||paragraphs;
    const limit=lang==='zh'?120:430,chunks=[];let current='';
    for(const sentence of sentences){
      if(current&&current.length+sentence.length>limit){chunks.push(current.trim());current='';}
      current+=sentence;
    }
    if(current.trim())chunks.push(current.trim());return chunks;
  }
  function project(p,headingTag='h4') {
    const article=E('article','selected-project project-entry');article.id='project-'+p.id;
    const head=E('div','selected-heading'),title=E(headingTag,'selected-title',L(p.shortTitle)||L(p.title));
    if(active==='research'||(active==='data'&&p.publicationId)){
      const papers=data.publications.filter(p=>p.visible&&L(p.title));
      const index=papers.findIndex(paper=>p.publicationId?paper.id===p.publicationId:!!p.url&&paper.url===p.url);
      if(index>=0){
        const reference=E('a','project-citation','['+(index+1)+']');reference.href='#publication-'+papers[index].id;
        reference.setAttribute('aria-label',(lang==='zh'?'查看论文引用 ':'View reference ')+(index+1));title.append(reference);
      }else if(active==='research')title.append(E('span','reference-pending',lang==='zh'?'引用待补充':'Reference pending'));
    }
    head.append(title);const meta=E('div','selected-meta');
    if(L(p.modelName))meta.append(E('span','project-model',L(p.modelName)));
    const context=L(p.context),year=L(p.year),source=[context,year&&!context.includes(year)?year:''].filter(Boolean).join(' · ');
    const paper=C.link(p.url,source?source+' ↗':strings[lang].paper);
    if(paper)meta.append(paper);else if(source)meta.append(E('span','',source));
    if(meta.childNodes.length)head.append(meta);
    const image=C.safeImage(p.modelImage);
    if(image){
      const button=E('button','model-thumb');button.type='button';button.dataset.modelProject=p.id;
      button.setAttribute('aria-haspopup','dialog');button.setAttribute('aria-label',(lang==='zh'?'放大查看：':'Enlarge: ')+(L(p.modelCaption)||L(p.title)));
      const visual=E('img','project-visual');visual.src=image;visual.alt=L(p.modelCaption)||L(p.title);visual.loading='lazy';
      button.append(visual,E('span','model-enlarge','↗'));article.append(button);
    }else article.classList.add('without-image');
    const copy=E('div','selected-copy');copy.append(head);
    const brief=L(p.brief)||L(p.takeaway);if(brief)copy.append(C.paragraph(brief,'selected-brief'));
    if(L(p.result))copy.append(C.paragraph(L(p.result),'selected-result'));
    article.prepend(copy);
    let contribution=null;
    if(active==='research'||active==='data'){
      const role=L(p.role),work=L(p.contribution);contribution=E('section','project-contribution'+(!role&&!work?' is-placeholder':''));
      const heading=E('div','contribution-heading');heading.append(E(headingTag==='h5'?'h6':'h5','contribution-label',lang==='zh'?'我的角色与工作':'My role and contributions'));
      if(!role&&!work)heading.append(E('span','contribution-status',lang==='zh'?'待填写':'To be added'));contribution.append(heading);
      if(role)contribution.append(C.paragraph((lang==='zh'?'**角色：**':'**Role:** ')+role,'contribution-role'));
      if(work)for(const text of work.split(/\n\s*\n/).filter(Boolean))contribution.append(C.paragraph(text,'contribution-copy'));
    }
    const details=E('details','entry-details');details.id='detail-'+p.id;
    details.append(E('summary','',lang==='zh'?'完整介绍':'Full description'));
    const full=E('div','full-project-text');
    for(const text of descriptionParagraphs(L(p.summary)||L(p.takeaway)))full.append(C.paragraph(text,'project-copy'));
    if(L(p.notes))full.append(C.paragraph(L(p.notes),'notes-text'));
    details.append(full);article.append(details);if(contribution)article.append(contribution);return article;
  }
  function researchOverview(intro,t) {
    const sections=trackSections();
    intro.classList.add('research-overview');
    const idea=E('section','idea-panel');idea.id=sections.idea;idea.setAttribute('aria-labelledby',sections.idea+'-label');
    const label=E('h2','cv-section-label',sections.core);label.id=sections.idea+'-label';idea.append(label);
    const title=E('h3','concept-title',L(t.concept));title.id=active==='data'?'data-idea-title':'research-idea-title';idea.append(title);
    if(L(t.statement))idea.append(C.paragraph(L(t.statement),'concept-statement'));
    intro.append(idea);
    const strengths=t.strengths?.[lang]||[];
    if(strengths.length){
      const abilities=E('section','research-strengths');abilities.id=sections.strengths;abilities.setAttribute('aria-labelledby','strengths-label');
      const label=E('h2','cv-section-label',sections.strengthsLabel);label.id='strengths-label';abilities.append(label);
      const list=E('ul','capability-list');
      strengths.forEach((strength,i)=>{
        const item=E('li'),icon=E('img','capability-icon');icon.alt='';icon.src='assets/ability-'+['structure','method','analysis'][Math.min(i,2)]+'-slate.svg';
        const copy=E('div','capability-copy'),parts=strength.match(/^\*\*([^*]+)\*\*\s*(?:[—–-]\s*)?([\s\S]*)$/);
        if(parts){copy.append(E('h3','capability-name',parts[1]),C.paragraph(parts[2],'capability-description'));}
        else copy.append(C.paragraph(strength,'capability-description'));
        item.append(icon,copy);list.append(item);
      });abilities.append(list);intro.append(abilities);
    }else if(L(t.summary))idea.append(C.paragraph(L(t.summary),'concept-description'));
  }
  function researchLines(panel,groups,projects) {
    const works=E('section','research-projects'),used=new Set();works.id=trackSections().projects;works.setAttribute('aria-labelledby','projects-label');
    const label=E('h2','cv-section-label',lang==='zh'?'项目':'Projects');label.id='projects-label';works.append(label);
    let lastInstitution='',institution=null;
    for(const g of groups){
      const name=L(g.institution),period=L(g.period),key=name+'|'+period;
      if(!institution||key!==lastInstitution){
        institution=E('section','institution-block');institution.id='institution-'+g.id;lastInstitution=key;
        const head=E('div','institution-label'),title=E('h3','institution-name',name);title.id='institution-title-'+g.id;
        institution.setAttribute('aria-labelledby',title.id);head.append(title);if(period)head.append(E('span','institution-dates',period));institution.append(head);works.append(institution);
      }
      const group=E('section','project-group');group.id='group-'+g.id;
      if(L(g.title))group.append(E('h4','project-group-title',L(g.title)));
      if(L(g.description)){
        const intro=E('details','group-overview');intro.id='overview-'+g.id;
        intro.append(E('summary','',lang==='zh'?'方向说明':'Research focus'),C.paragraph(L(g.description),'group-description'));group.append(intro);
      }
      for(const p of projects.filter(p=>p.group===g.id)){used.add(p);group.append(project(p,L(g.title)?'h5':'h4'));}
      institution.append(group);
    }
    panel.append(works);return used;
  }
  function publications() {
    const list=data.publications.filter(p=>p.visible && L(p.title));if(!list.length)return null;
    const section=E('section','publications');section.id='all-publications';section.setAttribute('aria-labelledby','publications-label');
    const label=E('h2','cv-section-label',lang==='zh'?'全部发表论文':'All publications');label.id='publications-label';label.append(E('span','section-count',String(list.length)));section.append(label);
    const citations=E('ol','citation-list');section.append(citations);
    for(const p of list){
      const item=E('li','pub-item');item.id='publication-'+p.id;
      if(p.authors)item.append(E('span','citation-authors',p.authors.replace(/[.\s]+$/,'')+'. '));
      const title=p.title.en||L(p.title),link=C.link(p.url,title,'citation-title');
      const titleNode=link||E('span','citation-title',title);if(p.title.en)titleNode.lang='en';item.append(titleNode,document.createTextNode(/[.!?。！？]$/.test(title)?' ':'. '));
      const venue=p.year&&p.venue.endsWith(', '+p.year)?p.venue.slice(0,-p.year.length-2):p.venue;
      if(venue)item.append(E('cite','citation-venue',venue));
      if(p.year)item.append(document.createTextNode(venue?', ':''),E('span','citation-year',p.year));
      if(venue||p.year)item.append(document.createTextNode('.'));citations.append(item);
    }
    return section;
  }
  function contents() {
    const nav=document.getElementById('page-toc');nav.replaceChildren();tocTargets=[];nav.hidden=!['research','data'].includes(active);if(nav.hidden)return;
    const t=data.tracks[active],sections=trackSections();
    const heading=E('h2','sidebar-heading',lang==='zh'?'目录':'Contents');heading.id='toc-label';nav.append(heading);
    const list=E('ul','toc-list');nav.append(list);
    function entry(parent,id,text,kind=''){
      if(!document.getElementById(id))return null;
      const item=E('li',kind),link=E('a','toc-link',text);link.href='#'+id;link.dataset.tocTarget=id;link.title=text;item.append(link);parent.append(item);tocTargets.push({link,target:document.getElementById(id)});return item;
    }
    entry(list,sections.idea,sections.core);entry(list,sections.strengths,sections.strengthsLabel);
    const projects=entry(list,sections.projects,lang==='zh'?'项目':'Projects');
    if(projects){
      const children=E('ul','toc-projects');projects.append(children);let lastSchool='';
      for(const group of t.groups){
        const items=t.projects.filter(p=>p.visible&&p.group===group.id&&L(p.title));if(!items.length)continue;
        const school=L(group.institution);if(school&&school!==lastSchool){children.append(E('li','toc-school',school));lastSchool=school;}
        for(const p of items)entry(children,'project-'+p.id,L(p.shortTitle)||L(p.title),'toc-project');
      }
      for(const p of t.projects.filter(p=>p.visible&&L(p.title)&&!t.groups.some(g=>g.id===p.group)))entry(children,'project-'+p.id,L(p.shortTitle)||L(p.title),'toc-project');
    }
    entry(list,'all-publications',lang==='zh'?'全部发表论文':'All publications');updateContents();
  }
  function updateContents(){
    if(!tocTargets.length)return;
    let current=tocTargets[0];
    for(const item of tocTargets)if(item.target.getBoundingClientRect().top<=Math.min(160,window.innerHeight*.24))current=item;
    if(window.scrollY>0&&window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)current=tocTargets[tocTargets.length-1];
    for(const item of tocTargets){if(item===current)item.link.setAttribute('aria-current','location');else item.link.removeAttribute('aria-current');}
  }
  function track() {
    const t=data.tracks[active],s=strings[lang];
    const panel=E('section','tab-panel');panel.id='panel-'+active;
    panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby','tab-'+active);panel.tabIndex=0;
    const concept=L(t.concept),statement=L(t.statement),summary=L(t.summary);
    const projects=t.projects.filter(p=>p.visible&&L(p.title));
    const groups=t.groups.filter(g=>projects.some(p=>p.group===g.id)||L(g.description));
    const structured=['research','data'].includes(active)&&!!concept;
    const intro=E('section','research-intro');
    if(structured)researchOverview(intro,t);
    else if(concept){
      intro.append(E('h2','concept-title',concept));
      if(statement)intro.append(C.paragraph(statement,'concept-statement'));
    }
    else intro.append(E('h2','track-title',L(t.title)||L(t.label)));
    if(summary&&!structured)intro.append(C.paragraph(summary,'concept-description'));
    panel.append(intro);
    const steps=t.steps[lang]||[];
    if(steps.length){const section=E('section','method');section.append(E('h3','small-title',s.steps));const ol=E('ol','steps');for(const x of steps)ol.append(E('li','',x));section.append(ol);panel.append(section);}
    const workTarget=panel;
    const used=structured?researchLines(panel,groups,projects):new Set();let lastInstitution='',institutionSection=null;
    for(const g of structured?[]:t.groups) {
      const items=projects.filter(p=>p.group===g.id);items.forEach(p=>used.add(p));
      if(!items.length && !L(g.description))continue;
      const name=L(g.institution),period=L(g.period),key=name+'|'+period;
      if(key!==lastInstitution || !institutionSection) {
        institutionSection=E('section','institution');lastInstitution=key;
        if(name||period){const head=E('div','institution-heading');head.append(E('h2','institution-title',name));if(period)head.append(E('span','institution-period',period));institutionSection.append(head);}
        panel.append(institutionSection);
      }
      const section=E('section','research-group');section.id='group-'+g.id;
      if(L(g.title))section.append(E('h3','group-title',L(g.title)));
      if(L(g.description))section.append(C.paragraph(L(g.description),'group-description'));
      for(const p of items)section.append(project(p));
      institutionSection.append(section);
    }
    const ungrouped=projects.filter(p=>!used.has(p));
    if(ungrouped.length){const section=E('section','ungrouped');if(t.groups.length)section.append(E('h3','group-title',s.other));for(const p of ungrouped)section.append(project(p));workTarget.append(section);}
    if(!projects.length&&!t.groups.some(g=>L(g.description)))panel.append(E('p','empty-state',L(t.emptyMessage)||s.empty));
    if(active==='research'||active==='data'){const list=publications();if(list)panel.append(list);}
    root.replaceChildren(panel);
    for(const id of ids.filter(x=>x!==active)){const empty=E('section');empty.id='panel-'+id;empty.hidden=true;empty.setAttribute('role','tabpanel');empty.setAttribute('aria-labelledby','tab-'+id);root.append(empty);}
  }
  function render() {
    const opened=[...root.querySelectorAll('details[open][id]')].map(d=>d.id);
    profile();
    for(const id of ids){const tab=document.getElementById('tab-'+id);tab.textContent=L(data.tracks[id].label);tab.setAttribute('aria-selected',String(id===active));tab.tabIndex=id===active?0:-1;}
    for(const b of document.querySelectorAll('[data-lang]'))b.setAttribute('aria-pressed',String(b.dataset.lang===lang));
    track();for(const id of opened){const item=document.getElementById(id);if(item)item.open=true;}contents();
  }
  function select(id,focus=false) {active=ids.includes(id)?id:'research';render();if(focus)document.getElementById('tab-'+active).focus();}
  document.getElementById('focus-tabs').addEventListener('click',e=>{
    const a=e.target.closest('[role="tab"]');if(!a)return;e.preventDefault();
    const id=a.id.slice(4);try{history.replaceState(null,'','#'+id);}catch(_){location.hash=id;}select(id);
  });
  document.getElementById('focus-tabs').addEventListener('keydown',e=>{
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;
    e.preventDefault();let index=ids.indexOf(active);
    if(e.key==='Home')index=0;else if(e.key==='End')index=2;else index=(index+(e.key==='ArrowRight'?1:-1)+3)%3;
    try{history.replaceState(null,'','#'+ids[index]);}catch(_){}select(ids[index],true);
  });
  for(const b of document.querySelectorAll('[data-lang]'))b.addEventListener('click',()=>{
    lang=b.dataset.lang;
    if(!preview)try{localStorage.setItem('llw-site-language',lang);}catch(_){}
    try{const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);}catch(_){}
    render();
  });
  function revealContent(hash){
    if(!/^(group|project|institution|publication)-/.test(hash)&&!['key-idea','research-strengths','research-projects','data-approach','data-strengths','data-projects','all-publications'].includes(hash))return;
    const target=document.getElementById(hash);if(!target)return;
    for(let parent=target.parentElement;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
    target.scrollIntoView({block:'start'});
  }
  document.getElementById('page-toc').addEventListener('click',event=>{
    const link=event.target.closest('[data-toc-target]');if(!link)return;event.preventDefault();
    const hash=link.dataset.tocTarget;try{history.pushState(null,'','#'+hash);}catch(_){}revealContent(hash);
    const heading=document.getElementById(hash)?.querySelector('h2,h3,h4,h5');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  });
  window.addEventListener('scroll',()=>{if(!tocFrame)tocFrame=requestAnimationFrame(()=>{tocFrame=0;updateContents();});},{passive:true});
  window.addEventListener('resize',updateContents);
  root.addEventListener('click',event=>{
    const model=event.target.closest('[data-model-project]');
    if(model){const item=data.tracks[active].projects.find(p=>p.id===model.dataset.modelProject);if(item)showModel(item);return;}
    const link=event.target.closest('.project-jump');if(!link)return;
    const hash=link.getAttribute('href').slice(1);event.preventDefault();
    try{history.replaceState(null,'','#'+hash);}catch(_){}revealContent(hash);
    const heading=document.getElementById(hash)?.querySelector('h4,h5');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  });
  window.addEventListener('hashchange',()=>{
    const hash=location.hash.slice(1),next=trackForHash(hash,active);
    if(next!==active||ids.includes(hash))select(next);
    revealContent(hash);
  });
  if(preview) {
    window.addEventListener('message',event=>{
      if(event.source!==window.parent || event.data?.type!=='llw-preview-content')return;
      try{data=C.normalize(event.data.content);if(ids.includes(event.data.track))active=event.data.track;if(['zh','en'].includes(event.data.lang))lang=event.data.lang;render();}catch(e){root.textContent=e.message;}
    });
    window.parent.postMessage({type:'llw-preview-ready'},'*');
  }
  render();
  revealContent(location.hash.slice(1));
})();
