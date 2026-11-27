"use client";

import { useEffect, useRef, useState } from 'react';
import { catalog, ui } from '../lib/content';
import { CoffeeCatalog, ProductDialog } from './products';

export function CoffeeSite() {
  const [language, setLanguage] = useState('vi');
  const [group, setGroup] = useState('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);
  const localized = pair => pair[language === 'en' ? 1 : 0];
  const t = key => localized(ui[key]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    let preference = query.get('lang');
    if (preference === null) {
      try { preference = window.localStorage.getItem('cohai-language'); } catch {}
    }
    setLanguage(preference === 'en' ? 'en' : 'vi');
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = 'Cô Hai Phin Coffee — ' + ui.heroTitle[language === 'en' ? 1 : 0];
  }, [language]);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = document.querySelectorAll('.story-copy,.farm-photo,.story-steps,.brew-cover');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: .15 });
    for (const section of sections) {
      section.classList.add('reveal-pending');
      observer.observe(section);
    }
    return () => {
      observer.disconnect();
      for (const section of sections) section.classList.remove('reveal-pending', 'reveal-visible');
    };
  }, []);

  function changeLanguage(next) {
    setLanguage(next);
    try { window.localStorage.setItem('cohai-language', next); } catch {}
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(null, '', url);
  }

  function openProduct(product) {
    setSelected(product);
    dialogRef.current.showModal();
  }

  return (
    <>
      <a className="skip" href="#main">{t('skip')}</a>
      <header className="header">
        <div className="wrap head">
          <a href="#" aria-label="Cô Hai Phin Coffee"><img src="/assets/Logo_Do.svg" width="79" height="51" alt="Cô Hai Phin Coffee" /></a>
          <button onClick={() => setMenuOpen(!menuOpen)} id="menu" type="button" aria-expanded={menuOpen} aria-controls="nav">{t('menu')}</button>
          <nav className={menuOpen ? 'open' : undefined} id="nav" aria-label="Menu">
            <a href="#ca-phe" onClick={() => setMenuOpen(false)}>{t('coffee')}</a>
            <a href="#qua-viet" onClick={() => setMenuOpen(false)}>{t('gift')}</a>
            <a href="#cau-chuyen" onClick={() => setMenuOpen(false)}>{t('story')}</a>
            <a href="#cach-pha" onClick={() => setMenuOpen(false)}>{t('brew')}</a>
            <a href="#lien-he" onClick={() => setMenuOpen(false)}>{t('contact')}</a>
          </nav>
          <div className="languages" role="group" aria-label="Tiếng Việt / English">
            <button type="button" data-lang="vi" lang="vi" aria-label="Tiếng Việt" aria-pressed={language === 'vi'} onClick={() => changeLanguage('vi')}>VI</button>
            <button type="button" data-lang="en" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>EN</button>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-text">
              <p className="eyebrow">{t('vietnameseCoffee')}</p>
              <h1>{t('heroTitle')}</h1>
              <p>{t('heroBody')}</p>
              <a className="button" href="#ca-phe">{t('discover')}</a>
            </div>
            <figure className="hero-visual">
              <div className="pack-stage">
                <img src="/assets/hop-den-da-danang.webp" alt="" width="640" height="770" />
                <img src="/assets/hop-sua-da-3d.webp" alt="" width="640" height="770" fetchPriority="high" />
                <img src="/assets/hop-muoi-3d.webp" alt="" width="640" height="770" />
              </div>
              <figcaption>{t('heroCaption')}</figcaption>
            </figure>
          </div>
        </section>
        <section className="gifts" id="qua-viet" aria-labelledby="gift-title">
          <div className="wrap">
            <div className="gift-intro">
              <h2 id="gift-title">{t('giftTitle')}</h2>
              <p>{t('giftBody')}</p>
            </div>
            <div className="gift-cards">
              <article className="gift-card gift-saigon">
                <div className="gift-pack"><img src="/assets/hop-sua-da-3d.webp" width="640" height="770" alt="" loading="lazy" /></div>
                <div className="gift-copy">
                  <p className="eyebrow">Sài Gòn</p>
                  <h3>{t('saigonGift')}</h3>
                  <p>{t('saigonNote')}</p>
                  <button type="button" onClick={() => openProduct(catalog.instant[0])} aria-label={t('saigonDetails')}>{t('detail')}</button>
                </div>
              </article>
              <article className="gift-card gift-hue">
                <div className="gift-pack"><img src="/assets/hop-muoi-3d.webp" width="640" height="770" alt="" loading="lazy" /></div>
                <div className="gift-copy">
                  <p className="eyebrow">Huế</p>
                  <h3>{t('hueGift')}</h3>
                  <p>{t('hueNote')}</p>
                  <button type="button" onClick={() => openProduct(catalog.instant[3])} aria-label={t('hueDetails')}>{t('detail')}</button>
                </div>
              </article>
              <article className="gift-card gift-danang">
                <div className="gift-pack"><img src="/assets/hop-den-da-danang.webp" width="640" height="770" alt="" loading="lazy" /></div>
                <div className="gift-copy">
                  <p className="eyebrow">Đà Nẵng</p>
                  <h3>{t('danangGift')}</h3>
                  <p>{t('danangNote')}</p>
                  <button type="button" onClick={() => openProduct(catalog.instant[1])} aria-label={t('danangDetails')}>{t('detail')}</button>
                </div>
              </article>
            </div>
            <div className="gift-footer">
              <p>{t('giftNote')}</p>
              <div className="gift-actions">
                <a className="button" href="mailto:admin@elyscoffee.vn?subject=Co%20Hai%20Phin%20coffee%20gifts%20-%20where%20to%20buy">{t('giftBuy')}</a>
                <a className="button gift-secondary" href="#cach-pha">{t('giftBrew')}</a>
              </div>
            </div>
          </div>
        </section>
        <section className="wrap section" id="ca-phe">
          <div className="section-head">
            <div><h2>{t('catalogTitle')}</h2><p>{t('catalogBody')}</p></div>
            <div className="filters" role="group" aria-label={t('coffee')}>
              <button type="button" data-filter="all" aria-pressed={group === 'all'} onClick={() => setGroup('all')}>{t('allCoffee')}</button>
              <button type="button" data-filter="instant" aria-pressed={group === 'instant'} onClick={() => setGroup('instant')}>{t('instant')}</button>
              <button type="button" data-filter="beans" aria-pressed={group === 'beans'} onClick={() => setGroup('beans')}>{t('beans')}</button>
              <button type="button" data-filter="cans" aria-pressed={group === 'cans'} onClick={() => setGroup('cans')}>{t('cans')}</button>
            </div>
          </div>
          <p id="filter-note" role="status" className="filter-note">{group === 'all' ? '' : t(group + 'Note')}</p>
          <CoffeeCatalog key={group + language} group={group} text={t} localized={localized} onSelect={openProduct} />
          <noscript>Bật JavaScript để xem danh mục. Enable JavaScript to browse the coffees.</noscript>
        </section>
        <section className="story" id="cau-chuyen" aria-labelledby="story-title">
          <div className="wrap story-frame">
            <div className="story-grid">
              <div className="story-copy">
                <p className="eyebrow">{t('story')}</p>
                <h2 id="story-title">{t('storyTitle')}</h2>
                <p>{t('storyBody')}</p>
              </div>
              <figure className="farm-photo">
                <div className="farm-gallery">
                  <img src="/assets/hai-ca-phe-nong-trai.webp" width="1532" height="1014" alt={t('farmHarvestAlt')} loading="lazy" />
                  <img src="/assets/lua-ca-phe-nong-trai.webp" width="678" height="1018" alt={t('farmSortingAlt')} loading="lazy" />
                </div>
                <figcaption>{t('farmCaption')}</figcaption>
              </figure>
            </div>
            <ol className="story-steps">
              <li><h3>{t('farmTitle')}</h3><p>{t('farmBody')}</p></li>
              <li><h3>{t('roastTitle')}</h3><p>{t('roastBody')}</p></li>
              <li><h3>{t('finishedTitle')}</h3><p>{t('finishedBody')}</p></li>
            </ol>
            <div className="story-finish">
              <div className="finished-packs" aria-hidden="true">
                <img src="/assets/tui-arabica-cut.webp" alt="" width="640" height="770" loading="lazy" />
                <img src="/assets/hop-sua-da-3d.webp" alt="" width="640" height="770" loading="lazy" />
                <img src="/assets/hop-den-da-danang.webp" alt="" width="640" height="770" loading="lazy" />
              </div>
              <a className="button story-link" href="#ca-phe">{t('discover')}</a>
            </div>
          </div>
        </section>
        <section className="brewing" id="cach-pha" aria-labelledby="brew-heading">
          <div className="wrap">
            <div className="brew-cover">
              <div className="brew-cover-copy">
                <h2 id="brew-heading">{t('guideHeading')}</h2>
                <p>{t('guideIntro')}</p>
              </div>
              <img src="/assets/pha-phin.webp" width="1200" height="800" alt={t('brewAlt')} loading="lazy" />
            </div>
            <div className="brew-cards">
            <article className="brew-card brew-instant">
              <div className="brew-pack"><img src="/assets/hop-sua-da-3d.webp" width="640" height="770" alt="" loading="lazy" /></div>
              <div className="brew-card-copy">
                <h3>{t('instantGuideTitle')}</h3>
                <ol className="brew-instructions">
                  <li>{t('instantGuideStep1')}</li>
                  <li>{t('instantGuideStep2')}</li>
                  <li>{t('instantGuideStep3')}</li>
                </ol>
              </div>
            </article>
            <article className="brew-card brew-blend">
              <div className="brew-pack"><img src="/assets/tui-blend-cut.webp" width="640" height="770" alt="" loading="lazy" /></div>
              <div className="brew-card-copy">
                <h3>{t('blendGuideTitle')}</h3>
                <ol className="brew-instructions">
                  <li>{t('blendGuideStep1')}</li>
                  <li>{t('blendGuideStep2')}</li>
                  <li>{t('blendGuideStep3')}</li>
                </ol>
              </div>
            </article>
            <article className="brew-card brew-canned">
              <div className="brew-pack"><img src="/assets/lon-den-da-cut.webp" width="640" height="770" alt="" loading="lazy" /></div>
              <div className="brew-card-copy">
                <h3>{t('cannedGuideTitle')}</h3>
                <ol className="brew-instructions">
                  <li>{t('cannedGuideStep1')}</li>
                  <li>{t('cannedGuideStep2')}</li>
                </ol>
              </div>
            </article>
            <article className="brew-card brew-pure">
              <div className="brew-pack"><img src="/assets/tui-arabica-cut.webp" width="640" height="770" alt="" loading="lazy" /></div>
              <div className="brew-card-copy">
                <h3>{t('pureGuideTitle')}</h3>
                <ol className="brew-instructions">
                  <li>{t('pureGuideStep1')}</li>
                  <li>{t('pureGuideStep2')}</li>
                  <li>{t('pureGuideStep3')}</li>
                </ol>
              </div>
            </article>
            </div>
          </div>
        </section>
        <section className="contact" id="lien-he"><div className="wrap contact-grid">
          <div><h2>{t('contactTitle')}</h2><p>{t('contactBody')}</p></div>
          <a className="button email" href="mailto:admin@elyscoffee.vn">{t('email')}</a>
        </div></section>
      </main>
      <footer><div className="wrap footer"><img src="/assets/Logo_Kem.svg" width="82" height="53" alt="Cô Hai Phin Coffee" /><p>FNB Vietnam Service JSC</p><a href="mailto:admin@elyscoffee.vn">admin@elyscoffee.vn</a></div></footer>
      <ProductDialog dialogRef={dialogRef} product={selected} text={t} localized={localized} />
    </>
  );
}
