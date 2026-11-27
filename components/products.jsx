import { catalog } from '../lib/content';

const categories = ['instant', 'beans', 'cans'];

export function CoffeeCatalog({ group, text, localized, onSelect }) {
  const visible = group === 'all' ? categories : [group];
  return (
    <div id="products" className="catalog-groups">
      {visible.map(category => (
        <section className="catalog-group" key={category}>
          {group === 'all' && <h3>{text(category)}</h3>}
          <div className={category === 'instant' ? 'cards' : 'cards wide'}>
            {catalog[category].map((product, index) => {
              const name = localized(product.name);
              return (
                <article className="card" key={product.asset} style={{ '--product-color': product.color, '--enter-delay': index * 65 + 'ms' }}>
                  <div className="card-photo">
                    <img src={'/assets/' + product.asset} width="640" height="770" loading="lazy" alt={text('pack') + ': ' + name} />
                  </div>
                  <div className="card-copy">
                    <p className="place">{product.place}</p>
                    <h3>{name}</h3>
                    <p className="card-story">{localized(product.story)}</p>
                    <button type="button" aria-label={text('detail') + ': ' + name} onClick={() => onSelect(product)}>
                      {text('detail')}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

export function ProductDialog({ dialogRef, product, text, localized }) {
  const name = product ? localized(product.name) : '';
  return (
    <dialog id="details" ref={dialogRef} aria-labelledby="detail-title">
      <div className="dialog-inner">
        <form method="dialog"><button className="close" aria-label={text('close')}>×</button></form>
        <div className="dialog-photo" style={{ '--product-color': product?.color }}>
          <img id="detail-image" src={product ? '/assets/' + product.asset : undefined} alt={product ? text('pack') + ': ' + name : ''} />
        </div>
        <div className="dialog-copy">
          <p id="detail-label" className="eyebrow">{product?.place}</p>
          <h2 id="detail-title">{name}</h2>
          <p id="detail-story">{product && localized(product.story)}</p>
          <p id="detail-desc">{product && text(product.note)}</p>
          <a id="detail-contact" className="button" href="#lien-he" onClick={() => dialogRef.current.close()}>{text('ask')}</a>
        </div>
      </div>
    </dialog>
  );
}
