// 课程表数据
const scheduleData = {
    timeSlots: [
        '08:50-09:30',
        '09:40-10:20', 
        '10:30-11:10',
        '11:20-12:00',
        '14:05-14:45',
        '14:55-15:35'
    ],
    courses: {
        '周一': [
            '英语',
            '语文',
            '数学', 
            '综合/围棋',
            '美术',
            '体育'
        ],
        '周二': [
            '语文',
            '数学',
            '道法',
            '语文',
            '音乐',
            '体育'
        ],
        '周三': [
            '语文',
            '英语',
            '语文',
            '美术',
            '体育健康',
            '科学'
        ],
        '周四': [
            '语文',
            '语文',
            '数学',
            '音乐',
            '体育',
            '书法'
        ],
        '周五': [
            '数学',
            '语文',
            '道法',
            '劳动',
            '体育',
            '班会'
        ]
    }
};

// 科目颜色映射 - 使用高对比度纯色，确保不同课程颜色区分度高
const subjectColors = {
    '语文': '#dc2626',      // 鲜红色
    '数学': '#2563eb',      // 鲜蓝色
    '英语': '#16a34a',      // 鲜绿色
    '体育': '#e11d48',      // 玫瑰红色
    '音乐': '#ea580c',      // 橙色
    '美术': '#9333ea',      // 紫色
    '科学': '#0891b2',      // 青色
    '道法': '#1e40af',      // 深蓝色
    '综合/围棋': '#ca8a04',  // 金黄色
    '体育健康': '#e11d48',   // 玫瑰红色（与体育相同）
    '劳动': '#15803d',      // 深绿色
    '书法': '#7c3aed',      // 深紫色
    '班会': '#374151'       // 深灰色
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    renderSchedule();
    setupImageInput();
});

// 渲染课程表
function renderSchedule() {
    const scheduleBody = document.getElementById('scheduleBody');
    const days = ['周一', '周二', '周三', '周四', '周五'];
    
    scheduleBody.innerHTML = '';
    
    scheduleData.timeSlots.forEach((timeSlot, index) => {
        const row = document.createElement('tr');
        
        // 时间列
        const timeCell = document.createElement('td');
        timeCell.className = 'p-2';
        timeCell.innerHTML = `
            <div class="time-column-slot">
                <div class="flex flex-col items-center justify-center text-blue-600">
                    <i class="fas fa-clock mb-1 text-base"></i>
                    <span class="text-base leading-tight">${timeSlot}</span>
                </div>
            </div>
        `;
        row.appendChild(timeCell);
        
        // 课程列
        days.forEach(day => {
            const courseCell = document.createElement('td');
            courseCell.className = 'p-2';
            
            const course = scheduleData.courses[day][index];
            if (course && course.trim() !== '') {
                courseCell.innerHTML = `
                    <div class="time-slot">
                        <div class="subject-tag" style="background: ${subjectColors[course] || '#6b7280'}">
                            ${course}
                        </div>
                    </div>
                `;
            } else {
                courseCell.innerHTML = `
                    <div class="time-slot">
                        <span class="text-gray-400 text-sm">
                            <i class="fas fa-coffee"></i> 休息
                        </span>
                    </div>
                `;
            }
            
            row.appendChild(courseCell);
        });
        
        scheduleBody.appendChild(row);
        
        // 在第4节课后添加午休空行（index为3表示第4节课）
        if (index === 3) {
            const lunchBreakRow = document.createElement('tr');
            lunchBreakRow.className = 'lunch-break-row';
            
            // 午休时间列
            const lunchTimeCell = document.createElement('td');
            lunchTimeCell.className = 'p-2';
            lunchTimeCell.innerHTML = `
                <div class="time-column-slot">
                    <div class="flex flex-col items-center justify-center text-orange-600">
                        <i class="fas fa-utensils mb-1 text-base"></i>
                        <span class="text-base leading-tight">12:00-14:05</span>
                    </div>
                </div>
            `;
            lunchBreakRow.appendChild(lunchTimeCell);
            
            // 午休内容列
            days.forEach(() => {
                const lunchCell = document.createElement('td');
                lunchCell.className = 'p-2';
                lunchCell.innerHTML = `
                    <div class="lunch-break-slot p-4 text-center min-h-[70px] flex items-center justify-center bg-yellow-200 rounded-lg">
                        <div class="text-orange-600 font-semibold">
                            <span class="text-sm">午休时间</span>
                        </div>
                    </div>
                `;
                lunchBreakRow.appendChild(lunchCell);
            });
            
            scheduleBody.appendChild(lunchBreakRow);
        }
    });
}

