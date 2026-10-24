/* Local writing workspace. No credentials, publishing APIs, or remote saves. */
(() => {
  'use strict';
  const C=window.SiteCore,form=document.getElementById('edit-form'),status=document.getElementById('editor-status');
  if(!C||!window.SITE_CONTENT){form.textContent='请把 content.js、site-core.js、editor.js 与 edit.html 放在同一文件夹。';return;}
  let SOURCE;
  try{SOURCE=C.normalize(window.SITE_CONTENT);}catch(e){form.textContent=e.message;return;}
  const clone=x=>JSON.parse(JSON.stringify(x)), E=C.node, T=C.text;
  const KEY='llw-homepage-draft-doc-v3',stamp=SOURCE.revision;
  const guides={
    research:['科研中文正文按最新提供的 AR 文案更新；英文为对应译文，没有补写新的研究结论。','项目先展示模型图、简述和主要结果；原核心观点与正文保留在各自的完整介绍中。','校对提醒（正文仍按提供文案保留）：文案使用 SBDL，前面提供的对应论文使用 SDBD。','校对提醒（正文仍按提供文案保留）：BrainTGL 文案中的 67.8%、73.2%、72.0%，前面讨论中对应的是集成版本 BrainTGL-en。','旧版完整论文表与链接保留；本次没有重新核对所有书目信息。'],
    data:['第一步把BCGX的流程写下来','第二步撰写下来你在每一步进行的判断过程','第三步，尝试把BCGX的模拟题当成案例写在下方的案例表里，重点写判断过程（主要体现你在DS过程中的conceptual key word理念）','Conceptual key word：'],
    business:['第一步把早稻田大学讲的课里涉及到的分析流程写下来，一天一个','第二步把AOCR和东京制造业大会的演讲内容，进行what-who-how-value分析，按照分析把它们写在案例中（主要体现对分析流程的理解和广度）']
  };
  const initialSection=new URLSearchParams(location.search).get('section');
  let draft=clone(SOURCE),notes={research:'',data:'',business:''},active=['research','data','business','publications'].includes(initialSection)?initialSection:'profile',lang='zh';
  try {
    const saved=JSON.parse(localStorage.getItem(KEY)||'null');
    if(saved?.base===stamp&&saved?.content){draft=C.normalize(saved.content);notes={...notes,...saved.notes};status.textContent='已恢复这个浏览器中的未发布草稿。';}
  }catch(_){status.textContent='已读取文件；草稿保存不可用时，请及时下载备份。';}
  function persist() {
    try{localStorage.setItem(KEY,JSON.stringify({base:stamp,content:draft,notes}));status.textContent='已保存到当前浏览器 · 尚未发布';}
    catch(_){status.textContent='草稿仅保留在当前页面；请下载文件，避免丢失。';}
  }
  function put(path,value) {
    const keys=path.split('.');let target=draft;
    for(const key of keys.slice(0,-1)) {
      if(['__proto__','prototype','constructor'].includes(key)||!target||typeof target!=='object')return;
      target=target[key];
    }
    const last=keys.at(-1);if(target && !['__proto__','prototype','constructor'].includes(last))target[last]=value;
  }
  function field(parent,label,path,value,opts={}) {
    const row=E('div','field'),id='f-'+path.replace(/[^a-z0-9_-]/gi,'_'),lab=E('label','',label);
    lab.htmlFor=id;row.append(lab);let input;
    if(opts.select){input=E('select');for(const [v,label] of opts.select){const option=E('option','',label);option.value=v;input.append(option);}}
    else {input=E(opts.multiline?'textarea':'input');if(!opts.multiline)input.type='text';if(opts.rows)input.rows=opts.rows;}
    input.id=id;input.dataset.path=path;input.value=typeof value==='string'?value:'';
    if(opts.placeholder)input.placeholder=opts.placeholder;
    row.append(input);if(opts.hint)row.append(E('p','field-hint',opts.hint));parent.append(row);return input;
  }
  function lf(parent,label,path,value,opts={}){return field(parent,label,path+'.'+lang,C.local(value,lang,false),opts);}
  function checkbox(parent,label,path,value){const row=E('label','check-field'),input=E('input');input.type='checkbox';input.dataset.path=path;input.checked=value!==false;row.append(input,E('span','',label));parent.append(row);}
  function command(parent,label,action,extra={},disabled=false) {
    const b=E('button','btn'+(action.includes('delete')?' btn-delete':''),label);b.type='button';b.dataset.action=action;
    Object.assign(b.dataset,extra);b.disabled=disabled;parent.append(b);return b;
  }
  function heading(title,help){form.append(E('h2','',title));if(help)form.append(E('p','form-help',help));}
  function writingGuide(key) {
    const d=E('details','writing-guide');d.append(E('summary','','写作提示与笔记 · 不显示在主页'));
    const list=E('ol');for(const item of guides[key])list.append(E('li','',item));d.append(list);
    const textarea=field(d,'我的草稿笔记','_notes.'+key,T(notes[key]),{multiline:true,rows:4,hint:'只保存在当前浏览器；“下载写作笔记”可单独备份。不会导出到 content.js。'});
    textarea.dataset.noteKey=key;delete textarea.dataset.path;form.append(d);
  }
  function renderProfile() {
    heading('个人信息','姓名、身份、简介和联系方式。照片继续使用原来的 selfphoto.jpg。');
    const p=draft.profile;
    lf(form,'姓名','profile.name',p.name);lf(form,'学校 / 身份','profile.affiliation',p.affiliation);
    lf(form,'简介','profile.intro',p.intro,{multiline:true,rows:3});
    const details=E('details','form-details');details.append(E('summary','','联系方式与照片（中英文共用）'));
    for(const [label,key] of [['邮箱','email'],['Google Scholar','scholar'],['GitHub','github'],['照片文件名或网址','photo']])field(details,label,'profile.'+key,p[key]);
    form.append(details);
  }
  function groupLabel(g){return [C.local(g.institution,lang),C.local(g.title,lang)].filter(Boolean).join(' / ')||'未命名分组';}
  function groupEditor(g,index,key) {
    const item=E('details','editor-item');item.dataset.editorId='group-'+g.id;
    item.append(E('summary','editor-item-title',groupLabel(g)));
    const path='tracks.'+key+'.groups.'+index;
    lf(item,'学校 / 机构',path+'.institution',g.institution);
    lf(item,'时间范围',path+'.period',g.period);
    lf(item,'简短标题（选填）',path+'.focus',g.focus,{hint:'未填写研究方向标题时，使用这个标题。'});
    lf(item,'研究方向标题（选填）',path+'.title',g.title);
    lf(item,'方向介绍（选填）',path+'.description',g.description,{multiline:true,rows:4});
    const bar=E('div','item-tools');
    command(bar,'上移分组','group-up',{key,index:String(index)},index===0);
    command(bar,'下移分组','group-down',{key,index:String(index)},index===draft.tracks[key].groups.length-1);
    command(bar,'删除分组','group-delete',{key,index:String(index)});item.append(bar);return item;
  }
  function projectEditor(p,index,key) {
    const item=E('details','editor-item');item.dataset.editorId=p.id;
    const title=C.local(p.shortTitle,lang)||C.local(p.title,lang)||'未命名项目';
    item.append(E('summary','editor-item-title',title+(p.visible?'':'（未公开）')));
    const path='tracks.'+key+'.projects.'+index;
    checkbox(item,'在主页显示这个项目',path+'.visible',p.visible);
    if(key==='research'){
      const display=E('details','form-details');display.append(E('summary','','项目展示与模型图'));
      lf(display,'主页项目名称',path+'.shortTitle',p.shortTitle,{hint:'用于项目标题和左侧目录。'});
      lf(display,'模型名称（选填）',path+'.modelName',p.modelName);
      lf(display,'项目简述',path+'.brief',p.brief,{multiline:true,rows:2});
      lf(display,'主要结果（有依据时填写）',path+'.result',p.result,{multiline:true,rows:2});
      field(display,'模型图文件路径或网址',path+'.modelImage',p.modelImage);
      lf(display,'模型图说明',path+'.modelCaption',p.modelCaption);
      field(display,'图片来源（论文、图号和页码）',path+'.modelSource',p.modelSource);item.append(display);
      const personal=E('section','personal-fields');personal.append(E('h3','form-subhead','我的角色与工作'));
      lf(personal,'我的角色',path+'.role',p.role,{placeholder:'待你填写'});
      lf(personal,'我的具体工作',path+'.contribution',p.contribution,{multiline:true,rows:4,placeholder:'待你填写',hint:'留空时，主页保留待填写区域；可分别填写中文和英文。'});
      field(personal,'关联发表论文',path+'.publicationId',p.publicationId,{select:[['','按论文网址自动匹配'],...draft.publications.map(paper=>[paper.id,C.local(paper.title,lang)||paper.id])]});item.append(personal);
    }
    lf(item,'核心观点（正文为空时展示）',path+'.takeaway',p.takeaway,{multiline:true,rows:3});
    lf(item,'原始项目名称',path+'.title',p.title);
    const groups=draft.tracks[key].groups;
    if(groups.length)field(item,'所属学校 / 研究方向',path+'.group',p.group,{select:[['','不分组'],...groups.map(g=>[g.id,groupLabel(g)])]});
    lf(item,'正文',path+'.summary',p.summary,{multiline:true,rows:9,hint:'用 **这段文字** 加粗，空一行可分段。完整正文保存在每个项目的“完整介绍”中。',placeholder:'写清楚：问题是什么、做了什么、最后发现了什么。'});
    const meta=E('details','form-details');meta.append(E('summary','','时间、出处与链接'));
    lf(meta,'时间',path+'.year',p.year);lf(meta,'期刊 / 会议 / 项目背景',path+'.context',p.context);
    field(meta,'论文 / 项目链接（中英文共用）',path+'.url',p.url,{placeholder:'https://...'});
    lf(meta,'链接文字',path+'.linkText',p.linkText);
    lf(meta,'完整论文题名（选填，资料留存）',path+'.paperTitle',p.paperTitle,{multiline:true,rows:2,hint:'正式引用在“论文列表”中编辑，主页通过论文编号跳转查看。'});
    lf(meta,'补充说明（主页折叠显示）',path+'.notes',p.notes,{multiline:true,rows:3});item.append(meta);
    const siblings=draft.tracks[key].projects.map((x,i)=>({x,i})).filter(o=>o.x.group===p.group),pos=siblings.findIndex(o=>o.i===index);
    const bar=E('div','item-tools');command(bar,'上移','project-up',{key,index:String(index)},pos===0);command(bar,'下移','project-down',{key,index:String(index)},pos===siblings.length-1);command(bar,'删除项目','project-delete',{key,index:String(index)});item.append(bar);
    return item;
  }
  function renderTrack(key) {
    const t=draft.tracks[key],names={research:'学术科研',data:'数据科学',business:'商业设计'};
    heading(names[key],lang==='zh'?'正在编辑中文正文。切换 English 可单独修改英文译文。':'正在编辑英文正文。修改后不会自动改写中文。');
    writingGuide(key);
    lf(form,key==='research'?'研究宗旨 / Research focus':'Key idea / Conceptual key word','tracks.'+key+'.concept',t.concept,{placeholder:key==='research'?'':'留空，待你自己确定'});
    lf(form,'一句话说明','tracks.'+key+'.statement',t.statement,{multiline:true,rows:2});
    lf(form,'方向介绍','tracks.'+key+'.summary',t.summary,{multiline:true,rows:3});
    if(key==='research')field(form,'研究能力（每行一项）','tracks.'+key+'.strengths.'+lang,(t.strengths[lang]||[]).join('\n'),{multiline:true,rows:4,hint:'在首页显示，可用 **文字** 突出能力名称。'});
    if(key!=='research')field(form,'工作流程（每行一步）','tracks.'+key+'.steps.'+lang,(t.steps[lang]||[]).join('\n'),{multiline:true,rows:5,hint:'按实际课程或练习填写；目前没有代填 BCGX 或商业课程流程。'});
    const settings=E('details','form-details');settings.append(E('summary','','栏目名称与分组设置'));
    lf(settings,'导航栏名称','tracks.'+key+'.label',t.label);lf(settings,'栏目标题','tracks.'+key+'.title',t.title);
    lf(settings,'还没有公开项目时显示的文字','tracks.'+key+'.emptyMessage',t.emptyMessage);
    settings.append(E('p','field-hint','相邻分组的学校与时间完全相同时，会合并显示一个学校标题。'));
    t.groups.forEach((g,i)=>settings.append(groupEditor(g,i,key)));command(settings,'＋ 新增学校 / 方向','group-add',{key});form.append(settings);
    form.append(E('h3','form-subhead',key==='research'?'项目正文':'案例'));
    if(!t.projects.length)form.append(E('p','form-help','还没有案例。点击下方按钮新增，不会自动填入任何成果。'));
    t.projects.forEach((p,i)=>form.append(projectEditor(p,i,key)));
    command(form,key==='research'?'＋ 新增项目':'＋ 新增案例','project-add',{key});
  }
  function renderPapers() {
    heading('论文列表','完整论文表在科研页底部直接按引用格式展示：作者、原文题名、期刊或会议、年份。题名链接到论文页面。');
    draft.publications.forEach((p,i)=>{
      const item=E('details','editor-item');item.dataset.editorId=p.id;
      item.append(E('summary','editor-item-title',C.local(p.title,lang)||'未命名论文'));
      const path='publications.'+i;
      checkbox(item,'在主页显示',path+'.visible',p.visible);
      lf(item,lang==='zh'?'中文题名':'英文题名',path+'.title',p.title,{multiline:true,rows:2});
      field(item,'作者',path+'.authors',p.authors,{multiline:true,rows:2});field(item,'期刊 / 会议',path+'.venue',p.venue);
      field(item,'年份',path+'.year',p.year);field(item,'论文链接',path+'.url',p.url);
      command(item,'删除论文','paper-delete',{index:String(i)});form.append(item);
    });command(form,'＋ 新增论文','paper-add');
  }
  function render(openId='') {
    form.replaceChildren();
    for(const b of document.querySelectorAll('[data-edit-tab]'))b.setAttribute('aria-pressed',String(b.dataset.editTab===active));
    for(const b of document.querySelectorAll('[data-content-lang]'))b.setAttribute('aria-pressed',String(b.dataset.contentLang===lang));
    if(active==='profile')renderProfile();else if(active==='publications')renderPapers();else renderTrack(active);
    if(openId){for(const item of form.querySelectorAll('[data-editor-id]'))if(item.dataset.editorId===openId){item.open=true;const parent=item.parentElement.closest('details');if(parent)parent.open=true;item.querySelector('input[type=text],textarea')?.focus();}}
  }
  document.getElementById('editor-switcher').addEventListener('click',e=>{const b=e.target.closest('[data-edit-tab]');if(!b)return;active=b.dataset.editTab;render();});
  for(const b of document.querySelectorAll('[data-content-lang]'))b.addEventListener('click',()=>{
    const open=[...form.querySelectorAll('.editor-item[open][data-editor-id]')].map(x=>x.dataset.editorId);lang=b.dataset.contentLang;render();
    for(const item of form.querySelectorAll('[data-editor-id]'))if(open.includes(item.dataset.editorId))item.open=true;
  });
  function inputHandler(event) {
    const input=event.target;if(input.dataset.noteKey){notes[input.dataset.noteKey]=input.value;persist();return;}
    const path=input.dataset.path;if(!path)return;
    let value=input.type==='checkbox'?input.checked:input.value;
    if(path.includes('.steps.')||path.includes('.strengths.'))value=input.value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    put(path,value);persist();
    if(path.includes('.title.')) {
      const details=input.closest('.editor-item');if(details){const title=value||'未命名';details.querySelector(':scope > summary').textContent=title;}
    }
  }
  form.addEventListener('input',inputHandler);form.addEventListener('change',e=>{if(e.target.tagName==='SELECT')inputHandler(e);});
  const uid=prefix=>prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,6);
  const blank=()=>({zh:'',en:''});
  form.addEventListener('click',event=>{
    const b=event.target.closest('button[data-action]');if(!b)return;
    const {action,key}=b.dataset,index=Number(b.dataset.index);let open='';
    if(action==='project-add') {
      const id=uid('project');draft.tracks[key].projects.push({id,visible:false,featured:false,group:draft.tracks[key].groups[0]?.id||'',title:blank(),shortTitle:blank(),brief:blank(),result:blank(),takeaway:blank(),summary:blank(),context:blank(),year:blank(),notes:blank(),linkText:{zh:'相关链接 ↗',en:'Read more ↗'},paperTitle:blank(),modelImage:'',modelSource:'',modelCaption:blank(),url:''});open=id;
    } else if(action==='project-delete') {
      if(!confirm('删除这个项目及其中英文内容？'))return;draft.tracks[key].projects.splice(index,1);
    } else if(action==='project-up'||action==='project-down') {
      const list=draft.tracks[key].projects,siblings=list.map((p,i)=>i).filter(i=>list[i].group===list[index].group);
      const next=siblings[siblings.indexOf(index)+(action==='project-up'?-1:1)];if(next===undefined)return;
      open=list[index].id;[list[index],list[next]]=[list[next],list[index]];
    } else if(action==='group-add') {
      const id=uid('group');draft.tracks[key].groups.push({id,institution:blank(),period:blank(),title:blank(),description:blank(),focus:blank(),connection:blank()});open='group-'+id;
    } else if(action==='group-delete') {
      const groups=draft.tracks[key].groups,id=groups[index].id;
      if(!confirm('删除这个分组？其中的项目会保留，移到“其他项目”。'))return;
      for(const p of draft.tracks[key].projects)if(p.group===id)p.group='';groups.splice(index,1);
    } else if(action==='group-up'||action==='group-down') {
      const groups=draft.tracks[key].groups,j=index+(action==='group-up'?-1:1);if(j<0||j>=groups.length)return;open='group-'+groups[index].id;[groups[index],groups[j]]=[groups[j],groups[index]];
    } else if(action==='paper-add') {
      const id=uid('pub');draft.publications.push({id,visible:false,title:blank(),authors:'',venue:'',year:'',url:''});open=id;
    } else if(action==='paper-delete') {
      if(!confirm('删除这篇论文及其中英文内容？'))return;draft.publications.splice(index,1);
    }
    persist();render(open);
  });
  function download(filename,value,type) {
    const url=URL.createObjectURL(new Blob([value],{type})),a=E('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  document.getElementById('download-button').addEventListener('click',()=>{
    download('content.js',C.serialize(draft),'text/javascript;charset=utf-8');status.textContent='已下载 content.js；替换网站同名文件并提交后才会发布。';
  });
  document.getElementById('import-button').addEventListener('click',()=>document.getElementById('import-file').click());
  document.getElementById('import-file').addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    try {
      if(file.size>10*1024*1024)throw new Error('文件超过 10 MB，请确认这是文字内容文件。');
      const incoming=C.parse(await file.text());
      if(!confirm('导入会替换当前全部正文（含中英文）。请先下载现有草稿备份。继续吗？'))return;
      draft=incoming;persist();render();status.textContent='导入成功；请核对分组和两种语言，再下载发布。';
    }catch(err){status.textContent='未导入：'+err.message;}finally{e.target.value='';}
  });
  document.getElementById('reset-button').addEventListener('click',()=>{
    if(!confirm('放弃当前公开内容草稿，重新读取目录里的 content.js？写作笔记会保留。'))return;
    draft=clone(SOURCE);persist();render();status.textContent='已恢复目录里的 content.js；写作笔记仍保留。';
  });
  document.getElementById('notes-button').addEventListener('click',()=>{
    const names={research:'AI Research',data:'Data Scientist',business:'Business Design'};
    let out='# 主页写作笔记\n\n这不是网站公开内容文件。\n';
    for(const key of Object.keys(names))out+='\n## '+names[key]+'\n\n'+guides[key].map(x=>'- '+x).join('\n')+'\n\n'+T(notes[key])+'\n';
    download('writing-notes.md',out,'text/markdown;charset=utf-8');
  });
  const dialog=document.getElementById('preview-dialog'),frame=document.getElementById('preview-frame');
  function sendPreview(){frame.contentWindow?.postMessage({type:'llw-preview-content',content:draft,lang,track:['research','data','business'].includes(active)?active:'research'},'*');}
  document.getElementById('preview-button').addEventListener('click',()=>{
    dialog.showModal();
    if(!window.LLW_PREVIEW_TEMPLATE){status.textContent='缺少 preview-template.js，请把它放到同一目录。';dialog.close();return;}
    frame.srcdoc=window.LLW_PREVIEW_TEMPLATE.replace('/*LLW-DATA*/','window.EDITOR_PREVIEW=true;window.PREVIEW_LANG='+JSON.stringify(lang)+';\n'+C.serialize(draft));
  });
  document.getElementById('close-preview').addEventListener('click',()=>dialog.close());
  frame.addEventListener('load',sendPreview);
  window.addEventListener('message',e=>{if(e.source===frame.contentWindow&&e.data?.type==='llw-preview-ready')sendPreview();});
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  render();
})();
