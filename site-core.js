/* Shared helpers: plain-text rendering, safe imports, and compatibility with earlier content.js files. */
(() => {
  'use strict';
  const text = value => typeof value === 'string' ? value : '';
  const bi = value => typeof value === 'string' ? {zh:'',en:value} : {zh:text(value?.zh),en:text(value?.en)};
  const local = (value,lang,fallback=true) => {
    if(typeof value === 'string') return value;
    return text(value?.[lang]) || (fallback ? text(value?.[lang==='zh'?'en':'zh']) : '');
  };
  const node = (name,cls='',value) => {
    const n=document.createElement(name); if(cls)n.className=cls;
    if(value!==undefined)n.textContent=String(value); return n;
  };
  // Only **bold** is supported. No HTML is interpreted, including imported user text.
  function inline(parent,value) {
    const parts=text(value).split(/(\*\*[^*]+\*\*)/g);
    for(const part of parts) {
      if(part.startsWith('**') && part.endsWith('**')) parent.append(node('strong','',part.slice(2,-2)));
      else parent.append(document.createTextNode(part));
    }
    return parent;
  }
  function paragraph(value,cls='') {return inline(node('p',cls),value);}
  function link(url,label,cls='') {
    if(!/^https?:\/\//i.test(text(url).trim()))return null;
    const a=node('a',cls,label);a.href=url.trim();a.target='_blank';a.rel='noopener noreferrer';return a;
  }
  function safeImage(value) {
    const s=text(value).trim();
    if(/^(javascript|vbscript|file):/i.test(s))return '';
    if(/^data:/i.test(s)&&!/^data:image\/(png|jpeg|jpg|gif|webp);base64,/i.test(s))return '';
    return s;
  }
  function normalize(raw) {
    if(!raw || typeof raw!=='object' || !raw.profile || !raw.tracks)throw new Error('文件中需要有 profile 和 tracks。');
    const data={schemaVersion:3,revision:text(raw.revision)||'imported',profile:{},tracks:{},publications:[]};
    for(const k of ['name','affiliation','intro'])data.profile[k]=bi(raw.profile[k]);
    for(const k of ['photo','email','scholar','github'])data.profile[k]=text(raw.profile[k]);
    for(const id of ['research','data','business']) {
      const t=raw.tracks[id]||{}, out={};
      for(const k of ['label','title','concept','statement','summary','emptyMessage'])out[k]=bi(t[k]);
      out.sourceBlocks=(Array.isArray(t.sourceBlocks)?t.sourceBlocks:[]).map((block,i)=>({
        id:/^[a-z0-9_-]+$/i.test(text(block.id))?block.id:'ds-source-'+i,
        text:text(block.text),style:text(block.style),
        runs:(Array.isArray(block.runs)?block.runs:[]).map(run=>({text:text(run.text),bold:run.bold===true,italic:run.italic===true,underline:run.underline===true}))
      }));
      if(!out.label.zh&&!out.label.en)out.label={zh:{research:'学术科研',data:'数据分析',business:'商业设计'}[id],en:{research:'AI Research',data:'Data Science',business:'Business Design'}[id]};
      for(const field of ['steps','strengths']) {
        out[field]={zh:[],en:[]};
        for(const lang of ['zh','en']) {
          const values=Array.isArray(t[field])?t[field].map(x=>local(x,lang)):t[field]?.[lang];
          out[field][lang]=(Array.isArray(values)?values:[]).map(text).filter(Boolean);
        }
      }
      out.groups=(Array.isArray(t.groups)?t.groups:[]).map((g,i)=>({
        id:text(g.id)||'group-'+i,institution:bi(g.institution),period:bi(g.period),title:bi(g.title),description:bi(g.description),focus:bi(g.focus),connection:bi(g.connection)
      }));
      // IDs are internal references. Ensure unique, stable values without executing content.
      const gids=new Set();
      for(const [i,g] of out.groups.entries()) {
        if(gids.has(g.id))g.id+='-'+i;gids.add(g.id);
      }
      out.projects=(Array.isArray(t.projects)?t.projects:[]).map((p,i)=> {
        const item={id:text(p.id)||id+'-project-'+i,visible:p.visible!==false,featured:p.featured===true,group:text(p.group),url:text(p.url),publicationId:text(p.publicationId),modelImage:text(p.modelImage),modelSource:text(p.modelSource)};
        for(const k of ['title','shortTitle','modelName','brief','result','role','contribution','takeaway','year','context','summary','notes','linkText','paperTitle','modelCaption'])item[k]=bi(p[k]);
        return item;
      });
      data.tracks[id]=out;
    }
    data.publications=(Array.isArray(raw.publications)?raw.publications:[]).map((p,i)=>({
      id:text(p.id)||'pub-'+i,visible:p.visible!==false,title:bi(p.title),authors:text(p.authors),venue:text(p.venue),year:text(p.year),url:text(p.url)
    }));
    return data;
  }
  function parse(contents) {
    if(typeof contents!=='string')throw new Error('文件格式不正确。');
    const trimmed=contents.replace(/^\uFEFF/,'').trim();
    if(trimmed.startsWith('{'))return normalize(JSON.parse(trimmed));
    const marker='window.SITE_CONTENT',pos=trimmed.indexOf(marker);
    if(pos<0)throw new Error('请导入 content.js 或 JSON 数据，不支持其他脚本。');
    const chunk=trimmed.slice(pos+marker.length),start=chunk.indexOf('{'),end=chunk.lastIndexOf('}');
    if(start<0||end<start)throw new Error('未找到 JSON 内容。');
    return normalize(JSON.parse(chunk.slice(start,end+1)));
  }
  const serialize = data => '/* Public website content. Use edit.html to edit. */\nwindow.SITE_CONTENT = '+JSON.stringify(data,null,2).replace(/</g,'\\u003c')+';\n';
  window.SiteCore=Object.freeze({text,bi,local,node,inline,paragraph,link,safeImage,normalize,parse,serialize});
})();
