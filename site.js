// Membaca content/site.json lalu menampilkan isinya. Jangan diedit; ubah isi lewat /admin.
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mark=(n,l,t)=>`<div class="section-marker"><span class="marker-num">${n}</span><div class="marker-text"><span class="marker-label">${l}</span><span class="marker-title">${t}</span></div></div>`;
const img=(s,a='',lazy=1)=>`<img src="${esc(s)}" alt="${esc(a)}"${lazy?' loading="lazy"':''}>`;
function render(d){
const h=d.hero,a=d.about,p=d.pillars,q=d.quote,g=d.program,j=d.join,c=d.contact;
const hero=`<section class="hero" id="beranda"><div class="hero-img">${img(h.image,'Hero',0)}</div><div class="hero-overlay"></div>
<div class="wrap hero-body"><div class="hero-kicker"><span class="hero-kicker-line"></span><span>${esc(h.kicker)}</span></div>
<h1>${esc(h.title_1)}<br><em>${esc(h.title_em)}</em>,<br>${esc(h.title_3)}</h1><p class="hero-sub">${esc(h.subtitle)}</p>
<div class="hero-actions"><a class="btn-primary" href="#tentang">${esc(h.btn_1)}</a><a class="btn-ghost" href="#program">${esc(h.btn_2)}</a></div></div>
<div class="wrap hero-foot"><div class="hero-stats">${(h.stats||[]).map(s=>`<div class="stat"><span class="stat-num">${esc(s.num)}</span><span class="stat-label">${esc(s.label)}</span></div>`).join('')}</div></div></section>`;
const about=`<section class="about-section" id="tentang"><div class="wrap">${mark('01','Tentang JRN','Siapa Kami')}
<div class="about-grid"><div class="about-left"><h2>${esc(a.line_1)}<br>${esc(a.line_2)}<br><em>${esc(a.line_em)}</em></h2>
${(a.paragraphs||[]).map(t=>`<p>${esc(t)}</p>`).join('')}<a class="about-cta" href="#kolaborasi">${esc(a.cta)}</a></div>
<div class="about-photo"><div class="about-photo-main">${img(a.image_main,'Tentang JRN')}</div><div class="about-photo-accent">${img(a.image_accent,'Budaya')}</div>
<div class="about-badge"><span class="about-badge-num">${esc(a.badge_num)}</span><span class="about-badge-text">${esc(a.badge_text)}</span></div></div></div></div></section>`;
const pillars=`<section class="pillars-section" id="pilar"><div class="wrap">${mark('02','Fokus Kerja','Empat Pilar Gerakan')}
<div class="pillars-intro"><p>${esc(p.intro)}</p></div><div class="pillar-list">${(p.items||[]).map((x,i)=>`<div class="pillar-item"><span class="pillar-num">/ 0${i+1}</span><div class="pillar-icon">${esc(x.icon)}</div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join('')}</div></div></section>`;
const qi=q.images||[];
const quote=`<section class="quote-band" aria-label="Kutipan"><div class="wrap"><div class="quote-inner"><blockquote>"${esc(q.text)}"<cite>${esc(q.cite)}</cite></blockquote>
<div class="quote-visual"><div class="qv-row"><div class="qv-cell">${img(qi[0],'')}</div><div class="qv-cell tall">${img(qi[1],'')}</div></div><div class="qv-row"><div class="qv-cell">${img(qi[2],'')}</div></div></div></div></div></section>`;
const program=`<section class="program-section" id="program"><div class="wrap"><div class="program-head"><div>${mark('03','Program Kami','Wujud Nyata untuk Nusantara')}<h2>${esc(g.heading)}</h2></div>
<div><p>${esc(g.text)}</p><a class="about-cta" href="#kegiatan">Lihat Semua Program</a></div></div>
<div class="program-grid">${(g.cards||[]).map(x=>`<a class="prog-card" href="#kegiatan">${img(x.image,x.title)}<div class="prog-info"><span class="prog-tag">${esc(x.tag)}</span><h3>${esc(x.title)}</h3></div></a>`).join('')}</div></div></section>`;
const news=`<section class="news-section" id="kegiatan"><div class="wrap"><div class="news-head"><h2>Kegiatan Terkini</h2><a class="see-all" href="#kolaborasi">Lihat Semua →</a></div>
<div class="news-grid">${(d.news||[]).map(x=>`<article class="news-card"><div class="news-img">${img(x.image,x.title)}</div><div class="news-body"><span class="news-tag">${esc(x.tag)}</span><span class="news-date">${esc(x.date)}</span><h3>${esc(x.title)}</h3><a class="news-read" href="#kontak">Baca selengkapnya →</a></div></article>`).join('')}</div></div></section>`;
const join=`<section class="join-section" id="kolaborasi"><div class="join-bg">${img(j.image,'')}</div><div class="wrap join-inner"><p class="join-kicker">${esc(j.kicker)}</p><h2>${esc(j.heading)}</h2><p>${esc(j.text)}</p>
<div class="join-actions"><a class="btn-primary" href="mailto:${esc(c.email)}">${esc(j.btn_1)}</a><a class="btn-ghost" href="#tentang">${esc(j.btn_2)}</a></div></div></section>`;
const footer=`<footer id="kontak"><div class="wrap"><div class="footer-top"><div class="footer-brand-block"><span class="brand-symbol">❧</span><span class="brand-name">JRN FOUNDATION</span><p>${esc(c.description)}</p></div>
<div class="footer-col"><h4>Navigasi</h4><ul><li><a href="#tentang">Tentang Kami</a></li><li><a href="#pilar">Pilar Gerakan</a></li><li><a href="#program">Program</a></li><li><a href="#kegiatan">Kegiatan</a></li></ul></div>
<div class="footer-col"><h4>Program</h4><ul>${(g.cards||[]).map(x=>`<li><a href="#program">${esc(x.title)}</a></li>`).join('')}</ul></div>
<div class="footer-col"><h4>Kontak</h4><div class="footer-contact-info"><span>${esc(c.address)}</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></div></div></div>
<div class="footer-bottom"><span class="footer-copy">${esc(c.copyright)}</span><div class="footer-socials"><a class="social-dot" href="${esc(c.instagram)}" aria-label="Instagram">◎</a><a class="social-dot" href="${esc(c.facebook)}" aria-label="Facebook">f</a><a class="social-dot" href="${esc(c.youtube)}" aria-label="YouTube">▷</a></div></div></div></footer>`;
document.getElementById('app').innerHTML=hero+'<main>'+about+pillars+quote+program+news+join+'</main>'+footer;
}
fetch('content/site.json',{cache:'no-cache'}).then(r=>r.json()).then(render).catch(e=>{document.getElementById('app').innerHTML='<p style="padding:120px 32px">Konten gagal dimuat. Buka website lewat alamat online (bukan klik dua kali file).</p>';console.error(e)});