// 设置图片输入功能
function setupImageInput() {
    const imageUrlInput = document.getElementById('imageUrl');
    
    // 页面加载时检查是否有默认值
    if (imageUrlInput.value.trim()) {
        previewImage(imageUrlInput.value.trim());
    }
    
    // 输入框变化时预览图片
    imageUrlInput.addEventListener('input', function() {
        const url = this.value.trim();
        if (url) {
            previewImage(url);
        } else {
            hideImagePreview();
        }
    });
    
    // 回车键应用图片
    imageUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyImage();
        }
    });
}

// 预览图片
function previewImage(url) {
    const previewImg = document.getElementById('previewImg');
    const imagePreview = document.getElementById('imagePreview');
    const defaultPreview = document.getElementById('defaultPreview');
    
    previewImg.onload = function() {
        imagePreview.classList.remove('hidden');
        defaultPreview.classList.add('hidden');
    };
    
    previewImg.onerror = function() {
        hideImagePreview();
        showNotification('图片加载失败，请检查URL是否正确', 'error');
    };
    
    previewImg.src = url;
}

// 隐藏图片预览
function hideImagePreview() {
    const imagePreview = document.getElementById('imagePreview');
    const defaultPreview = document.getElementById('defaultPreview');
    
    imagePreview.classList.add('hidden');
    defaultPreview.classList.remove('hidden');
}

// 应用图片到课程表背景
function applyImage() {
    const imageUrl = document.getElementById('imageUrl').value.trim();
    
    if (!imageUrl) {
        showNotification('请先输入图片URL地址', 'warning');
        return;
    }
    
    // 验证URL格式
    try {
        new URL(imageUrl);
    } catch (e) {
        showNotification('请输入有效的图片URL地址', 'error');
        return;
    }
    
    // 显示图片预览
    previewImage(imageUrl);
    
    // 创建图片元素用于颜色提取
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = function() {
        // 提取图片主要颜色
        const dominantColors = extractDominantColors(img);
        
        // 应用带有颜色过渡的背景
        applyImageWithColorTransition(imageUrl, dominantColors);
        
        showNotification('背景图片应用成功！', 'success');
    };
    
    img.onerror = function() {
        // 如果图片加载失败，使用默认方式
        applySimpleImageBackground(imageUrl);
        showNotification('图片加载成功，使用默认背景模式', 'success');
    };
    
    img.src = imageUrl;
}

// 提取图片主要颜色
function extractDominantColors(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 设置较小的画布尺寸以提高性能
    const size = 50;
    canvas.width = size;
    canvas.height = size;
    
    // 绘制缩放后的图片
    ctx.drawImage(img, 0, 0, size, size);
    
    try {
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;
        
        // 收集颜色数据
        const colorMap = {};
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const alpha = data[i + 3];
            
            // 跳过透明像素
            if (alpha < 128) continue;
            
            // 将颜色量化以减少颜色数量
            const quantizedR = Math.floor(r / 32) * 32;
            const quantizedG = Math.floor(g / 32) * 32;
            const quantizedB = Math.floor(b / 32) * 32;
            
            const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
            colorMap[colorKey] = (colorMap[colorKey] || 0) + 1;
        }
        
        // 找出最常见的颜色
        const sortedColors = Object.entries(colorMap)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([color]) => {
                const [r, g, b] = color.split(',').map(Number);
                return { r, g, b };
            });
        
        return sortedColors.length > 0 ? sortedColors : [
            { r: 99, g: 102, b: 241 },  // 默认蓝色
            { r: 139, g: 92, b: 246 },  // 默认紫色
            { r: 168, g: 85, b: 247 }   // 默认粉紫色
        ];
        
    } catch (e) {
        // 如果无法提取颜色（跨域等问题），返回默认颜色
        return [
            { r: 99, g: 102, b: 241 },
            { r: 139, g: 92, b: 246 },
            { r: 168, g: 85, b: 247 }
        ];
    }
}

