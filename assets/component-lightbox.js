// components/component-lightbox.js
class Lightbox extends HTMLElement {
  constructor() {
    super();
    this.images = [];
    this.currentIndex = 0;
    
    this.innerHTML = `
      <div class="lightbox">
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-content"></div>
        <div class="lightbox-nav">
          <button class="lightbox-prev" aria-label="Previous image">‹</button>
          <button class="lightbox-next" aria-label="Next image">›</button>
        </div>
      </div>
    `;
    
    this.lightbox = this.querySelector('.lightbox');
    this.content = this.querySelector('.lightbox-content');
    this.closeBtn = this.querySelector('.lightbox-close');
    this.prevBtn = this.querySelector('.lightbox-prev');
    this.nextBtn = this.querySelector('.lightbox-next');
  }

  connectedCallback() {
    this.images = Array.from(document.querySelectorAll('.lightbox-trigger'));
    
    this.images.forEach((trigger, index) => {
      trigger.addEventListener('click', () => this.openLightbox(index));
    });
    
    this.closeBtn.addEventListener('click', () => this.closeLightbox());
    this.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.nextBtn.addEventListener('click', () => this.navigate(1));
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  openLightbox(index) {
    this.currentIndex = index;
    this.updateContent();
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  navigate(direction) {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    this.updateContent();
  }

  updateContent() {
    const imgSrc = this.images[this.currentIndex].querySelector('img').src;
    this.content.innerHTML = `<img src="${imgSrc}" loading="eager">`;
  }

  handleKeyDown(e) {
    if (!this.lightbox.classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.navigate(-1);
        break;
      case 'ArrowRight':
        this.navigate(1);
        break;
    }
  }
}

customElements.define('lightbox-component', Lightbox);