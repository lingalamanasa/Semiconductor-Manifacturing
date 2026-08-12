/* ==========================================================================
   STACKLY SEMICONDUCTOR MANUFACTURING - EXTENDED JAVASCRIPT LOGIC
   ========================================================================== */

// 1. Radar Loader Progress & Fadeout (Failsafe & Fast Animation)
function initRadarLoader() {
    const loader = document.getElementById('loader');
    const statusText = document.getElementById('loading-status');
    const progressFill = document.getElementById('progress-fill');
    const progressVal = document.getElementById('progress-value');

    if (!loader) return;

    let count = 0;
    const statuses = [
        "Initializing Nanometer Fab Grid...",
        "Connecting EUV Lithography Scanners...",
        "Calibrating ISO Class-1 Cleanroom...",
        "Stackly Silicon Network Ready!"
    ];

    const interval = setInterval(() => {
        count += 5;
        if (count > 100) count = 100;

        if (progressFill) progressFill.style.width = `${count}%`;
        if (progressVal) progressVal.innerText = `${count}%`;

        if (count > 25 && count < 50 && statusText) statusText.innerText = statuses[1];
        if (count >= 50 && count < 80 && statusText) statusText.innerText = statuses[2];
        if (count >= 80 && statusText) statusText.innerText = statuses[3];

        if (count >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 200);
        }
    }, 15);

    // Hard Failsafe: Hide loader after max 1 second no matter what
    setTimeout(() => {
        clearInterval(interval);
        if (progressFill) progressFill.style.width = '100%';
        if (progressVal) progressVal.innerText = '100%';
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 800);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRadarLoader);
} else {
    initRadarLoader();
}

