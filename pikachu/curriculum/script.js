// 全局变量存储从JSON加载的数据
let scheduleData = null;
let subjectColors = null;

const DEFAULT_BACKGROUND_GRADIENT = 'linear-gradient(135deg, #f9a8d4 0%, #f472b6 50%, #ec4899 100%)';
const DEFAULT_BACKGROUND_COLOR = 'rgba(244, 114, 182, 0.85)';
const FALLBACK_DOMINANT_COLORS = [
    { r: 249, g: 168, b: 212 },
    { r: 244, g: 114, b: 182 },
    { r: 236, g: 72, b: 153 }
];

// 异步加载数据
async function loadData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Failed to load data.json');
        }
        const data = await response.json();
        scheduleData = {
            timeSlots: data.timeSlots,
            courses: data.courses
        };
        subjectColors = data.subjectColors;
        return true;
    } catch (error) {
        console.error('Error loading data:', error);
        return false;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async function() {
    // 先加载数据，然后初始化页面
    const dataLoaded = await loadData();
    if (dataLoaded) {
        renderSchedule();
        setupImageInput();
    } else {
        // 如果数据加载失败，显示错误信息
        document.body.innerHTML = '<div class="flex items-center justify-center min-h-screen"><div class="text-red-500 text-xl">数据加载失败，请检查data.json文件</div></div>';
    }
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
        const [startTime, endTime] = timeSlot.split('-');
        timeCell.innerHTML = `
            <div class="time-column-slot">
                <div class="flex flex-col items-center justify-center text-blue-600 md:flex-col">
                    <div class="flex flex-col items-center justify-center block md:hidden">
                        <span class="text-sm leading-tight">${startTime}</span>
                        <span class="text-sm leading-tight">${endTime}</span>
                    </div>
                    <div class="hidden md:flex md:flex-col md:items-center md:justify-center">
                        <i class="fas fa-clock text-blue-600 mb-1"></i>
                        <span class="text-sm leading-tight">${timeSlot}</span>
                    </div>
                </div>
            </div>
        `;
        row.appendChild(timeCell);
        
        // 课程列
        days.forEach(day => {
            const courseCell = document.createElement('td');
            courseCell.className = 'p-2';
            const course = scheduleData.courses[day][index];
            const color = subjectColors[course] || '#6b7280';
            
            courseCell.innerHTML = `
                <div class="course-slot p-4 text-center min-h-[70px] flex items-center justify-center rounded-lg cursor-pointer hover:opacity-80 transition-opacity" 
                     style="background-color: ${color}E0; border: 2px solid ${color};" 
                     data-day="${day}" 
                     data-time="${timeSlot}" 
                     data-course="${course}">
                    <div class="text-white font-semibold" style="color: white;">
                        <span class="text-base">${course}</span>
                    </div>
                </div>
            `;
            row.appendChild(courseCell);
        });
        
        scheduleBody.appendChild(row);
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
        
        return sortedColors.length > 0 ? sortedColors : FALLBACK_DOMINANT_COLORS;
    } catch (e) {
        // 如果无法提取颜色（跨域等问题），返回默认颜色
        return FALLBACK_DOMINANT_COLORS;
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
    scheduleTable.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
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
    let isHighlightMode = false;
    let currentHighlightColor = null;
    
    // 为课程格子添加点击效果和高亮功能
    document.addEventListener('click', function(e) {
        if (e.target.closest('.course-slot')) {
            const slot = e.target.closest('.course-slot');
            
            // 点击动画效果
            slot.style.transform = 'scale(0.95)';
            setTimeout(() => {
                slot.style.transform = 'scale(1)';
            }, 150);
            
            // 获取点击的课程名称
            const courseName = slot.getAttribute('data-course');
            
            if (courseName) {
                // 获取课程颜色
                const courseColor = subjectColors[courseName];
                
                // 如果当前已经高亮相同颜色，则取消高亮
                if (isHighlightMode && currentHighlightColor === courseColor) {
                    isHighlightMode = false;
                    currentHighlightColor = null;
                    clearHighlight();
                } else {
                    // 否则高亮新的颜色
                    isHighlightMode = true;
                    currentHighlightColor = courseColor;
                    highlightCourse(courseColor);
                }
            }
        }
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            applyImage();
        }
        // 按ESC键取消高亮
        if (e.key === 'Escape' && isHighlightMode) {
            isHighlightMode = false;
            currentHighlightColor = null;
            clearHighlight();
        }
    });
});

// 高亮指定颜色的课程函数
function highlightCourse(targetColor) {
    const allSlots = document.querySelectorAll('.course-slot');
    
    allSlots.forEach(slot => {
        const slotCourse = slot.getAttribute('data-course');
        const slotColor = subjectColors[slotCourse];
        
        // 检查是否为相同颜色
        const isSameColor = slotColor === targetColor;
        
        if (isSameColor) {
            // 高亮相同颜色的课程
            slot.style.opacity = '1';
            slot.style.transform = 'scale(1.05)';
            slot.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            slot.style.zIndex = '10';
            slot.style.transition = 'all 0.3s ease';
        } else {
            // 其他课程变暗
            slot.style.opacity = '0.3';
            slot.style.transform = 'scale(0.95)';
            slot.style.filter = 'grayscale(50%)';
            slot.style.transition = 'all 0.3s ease';
        }
    });
}

// 清除高亮效果的函数
function clearHighlight() {
    const allSlots = document.querySelectorAll('.course-slot');
    
    allSlots.forEach(slot => {
        slot.style.opacity = '';
        slot.style.transform = '';
        slot.style.boxShadow = '';
        slot.style.zIndex = '';
        slot.style.filter = '';
        slot.style.transition = 'all 0.3s ease';
    });
    
    // 清除过渡效果
    setTimeout(() => {
        const allSlots = document.querySelectorAll('.course-slot');
        allSlots.forEach(slot => {
            slot.style.transition = '';
        });
    }, 300);
}

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
    scheduleTable.style.backgroundColor = '';
    scheduleTable.style.background = DEFAULT_BACKGROUND_GRADIENT;
    scheduleTable.style.backdropFilter = '';
    
    showNotification('背景已重置', 'success');
}