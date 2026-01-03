/* Hexo Butterfly 门禁系统 - Deep Ocean Edition
 * 特性：全屏深海涟漪 | 纯净流光卡片 | 坠入深海解锁动画
 */

(function() {
    // ============================================================
    // 1. 核心配置 (Config)
    // ============================================================
    const config = {
        password: "/", // 这里设置你的密码
        contact: [
            { src: "/img/WeChat.jpg", label: "WeChat" },
            { src: "/img/GZH.jpg", label: "公众号" },
            { src: "/img/AliPay.jpg", label: "Alipay" }
        ],
        tips: [
            "正在潜入深海数据层...", "欢迎来到 Whaltze 的数字海域",
            "声纳系统已上线", "403 Forbidden? Try the magic word."
        ],
        libs: {
            jquery: "https://lib.baomitu.com/jquery/3.6.4/jquery.min.js",
            ripples: "https://lib.baomitu.com/jquery.ripples/0.5.3/jquery.ripples.min.js"
        }
    };

    if (sessionStorage.getItem('access_granted') === 'true') return;

    // ============================================================
    // 2. 样式定义 (CSS)
    // ============================================================
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700&family=Quicksand:wght@500;700&display=swap';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
        /* --- 全屏容器 (水波纹载体) --- */
        #atlantis-lock {
            --at-cyan: #00f2ea;
            --at-blue: #0077be;
            --at-red: #ff4757;
            
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            z-index: 999999;
            /* 设置深海背景图，因为 ripples 需要在背景图上产生折射效果 */
            /* 你可以将 url 换成你喜欢的任何深色壁纸 */
            background: #02060c url("https://s2.loli.net/2024/07/17/6BaSwvE4bMmltTO.jpg") no-repeat center center;
            background-size: cover;
            
            display: flex; justify-content: center; align-items: center;
            font-family: 'Quicksand', sans-serif;
            overflow: hidden; perspective: 1000px;
            opacity: 1; 
            transition: opacity 1s ease-out; /* 最后的淡出过渡 */
        }

        /* --- 卡片容器 --- */
        #atlantis-lock .at-card-container {
            position: relative; width: 90%; max-width: 440px;
            transform-style: preserve-3d; z-index: 20;
            /* 初始状态 */
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s;
        }

        /* --- 卡片主体 (纯净版) --- */
        #atlantis-lock .at-card-body {
            /* 纯净深色背景，去除噪点和模糊，凸显文字 */
            background: rgba(10, 20, 30, 0.85);
            border-radius: 24px; padding: 40px 30px;
            display: flex; flex-direction: column; align-items: center;
            position: relative;
            /* 内部阴影增加层次感 */
            box-shadow: inset 0 0 30px rgba(0, 242, 234, 0.05), 0 20px 50px rgba(0,0,0,0.6);
            /* 必须设置 overflow: hidden 来裁剪流光边框 */
            overflow: hidden; 
        }

        /* --- 核心特效：四周流动发光边框 --- */
        /* 使用伪元素制作旋转的流光 */
        #atlantis-lock .at-card-body::before {
            content: ''; position: absolute;
            /* 扩大范围，让光圈在边缘旋转 */
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: conic-gradient(
                transparent, 
                var(--at-blue), 
                transparent 30%
            );
            animation: rotateBorder 4s linear infinite;
            z-index: -2;
        }
        
        /* 内部遮罩，用于镂空中间，只显示边框 */
        #atlantis-lock .at-card-body::after {
            content: ''; position: absolute;
            inset: 2px; /* 边框宽度 2px */
            background: rgba(10, 20, 30, 0.95); /* 覆盖在旋转光圈上，形成背景 */
            border-radius: 22px;
            z-index: -1;
        }

        /* 另一个流光，增加颜色层次 (青色) */
        #atlantis-lock .bg-glow {
            position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
            background: conic-gradient(
                transparent, 
                var(--at-cyan), 
                transparent 30%
            );
            animation: rotateBorder 4s linear infinite;
            animation-delay: -2s; /* 错开时间，形成追逐效果 */
            z-index: -2;
        }

        /* --- 屏幕四角锚点 (装饰) --- */
        #atlantis-lock .screen-anchor {
            position: absolute; width: 60px; height: 60px;
            border: 0 solid rgba(255, 255, 255, 0.15); pointer-events: none;
        }
        #atlantis-lock .sa-tl { top: 30px; left: 30px; border-top-width: 1px; border-left-width: 1px; }
        #atlantis-lock .sa-tr { top: 30px; right: 30px; border-top-width: 1px; border-right-width: 1px; }
        #atlantis-lock .sa-bl { bottom: 30px; left: 30px; border-bottom-width: 1px; border-left-width: 1px; }
        #atlantis-lock .sa-br { bottom: 30px; right: 30px; border-bottom-width: 1px; border-right-width: 1px; }

        /* --- 头像与雷达 --- */
        #atlantis-lock .at-avatar-box {
            width: 110px; height: 110px; margin-bottom: 20px;
            position: relative; z-index: 10;
        }
        #atlantis-lock .at-avatar-img {
            width: 100%; height: 100%; border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.8);
            object-fit: cover; transition: 0.3s;
            box-shadow: 0 0 20px rgba(0,0,0,0.5);
        }
        #atlantis-lock .radar-wave {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 100%; height: 100%; border-radius: 50%;
            border: 1px solid var(--at-cyan); opacity: 0;
            animation: radar 2.5s infinite linear;
        }

        /* --- 文字内容 --- */
        #atlantis-lock .at-title {
            font-family: 'Orbitron', sans-serif; color: #fff; font-size: 1.5rem; 
            font-weight: 700; margin-bottom: 10px; letter-spacing: 3px; z-index: 5;
            text-shadow: 0 0 10px rgba(0, 242, 234, 0.3);
        }
        
        /* --- 输入区域 --- */
        #atlantis-lock .input-group { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 15px; z-index: 50; margin-top: 10px; }
        #atlantis-lock .at-input {
            width: 80%; padding: 12px; background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;
            color: #fff; text-align: center; font-size: 16px; outline: none; transition: 0.3s;
            font-family: 'Orbitron', sans-serif; letter-spacing: 2px;
        }
        #atlantis-lock .at-input:focus { border-color: var(--at-cyan); background: rgba(0,0,0,0.3); }
        #atlantis-lock .at-btn {
            width: 80%; padding: 10px; border: 1px solid var(--at-blue); border-radius: 4px;
            background: rgba(0, 119, 190, 0.3);
            color: var(--at-cyan); font-family: 'Orbitron', sans-serif; font-weight: 700; cursor: pointer; transition: 0.3s;
            letter-spacing: 1px;
        }
        #atlantis-lock .at-btn:hover { background: var(--at-blue); color: #fff; box-shadow: 0 0 20px var(--at-blue); }

        /* --- 底部二维码 (隐藏式) --- */
        #atlantis-lock .at-extra {
            margin-top: 20px; max-height: 0; opacity: 0; overflow: hidden;
            transition: 0.5s; width: 100%; text-align: center;
        }
        #atlantis-lock .at-extra.show { max-height: 200px; opacity: 1; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); }
        #atlantis-lock .qr-box { display: flex; justify-content: center; gap: 15px; }
        #atlantis-lock .qr-img { 
            width: 60px; height: 60px; border-radius: 8px; opacity: 0.6; transition: 0.3s; 
            border: 1px solid rgba(255,255,255,0.2);
        }
        #atlantis-lock .qr-img:hover { opacity: 1; transform: scale(1.1); border-color: var(--at-cyan); }

        /* --- 动画关键帧 --- */
        @keyframes rotateBorder { 100% { transform: rotate(360deg); } }
        @keyframes radar { 0% {width:100%; height:100%; opacity:0.8; border-width:1px;} 100% {width:220%; height:220%; opacity:0; border-width:0px;} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-5px)} 40%,80%{transform:translateX(5px)} }
        
        .shake-mode { animation: shake 0.4s ease-in-out; }
        .input-error { border-color: var(--at-red) !important; color: var(--at-red) !important; }

        /* 手机适配 */
        @media (max-width: 768px) {
            #atlantis-lock .screen-anchor { display: none; }
            #atlantis-lock .at-card-container { width: 85%; }
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    // 3. 构建 HTML
    // ============================================================
    const titleHTML = "WHALTZE ZONE".split('').map(c => `<span>${c}</span>`).join('');
    const qrHTML = config.contact.map(c => `
        <div style="display:flex; flex-direction:column; align-items:center;">
            <img src="${c.src}" class="qr-img">
            <span style="font-size:10px; color:#aaa; margin-top:5px">${c.label}</span>
        </div>
    `).join('');

    const html = `
        <div id="atlantis-lock">
            <div class="screen-anchor sa-tl"></div>
            <div class="screen-anchor sa-tr"></div>
            <div class="screen-anchor sa-bl"></div>
            <div class="screen-anchor sa-br"></div>

            <div class="at-card-container" id="at-card">
                <div class="at-card-body" id="at-body">
                    <div class="bg-glow"></div>

                    <div class="at-avatar-box">
                        <div class="radar-wave" style="animation-delay: 0s"></div>
                        <div class="radar-wave" style="animation-delay: 1.2s"></div>
                        <img src="https://s2.loli.net/2024/07/17/6BaSwvE4bMmltTO.jpg" class="at-avatar-img">
                    </div>

                    <div class="at-title">${titleHTML}</div>
                    
                    <div id="at-typer" style="color:var(--at-cyan); font-size:12px; height:20px; margin-bottom:20px; opacity:0.8"></div>

                    <div class="input-group">
                        <input type="password" id="at-pass" class="at-input" placeholder="PASSWORD" autocomplete="off">
                        <button id="at-btn" class="at-btn">UNLOCK</button>
                    </div>

                    <div class="at-extra" id="at-extra">
                        <p style="color:#ff4757; font-size:12px; margin-bottom:10px;">⛔ ACCESS DENIED</p>
                        <div class="qr-box">${qrHTML}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper.firstElementChild);

    // ============================================================
    // 4. 逻辑控制 (JS)
    // ============================================================
    const els = {
        lock: document.getElementById('atlantis-lock'),
        card: document.getElementById('at-card'),
        input: document.getElementById('at-pass'),
        btn: document.getElementById('at-btn'),
        typer: document.getElementById('at-typer'),
        extra: document.getElementById('at-extra')
    };

    // --- 资源加载 ---
    const loadScript = (src) => new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const s = document.createElement('script');
        s.src = src; s.crossOrigin = "anonymous";
        s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
    });

    // --- 全屏水波纹初始化 ---
    const initEffects = () => {
        loadScript(config.libs.jquery).then(() => loadScript(config.libs.ripples)).then(() => {
            if (window.jQuery && window.jQuery.fn.ripples) {
                // 关键点：将 ripples 绑定到全屏容器 #atlantis-lock
                const $bg = window.jQuery('#atlantis-lock');
                $bg.ripples({
                    resolution: 512,
                    dropRadius: 20,
                    perturbance: 0.04,
                    interactive: true // 允许鼠标在全屏划动产生波纹
                });
                
                // 随机雨滴效果
                setInterval(() => {
                    const x = Math.random() * $bg.outerWidth();
                    const y = Math.random() * $bg.outerHeight();
                    const dropRadius = 20;
                    const strength = 0.04 + Math.random() * 0.04;
                    $bg.ripples('drop', x, y, dropRadius, strength);
                }, 3000);
            }
        }).catch(e => console.log("Effect Error:", e));
    };
    initEffects();

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

    // --- 3D 视差 (仅让卡片跟随鼠标轻微摆动) ---
    document.addEventListener('mousemove', (e) => {
        if(window.innerWidth > 768 && els.card) {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // 增加角度
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            requestAnimationFrame(() => {
                els.card.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
            });
        }
    });

    // --- 验证逻辑 ---
    function verify() {
        if(els.btn.disabled) return;
        els.btn.disabled = true; els.input.disabled = true;
        const orgText = els.btn.innerText;
        els.btn.innerText = "VERIFYING...";

        setTimeout(() => {
            if(els.input.value === config.password) {
                // === 成功解锁动画 ===
                els.btn.innerText = "GRANTED";
                els.btn.style.borderColor = "#00f2ea";
                els.btn.style.color = "#00f2ea";
                
                // 1. 卡片动画：缩小并淡出 (模拟掉进深渊)
                els.card.style.transition = "all 0.6s ease-in";
                els.card.style.transform = "scale(0) rotate(10deg)"; // 缩小到消失
                els.card.style.opacity = "0";

                // 2. 触发全屏巨型涟漪 (模拟落水)
                if (window.jQuery && window.jQuery.fn.ripples) {
                    const $bg = window.jQuery('#atlantis-lock');
                    const x = window.innerWidth / 2;
                    const y = window.innerHeight / 2;
                    // 延时一点点，让卡片开始缩小时触发
                    setTimeout(() => {
                        $bg.ripples('drop', x, y, 150, 1.0); // 巨大的波纹
                    }, 100);
                }

                // 3. 整体界面淡出 (露出博客)
                setTimeout(() => {
                    els.lock.style.opacity = '0';
                    sessionStorage.setItem('access_granted', 'true');
                    
                    // 清理资源
                    setTimeout(() => {
                        if (window.jQuery && window.jQuery.fn.ripples) {
                            window.jQuery('#atlantis-lock').ripples('destroy');
                        }
                        els.lock.remove();
                    }, 1000);
                }, 800);

            } else {
                // === 失败 ===
                els.btn.innerText = orgText;
                els.btn.disabled = false; els.input.disabled = false;
                els.input.classList.add('input-error');
                els.input.value = "";
                
                els.card.classList.remove('shake-mode');
                void els.card.offsetWidth; // 触发重绘
                els.card.classList.add('shake-mode');
                els.extra.classList.add('show');
                
                setTimeout(() => els.input.classList.remove('input-error'), 2000);
            }
        }, 800);
    }

    els.btn.addEventListener('click', verify);
    els.input.addEventListener('keydown', (e) => { if(e.key === 'Enter') verify(); });

})();