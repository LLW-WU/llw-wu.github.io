/* Public site renderer. All actual writing is in content.js. */
(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  const ids = ['research', 'data', 'business'];
  if (!data || !data.profile || !data.tracks) {
    document.getElementById('tab-panels').textContent = 'The content file is missing. Please check content.js.';
    return;
  }

  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };
  const externalLink = (href, label) => {
    if (typeof href !== 'string' || !/^https?:\/\//i.test(href.trim())) return null;
    const a = el('a', '', label);
    a.href = href.trim();
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    return a;
  };
  const textValue = value => typeof value === 'string' ? value.trim() : '';

  function renderProfile() {
    const p = data.profile;
    const name = textValue(p.name) || 'Personal homepage';
    document.title = name + ' | Personal Homepage';
    document.getElementById('profile-name').textContent = name;
    document.getElementById('profile-affiliation').textContent = textValue(p.affiliation);
    document.getElementById('profile-bio').textContent = textValue(p.intro);
    document.querySelector('.site-name').textContent = name;
    document.querySelector('.footer').firstElementChild.textContent = name + ' · Personal homepage';
    const links = document.getElementById('profile-links');
    const email = textValue(p.email);
    if (email) {
      const a = el('a', '', 'Email'); a.href = 'mailto:' + email;
      links.append(a);
      const contact = el('a', '', email); contact.href = 'mailto:' + email;
      document.getElementById('footer-email').append(contact);
    }
    [['Google Scholar',p.scholar], ['GitHub',p.github]].forEach(([label,url]) => {
      const link = externalLink(url, label); if (link) links.append(link);
    });
    const avatar = document.getElementById('portrait');
    const initials = (name.trim().split(/\s+/).map(w => w[0]).filter(Boolean).slice(0,2).join('') || 'LL').toUpperCase();
    avatar.querySelector('span').textContent = initials;
    if (textValue(p.photo)) {
      const image = document.createElement('img');
      image.alt = '';
      image.onload = () => { avatar.querySelector('span').hidden = true; };
      image.onerror = () => image.remove();
      image.src = p.photo;
      avatar.append(image);
    }
  }

  function projectNode(project) {
    const item = el('li', 'work-item');
    const line = el('div', 'item-title-row');
    line.append(el('h4', 'item-title', textValue(project.title)));
    if (textValue(project.year)) line.append(el('span', 'item-year', project.year));
    item.append(line);
    if (textValue(project.context)) item.append(el('p', 'item-context', project.context));
    if (textValue(project.summary)) item.append(el('p', 'item-summary', project.summary));
    const link = externalLink(project.url, textValue(project.linkText) || 'Read more ↗');
    if (link) { link.className = 'item-link'; item.append(link); }
    if (textValue(project.notes)) {
      const detail = el('details');
      detail.append(el('summary', '', 'Notes'));
      detail.append(el('div', 'notes-text', project.notes));
      item.append(detail);
    }
    return item;
  }

  function renderPublications() {
    const papers = Array.isArray(data.publications) ? data.publications.filter(p => textValue(p.title)) : [];
    if (!papers.length) return null;
    const area = el('section', 'papers');
    const block = el('details');
    block.append(el('summary', '', `Publications (${papers.length}) — show list`));
    const list = el('div', 'pub-list');
    papers.forEach(p => {
      const row = el('article', 'pub-item');
      row.append(el('h4', 'pub-title', p.title));
      const venueYear = [textValue(p.venue),textValue(p.year)].filter(Boolean).join(' · ');
      if (textValue(p.authors)) row.append(el('p', 'pub-meta', p.authors));
      if (venueYear) row.append(el('p', 'pub-meta', venueYear));
      const link = externalLink(p.url, 'Paper ↗');
      if (link) { link.className = 'pub-link'; row.append(link); }
      list.append(row);
    });
    block.append(list);
    area.append(block);
    return area;
  }

  function renderTrack(id) {
    const t = data.tracks[id] || {};
    const panel = el('section', 'tab-panel');
    panel.id = 'panel-' + id;
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + id);
    panel.tabIndex = 0;
    panel.append(el('h3', 'track-title', textValue(t.title) || id));
    if (textValue(t.summary)) panel.append(el('p','track-description',t.summary));
    if (textValue(t.concept)) {
      const c = el('p','concept');
      c.append(el('span','concept-label','Key concept'));
      c.append(el('strong','concept-value',t.concept));
      panel.append(c);
    }
    const steps = (Array.isArray(t.steps) ? t.steps : []).map(textValue).filter(Boolean);
    if (steps.length) {
      const method = el('section','method');
      method.append(el('h4','small-title','How I work'));
      const flow = el('p','method-line');
      steps.forEach((step,index) => {
        if (index) flow.append(el('span','method-arrow','→'));
        flow.append(el('span','method-step',step));
      });
      method.append(flow);
      panel.append(method);
    }
    const projects = (Array.isArray(t.projects) ? t.projects : []).filter(p => p && textValue(p.title));
    const work = el('section','work');
    work.append(el('h4','small-title',id === 'business' ? 'Learning & projects' : 'Selected work'));
    if (!projects.length) {
      work.append(el('p','empty-state','This section is being written.'));
    } else {
      const list = el('ul','item-list');
      const primary = projects.slice(0,3);
      primary.forEach(p => list.append(projectNode(p)));
      work.append(list);
      if (projects.length > 3) {
        const more = el('ul','item-list'); more.hidden = true;
        projects.slice(3).forEach(p => more.append(projectNode(p)));
        const button = el('button','more',`Show ${projects.length - 3} more projects ↓`);
        button.type = 'button'; button.setAttribute('aria-expanded','false');
        button.addEventListener('click',() => {
          const expanded = more.hidden;
          more.hidden = !expanded;
          button.setAttribute('aria-expanded',String(expanded));
          button.textContent = expanded ? 'Show fewer projects ↑' : `Show ${projects.length - 3} more projects ↓`;
        });
        work.append(more,button);
      }
    }
    panel.append(work);
    if (id === 'research') {
      const publications = renderPublications();
      if (publications) panel.append(publications);
    }
    return panel;
  }

  function selectTab(id, shouldFocus = false) {
    if (!ids.includes(id)) id = 'research';
    ids.forEach(item => {
      const active = id === item;
      const tab = document.getElementById('tab-' + item);
      const panel = document.getElementById('panel-' + item);
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex = active ? 0 : -1;
      panel.hidden = !active;
    });
    if (shouldFocus) document.getElementById('tab-' + id).focus();
  }

  function connectTabs() {
    const container = document.getElementById('tab-panels');
    container.replaceChildren();
    ids.forEach(id => container.append(renderTrack(id)));
    const applyHash = () => selectTab(window.location.hash.replace(/^#/,'').trim());
    window.addEventListener('hashchange', applyHash);
    ids.forEach((id,ix) => {
      const tab = document.getElementById('tab-' + id);
      tab.addEventListener('click',() => selectTab(id));
      tab.addEventListener('keydown',(e) => {
        const next = e.key === 'ArrowRight' ? (ix+1)%ids.length : e.key === 'ArrowLeft' ? (ix+ids.length-1)%ids.length : e.key === 'Home' ? 0 : e.key === 'End' ? ids.length-1 : -1;
        if (next < 0) return;
        e.preventDefault();
        const newId=ids[next];
        window.history.replaceState(null,'','#'+newId);
        selectTab(newId,true);
      });
    });
    applyHash();
  }

  renderProfile();
  connectTabs();
})();
