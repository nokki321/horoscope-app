// 星座运势应用主逻辑
class FortuneApp {
    constructor() {
        this.selectedZodiac = this.loadSelectedZodiac();
        this.fortuneData = this.generateFortuneData();
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupInitialState();
    }

    bindEvents() {
        // 星座选择变化事件
        document.getElementById('zodiacSelect').addEventListener('change', (e) => {
            this.selectedZodiac = e.target.value;
            this.updateButtonState();
        });
        
        // 查看运势按钮事件
        document.getElementById('getFortuneBtn').addEventListener('click', () => {
            this.showFortune();
        });

        // 回车键触发运势查看
        document.getElementById('zodiacSelect').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.selectedZodiac) {
                this.showFortune();
            }
        });

        // 分享功能事件绑定
        this.bindShareEvents();
    }

    setupInitialState() {
        // 设置默认选择的星座
        if (this.selectedZodiac) {
            document.getElementById('zodiacSelect').value = this.selectedZodiac;
        }
        this.updateButtonState();
    }

    updateButtonState() {
        const button = document.getElementById('getFortuneBtn');
        button.disabled = !this.selectedZodiac;
    }

    showFortune() {
        if (!this.selectedZodiac) {
            this.showMessage('请先选择您的星座！', 'error');
            return;
        }

        this.saveSelectedZodiac();
        this.displayFortune();
        this.showMessage('运势已更新！', 'success');
    }

    displayFortune() {
        const zodiacName = this.getZodiacChineseName(this.selectedZodiac);
        const fortune = this.fortuneData[this.selectedZodiac];
        
        // 更新头部信息
        document.getElementById('zodiacName').textContent = zodiacName;
        document.getElementById('currentDate').textContent = this.getCurrentDate();
        
        // 更新各个运势卡片
        this.updateFortuneCard('overall', fortune.overall);
        this.updateFortuneCard('love', fortune.love);
        this.updateFortuneCard('career', fortune.career);
        this.updateFortuneCard('wealth', fortune.wealth);
        this.updateFortuneCard('health', fortune.health);
        this.updateAdviceCard(fortune.advice);
        
        // 显示运势区域，隐藏空状态，显示分享区域
        document.getElementById('fortuneDisplay').style.display = 'block';
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('shareSection').style.display = 'block';
    }

    updateFortuneCard(type, fortune) {
        document.getElementById(`${type}Stars`).textContent = this.getStars(fortune.rating);
        document.getElementById(`${type}Rating`).textContent = `${fortune.rating}星`;
        document.getElementById(`${type}Fortune`).textContent = fortune.text;
    }

    updateAdviceCard(advice) {
        document.getElementById('adviceText').textContent = advice;
    }

    getStars(rating) {
        const fullStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(5 - rating);
        return fullStars + emptyStars;
    }

    getZodiacChineseName(zodiac) {
        const zodiacNames = {
            'aries': '白羊座',
            'taurus': '金牛座',
            'gemini': '双子座',
            'cancer': '巨蟹座',
            'leo': '狮子座',
            'virgo': '处女座',
            'libra': '天秤座',
            'scorpio': '天蝎座',
            'sagittarius': '射手座',
            'capricorn': '摩羯座',
            'aquarius': '水瓶座',
            'pisces': '双鱼座'
        };
        return zodiacNames[zodiac] || '未知星座';
    }

    getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        return `${year}年${month}月${day}日`;
    }

    generateFortuneData() {
        // 生成随机的运势数据
        const fortunes = {
            overall: [
                { rating: 5, text: '今日运势极佳，万事顺心如意！' },
                { rating: 4, text: '整体运势良好，适合开展新计划。' },
                { rating: 3, text: '运势平稳，保持平常心即可。' },
                { rating: 2, text: '今日稍有波折，需谨慎行事。' }
            ],
            love: [
                { rating: 5, text: '桃花运旺盛，单身者有机会遇到心仪对象。' },
                { rating: 4, text: '感情甜蜜，与伴侣关系融洽。' },
                { rating: 3, text: '感情方面需要多加沟通和理解。' },
                { rating: 2, text: '注意控制情绪，避免不必要的争执。' }
            ],
            career: [
                { rating: 5, text: '事业运极佳，有重要突破机会。' },
                { rating: 4, text: '工作上有不错的发展机会。' },
                { rating: 3, text: '工作平稳，按部就班完成任务。' },
                { rating: 2, text: '工作中可能遇到挑战，需要耐心应对。' }
            ],
            wealth: [
                { rating: 5, text: '财运亨通，有意外之财的可能。' },
                { rating: 4, text: '财运不错，投资理财有收获。' },
                { rating: 3, text: '财运平稳，注意理性消费。' },
                { rating: 2, text: '财务方面需谨慎，避免冲动消费。' }
            ],
            health: [
                { rating: 5, text: '身体状况极佳，精力充沛。' },
                { rating: 4, text: '健康状况良好，保持运动习惯。' },
                { rating: 3, text: '注意休息，避免过度劳累。' },
                { rating: 2, text: '身体稍有不适，需要多加调养。' }
            ],
            advice: [
                '保持积极心态，抓住机会展现自己。',
                '多与人沟通交流，会有意外收获。',
                '今日适合学习新知识，提升自我。',
                '注意劳逸结合，保持身心健康。',
                '勇敢尝试新事物，会有不错的结果。',
                '保持耐心，事情会慢慢好转。'
            ]
        };

        const zodiacData = {};
        const zodiacs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

        zodiacs.forEach(zodiac => {
            // 基于日期生成相对稳定的随机数，确保同一天同一星座运势一致
            const seed = new Date().toDateString() + zodiac;
            const random = this.seededRandom(seed);
            
            zodiacData[zodiac] = {
                overall: this.getRandomItem(fortunes.overall, random),
                love: this.getRandomItem(fortunes.love, random + 1),
                career: this.getRandomItem(fortunes.career, random + 2),
                wealth: this.getRandomItem(fortunes.wealth, random + 3),
                health: this.getRandomItem(fortunes.health, random + 4),
                advice: this.getRandomItem(fortunes.advice, random + 5)
            };
        });

        return zodiacData;
    }

    getRandomItem(array, seed) {
        const randomIndex = Math.floor(this.seededRandom(seed) * array.length);
        return array[randomIndex];
    }

    seededRandom(seed) {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            const char = seed.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return (hash % 1000) / 1000;
    }

    showMessage(message, type) {
        // 简单的消息提示实现
        const tips = document.getElementById('shareTips');
        if (tips) {
            tips.textContent = message;
            tips.className = `share-tips ${type}`;
            setTimeout(() => {
                tips.textContent = '';
                tips.className = 'share-tips';
            }, 3000);
        }
    }

    bindShareEvents() {
        // 复制链接功能
        document.getElementById('copyLinkBtn').addEventListener('click', () => {
            this.copyShareLink();
        });

        // 微信分享功能
        document.getElementById('shareWechatBtn').addEventListener('click', () => {
            this.shareToWechat();
        });

        // QQ分享功能
        document.getElementById('shareQqBtn').addEventListener('click', () => {
            this.shareToQQ();
        });
    }

    copyShareLink() {
        const zodiacName = this.getZodiacChineseName(this.selectedZodiac);
        const shareText = `我的${zodiacName}今日运势：${this.getCurrentDate()}\n快来查看你的星座运势吧！`;
        const shareUrl = window.location.href;
        
        const shareContent = `${shareText}\n${shareUrl}`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(shareContent).then(() => {
                this.showMessage('链接已复制到剪贴板！', 'success');
            }).catch(() => {
                this.fallbackCopyText(shareContent);
            });
        } else {
            this.fallbackCopyText(shareContent);
        }
    }

    fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            this.showMessage('链接已复制到剪贴板！', 'success');
        } catch (err) {
            this.showMessage('复制失败，请手动复制链接', 'error');
        }
        document.body.removeChild(textArea);
    }

    shareToWechat() {
        const zodiacName = this.getZodiacChineseName(this.selectedZodiac);
        const shareText = `我的${zodiacName}今日运势：${this.getCurrentDate()}`;
        const shareUrl = window.location.href;
        
        // 生成微信分享链接
        const wechatUrl = `https://wx.qq.com/`;
        
        this.showMessage('请使用微信扫描二维码或手动分享链接', 'success');
        
        // 在实际部署中，这里可以集成微信JS-SDK
        setTimeout(() => {
            this.copyShareLink(); // 先复制链接
        }, 1000);
    }

    shareToQQ() {
        const zodiacName = this.getZodiacChineseName(this.selectedZodiac);
        const shareText = `我的${zodiacName}今日运势：${this.getCurrentDate()}`;
        const shareUrl = window.location.href;
        
        // 生成QQ分享链接
        const qqUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        
        // 在新窗口打开QQ分享
        window.open(qqUrl, '_blank', 'width=600,height=400');
        this.showMessage('QQ分享窗口已打开', 'success');
    }

    saveSelectedZodiac() {
        localStorage.setItem('selectedZodiac', this.selectedZodiac);
    }

    loadSelectedZodiac() {
        return localStorage.getItem('selectedZodiac') || '';
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new FortuneApp();
});

// 添加星座运势相关的CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
    
    .fortune-card {
        transition: all 0.3s ease;
    }
    
    .fortune-card:hover {
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);