function initMainLogic() {

    // 2. Mobile Menu Toggle & Drawer Overlay
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    function toggleMobileMenu() {
        mobileMenu?.classList.toggle('active');
        mobileOverlay?.classList.toggle('active');
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

    // 3. Navbar Scroll Handler
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // 4. Hero Typing Text Effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = [
            "Sub-2nm GAA Lithography",
            "3D Chiplet Heterogeneous Stacking",
            "Zero-Defect 300mm Wafers",
            "AI Accelerator Hardware"
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentPhrase = phrases[phraseIdx];
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIdx + 1);
                charIdx++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIdx === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(typeEffect, typeSpeed);
        }
        setTimeout(typeEffect, 800);
    }

    // 6. Expandable Accordions Toggle
    const expandableCards = document.querySelectorAll('.expandable-card');
    expandableCards.forEach(card => {
        card.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            expandableCards.forEach(c => c.classList.remove('active'));
            if (!isActive) {
                card.classList.add('active');
            }
        });
    });

    // 7. Interactive Tabbed Process Matrix Switcher
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    if (tabBtns.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetTab = btn.getAttribute('data-tab');
                const activeContent = document.getElementById(targetTab);
                if (activeContent) activeContent.classList.add('active');
            });
        });
    }

    // 8. Lithography 6-Step Micro-Process Stepper Logic
    const stepPills = document.querySelectorAll('.step-pill');
    const stepTitle = document.getElementById('stepTitle');
    const stepDesc = document.getElementById('stepDesc');
    const stepImg = document.getElementById('stepImg');

    const stepData = {
        1: { title: "Step 1: Silicon Substrate Preparation", desc: "Hyper-pure 300mm monocrystalline silicon ingot slicing and chemical-mechanical polishing (CMP) to achieve sub-nanometer surface roughness.", img: "./images/silicon_wafer.webp" },
        2: { title: "Step 2: 0.55 High-NA EUV Exposure", desc: "Extreme ultraviolet light pulses at 13.5nm wavelength transfer circuit patterns through Mo/Si reflective photomasks onto photoresist layers.", img: "./images/photolithography.webp" },
        3: { title: "Step 3: Atomic Plasma Reactive Etching", desc: "Anisotropic dry plasma etching carves 3D nanosheet channels with atomic precision.", img: "./images/cleanroom_workers.webp" },
        4: { title: "Step 4: Ion Implantation & Annealing", desc: "High-energy dopant ion beams alter silicon electrical conductivity followed by rapid thermal annealing.", img: "./images/hero_fab.webp" },
        5: { title: "Step 5: 3D Interconnect Metallurgy", desc: "Copper and ruthenium dual-damascene metal lines form multi-level electrical routing.", img: "./images/chip_closeup.webp" },
        6: { title: "Step 6: Heterogeneous Chiplet Dicing", desc: "High-speed laser dicing separates dies before 3D bumpless interposer bonding.", img: "./images/about_banner.webp" }
    };

    if (stepPills.length) {
        stepPills.forEach(pill => {
            pill.addEventListener('click', () => {
                stepPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const stepNum = pill.getAttribute('data-step');
                const data = stepData[stepNum];
                if (data) {
                    if (stepTitle) stepTitle.innerText = data.title;
                    if (stepDesc) stepDesc.innerText = data.desc;
                    if (stepImg) stepImg.src = data.img;
                }
            });
        });
    }

    // 9. Interactive Wafer Production Yield Calculator Logic
    const dieSizeSlider = document.getElementById('dieSizeSlider');
    const waferVolSlider = document.getElementById('waferVolSlider');
    const dieSizeVal = document.getElementById('dieSizeVal');
    const waferVolVal = document.getElementById('waferVolVal');
    const resTotalDies = document.getElementById('resTotalDies');
    const resYieldRate = document.getElementById('resYieldRate');
    const resCostDie = document.getElementById('resCostDie');

    function calculateWaferYield() {
        if (!dieSizeSlider || !waferVolSlider) return;
        const dieArea = parseFloat(dieSizeSlider.value);
        const volume = parseInt(waferVolSlider.value);

        if (dieSizeVal) dieSizeVal.innerText = `${dieArea} mm²`;
        if (waferVolVal) waferVolVal.innerText = `${volume} Wafers/Mo`;

        const waferArea = Math.PI * 150 * 150; 
        const grossDies = Math.floor((waferArea / dieArea) - (Math.PI * 300 / Math.sqrt(2 * dieArea)));
        const defectDensity = 0.0012; 
        const yieldPercent = Math.max(70, Math.min(99.8, Math.exp(-Math.sqrt(dieArea * defectDensity)) * 100));

        const netGoodDies = Math.floor(grossDies * (yieldPercent / 100));
        const estimatedCostPerWafer = 14500;
        const costPerDie = (estimatedCostPerWafer / Math.max(1, netGoodDies)).toFixed(2);

        if (resTotalDies) resTotalDies.innerText = (netGoodDies * volume).toLocaleString();
        if (resYieldRate) resYieldRate.innerText = `${yieldPercent.toFixed(1)}%`;
        if (resCostDie) resCostDie.innerText = `$${costPerDie}`;
    }

    if (dieSizeSlider) dieSizeSlider.addEventListener('input', calculateWaferYield);
    if (waferVolSlider) waferVolSlider.addEventListener('input', calculateWaferYield);
    calculateWaferYield();

    // 10. Redirect Buttons to 404 Page (including social icons)
    const redirect404Targets = document.querySelectorAll('.btn-404, a[data-redirect="404"], .social-icon');
    redirect404Targets.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = './404.html';
        });
    });

    // 11. Auth State & Dashboard Greeting Management
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const welcomeUserText = document.getElementById('welcomeUserText');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username');
            const nameVal = usernameInput ? usernameInput.value.trim() : '';
            const role = document.getElementById('userRole')?.value || 'user';
            const defaultName = role === 'admin' ? 'Foundry Administrator' : 'Client Engineer';
            const finalName = nameVal || defaultName;
            try {
                localStorage.setItem('stackly_user_name', finalName);
                localStorage.setItem('stackly_user_role', role);
            } catch(e) { console.warn('localStorage access denied'); }

            const loader = document.getElementById('loader');
            const progressFill = document.getElementById('progress-fill');
            const progressValue = document.getElementById('progress-value');
            const statusText = document.getElementById('loading-status');

            if (loader && progressFill && progressValue) {
                if (statusText) statusText.innerText = 'AUTHENTICATING USER CREDENTIALS...';
                loader.classList.remove('fade-out');
                loader.style.display = 'flex';
                loader.style.transition = 'none';
                loader.style.opacity = '1';
                loader.style.visibility = 'visible';
                let progress = 0;
                
                const interval = setInterval(() => {
                    progress += Math.floor(Math.random() * 8) + 4;
                    if(progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        progressFill.style.width = '100%';
                        progressValue.innerText = '100%';
                        setTimeout(() => { 
                            window.location.href = role === 'admin' ? './dashboard-admin.html' : './dashboard-user.html';
                        }, 400);
                    } else {
                        progressFill.style.width = progress + '%';
                        progressValue.innerText = progress + '%';
                    }
                }, 40);
            } else {
                window.location.href = role === 'admin' ? './dashboard-admin.html' : './dashboard-user.html';
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regNameInput = document.getElementById('regName');
            const nameVal = regNameInput ? regNameInput.value.trim() : '';
            const role = document.getElementById('regRole')?.value || 'user';
            const defaultName = role === 'admin' ? 'Foundry Administrator' : 'Client Engineer';
            const finalName = nameVal || defaultName;
            try {
                localStorage.setItem('stackly_user_name', finalName);
                localStorage.setItem('stackly_user_role', role);
            } catch(e) { console.warn('localStorage access denied'); }

            const loader = document.getElementById('loader');
            const progressFill = document.getElementById('progress-fill');
            const progressValue = document.getElementById('progress-value');
            const statusText = document.getElementById('loading-status');

            if (loader && progressFill && progressValue) {
                if (statusText) statusText.innerText = 'INITIALIZING REGISTRATION BUS...';
                loader.classList.remove('fade-out');
                loader.style.display = 'flex';
                loader.style.transition = 'none';
                loader.style.opacity = '1';
                loader.style.visibility = 'visible';
                let progress = 0;
                
                const interval = setInterval(() => {
                    progress += Math.floor(Math.random() * 8) + 4;
                    if(progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                        progressFill.style.width = '100%';
                        progressValue.innerText = '100%';
                        setTimeout(() => { 
                            window.location.href = role === 'admin' ? './dashboard-admin.html' : './dashboard-user.html';
                        }, 400);
                    } else {
                        progressFill.style.width = progress + '%';
                        progressValue.innerText = progress + '%';
                    }
                }, 40);
            } else {
                window.location.href = role === 'admin' ? './dashboard-admin.html' : './dashboard-user.html';
            }
        });
    }

    // Update User Name, Subname, Initial Avatar and Live Date
    let storedName = 'Design Specialist';
    try { storedName = localStorage.getItem('stackly_user_name') || storedName; } catch(err) {}
    
    // Welcome text elements
    document.querySelectorAll('.welcomeUserText, #welcomeUserText').forEach(el => {
        el.innerText = storedName;
    });
    document.querySelectorAll('.welcomeUserTextSub').forEach(el => {
        el.innerText = storedName;
    });

    // Initial avatar letter
    const initialLetter = storedName.trim().charAt(0).toUpperCase() || 'S';
    document.querySelectorAll('.userInitialAvatar, .ent-avatar').forEach(el => {
        el.innerText = initialLetter;
    });

    // Live Date (e.g. Wednesday, 5 August 2026)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-GB', options);
    document.querySelectorAll('.liveDateText, #liveDateText').forEach(el => {
        el.innerText = formattedDate;
    });

    // Mobile Dashboard Sidebar & Overlay Toggle
    const dbMobileToggle = document.getElementById('dbMobileToggle');
    const dashboardOverlay = document.getElementById('dashboardOverlay');
    
    function toggleDashboardSidebar() {
        const sidebar = document.getElementById('dashboardSidebar') || document.querySelector('.sidebar') || document.querySelector('.ent-sidebar');
        if (sidebar) sidebar.classList.toggle('active');
        if (dashboardOverlay) dashboardOverlay.classList.toggle('active');
    }

    if (dbMobileToggle) dbMobileToggle.addEventListener('click', toggleDashboardSidebar);
    if (dashboardOverlay) dashboardOverlay.addEventListener('click', toggleDashboardSidebar);

    // Close sidebar on clicking navigation links
    document.querySelectorAll('.sidebar a, .ent-sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            const sidebar = document.getElementById('dashboardSidebar') || document.querySelector('.sidebar') || document.querySelector('.ent-sidebar');
            if (sidebar?.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (dashboardOverlay) dashboardOverlay.classList.remove('active');
            }
        });
    });

    document.querySelectorAll('#logoutBtn, .mob-drawer-logout, .mob-pill-logout, .sidebar-logout a, a[href*="login.html"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                localStorage.removeItem('stackly_user_name');
                localStorage.removeItem('stackly_user_role');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userUsername');
                localStorage.removeItem('userRole');
            } catch(err) {}
            window.location.href = './index.html';
        });
    });

    // FAQ Accordion Toggle Handler
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('active');
        });
    });


    // 12. Interactive 3D Card Mouse Spotlight & Tilt Tracking Effect
    const spotlightCards = document.querySelectorAll('.spotlight-card, .bento-card, .cam-card, .metric-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Subtle 3D Card Tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3;
            const rotateY = ((x - centerX) / centerX) * 3;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMainLogic);
} else {
    initMainLogic();
}

// 14. Interactive Ambient Background Particle Canvas
function initBackgroundParticles() {
    let canvas = document.getElementById('bgCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'bgCanvas';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const numParticles = Math.min(45, Math.floor(width / 35));

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            color: Math.random() > 0.5 ? '#10B981' : '#0EA5E9',
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();

            // Connect nearby nodes with subtle laser interconnect lines
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = p.color;
                    ctx.globalAlpha = (1 - dist / 130) * 0.18;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBackgroundParticles);
} else {
    initBackgroundParticles();
}
