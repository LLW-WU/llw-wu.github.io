/* Text editor for content.js. No server and no GitHub access. */
(() => {
  'use strict';
  const SOURCE = window.SITE_CONTENT;
  if (!SOURCE) {
    document.getElementById('edit-form').textContent = '找不到 content.js，请确认文件和 edit.html 放在同一文件夹。';
    return;
  }
  const KEY = 'llw-personal-homepage-content-draft-v1';
  const clone = input => JSON.parse(JSON.stringify(input));
  let draft = clone(SOURCE);
  let active = 'profile';
  const form = document.getElementById('edit-form');
  const status = document.getElementById('editor-status');
  const safeText = input => typeof input === 'string' ? input : '';

  try {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      const savedObj = JSON.parse(saved);
      if (savedObj && savedObj.profile && savedObj.tracks && Array.isArray(savedObj.publications)) {
        draft = savedObj;
        status.textContent = '已载入本机草稿（尚未发布）。';
      }
    }
  } catch (_) { status.textContent = '已载入网站文字。浏览器可能不支持本地草稿保存。'; }

  const tag = (type, className, text) => {
    const e = document.createElement(type);
    if (className) e.className = className;
    if (text !== undefined) e.textContent = String(text);
    return e;
  };
  function persist() {
    try { localStorage.setItem(KEY,JSON.stringify(draft)); } catch (_) { /* exporting still works */ }
    status.textContent = '草稿有修改 · 尚未发布到网站';
  }
  function assignValue(path,value) {
    const parts = path.split('.');
    let target = draft;
    for (const key of parts.slice(0,-1)) {
      if (target == null || !(key in target)) return;
      target = target[key];
    }
    if (target != null) target[parts.at(-1)] = value;
  }

  function field(parent,label,path,value,options={}) {
    const wrap = tag('div','field');
    const unique = 'fld_' + path.replace(/[^a-zA-Z0-9]+/g,'_');
    const lab = tag('label','',label); lab.htmlFor = unique;
    const input = tag(options.multiline ? 'textarea' : 'input');
    input.id = unique;
    input.dataset.path = path;
    input.value = safeText(value);
    if (!options.multiline) input.type = 'text';
    if (options.rows) input.rows = options.rows;
    if (options.placeholder) input.placeholder = options.placeholder;
    wrap.append(lab,input);
    if (options.hint) wrap.append(tag('div','field-hint',options.hint));
    parent.append(wrap);
  }

  function heading(title,description) {
    form.append(tag('h2','',title));
    if (description) form.append(tag('p','form-help',description));
  }

  function projectEditor(key,project,index,total) {
    const root = tag('details','editor-item');
    root.dataset.projectKey = key;
    root.dataset.projectIndex = String(index);
    root.append(tag('summary','editor-item-title',`${index+1}. ${project.title || '未命名项目'} · ${project.year || '未填时间'}`));
    const line = tag('div','editor-item-head');
    line.append(tag('span','field-hint','排序 / 管理当前项目'));
    const actionBox = tag('span');
    const action = (label,kind,disabled=false) => {
      const b = tag('button','btn',label);
      b.type = 'button'; b.dataset.action = kind; b.dataset.key = key; b.dataset.index = String(index);
      b.disabled = disabled;
      if (kind === 'delete') b.classList.add('btn-delete');
      actionBox.append(b);
      return b;
    };
    action('↑','up',index===0); action('↓','down',index===total-1); action('删除','delete');
    line.append(actionBox);
    root.append(line);
    const path = `tracks.${key}.projects.${index}`;
    field(root,'项目名称',path+'.title',project.title,{placeholder:'例如：MPI Vessel Reconstruction'});
    field(root,'一句话说明：这个项目做了什么？',path+'.summary',project.summary,{multiline:true,rows:2,placeholder:'把问题与所做的事情说清楚，不必写得像论文摘要'});
    field(root,'时间',path+'.year',project.year,{placeholder:'例如：2025–present'});
    field(root,'机构或项目类型',path+'.context',project.context,{placeholder:'例如：Waseda University · Research in progress'});
    field(root,'详细笔记（首页默认折叠）',path+'.notes',project.notes,{multiline:true,rows:3,placeholder:'以后可以慢慢写背景、方法、模型、结果等'});
    const optional = tag('details');
    optional.append(tag('summary','','选填：项目链接'));
    field(optional,'网页链接',path+'.url',project.url,{placeholder:'https://...'});
    field(optional,'链接显示的文字',path+'.linkText',project.linkText,{placeholder:'Paper / Code / Project page'});
    root.append(optional);
    return root;
  }

  function renderProfile() {
    const p = draft.profile;
    heading('个人简介','只写别人进入你主页时最需要知道的内容。建议简介控制在 2–3 句。');
    field(form,'姓名','profile.name',p.name);
    field(form,'学校 / 身份','profile.affiliation',p.affiliation);
    field(form,'简短自我介绍','profile.intro',p.intro,{multiline:true,rows:4,hint:'不要堆经历；具体经历放在三个方向里。'});
    form.append(tag('h3','form-subhead','联系与照片'));
    field(form,'Email','profile.email',p.email);
    field(form,'Google Scholar 网址','profile.scholar',p.scholar);
    field(form,'GitHub 网址','profile.github',p.github);
    field(form,'照片文件名','profile.photo',p.photo,{hint:'例如 selfphoto.jpg。把照片放到网页相同文件夹；如果没有，会显示姓名首字母。'});
  }

  function renderDirection(key) {
    const t = draft.tracks[key];
    const titles = {research:'技术研究',data:'数据科学',business:'商业设计'};
    heading(titles[key]+'栏目','先改一句话定位、核心概念和流程；接着把你做过的项目写成一句话。详细过程想写时再展开笔记。');
    field(form,'页面标题',`tracks.${key}.title`,t.title);
    field(form,'这个方向的一句话介绍',`tracks.${key}.summary`,t.summary,{multiline:true,rows:3});
    field(form,'Key Concept（一个短词组）',`tracks.${key}.concept`,t.concept);
    field(form,'你的做事流程',`tracks.${key}.steps`,(t.steps||[]).join('\n'),{multiline:true,rows:5,hint:'每行一步，网页自动用 → 连接。不要写冗长的解释。'});
    form.append(tag('h3','form-subhead','项目 / 课程实例'));
    form.append(tag('p','form-help','网页先显示前 3 个条目，其余折叠；用 ↑↓ 调整优先级。项目标题为空时不会出现在网页上。'));
    (t.projects || []).forEach((p,i) => form.append(projectEditor(key,p,i,t.projects.length)));
    const add = tag('button','btn','＋ 新增一条项目/课程');
    add.type = 'button'; add.dataset.action = 'add'; add.dataset.key = key;
    form.append(add);
  }

  function publicationEditor(p,index) {
    const item = tag('details','editor-item');
    const sum = tag('summary','',`${index+1}. ${p.title || '未命名论文'}`);
    item.append(sum);
    const prefix = `publications.${index}`;
    field(item,'论文标题',prefix+'.title',p.title);
    field(item,'作者',prefix+'.authors',p.authors,{multiline:true,rows:2});
    field(item,'期刊 / 会议',prefix+'.venue',p.venue,{multiline:true,rows:2});
    field(item,'年份',prefix+'.year',p.year);
    field(item,'论文链接',prefix+'.url',p.url);
    const del = tag('button','btn btn-delete','删除此论文'); del.type = 'button';
    del.dataset.action = 'remove-pub'; del.dataset.index = String(index);
    item.append(del);
    return item;
  }
  function renderPublications() {
    heading('论文列表',`已从原 V2 HTML 导入 ${draft.publications.length} 篇论文。平时不会展开显示；访客只有主动点击“Publications”才看到。`);
    draft.publications.forEach((p,i) => form.append(publicationEditor(p,i)));
    const add = tag('button','btn','＋ 新增论文'); add.type = 'button'; add.dataset.action='add-pub';
    form.append(add);
  }

  function render() {
    form.replaceChildren();
    [...document.querySelectorAll('[data-edit-tab]')].forEach(b => b.setAttribute('aria-pressed',String(b.dataset.editTab===active)));
    if (active==='profile') renderProfile();
    else if (active==='publications') renderPublications();
    else renderDirection(active);
  }

  document.getElementById('editor-switcher').addEventListener('click',event => {
    const button = event.target.closest('[data-edit-tab]');
    if (!button) return;
    active=button.dataset.editTab;
    render();
  });

  form.addEventListener('input',event => {
    const target = event.target;
    if (!target || !target.dataset || !target.dataset.path) return;
    const path = target.dataset.path;
    const val = path.endsWith('.steps') ? target.value.split(/\r?\n/).map(v => v.trim()).filter(Boolean) : target.value;
    assignValue(path,val);
    persist();
  });

  form.addEventListener('click',event => {
    const btn = event.target.closest('button[data-action]');
    if (!btn) return;
    const kind = btn.dataset.action;
    const idx = Number(btn.dataset.index);
    const key = btn.dataset.key;
    if (kind==='add') draft.tracks[key].projects.push({title:'',year:'',context:'',summary:'',notes:'',url:'',linkText:''});
    if (kind==='delete') {
      if (!confirm('确定删除这条项目吗？')) return;
      draft.tracks[key].projects.splice(idx,1);
    }
    if (kind==='up' && idx > 0) {
      const a=draft.tracks[key].projects; [a[idx-1],a[idx]]=[a[idx],a[idx-1]];
    }
    if (kind==='down') {
      const a=draft.tracks[key].projects;
      if (idx < a.length-1) [a[idx+1],a[idx]]=[a[idx],a[idx+1]];
    }
    if (kind==='add-pub') draft.publications.push({title:'',authors:'',venue:'',year:'',url:''});
    if (kind==='remove-pub') {
      if (!confirm('确定删除这篇论文吗？')) return;
      draft.publications.splice(idx,1);
    }
    persist(); render();
    if (kind === 'add') {
      const item = form.querySelector(`details[data-project-key="${key}"][data-project-index="${draft.tracks[key].projects.length-1}"]`);
      if (item) { item.open=true; item.querySelector('input')?.focus(); }
    }
  });

  document.getElementById('download-button').addEventListener('click',() => {
    const source = '/* LIU Lingwen homepage — edit again in edit.html */\nwindow.SITE_CONTENT = ' + JSON.stringify(draft,null,2) + ';\n';
    const blob = new Blob([source],{type:'text/javascript;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const a = tag('a'); a.href=url; a.download='content.js';
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
    status.textContent = '已生成 content.js：请用它替换仓库中的同名文件，再提交 GitHub。';
  });

  document.getElementById('reset-button').addEventListener('click',() => {
    if (!confirm('这会放弃当前浏览器草稿，并重新载入目录中的 content.js。确定吗？')) return;
    draft=clone(SOURCE);
    try { localStorage.removeItem(KEY); } catch (_) {}
    status.textContent='已恢复网站文件中的内容。';
    render();
  });
  render();
})();
