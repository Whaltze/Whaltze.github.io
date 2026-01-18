/* Hexo Butterfly 门禁系统 - Cyber Sentry Edition
 * 特性：赛博科技角点 | 表单修复 | 声纳雷达 | 紧凑布局 | 移动端交互完美修复
 */

(function() {
    // ============================================================
    // 1. 核心配置 (Config)
    // ============================================================
    const config = {
        password: "/", 
        password: "123456", 
        contact: [
            { src: "/img/WeChat.jpg", label: "WeChat" },
            { src: "/img/GZH.jpg", label: "公众号" },
            { src: "/img/AliPay.jpg", label: "Alipay" }
        ],
        tips: [
            "正在潜入深海数据层...", "欢迎来到 Whaltze 的数字海域",
            "欢迎来到 Whaltze 的小屋","很高兴在茫茫人海遇到你！",
            "声纳系统已上线", "403 Forbidden? Try the magic word."
        ],
        libs: {
            jquery: "https://lib.baomitu.com/jquery/3.6.4/jquery.min.js",
            ripples: "https://lib.baomitu.com/jquery.ripples/0.5.3/jquery.ripples.min.js"
        }
    };

    if (sessionStorage.getItem('access_granted') === 'true') return;

    // 标记当前为锁定状态
    document.body.classList.add('portal-locked'); 

    // ============================================================
    // 2. 样式定义 (CSS)
    // ============================================================
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Quicksand:wght@500;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `

        /* --- 1. 底层容器 (静止背景 + HUD锚点) --- */
        #atlantis-lock {
            --at-cyan: #00f2ea;
            --at-blue: #0077be;
            --at-red: #ff4757;
            --at-bg: rgba(5, 12, 20, 0.65);
            
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 20000000;
            background-color: var(--at-bg);
            backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);

            /* 禁止底层滚动，确保锚点稳住 */
            overflow: hidden;

            font-family: 'Quicksand', sans-serif;
            opacity: 1; transition: opacity 1.5s ease-out;
        }

        #atlantis-lock canvas {
            position: absolute; top: 0; left: 0; z-index: -1;
            opacity: 0.4 !important; pointer-events: none;
        }

        /* --- 2. 滚动视图层 (专门负责包裹卡片和滚动) --- */
        #at-scroll-view {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            
            /* 开启滚动 */
            overflow-y: auto; 
            overflow-x: hidden;
            
            /* [移动端关键] 开启原生惯性滚动 */
            -webkit-overflow-scrolling: touch; 
            touch-action: pan-y;
            
            perspective: 1200px; 
            
            display: flex; justify-content: center; align-items: flex-start;
            padding-top: 5vh; padding-bottom: 5vh;
            
            z-index: 15;
            pointer-events: auto; /* 确保内容可点击 */
            
            scrollbar-width: none; 
        }
        #at-scroll-view::-webkit-scrollbar { width: 0; background: transparent; } 


        /* ==========================================================================
           [锚点] 界面四角 - 赛博哨兵风格
           ========================================================================== */
        #atlantis-lock .screen-anchor {
            position: absolute; 
            width: 100px; height: 100px;
            pointer-events: none; z-index: 999;
            transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        #atlantis-lock .screen-anchor::before {
            content: ''; position: absolute;
            width: 30px; height: 30px;
            border: 3px solid var(--at-cyan); opacity: 0.8;
            box-shadow: 0 0 10px rgba(0, 242, 234, 0.3);
        }
        #atlantis-lock .screen-anchor::after {
            content: ''; position: absolute; width: 100%; height: 100%;
            border: 0 solid rgba(0, 242, 234, 0.3); opacity: 0.5;
        }
        #atlantis-lock .sa-dot {
            position: absolute; width: 6px; height: 6px;
            background: var(--at-cyan); box-shadow: 0 0 8px var(--at-cyan);
            animation: dotBlink 2s infinite ease-in-out;
        }

        #atlantis-lock .sa-tl { top: 0; left: 0; padding: 30px; }
        #atlantis-lock .sa-tl::before { top: 30px; left: 30px; border-right: none; border-bottom: none; }
        #atlantis-lock .sa-tl::after { top: 30px; left: 40px; width: 60px; height: 1px; border-top: 1px solid var(--at-cyan); }
        #atlantis-lock .sa-dot.tl { top: 30px; left: 30px; transform: translate(-50%, -50%); }

        #atlantis-lock .sa-tr { top: 0; right: 0; padding: 30px; }
        #atlantis-lock .sa-tr::before { top: 30px; right: 30px; border-left: none; border-bottom: none; }
        #atlantis-lock .sa-tr::after { top: 40px; right: 30px; width: 1px; height: 60px; border-right: 1px solid var(--at-cyan); }
        #atlantis-lock .sa-dot.tr { top: 30px; right: 30px; transform: translate(50%, -50%); }

        #atlantis-lock .sa-bl { bottom: 0; left: 0; padding: 30px; }
        #atlantis-lock .sa-bl::before { bottom: 30px; left: 30px; border-right: none; border-top: none; }
        #atlantis-lock .sa-bl::after { bottom: 40px; left: 30px; width: 1px; height: 60px; border-left: 1px solid var(--at-cyan); }
        #atlantis-lock .sa-dot.bl { bottom: 30px; left: 30px; transform: translate(-50%, 50%); }

        #atlantis-lock .sa-br { bottom: 0; right: 0; padding: 30px; }
        #atlantis-lock .sa-br::before { bottom: 30px; right: 30px; border-left: none; border-top: none; }
        #atlantis-lock .sa-br::after { bottom: 30px; right: 40px; width: 60px; height: 1px; border-bottom: 1px solid var(--at-cyan); }
        #atlantis-lock .sa-dot.br { bottom: 30px; right: 30px; transform: translate(50%, 50%); }

        @keyframes dotBlink { 0%,100%{opacity:1; transform:scale(1);} 50%{opacity:0.3; transform:scale(0.8);} }

        /* --- 卡片容器 --- */
        #atlantis-lock .at-card-container {
            position: relative; width: 90%; max-width: 460px;
            transform-style: preserve-3d; z-index: 20;
            transition: transform 0.1s linear;
            margin-top: auto; margin-bottom: auto;
            display: flex; flex-direction: column;
        }

        /* --- 卡片呼吸角点 --- */
        #atlantis-lock .card-bracket {
            position: absolute; width: 14px; height: 14px;
            border: 0 solid var(--at-cyan); 
            opacity: 0.7; pointer-events: none; z-index: 30;
            transition: all 0.5s ease;
            transform: translateZ(20px);
            filter: drop-shadow(0 0 2px var(--at-cyan));
            animation: cardBracketBreathe 3s infinite ease-in-out;
        }
        @keyframes cardBracketBreathe { 0%,100%{opacity:0.6} 50%{opacity:1} }
        
        #atlantis-lock .cb-tl { top: -6px; left: -6px; border-top: 2px solid; border-left: 2px solid; }
        #atlantis-lock .cb-tr { top: -6px; right: -6px; border-top: 2px solid; border-right: 2px solid; }
        #atlantis-lock .cb-bl { bottom: -6px; left: -6px; border-bottom: 2px solid; border-left: 2px solid; }
        #atlantis-lock .cb-br { bottom: -6px; right: -6px; border-bottom: 2px solid; border-right: 2px solid; }
        #atlantis-lock .at-card-container:hover .card-bracket { opacity: 1; width: 18px; height: 18px; }

        .unlock-anim { transition: all 1.8s cubic-bezier(0.6, -0.28, 0.735, 0.045) !important; }

        /* --- 卡片主体 --- */
        #atlantis-lock .at-card-body {
            background: rgba(10, 20, 30, 0.95);
            box-shadow: 0 30px 60px rgba(0,0,0,0.8);
            border-radius: 20px; 
            padding: 45px 40px 25px 40px; 
            display: flex; flex-direction: column; align-items: center;
            overflow: hidden; position: relative;
            transform: translateZ(0);
            border: 1px solid rgba(255,255,255,0.08);
        }

        #atlantis-lock .at-card-body::before {
            content: ''; position: absolute;
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: conic-gradient(transparent, var(--at-blue), var(--at-cyan), transparent 40%);
            animation: rotateFlow 4s linear infinite; z-index: -2; transition: opacity 0.3s;
        }
        #atlantis-lock .at-card-body.error-mode::before {
            background: conic-gradient(transparent, #ff0000, var(--at-red), transparent 40%);
            animation: rotateFlow 0.8s linear infinite;
        }
        #atlantis-lock .at-card-body::after {
            content: ''; position: absolute; inset: 2px;
            background: rgba(10, 20, 30, 0.99); border-radius: 18px; z-index: -1;
        }

        /* --- 头像与雷达 --- */
        #atlantis-lock .at-avatar-box {
            width: 120px; height: 120px; margin-bottom: 20px; 
            position: relative; z-index: 10; transform: translateZ(30px);
            cursor: pointer;
        }
        #atlantis-lock .at-avatar-img {
            width: 100%; height: 100%; border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.8);
            object-fit: cover; transition: 0.3s ease; position: relative; z-index: 2;
        }
        #atlantis-lock .at-avatar-box:hover .at-avatar-img {
            border-color: var(--at-cyan); box-shadow: 0 0 25px rgba(0, 242, 234, 0.6); transform: scale(1.05);
        }
        
        #atlantis-lock .radar-circle {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 100%; height: 100%; border-radius: 50%;
            border: 1px solid rgba(0, 242, 234, 0.6);
            opacity: 0; pointer-events: none; z-index: 1; box-shadow: 0 0 10px rgba(0, 242, 234, 0.3);
            animation: radarExpand 3s linear infinite;
        }
        #atlantis-lock .radar-circle.delay-1 { animation-delay: 1s; }
        #atlantis-lock .radar-circle.delay-2 { animation-delay: 2s; }

        @keyframes radarExpand {
            0% { width: 100%; height: 100%; opacity: 0.8; border-width: 2px; }
            100% { width: 240%; height: 240%; opacity: 0; border-width: 0px; }
        }

        #atlantis-lock .at-avatar-box::after {
            content: ''; position: absolute; top: 0; left: 0;
            width: 100%; height: 100%; border-radius: 50%;
            border: 2px solid var(--at-cyan); opacity: 0; z-index: 3; pointer-events: none;
            box-shadow: 0 0 20px var(--at-cyan); transition: 0s;
        }
        #atlantis-lock .at-avatar-box:hover::after { animation: activeBurst 0.6s ease-out; }
        @keyframes activeBurst {
            0% { transform: scale(1); opacity: 0.8; border-width: 3px; }
            100% { transform: scale(1.6); opacity: 0; border-width: 0px; }
        }

        /* --- 标题 --- */
        #atlantis-lock .at-title {
            font-family: 'Orbitron', sans-serif; color: #fff; font-size: 1.8rem;
            font-weight: 700; margin-bottom: 12px; letter-spacing: 4px;
            transform: translateZ(40px); display: flex; gap: 4px; cursor: default;
        }
        #atlantis-lock .at-char { display: inline-block; transition: color 0.3s; position: relative; }
        @keyframes textWave { 0% {transform:translateY(0)} 100% {transform:translateY(-8px)} }
        #atlantis-lock .at-title:hover .at-char {
            animation: textWave 0.6s ease-in-out infinite alternate;
            color: var(--at-cyan); text-shadow: 0 0 15px var(--at-cyan);
            animation-delay: calc(var(--i) * 0.05s);
        }

        /* --- 输入区 --- */
        #atlantis-lock .input-group { 
            width: 100%; display: flex; flex-direction: column; align-items: center; 
            gap: 15px; z-index: 50; margin-top: 5px; transform: translateZ(50px); 
        }
        #atlantis-lock .at-input {
            width: 85%; padding: 12px; background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.15); border-radius: 8px;
            color: #fff; text-align: center; font-size: 16px; outline: none; transition: 0.3s;
            font-family: 'Orbitron', sans-serif; letter-spacing: 2px;
        }
        #atlantis-lock .at-input:focus { 
            border-color: var(--at-cyan); background: rgba(0, 242, 234, 0.1); 
            box-shadow: 0 0 20px rgba(0,242,234,0.2); 
        }
        #atlantis-lock .at-input.input-error {
            border-color: var(--at-red); box-shadow: 0 0 15px rgba(255, 71, 87, 0.4); color: var(--at-red);
        }
        #atlantis-lock .at-btn {
            width: 85%; padding: 12px; border: none; border-radius: 8px;
            background: linear-gradient(90deg, #0077be, #00f2ea);
            color: #fff; font-family: 'Orbitron', sans-serif; font-weight: 700; cursor: pointer; transition: 0.3s; letter-spacing: 2px;
            text-transform: uppercase;
        }
        #atlantis-lock .at-btn:hover { transform: translateY(-2px); box-shadow: 0 5px 30px rgba(0, 242, 234, 0.5); }

        /* --- 紧凑底部 (二维码区域) --- */
        #atlantis-lock .at-extra {
            margin-top: 25px; 
            max-height: 0; opacity: 0; overflow: hidden;
            transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1); width: 100%; 
            border-top: 1px solid rgba(255,255,255,0.1); text-align: center;
        }
        #atlantis-lock .at-extra.show { max-height: 1200px; opacity: 1; padding-top: 0px; } 
        
        .scan-hint { font-size: 12px; color: #889; margin: 8px 0 15px 0; letter-spacing: 1px; display: block; }
        .scan-hint span { color: var(--at-cyan); font-weight: bold; }
        
        #atlantis-lock .qr-box { 
            display: flex; 
            justify-content: center; 
            gap: 20px; 
            flex-wrap: wrap; 
            padding-bottom: 20px;
        }

        #atlantis-lock .qr-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
        #atlantis-lock .qr-img { 
            width: 95px; height: 95px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);
            opacity: 0.6; transition: 0.3s;
        }
        #atlantis-lock .qr-label { font-size: 12px; color: #778; margin-top: 6px; transition: 0.3s; }
        #atlantis-lock .qr-item:hover .qr-img { opacity: 1; border-color: var(--at-cyan); transform: scale(1.1); box-shadow: 0 0 20px rgba(0, 242, 234, 0.3); }
        #atlantis-lock .qr-item:hover .qr-label { color: var(--at-cyan); }

        @keyframes rotateFlow { 0%{transform:rotate(0deg);} 100%{transform:rotate(360deg);} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        .shake-mode { animation: shake 0.4s ease-in-out; }

        @media (max-width: 768px) {
            #atlantis-lock .screen-anchor { display: none; }
            #atlantis-lock .at-card-container { width: 88%; }
            #atlantis-lock .at-title { font-size: 1.5rem; }
            #atlantis-lock .card-bracket { display: none; }

            /* 手机端二维码强制竖排 */
            #atlantis-lock .qr-box {
                flex-direction: column; 
                align-items: center;
                gap: 25px; 
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // 3. 构建 DOM (HTML结构)
    // ============================================================
    const titleHTML = "WHALTZE ZONE".split('').map((char, i) => 
        `<span class="at-char" style="--i:${i}">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');

    const qrHTML = config.contact.map(c => `
        <div class="qr-item">
            <img src="${c.src}" class="qr-img" onerror="this.src='https://via.placeholder.com/100?text=QR'">
            <span class="qr-label">${c.label}</span>
        </div>
    `).join('');

    const html = `
        <div id="atlantis-lock">
            <div class="screen-anchor sa-tl"><div class="sa-dot tl"></div></div>
            <div class="screen-anchor sa-tr"><div class="sa-dot tr"></div></div>
            <div class="screen-anchor sa-bl"><div class="sa-dot bl"></div></div>
            <div class="screen-anchor sa-br"><div class="sa-dot br"></div></div>

            <div id="at-scroll-view">
                <div class="at-card-container" id="at-card">
                    <div class="card-bracket cb-tl"></div>
                    <div class="card-bracket cb-tr"></div>
                    <div class="card-bracket cb-bl"></div>
                    <div class="card-bracket cb-br"></div>

                    <div class="at-card-body" id="at-body">
                        
                        <div class="at-avatar-box" id="at-avatar-box">
                            <div class="radar-circle delay-0"></div>
                            <div class="radar-circle delay-1"></div>
                            <div class="radar-circle delay-2"></div>
                            <img src="https://s2.loli.net/2024/07/17/6BaSwvE4bMmltTO.jpg" class="at-avatar-img">
                        </div>

                        <div class="at-title">${titleHTML}</div>

                        <div style="height:20px; margin-bottom:20px; display:flex; align-items:center;">
                            <div id="at-typer" style="color:var(--at-cyan); font-size:12px; opacity:0.8; letter-spacing:1px;"></div>
                        </div>

                        <form class="input-group" id="at-form">
                            <input type="password" id="at-pass" class="at-input" placeholder="ACCESS CODE" autocomplete="off">
                            <button type="submit" id="at-btn" class="at-btn">INITIALIZE</button>
                        </form>

                        <div class="at-extra" id="at-extra">
                            <p style="color:#ff4757; font-size:14px; margin-bottom:0px; font-weight:700; letter-spacing:1px;">
                                ⛔ ACCESS DENIED
                            </p>
                            <p style="color:#00f2ea; font-size:14px; margin-top: 5px; margin-bottom:0px; font-weight:700; letter-spacing:1px;">
                                此山是我开,此树是我栽!
                                <br>要想从这过,留下买路财!
                            </p>
                            <p class="scan-hint">
                                关注公众号后台回复<span>“博客密码”</span>获取
                            </p>
                            <div class="qr-box">${qrHTML}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);

    // ============================================================
    // 4. 逻辑控制与特效 (JS核心)
    // ============================================================
    const els = {
        lock: document.getElementById('atlantis-lock'),
        card: document.getElementById('at-card'),
        body: document.getElementById('at-body'),
        avatar: document.getElementById('at-avatar-box'),
        form: document.getElementById('at-form'),
        input: document.getElementById('at-pass'),
        btn: document.getElementById('at-btn'),
        typer: document.getElementById('at-typer'),
        extra: document.getElementById('at-extra'),
        s_anchors: document.querySelectorAll('.screen-anchor'),
        c_brackets: document.querySelectorAll('.card-bracket')
    };

    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
            const script = document.createElement('script');
            script.src = src; script.crossOrigin = "anonymous";
            script.onload = resolve; script.onerror = () => reject(new Error(`Load failed: ${src}`));
            document.head.appendChild(script);
        });
    };

    // --- 全屏水波纹与头像联动 ---
    const initEffects = () => {
        loadScript(config.libs.jquery).then(() => {
            return loadScript(config.libs.ripples);
        }).then(() => {
            if (window.jQuery && window.jQuery.fn.ripples) {
                const $bg = window.jQuery('#atlantis-lock');
                $bg.ripples({
                    resolution: 512,
                    dropRadius: 20,
                    perturbance: 0.04,
                    interactive: true
                });

                // 头像交互
                const rippleAtElement = ($el, radius, strength) => {
                    const offset = $el.offset();
                    const w = $el.outerWidth();
                    const h = $el.outerHeight();
                    const x = offset.left + w / 2;
                    const y = offset.top + h / 2;
                    $bg.ripples('drop', x, y, radius, strength);
                };

                const $avatar = window.jQuery('#at-avatar-box');
                $avatar.on('mousemove mouseenter', function(e) {
                    $bg.ripples('drop', e.clientX, e.clientY, 40, 0.2);
                });

                setInterval(() => {
                    if(document.hidden) return;
                    rippleAtElement($avatar, 30, 0.08);
                }, 2000);

                setInterval(() => {
                    if(document.hidden) return;
                    if(Math.random() > 0.8) {
                        const x = Math.random() * window.innerWidth;
                        const y = Math.random() * window.innerHeight;
                        $bg.ripples('drop', x, y, 10, 0.03);
                    }
                }, 3000);
            }
        }).catch(err => console.warn("Effect load error:", err));
    };

    initEffects();

    // --- 3D 视差 ---
    if(window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = (e.clientY / window.innerHeight) * 2 - 1;
        });
        const updateParallax = () => {
            targetX += (mouseX - targetX) * 0.08;
            targetY += (mouseY - targetY) * 0.08;
            if(els.card && !els.card.classList.contains('unlock-anim')) {
                els.card.style.transform = `rotateX(${-targetY * 10}deg) rotateY(${targetX * 10}deg)`;
            }
            requestAnimationFrame(updateParallax);
        };
        updateParallax();
    }

    // --- 打字机 ---
    let tipIdx = 0, charIdx = 0, isDel = false;
    function typeLoop() {
        const txt = config.tips[tipIdx];
        if(!els.typer) return;
        els.typer.innerText = txt.substring(0, charIdx + (isDel ? -1 : 1));
        charIdx += isDel ? -1 : 1;
        let delta = isDel ? 50 : 100;
        if (!isDel && charIdx === txt.length) { delta = 2000; isDel = true; }
        else if (isDel && charIdx === 0) { isDel = false; tipIdx = (tipIdx + 1) % config.tips.length; delta = 500; }
        setTimeout(typeLoop, delta);
    }
    typeLoop();

    // --- 高能脉冲解锁算法 ---
    function triggerHighEnergyPulse() {
        if (!window.jQuery || !window.jQuery.fn.ripples) return;
        const $bg = window.jQuery('#atlantis-lock');
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;

        $bg.ripples('drop', cx, cy, 100, 1.5);

        let count = 0;
        const pulseInterval = setInterval(() => {
            count++;
            const jitterX = (Math.random() - 0.5) * 20;
            const jitterY = (Math.random() - 0.5) * 20;
            const radius = 50 + (count * 60); 
            const strength = 0.8 - (count * 0.05);
            $bg.ripples('drop', cx + jitterX, cy + jitterY, radius, strength);

            for(let i=0; i<3; i++) {
                 const angle = Math.random() * Math.PI * 2;
                 const dist = radius * 0.8;
                 const px = cx + Math.cos(angle) * dist;
                 const py = cy + Math.sin(angle) * dist;
                 $bg.ripples('drop', px, py, 20, 0.3);
            }
            if (count > 12) clearInterval(pulseInterval); 
        }, 80); 
    }

    // --- 验证逻辑 ---
    function verify() {
        if(els.btn.disabled) return;
        els.btn.disabled = true; els.input.disabled = true;
        const orgText = els.btn.innerText;
        els.btn.innerText = "VERIFYING...";

        setTimeout(() => {
            if(els.input.value === config.password) {
                // === Success ===
                els.btn.innerText = "ACCESS GRANTED";
                els.btn.style.background = "var(--at-cyan)";
                els.btn.style.boxShadow = "0 0 50px var(--at-cyan)";
                els.btn.style.color = "#000";
                
                els.body.classList.remove('error-mode');

                // [关键修改] 立即让门禁层穿透点击，防止淡出时挡住博客
                els.lock.style.pointerEvents = 'none';

                els.s_anchors.forEach(el => {
                    el.style.transform = "scale(2)"; 
                    el.style.opacity = '0';
                    if(el.classList.contains('sa-tl')) el.style.transform += " translate(-100px, -100px)";
                    if(el.classList.contains('sa-tr')) el.style.transform += " translate(100px, -100px)";
                    if(el.classList.contains('sa-bl')) el.style.transform += " translate(-100px, 100px)";
                    if(el.classList.contains('sa-br')) el.style.transform += " translate(100px, 100px)";
                });
                
                els.c_brackets.forEach(el => {
                    el.style.transition = "all 0.6s ease-out";
                    el.style.opacity = '0';
                    if(el.classList.contains('cb-tl')) el.style.transform = "translate(-50px, -50px) rotate(-45deg)";
                    if(el.classList.contains('cb-tr')) el.style.transform = "translate(50px, -50px) rotate(45deg)";
                    if(el.classList.contains('cb-bl')) el.style.transform = "translate(-50px, 50px) rotate(-135deg)";
                    if(el.classList.contains('cb-br')) el.style.transform = "translate(50px, 50px) rotate(135deg)";
                });

                els.card.style.transform = ""; 
                els.card.classList.add('unlock-anim'); 
                requestAnimationFrame(() => {
                    els.card.style.transform = "scale(0.01) translateZ(-1000px) rotateX(45deg)";
                    els.card.style.opacity = "0";
                });

                setTimeout(triggerHighEnergyPulse, 300);

                setTimeout(() => {
                    els.lock.style.opacity = '0';
                    sessionStorage.setItem('access_granted', 'true');
                    
                    document.body.classList.remove('portal-locked');

                    setTimeout(() => {
                        // [关键修改] 增加错误捕捉，防止特效销毁报错导致DOM无法移除
                        try {
                            if (window.jQuery && window.jQuery.fn.ripples) window.jQuery('#atlantis-lock').ripples('destroy');
                        } catch(e) { console.warn('Ripples destroy error', e); }
                        
                        if(els.lock) els.lock.remove();
                    }, 1500); 
                }, 1800); 

            } else {
                // === Fail ===
                els.btn.innerText = orgText;
                els.btn.disabled = false; els.input.disabled = false;
                els.input.classList.add('input-error');
                els.input.value = "";
                els.input.placeholder = "ERROR";
                
                els.body.classList.remove('shake-mode');
                void els.body.offsetWidth;
                els.body.classList.add('shake-mode');
                els.body.classList.add('error-mode'); 
                els.extra.classList.add('show');
                
                if (window.jQuery && window.jQuery.fn.ripples) {
                    window.jQuery('#atlantis-lock').ripples('drop', window.innerWidth/2, window.innerHeight/2, 50, 0.1);
                }

                setTimeout(() => {
                    els.input.classList.remove('input-error');
                    els.body.classList.remove('error-mode');
                }, 2000);
            }
        }, 600);
    }

    if(els.form) {
        els.form.addEventListener('submit', (e) => {
            e.preventDefault();
            verify();
        });
    }

})();