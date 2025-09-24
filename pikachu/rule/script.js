// 儿童行为要求数据
const pyramidData = 

{
  "level1": {
    "title": "等级三",
    "description": "最高等级，必须做到",
    "details": [
      "按要求完成老师安排的必做作业",
      "在规划的时间里有质量的完成弹琴任务",
      "按时上课、不迟到、如果想请假至少提前半天",
      "距离吃饭还剩一个小时不可以吃零食"
    ]
  },
  "level2": {
    "title": "等级二",
    "description": "中间等级，尽量做到",
    "details": [
      "需要在规定的时间吃完自己盛的饭，如果没吃完没有零食，不要有情绪",
      "如果不吃了吃不完就说出来，不要不吃也不说不吃了，在那里熬时间",
      "每天的零食配额已经用完了还要吃零食",
      "节假日每天看电视15分钟",
      "不是节假日要看电视",
      "看电视最后一个电视时间已经超时还要看完",
      "看电视时间已经超时了还要多看一个",
      "节假日玩游戏15分钟",
      "玩游戏最后一局没赢还要玩",
      "玩游戏最后一局时间已经超时了还要玩",
      "不是节假日要玩游戏",
      "看书时间超时不休息眼睛还要继续",
      "看屏幕时间超时不休息眼睛还要继续",
      "尽可能早的上楼刷牙洗澡",
      "洗澡的时候不愿意洗头"
    ]
  },
  "level3": {
    "title": "等级一",
    "description": "最低等级，做到更好",
    "details": [
      "按要求完成老师安排的选做作业",
      "说好要出门，临出门说不想出去",
      "说出去运动临时不愿意",
      "说出去户外临时不愿意",
      "说好什么事情临时改变主意不愿意做",
      "做事情的时候一件事情还没干完就想干另一件",
      "自己的玩具、学习工具等丢三落四，不知道放哪里",
      "出门在外吃饭自由，想吃多少吃多少，想吃什么吃什么",
      "不愿意喝牛奶",
      "不愿意吃长高高",
      "户外运动非要穿裙子",
      "户外不愿意穿防晒衣",
      "户外不愿意戴防晒帽",
      "不愿意戴自己的眼镜",
      "小电驴椅子湿了、太烫各种发脾气",
      "每天非要爸爸妈妈一起送去上学",
      "师傅居家办公的时候非要让下来陪着玩",
      "玩游戏或者做事情的时候非要给自己特殊的规则",
      "总是欺负妹妹，让妹妹背锅",
      "晚上到点不愿意睡觉，爬上爬下就是不睡觉",
      "睡前非要讲睡前故事，讲完了还要让再来一个",
      "睡觉的时候爬上来乱动妹妹",
      "该睡觉了还不睡，还在那里黏唧唧",
      "因为拖拖拉拉导致刷牙太晚，刷牙时有情绪哼哼唧唧，说弄疼了"
    ]
  }
};

// 渲染详细内容
function renderDetails(levelKey, containerId) {
    const container = document.getElementById(containerId);
    const level = pyramidData[levelKey];
    
    container.innerHTML = '';
    
    level.details.forEach((detail, index) => {
        const detailElement = document.createElement('div');
        detailElement.className = 'detail-item bg-white/10 backdrop-blur-sm rounded-xl p-4 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg border border-white/10';
        
        detailElement.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-2 h-2 bg-white/60 rounded-full mt-2"></div>
                <div class="flex-1">
                    <p class="font-medium text-sm leading-relaxed text-white font-bold">${detail}</p>
                </div>
            </div>
        `;
        
        // 添加点击效果
        detailElement.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.style.boxShadow = '';
                }, 150);
            }, 150);
        });
        
        container.appendChild(detailElement);
    });
}

// 更新统计数据
function updateStatistics() {
    document.getElementById('level1-count').textContent = pyramidData.level1.details.length;
    document.getElementById('level2-count').textContent = pyramidData.level2.details.length;
    document.getElementById('level3-count').textContent = pyramidData.level3.details.length;
}

// 添加交互效果
function addInteractiveEffects() {
    // 为金字塔层级添加点击效果
    const pyramidLevels = document.querySelectorAll('.pyramid-level');
    
    pyramidLevels.forEach((level, index) => {
        level.addEventListener('click', function() {
            // 添加点击波纹效果
            const ripple = document.createElement('div');
            ripple.className = 'absolute inset-0 bg-white bg-opacity-20 rounded-2xl animate-ping';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // 添加鼠标悬停效果
        level.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        level.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 添加滚动动画
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有金字塔层级
    document.querySelectorAll('.pyramid-level').forEach(level => {
        level.style.opacity = '0';
        level.style.transform = 'translateY(50px)';
        level.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(level);
    });
}

// 初始化页面
function initializePage() {
    // 更新标题和描述
    document.getElementById('level1-title').textContent = pyramidData.level1.title;
    document.getElementById('level1-description').textContent = pyramidData.level1.description;
    document.getElementById('level2-title').textContent = pyramidData.level2.title;
    document.getElementById('level2-description').textContent = pyramidData.level2.description;
    document.getElementById('level3-title').textContent = pyramidData.level3.title;
    document.getElementById('level3-description').textContent = pyramidData.level3.description;
    
    // 渲染所有层级的详细内容
    renderDetails('level1', 'level1-details');
    renderDetails('level2', 'level2-details');
    renderDetails('level3', 'level3-details');
    
    // 更新统计数据
    updateStatistics();
    
    // 添加交互效果
    addInteractiveEffects();
    
    // 添加滚动动画
    addScrollAnimations();
    
    // 启用数据更新功能
    enableDataUpdate();
    
    // 添加页面加载完成的提示
    console.log('🎉 儿童行为要求金字塔页面加载完成！');
    console.log('💡 页面已优化，享受美观的视觉体验！');
    
    // 添加一些额外的交互提示
    setTimeout(() => {
        const firstLevel = document.querySelector('.pyramid-level');
        if (firstLevel) {
            firstLevel.style.animation = 'pulse 1s ease-in-out 3';
        }
    }, 1000);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePage);

// 导出数据和函数供外部使用
window.PyramidManager = {
    data: pyramidData,
    updateData: function(newData) {
        Object.assign(pyramidData, newData);
        initializePage();
    },
    getData: function() {
        return pyramidData;
    }
};