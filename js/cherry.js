// ===================== 基础类定义 =====================
class PrecisionTracker {
  constructor() {
    this.visualViewport = window.visualViewport;
    this.scrollX = window.scrollX || window.pageXOffset;
    this.scrollY = window.scrollY || window.pageYOffset;
    
    // 双精度坐标更新
    this.updateViewport = () => {
      this.viewportWidth = document.documentElement.clientWidth;
      this.viewportHeight = document.documentElement.clientHeight;
      this.scrollX = window.scrollX || window.pageXOffset;
      this.scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('scroll', this.updateViewport, { passive: true });
    window.addEventListener('resize', this.updateViewport, { passive: true });
    this.updateViewport();
  }

  getTruePosition(clientX, clientY) {
    // 补偿滚动和视口偏移
    return {
      x: clientX + this.scrollX - (this.visualViewport?.offsetLeft || 0),
      y: clientY + this.scrollY - (this.visualViewport?.offsetTop || 0)
    };
  }
}

class CherryParticle {
  constructor(x, y, color) {
    this.element = document.createElement('div');
    this.element.className = 'bf-cursor-particle';
    this.element.innerHTML = '🌸';
    
    // 初始化定位修正
    const baseX = x - 15; // 补偿花瓣尺寸
    const baseY = y - 15;
    
    this.element.style.cssText = `
      color: ${color};
      left: ${baseX}px;
      top: ${baseY}px;
      opacity: 0.9;
      position: fixed;
      pointer-events: none;
      z-index: 2147483647;
      font-size: 24px;
      will-change: transform, opacity;
      transition: opacity 0.3s;
      user-select: none;
      transform-origin: center;
    `;
    document.body.appendChild(this.element);

    // 物理参数
    this.x = baseX;
    this.y = baseY;
    this.life = 100;
    this.velocity = {
      x: (Math.random() - 0.5) * 3,
      y: -Math.random() * 4 - 2
    };
    this.isAlive = true;
  }

  update() {
    this.life -= 1.5;
    this.velocity.y += 0.15;
    
    // 更新实际位置
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.element.style.transform = `
      translate(${this.x}px, ${this.y}px)
      scale(${this.life/100})
      rotate(${this.life*3}deg)
    `;
    this.element.style.opacity = this.life/100 * 0.8;

    if(this.life <= 0) this.destroy();
  }

  destroy() {
    this.element.style.opacity = 0;
    setTimeout(() => this.element.remove(), 300);
    this.isAlive = false;
  }
}

// ===================== 主系统 =====================
class CherryEffectSystem {
  constructor() {
    this.tracker = new PrecisionTracker();
    this.particles = [];
    this.colors = ["#ff9a9e", "#fad0c4", "#a1c4fd"];
    this.init();
  }
    

  init() {
    this.bindEvents();
    this.startRAF();
    this.injectCriticalCSS();
  }

  bindEvents() {
    const handler = e => {
      const pos = this.tracker.getTruePosition(e.clientX, e.clientY);
      this.spawnParticles(pos.x, pos.y);
    };
    
    // 绑定到文档主体
    document.addEventListener('mousemove', handler);
    document.addEventListener('touchmove', e => {
      e.preventDefault();
      Array.from(e.touches).forEach(t => handler(t));
    }, { passive: false });
  }

  spawnParticles(x, y) {
    for(let i=0; i<3; i++) {
      const particle = new CherryParticle(
        x + Math.random()*20 -10,
        y + Math.random()*20 -10,
        this.colors[Math.random()*this.colors.length|0]
      );
      this.particles.push(particle);
      if(this.particles.length > 100) this.particles.shift().destroy();
    }
  }

  startRAF() {
    const animate = () => {
      this.particles = this.particles.filter(p => {
        p.update();
        return p.isAlive;
      });
      requestAnimationFrame(animate);
    };
    animate();
  }

  injectCriticalCSS() {
    const style = document.createElement('style');
    style.textContent = `
      /* 强制覆盖可能影响定位的样式 */
      body {
        cursor: none !important;
        overflow-x: hidden !important;
      }
      .bf-cursor-particle {
        transform: translateZ(0) !important;
        backface-visibility: hidden !important;
      }
      /* 修复移动端偏移 */
      @media (hover: none) {
        .bf-cursor-particle {
          font-size: 32px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===================== 初始化逻辑 =====================
let cherryEffectInstance = null;
const size = Math.random();
function initCherryEffect() {
  try {
    if (!cherryEffectInstance) {
      cherryEffectInstance = new CherryEffectSystem();
    }
  } catch (err) {
    console.error('[Cherry Effect] 初始化失败:', err);
  }
}

function destroyCherryEffect() {
  if (cherryEffectInstance) {
    cherryEffectInstance.particles.forEach(p => p.destroy());
    cherryEffectInstance = null;
  }
}

// 标准初始化
document.addEventListener('DOMContentLoaded', initCherryEffect);

// PJAX 兼容
document.addEventListener('pjax:send', destroyCherryEffect);
document.addEventListener('pjax:complete', initCherryEffect);

// 容错初始化
if (document.readyState === 'complete') {
  initCherryEffect();
}