/* Bilingual writing editor. Works offline, saves local drafts, exports content.js. */
(() => {
  'use strict';
  const SOURCE = window.SITE_CONTENT;
  const form = document.getElementById('edit-form');
  const status = document.getElementById('editor-status');
  if (!SOURCE) { form.textContent = '没有找到 content.js，请把它放在 edit.html 同一目录。'; return; }
  const STORAGE_KEY = 'llw-bilingual-homepage-draft-v1';
  const clone = value => JSON.parse(JSON.stringify(value));
  const text = value => typeof value === 'string' ? value : '';
  const local = (value,lang) => typeof value==='string' ? value : (value?.[lang] ?? '');
  const tag = (tagName, cls = '', contents) => {
    const node=document.createElement(tagName);
    if(cls)node.className=cls;
    if(contents!==undefined)node.textContent=String(contents);
    return node;
  };
  let draft = clone(SOURCE);
  let active='profile';
  let lang='zh';
  try {
    const saved=localStorage.getItem(STORAGE_KEY);
    if(saved){
      const obj=JSON.parse(saved);
      if(obj.profile && obj.tracks && Array.isArray(obj.publications)) {
        draft=obj;status.textContent='已恢复这个浏览器里的未发布草稿。';
      }
    }
  } catch (_) { status.textContent='已载入内容；浏览器可能不支持草稿自动保存。'; }

  function persist(){
    try {localStorage.setItem(STORAGE_KEY,JSON.stringify(draft));}catch(_){ }
    status.textContent='草稿已修改，尚未发布。';
  }
  function assign(path,value){
    const keys=path.split('.');let ref=draft;
    for(const key of keys.slice(0,-1)) {
      if(ref == null || ref[key] === undefined) return;
      ref=ref[key];
    }
    if(ref!=null)ref[keys[keys.length-1]]=value;
  }
  function field(parent,label,path,value,opts={}){
    const row=tag('div','field');
    const id='field_'+path.replace(/[^a-z0-9]/gi,'_');
    const lab=tag('label','',label);lab.htmlFor=id;
    const input=tag(opts.multiline?'textarea':'input');
    if(!opts.multiline)input.type='text';
    input.id=id;input.value=text(value);input.dataset.path=path;
    if(opts.rows)input.rows=opts.rows;
    if(opts.placeholder)input.placeholder=opts.placeholder;
    row.append(lab,input);
    if(opts.hint)row.append(tag('p','field-hint',opts.hint));
    parent.append(row);
  }
  function section(title,description){
    form.append(tag('h2','',title));
    if(description)form.append(tag('p','form-help',description));
  }
  function languageTip(){
    const tip=tag('p','edit-language-note',lang==='zh'?'正在填写中文版内容。切换 English 可写对应英文。':'正在填写英文版内容。切换「中文」可写对应中文。');
    form.append(tip);
  }
  function renderProfile(){
    const p=draft.profile;
    section('个人简介','访客第一眼看到的姓名、学校和两三句简介。邮箱、链接和照片是中英文共用的。');
    languageTip();
    field(form,'姓名',`profile.name.${lang}`,local(p.name,lang));
    field(form,'学校 / 身份',`profile.affiliation.${lang}`,local(p.affiliation,lang));
    field(form,'简短自我介绍',`profile.intro.${lang}`,local(p.intro,lang),{multiline:true,rows:4,hint:'建议 2–3 句，不必把所有经历放在这里。'});
    form.append(tag('h3','form-subhead','中英文共用的信息'));
    field(form,'邮箱','profile.email',p.email);
    field(form,'Google Scholar 网址','profile.scholar',p.scholar);
    field(form,'GitHub 网址','profile.github',p.github);
    field(form,'照片文件名','profile.photo',p.photo,{hint:'例如 selfphoto.jpg，放在网站根目录；没有照片则显示 LL。'});
  }
  function projectEditor(key,p,index,total){
    const root=tag('details','editor-item');
    root.dataset.projectKey=key;root.dataset.projectIndex=String(index);
    const title=local(p.title,lang)||local(p.title,lang==='zh'?'en':'zh')||'未命名项目';
    const untranslated=!local(p.title,lang);
    root.append(tag('summary','editor-item-title',`${index+1}. ${title}${untranslated?'（本语言待填写）':''}`));
    const controls=tag('div','editor-item-head');controls.append(tag('span','field-hint','修改 / 调整项目顺序'));
    const buttons=tag('span');
    const command=(title,kind,disabled=false)=>{
      const b=tag('button','btn'+(kind==='delete'?' btn-delete':''),title);
      b.type='button';b.dataset.action=kind;b.dataset.key=key;b.dataset.index=String(index);b.disabled=disabled;
      buttons.append(b);
    };
    command('↑','up',index===0);command('↓','down',index===total-1);command('删除','delete');
    controls.append(buttons);root.append(controls);
    const base=`tracks.${key}.projects.${index}`;
    field(root,'项目标题',base+`.title.${lang}`,local(p.title,lang));
    field(root,'一句话说明',base+`.summary.${lang}`,local(p.summary,lang),{multiline:true,rows:2,hint:'让别人快速知道这个项目解决了什么问题。'});
    field(root,'时间',base+`.year.${lang}`,local(p.year,lang),{placeholder:'例如：2025 年至今'});
    field(root,'机构 / 项目类型',base+`.context.${lang}`,local(p.context,lang));
    field(root,'详细说明（网页里默认折叠）',base+`.notes.${lang}`,local(p.notes,lang),{multiline:true,rows:4});
    const linkArea=tag('details');linkArea.append(tag('summary','','选填：项目网址'));
    field(linkArea,'网址（中英文共用）',base+'.url',p.url,{placeholder:'https://...'});
    field(linkArea,'网页上的链接文字',base+`.linkText.${lang}`,local(p.linkText,lang));
    root.append(linkArea);
    return root;
  }
  function renderDirection(key){
    const t=draft.tracks[key];
    const sectionNames={research:'技术研究',data:'数据科学',business:'商业设计'};
    section(sectionNames[key],'保持直接：一句话说明、一个 Key Concept、4 步工作流程，以及能够证明这些方法的项目。');
    languageTip();
    field(form,'方向标签（切换栏）',`tracks.${key}.label.${lang}`,local(t.label,lang));
    field(form,'方向标题',`tracks.${key}.title.${lang}`,local(t.title,lang));
    field(form,'一句话介绍',`tracks.${key}.summary.${lang}`,local(t.summary,lang),{multiline:true,rows:2});
    field(form,'Key Concept',`tracks.${key}.concept.${lang}`,local(t.concept,lang),{hint:'建议一个简短词组。中文、英文可以自由表达，不必逐字翻译。'});
    field(form,'基本工作流程',`tracks.${key}.steps.${lang}`,(t.steps?.[lang]||[]).join('\n'),{multiline:true,rows:5,hint:'每行一个步骤，网站会自动用 → 串起来。'});
    form.append(tag('h3','form-subhead','项目 / 课程实例'));
    form.append(tag('p','form-help','对外主页只先显示前 3 条；其他项目被收起。点击下面的标题展开编辑，支持增删和上下移动。'));
    (t.projects||[]).forEach((p,i)=>form.append(projectEditor(key,p,i,t.projects.length)));
    const add=tag('button','btn','＋ 新增项目');add.type='button';add.dataset.action='add';add.dataset.key=key;
    form.append(add);
  }
  function paperEditor(p,index){
    const item=tag('details','editor-item');
    const headline=local(p.title,lang)||p.title?.en||'未命名论文';
    item.append(tag('summary','editor-item-title',`${index+1}. ${headline}`));
    const base=`publications.${index}`;
    field(item,lang==='zh'?'中文译名（正式英文标题不变）':'正式英文标题',base+`.title.${lang}`,local(p.title,lang),{hint:lang==='zh'?'建议自己确认译名准确；英文原题会在中文版的小字中保留。':'请保留论文发表时的正式英文名称。'});
    if(lang==='zh')item.append(tag('p','paper-original-hint','原文：'+text(p.title?.en)));
    field(item,'作者（共用）',base+'.authors',p.authors,{multiline:true,rows:2});
    field(item,'期刊 / 会议官方名称（共用）',base+'.venue',p.venue,{multiline:true,rows:2});
    field(item,'年份（共用）',base+'.year',p.year);
    field(item,'论文链接（共用）',base+'.url',p.url);
    const del=tag('button','btn btn-delete','删除此论文');del.type='button';del.dataset.action='remove-pub';del.dataset.index=String(index);
    item.append(del);return item;
  }
  function renderPapers(){
    section('论文列表','已导入的正式论文题名、作者、发表场所和链接会完整保留。中文版可另填译名，不替换原始英文题名。');
    languageTip();
    draft.publications.forEach((p,i)=>form.append(paperEditor(p,i)));
    const add=tag('button','btn','＋ 新增论文');add.type='button';add.dataset.action='add-pub';form.append(add);
  }
  function render(){
    form.replaceChildren();
    document.querySelectorAll('[data-edit-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.editTab===active)));
    document.querySelectorAll('[data-content-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.contentLang===lang)));
    if(active==='profile')renderProfile();else if(active==='publications')renderPapers();else renderDirection(active);
  }
  document.getElementById('editor-switcher').addEventListener('click',event=>{
    const b=event.target.closest('[data-edit-tab]');if(!b)return;
    active=b.dataset.editTab;render();
  });
  document.querySelectorAll('[data-content-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.contentLang;render();}));
  form.addEventListener('input',event=>{
    const input=event.target;if(!input?.dataset?.path)return;
    const path=input.dataset.path;
    const value=path.includes('.steps.')?input.value.split(/\r?\n/).map(x=>x.trim()).filter(Boolean):input.value;
    assign(path,value);persist();
  });
  form.addEventListener('click',event=>{
    const b=event.target.closest('button[data-action]');if(!b)return;
    const kind=b.dataset.action,index=Number(b.dataset.index),key=b.dataset.key;
    if(kind==='add')draft.tracks[key].projects.push({
      title:{zh:'',en:''},year:{zh:'',en:''},context:{zh:'',en:''},summary:{zh:'',en:''},
      notes:{zh:'',en:''},url:'',linkText:{zh:'',en:''}
    });
    if(kind==='delete'){
      if(!confirm('确定删除整个项目吗？中文与英文内容都会一起删除。'))return;
      draft.tracks[key].projects.splice(index,1);
    }
    if(kind==='up' && index>0){
      const list=draft.tracks[key].projects;[list[index-1],list[index]]=[list[index],list[index-1]];
    }
    if(kind==='down'){
      const list=draft.tracks[key].projects;if(index<list.length-1)[list[index],list[index+1]]=[list[index+1],list[index]];
    }
    if(kind==='add-pub')draft.publications.push({title:{zh:'',en:''},authors:'',venue:'',year:'',url:''});
    if(kind==='remove-pub'){
      if(!confirm('确定删除这篇论文的中英文内容吗？'))return;
      draft.publications.splice(index,1);
    }
    persist();render();
    if(kind==='add'){
      const idx=draft.tracks[key].projects.length-1;
      const details=form.querySelector(`details[data-project-key="${key}"][data-project-index="${idx}"]`);
      if(details){details.open=true;details.querySelector('input')?.focus();}
    }
  });

  // Import new bilingual content.js or an earlier English-only content.js. Never execute uploaded JavaScript.
  function localizedField(value,template){
    if(value && typeof value==='object' && !Array.isArray(value)) return {zh:text(value.zh),en:text(value.en)};
    const english=text(value);
    return {zh:english===text(template?.en)?text(template?.zh):'',en:english};
  }
  function importedContent(raw){
    if(!raw || typeof raw !== 'object' || !raw.profile || !raw.tracks || !Array.isArray(raw.publications))throw new Error('内容结构不正确。');
    const migrated=clone(SOURCE);
    for(const name of ['name','affiliation','intro']){
      migrated.profile[name]=localizedField(raw.profile[name],SOURCE.profile[name]);
    }
    for(const name of ['photo','email','scholar','github'])migrated.profile[name]=text(raw.profile[name]);
    for(const trackId of ['research','data','business']){
      const orig=raw.tracks[trackId];if(!orig)continue;
      const base=SOURCE.tracks[trackId],t=migrated.tracks[trackId];
      for(const key of ['label','title','concept','summary'])t[key]=localizedField(orig[key],base[key]);
      if(Array.isArray(orig.steps)){
        const defaultEN=JSON.stringify(base.steps.en);
        t.steps={zh:JSON.stringify(orig.steps)===defaultEN?clone(base.steps.zh):[],en:orig.steps.map(text)};
      }else if(orig.steps && typeof orig.steps==='object'){
        t.steps={zh:Array.isArray(orig.steps.zh)?orig.steps.zh.map(text):[],en:Array.isArray(orig.steps.en)?orig.steps.en.map(text):[]};
      }
      t.projects=Array.isArray(orig.projects)?orig.projects.map((p,i)=>{
        const baseProject=base.projects.find(x=>local(x.title,'en')===local(p.title,'en')) || base.projects[i] || {};
        const project={};
        for(const field of ['title','year','context','summary','notes','linkText']){
          const template = baseProject[field]||{zh:'',en:''};
          project[field]=localizedField(p[field],template);
        }
        project.url=text(p.url);return project;
      }):[];
    }
    migrated.publications=raw.publications.map((p,i)=>{
      const base=SOURCE.publications.find(x=>x.url && x.url===p.url)||SOURCE.publications[i]||{};
      return {title:localizedField(p.title,base.title||{zh:'',en:''}),
        authors:text(p.authors),venue:text(p.venue),year:text(p.year),url:text(p.url)};
    });
    return migrated;
  }
  function parseFile(contents){
    const anchor='window.SITE_CONTENT';const pos=contents.indexOf(anchor);
    const source=pos>=0?contents.slice(pos+anchor.length):contents;
    const start=source.indexOf('{');const end=source.lastIndexOf('}');
    if(start<0 || end<start)throw new Error('没有找到 JSON 格式的 SITE_CONTENT。');
    return JSON.parse(source.slice(start,end+1));
  }
  document.getElementById('import-button').addEventListener('click',()=>document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change',async event=>{
    const file=event.target.files?.[0];if(!file)return;
    try{
      const imported=importedContent(parseFile(await file.text()));
      if(!confirm('用导入文件替换当前编辑草稿？请先下载现有草稿以免丢失。'))return;
      draft=imported;persist();status.textContent='导入成功。请检查中英文栏目的文字，然后下载 content.js。';render();
    }catch(error){status.textContent='导入失败：'+error.message;}
    finally{event.target.value='';}
  });
  document.getElementById('download-button').addEventListener('click',()=>{
    const source='/* Bilingual site content: edit using edit.html */\nwindow.SITE_CONTENT = '+JSON.stringify(draft,null,2)+';\n';
    const blob=new Blob([source],{type:'text/javascript;charset=utf-8'});
    const url=URL.createObjectURL(blob);const a=tag('a');a.href=url;a.download='content.js';document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    status.textContent='已下载 content.js。替换仓库同名文件并提交，网站才会更新。';
  });
  document.getElementById('reset-button').addEventListener('click',()=>{
    if(!confirm('确定放弃当前草稿，恢复当前目录里的 content.js 吗？'))return;
    draft=clone(SOURCE);try{localStorage.removeItem(STORAGE_KEY);}catch(_){ }
    status.textContent='已恢复文件内容。';render();
  });
  render();
})();