// 应用带有颜色过渡的背景
function applyImageWithColorTransition(imageUrl, colors) {
    const scheduleTable = document.getElementById('scheduleTable');
    
    // 创建颜色字符串
    const color1 = `rgba(${colors[0].r}, ${colors[0].g}, ${colors[0].b}, 0.8)`;
    const color2 = colors[1] ? `rgba(${colors[1].r}, ${colors[1].g}, ${colors[1].b}, 0.6)` : color1;
    const color3 = colors[2] ? `rgba(${colors[2].r}, ${colors[2].g}, ${colors[2].b}, 0.4)` : color2;
    
    // 创建复合背景：渐变 + 图片
    const gradientBackground = `
        radial-gradient(ellipse at center, transparent 30%, ${color3} 70%, ${color2} 85%, ${color1} 100%),
        linear-gradient(45deg, ${color1} 0%, transparent 30%, transparent 70%, ${color2} 100%),
        url('${imageUrl}')
    `;
    
    scheduleTable.style.backgroundImage = gradientBackground;
    scheduleTable.style.backgroundSize = 'cover, cover, cover';
    scheduleTable.style.backgroundPosition = 'center, center, center';
    scheduleTable.style.backgroundRepeat = 'no-repeat, no-repeat, no-repeat';
    scheduleTable.style.backgroundBlendMode = 'normal, overlay, normal';
    
    // 移除单色背景，让渐变效果更明显
    scheduleTable.style.backgroundColor = 'transparent';
    scheduleTable.style.backdropFilter = 'blur(2px)';
}

// 简单图片背景应用（备用方案）
function applySimpleImageBackground(imageUrl) {
    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.style.backgroundImage = `url('${imageUrl}')`;
    scheduleTable.style.backgroundSize = 'cover';
    scheduleTable.style.backgroundPosition = 'center';
    scheduleTable.style.backgroundRepeat = 'no-repeat';
    scheduleTable.style.backgroundColor = 'rgba(99, 102, 241, 0.85)';
    scheduleTable.style.backdropFilter = 'blur(5px)';
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="${icons[type]} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 添加一些交互效果
document.addEventListener('DOMContentLoaded', function() {
    // 为课程格子添加点击效果
    document.addEventListener('click', function(e) {
        if (e.target.closest('.time-slot')) {
            const slot = e.target.closest('.time-slot');
            slot.style.transform = 'scale(0.95)';
            setTimeout(() => {
                slot.style.transform = 'scale(1)';
            }, 150);
        }
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            applyImage();
        }
    });
});

// 导出功能（可选）
function exportSchedule() {
    // 这里可以添加导出课程表为图片的功能
    showNotification('导出功能开发中...', 'info');
}

// 重置背景
function resetBackground() {
    document.getElementById('imageUrl').value = '';
    hideImagePreview();
    
    // 移除背景图片和所有相关样式
    const scheduleTable = document.getElementById('scheduleTable');
    scheduleTable.style.backgroundImage = '';
    scheduleTable.style.backgroundSize = '';
    scheduleTable.style.backgroundPosition = '';
    scheduleTable.style.backgroundRepeat = '';
    scheduleTable.style.backgroundBlendMode = '';
    scheduleTable.style.backgroundColor = '#6366f1';
    scheduleTable.style.backdropFilter = '';
    
    showNotification('背景已重置', 'success');
}
