/* Lightweight, bilingual personal homepage. All editable writing lives in content.js. */
(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  const ids = ['research', 'data', 'business'];
  const strings = {
    zh: {
      site: '个人主页', skip: '跳转到正文', about: '关于我', work: '我的方向',
      choose: '选择专业方向', core: '核心概念', method: '我的工作流程',
      projects: '主要项目', courses: '课程与项目', notes: '展开说明',
      papers: n => `发表论文（${n}）· 点击查看`, paper: '论文链接 ↗',
      more: n => `展开其余 ${n} 个项目 ↓`, less: '收起其他项目 ↑',
      empty: '这里留待补充。', read: '相关链接 ↗', email: '邮箱',
      missing: '未找到内容文件，请检查 content.js。',
      description: 'LIU Lingwen 的个人主页：技术研究、数据科学和商业设计。'
    },
    en: {
      site: 'Personal Homepage', skip: 'Skip to content', about: 'About me', work: 'My work',
      choose: 'Choose a focus area', core: 'Key concept', method: 'How I work',
      projects: 'Selected work', courses: 'Learning & projects', notes: 'Notes',
      papers: n => `Publications (${n}) — show list`, paper: 'Paper ↗',
      more: n => `Show ${n} more projects ↓`, less: 'Show fewer projects ↑',
      empty: 'This section is being written.', read: 'Read more ↗', email: 'Email',
      missing: 'The content file is missing. Please check content.js.',
      description: 'LIU Lingwen — research, data science and business design.'
    }
  };
  if (!data || !data.profile || !data.tracks) {
    document.getElementById('tab-panels').textContent = strings.zh.missing;
    return;
  }
  const el = (tag, cls = '', value) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (value !== undefined && value !== null) node.textContent = String(value);
    return node;
  };
  const clean = value => typeof value === 'string' ? value.trim() : '';
  const localized = (value, lang) => {
    if (typeof value === 'string') return clean(value); // Compatible with older content.js fields.
    if (!value || typeof value !== 'object') return '';
    return clean(value[lang]) || clean(value.en) || clean(value.zh);
  };
  const externalLink = (href, label) => {
    if (!/^https?:\/\//i.test(clean(href))) return null;
    const link = el('a', '', label);
    link.href = clean(href); link.target = '_blank'; link.rel = 'noopener noreferrer';
    return link;
  };
  let lang = 'zh';
  const queryLanguage = new URLSearchParams(window.location.search).get('lang');
  if (['zh', 'en'].includes(queryLanguage)) lang = queryLanguage;
  else {
    try { if (localStorage.getItem('llw-site-language') === 'en') lang = 'en'; } catch (_) {}
  }

  function renderProfile() {
    const p = data.profile;
    const name = localized(p.name,lang) || 'LIU Lingwen';
    document.title = name + ' | ' + strings[lang].site;
    document.querySelector('meta[name="description"]').content = strings[lang].description;
    document.querySelector('.site-name').textContent = name;
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-affiliation').textContent = localized(p.affiliation,lang);
    document.getElementById('profile-bio').textContent = localized(p.intro,lang);
    document.getElementById('footer-text').textContent = name + ' · ' + strings[lang].site;
    const contacts = document.getElementById('profile-links'); contacts.replaceChildren();
    const footerEmail = document.getElementById('footer-email'); footerEmail.replaceChildren();
    const email = clean(p.email);
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const link = el('a','',strings[lang].email); link.href='mailto:'+email; contacts.append(link);
      const footerLink = el('a','',email); footerLink.href='mailto:'+email; footerEmail.append(footerLink);
    }
    [['Google Scholar',p.scholar],['GitHub',p.github]].forEach(([title,url]) => {
      const a=externalLink(url,title); if (a) contacts.append(a);
    });
    const avatar=document.getElementById('portrait');
    const initial = el('span','',name.split(/\s+/).map(x=>x[0]).filter(Boolean).slice(0,2).join('').toUpperCase()||'LL');
    avatar.replaceChildren(initial);
    if (clean(p.photo)) {
      const image=el('img'); image.alt='';
      image.onload=()=>{initial.hidden=true;}; image.onerror=()=>image.remove();
      image.src=p.photo; avatar.append(image);
    }
  }

  function projectNode(p) {
    const item=el('li','work-item');
    const heading=el('div','item-title-row');
    heading.append(el('h4','item-title',localized(p.title,lang)));
    const year=localized(p.year,lang); if (year) heading.append(el('span','item-year',year));
    item.append(heading);
    const context=localized(p.context,lang); if (context) item.append(el('p','item-context',context));
    const summary=localized(p.summary,lang); if (summary) item.append(el('p','item-summary',summary));
    const link=externalLink(p.url,localized(p.linkText,lang)||strings[lang].read);
    if (link) {link.className='item-link';item.append(link);}
    const notes=localized(p.notes,lang);
    if (notes) {
      const d=el('details'); d.append(el('summary','',strings[lang].notes));
      d.append(el('div','notes-text',notes)); item.append(d);
    }
    return item;
  }

  function publicationNode(p) {
    const item=el('article','pub-item');
    const title=localized(p.title,lang);
    item.append(el('h4','pub-title',title));
    const original = localized(p.title,'en');
    if (lang === 'zh' && original && title !== original) item.append(el('p','pub-original',original));
    if (clean(p.authors)) item.append(el('p','pub-meta',p.authors));
    const venue=[clean(p.venue),clean(p.year)].filter(Boolean).join(' · ');
    if (venue) item.append(el('p','pub-meta',venue));
    const paper=externalLink(p.url,strings[lang].paper);
    if (paper) {paper.className='pub-link';item.append(paper);}
    return item;
  }

  function renderPublications() {
    const pubs=Array.isArray(data.publications) ? data.publications.filter(p=>localized(p.title,lang)) : [];
    if (!pubs.length) return null;
    const section=el('section','papers');
    const details=el('details');
    details.append(el('summary','',strings[lang].papers(pubs.length)));
    const list=el('div','pub-list');
    pubs.forEach(p=>list.append(publicationNode(p)));
    details.append(list);section.append(details);return section;
  }

  function renderTrack(id) {
    const t=data.tracks[id]||{};
    const panel=el('section','tab-panel'); panel.id='panel-'+id;
    panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby','tab-'+id);panel.tabIndex=0;
    panel.append(el('h3','track-title',localized(t.title,lang)||id));
    const summary=localized(t.summary,lang);if(summary)panel.append(el('p','track-description',summary));
    const concept=localized(t.concept,lang);
    if (concept) {
      const line=el('p','concept');
      line.append(el('span','concept-label',strings[lang].core));
      line.append(el('strong','concept-value',concept));panel.append(line);
    }
    const steps=Array.isArray(t.steps) ? t.steps.map(step=>localized(step,lang)) :
      (Array.isArray(t.steps?.[lang]) ? t.steps[lang] : t.steps?.en || []);
    const cleanSteps=steps.map(clean).filter(Boolean);
    if(cleanSteps.length) {
      const method=el('section','method');method.append(el('h4','small-title',strings[lang].method));
      const flow=el('p','method-line');
      cleanSteps.forEach((step,i)=>{if(i)flow.append(el('span','method-arrow','→'));flow.append(el('span','method-step',step));});
      method.append(flow);panel.append(method);
    }
    const projects=Array.isArray(t.projects) ? t.projects.filter(p=>p && localized(p.title,lang)) : [];
    const work=el('section','work');work.append(el('h4','small-title',id==='business'?strings[lang].courses:strings[lang].projects));
    if (!projects.length) work.append(el('p','empty-state',strings[lang].empty));
    else {
      const list=el('ul','item-list');projects.slice(0,3).forEach(p=>list.append(projectNode(p)));work.append(list);
      if(projects.length>3){
        const rest=el('ul','item-list');rest.hidden=true;projects.slice(3).forEach(p=>rest.append(projectNode(p)));
        const button=el('button','more',strings[lang].more(projects.length-3));button.type='button';
        button.setAttribute('aria-expanded','false');
        button.addEventListener('click',()=>{
          const expand=rest.hidden;rest.hidden=!expand;
          button.setAttribute('aria-expanded',String(expand));
          button.textContent=expand?strings[lang].less:strings[lang].more(projects.length-3);
        });
        work.append(rest,button);
      }
    }
    panel.append(work);
    if(id==='research'){
      const papers=renderPublications();if(papers)panel.append(papers);
    }
    return panel;
  }

  function selectTab(id,focus=false){
    if(!ids.includes(id))id='research';
    ids.forEach(key=>{
      const selected=key===id;
      const tab=document.getElementById('tab-'+key);
      const panel=document.getElementById('panel-'+key);
      tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;
      panel.hidden=!selected;
    });
    if(focus)document.getElementById('tab-'+id).focus();
  }

  function render(){
    const s=strings[lang];
    document.documentElement.lang=lang==='zh'?'zh-CN':'en';
    document.getElementById('skip-link').textContent=s.skip;
    document.querySelector('.intro').setAttribute('aria-label',s.about);
    document.getElementById('focus-heading').textContent=s.work;
    document.getElementById('focus-tabs').setAttribute('aria-label',s.choose);
    document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===lang)));
    ids.forEach(id=>document.getElementById('tab-'+id).textContent=localized(data.tracks[id]?.label,lang));
    renderProfile();
    const container=document.getElementById('tab-panels');container.replaceChildren();
    ids.forEach(id=>container.append(renderTrack(id)));
    selectTab(window.location.hash.slice(1));
  }

  ids.forEach((id,idx)=>{
    const tab=document.getElementById('tab-'+id);
    tab.addEventListener('click',()=>selectTab(id));
    tab.addEventListener('keydown',e=>{
      const next=e.key==='ArrowRight'?(idx+1)%3:e.key==='ArrowLeft'?(idx+2)%3:
        e.key==='Home'?0:e.key==='End'?2:-1;
      if(next<0)return;
      e.preventDefault();const id=ids[next];
      const url=new URL(window.location.href);url.hash=id;
      try { window.history.replaceState(null,'',url.toString()); } catch (_) { /* Local file previews may restrict history URLs. */ }
      selectTab(id,true);
    });
  });
  window.addEventListener('hashchange',()=>selectTab(window.location.hash.slice(1)));
  document.querySelectorAll('[data-lang]').forEach(button=>{
    button.addEventListener('click',()=>{
      if(button.dataset.lang===lang)return;
      lang=button.dataset.lang;
      try{localStorage.setItem('llw-site-language',lang);}catch(_){ }
      const url=new URL(window.location.href);url.searchParams.set('lang',lang);
      try { window.history.replaceState(null,'',url.toString()); } catch (_) { /* Local file previews may restrict history URLs. */ }
      render();
    });
  });
  render();
})();
