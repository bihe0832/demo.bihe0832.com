// 图书推荐系统主要功能模块
class BookRecommendationSystem {
    constructor() {
        this.books = [];
        this.filteredBooks = [];
        this.currentCategory = 'all';
        this.currentTag = 'all';
        this.currentBestage = 'all';
        this.searchQuery = '';
        this.currentBookIndex = 0;
        this.carouselImages = [];
        this.currentImageIndex = 0;
        
        this.init();
    }

    // 初始化系统
    async init() {
        try {
            await this.loadBooks();
            this.setupEventListeners();
            this.renderCategories();
            this.renderBestages();
            this.renderTags();
            this.renderBooks();
            this.hideLoading();
        } catch (error) {
            console.error('初始化失败:', error);
            this.showError('加载图书数据失败，请刷新页面重试');
        }
    }

    // 加载图书数据 - 三级数据加载策略
    async loadBooks() {
        try {
            try {
                const response = await fetch('./book_simple.json');
                if (response.ok) {
                    const books = await response.json();
//                    this.books = books.filter(book=> book.version > 2)
                    this.books = books;
                    this.filteredBooks = [...this.books];
                    console.log('成功加载本地JSON数据:', this.books.length, '本书籍');
                    return;
                }
            } catch (error) {
                console.log('本地JSON文件加载失败，使用内置数据:', error.message);
            }
        } catch (error) {
            console.error('所有数据源加载失败:', error);
            this.books = this.getMockData();
            this.filteredBooks = [...this.books];
            console.log('使用内置备用数据:', this.books.length, '本书籍');
        }
    }

    // 获取内置备用数据（当远程API和本地JSON文件都无法加载时使用）
    getMockData() {
        console.log('使用内置备用数据');
        return [ ];
    }

    // 设置事件监听器
    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterBooks();
        });

        // 分类筛选
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                this.handleCategoryClick(e.target);
            }
            if (e.target.classList.contains('bestage-btn')) {
                this.handleBestageClick(e.target);
            }
            if (e.target.classList.contains('tag-btn')) {
                this.handleTagClick(e.target);
            }
            // 添加关键词标签点击处理
            if (e.target.classList.contains('keyword-tag')) {
                e.stopPropagation(); // 阻止事件冒泡
                this.handleKeywordTagClick(e.target);
                return; // 直接返回，不执行后续的图书卡片点击处理
            }
            if (e.target.closest('.book-card')) {
                this.handleBookClick(e.target.closest('.book-card'));
            }
        });

        // 模态框控制
        this.setupModalListeners();
    }

    // 设置模态框监听器
    setupModalListeners() {
        const modal = document.getElementById('bookModal');
        const closeBtn = document.getElementById('closeModal');
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');

        closeBtn.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal();
        });

        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('show')) {
                if (e.key === 'Escape') this.closeModal();
                if (e.key === 'ArrowLeft') this.previousImage();
                if (e.key === 'ArrowRight') this.nextImage();
            }
        });
    }

    // 处理分类点击
    handleCategoryClick(button) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentCategory = button.dataset.category;
        this.filterBooks();
    }

    // 处理年龄分类点击
    handleBestageClick(button) {
        document.querySelectorAll('.bestage-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentBestage = button.dataset.bestage;
        this.filterBooks();
    }

    // 处理标签点击
    handleTagClick(button) {
        document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.currentTag = button.dataset.tag;
        this.filterBooks();
    }

    // 处理关键词标签点击 - 修改为选中标签而非搜索
    handleKeywordTagClick(tagElement) {
        const keyword = tagElement.textContent.trim();

        // 阻止事件冒泡，避免触发图书详情弹框
        event.stopPropagation();

        // 清除所有标签的选中状态
        document.querySelectorAll('.tag-btn').forEach(btn => btn.classList.remove('active'));

        // 找到对应的标签按钮并选中
        const targetTagBtn = document.querySelector(`[data-tag="${keyword}"]`);
        if (targetTagBtn) {
            targetTagBtn.classList.add('active');
            this.currentTag = keyword;
        } else {
            // 如果没有找到对应的标签按钮，选中"全部标签"
            const allTagBtn = document.querySelector('[data-tag="all"]');
            if (allTagBtn) {
                allTagBtn.classList.add('active');
            }
            this.currentTag = 'all';
        }

        // 执行筛选
        this.filterBooks();

        // 滚动到搜索结果区域
        document.getElementById('booksGrid').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // 处理图书点击
    handleBookClick(card) {
        const bookId = parseInt(card.dataset.bookId);
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            // 检查imageList是否为空
            if (!book.imageList || book.imageList.length === 0) {
                // 显示提示信息
                this.showImageNotAvailableMessage();
                return;
            }
            this.showBookDetail(book);
        }
    }

    // 渲染分类按钮
    renderCategories() {
        const categories = [...new Set(this.books.map(book => book.category))];
        const container = document.getElementById('categoryButtons');

        container.innerHTML = categories.map(category => `
            <button class="category-btn px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all text-sm" data-category="${category}">
                ${category}
            </button>
        `).join('');
    }

    // 渲染年龄分类按钮
    renderBestages() {
        const bestages = [...new Set(this.books.map(book => book.bestage).filter(age => age))];
        const container = document.getElementById('bestageButtons');

        container.innerHTML = bestages.map(bestage => `
            <button class="bestage-btn px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all text-sm" data-bestage="${bestage}">
                ${bestage}
            </button>
        `).join('');
    }

    // 渲染标签按钮
    renderTags() {
        const allKeywords = this.books.flatMap(book => book.keywords || []);
        const uniqueKeywords = [...new Set(allKeywords)];
        const container = document.getElementById('tagButtons');

        container.innerHTML = `
            <button class="tag-btn active px-3 py-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all text-xs" data-tag="all">
                全部标签
            </button>
            ${uniqueKeywords.map(keyword => `
                <button class="tag-btn px-3 py-1 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all text-xs" data-tag="${keyword}">
                    ${keyword}
                </button>
            `).join('')}
        `;
    }

    // 筛选图书
    filterBooks() {
        this.filteredBooks = this.books.filter(book => {
            const bookTitle = book.bookList || book.title || '';
            const matchesSearch = !this.searchQuery ||
                bookTitle.toLowerCase().includes(this.searchQuery) ||
                book.author.toLowerCase().includes(this.searchQuery) ||
                (book.keywords && book.keywords.some(keyword =>
                    keyword.toLowerCase().includes(this.searchQuery)
                )) ||
                (book.recommend && book.recommend.toLowerCase().includes(this.searchQuery)) ||
                (book.bestage && book.bestage.toLowerCase().replace(/\s+/g, '').includes(this.searchQuery.replace(/\s+/g, '')));

            const matchesCategory = this.currentCategory === 'all' ||
                book.category === this.currentCategory;

            const matchesBestage = this.currentBestage === 'all' ||
                book.bestage === this.currentBestage;

            const matchesTag = this.currentTag === 'all' ||
                (book.keywords && book.keywords.includes(this.currentTag));

            return matchesSearch && matchesCategory && matchesBestage && matchesTag;
        });

        this.renderBooks();
    }

    // 渲染图书网格
    renderBooks() {
        const container = document.getElementById('booksGrid');
        const noResults = document.getElementById('noResults');

        if (this.filteredBooks.length === 0) {
            container.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }

        noResults.classList.add('hidden');
        container.innerHTML = this.filteredBooks.sort(function(a,b){return a.id - b.id}).map(book => this.createBookCard(book)).join('');

        // 添加淡入动画
        container.querySelectorAll('.book-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
    }

    // 创建图书卡片
    createBookCard(book) {
        const doubanStars = this.generateStars(book.rating?.average || 0, 10);
        const wereadRating = book.wereadRating || {};
        const wereadPercent = wereadRating.total ?
            Math.round((wereadRating.good / wereadRating.total) * 100) : 0;

        // 处理书名显示
        const bookTitle = book.title || book.bookList || '未知书名';
        const bestAge = book.bestage ? `<span class="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">${book.bestage}</span>` : '';

        return `
            <div class="book-card rounded-2xl overflow-hidden shadow-lg cursor-pointer" data-book-id="${book.id}">
                <div class="relative overflow-hidden">
                    <img src="${book.imageList && book.imageList.length > 0 ? book.imageList[0] : './photos/' + book.localFolder + '_photo.jpg'}" alt="${bookTitle}" class="book-image w-full aspect-[3/4] object-cover">
                    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                        ${book.category}
                    </div>
                    ${bestAge ? `<div class="absolute top-3 left-3">${bestAge}</div>` : ''}
                </div>

                <div class="p-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2">${bookTitle}</h3>
                    <p class="text-sm text-gray-600 mb-3">${book.author}</p>
                     <!-- 关键词标签 -->
                      <div class="flex flex-wrap gap-1 mb-3">
                          ${(book.keywords || []).slice(0, 3).map(keyword =>
                              `<span class="keyword-tag">${keyword}</span>`
                          ).join('')}
                      </div>
                    <!-- 豆瓣评分 -->
                    <div class="rating-container mb-2">
                        <span class="rating-text">豆瓣：${book.rating?.average || '评分不足'}</span>
                        <span class="rating-text">(${book.rating?.numRaters || 0}人)</span>
                        <div class="rating-stars">${doubanStars}</div>
                    </div>

                    <!-- 微信读书评分 -->
                    <div class="rating-container mb-3">
                        <span class="rating-text">
                          ${wereadRating.total > 0
                            ? (wereadRating.title !== '评分不足'
                                ? `微信读书：<i class="fas fa-star text-yellow-500 ml-1">${wereadRating.title}</i> ${wereadPercent}% 推荐 (${wereadRating?.total || 0}人) `
                                : `微信读书：${wereadPercent}% 推荐 (${wereadRating?.total || 0}人)`
                            )
                            : `微信读书：${wereadRating.title || '评分不足'}`
                          }
                        </span>
                    </div>

                    <p class="text-sm text-gray-600 line-clamp-4">${book.recommend || '暂无简介'}</p>
                </div>
            </div>
        `;
    }

    // 生成星级评分
    generateStars(rating, maxRating = 10) {
        const stars = Math.round((rating / maxRating) * 5);
        let starsHtml = '';

        for (let i = 1; i <= 5; i++) {
            if (i <= stars) {
                starsHtml += '<i class="fas fa-star rating-star"></i>';
            } else {
                starsHtml += '<i class="fas fa-star rating-star empty"></i>';
            }
        }

        return starsHtml;
    }

    // 显示图书详情
    showBookDetail(book) {
        this.setupCarouselImages(book);
        this.renderBookDetails(book);
        this.showModal();
    }

    // 设置轮播图片
    setupCarouselImages(book) {
        // 使用imageList中的图片
        this.carouselImages = book.imageList && book.imageList.length > 0
            ? book.imageList
            : ["./photos/"+ book.localFolder + "_photo.jpg"];
        this.currentImageIndex = 0;
        this.renderCarousel();
    }

    // 渲染轮播图
    renderCarousel() {
        const container = document.getElementById('carouselImages');
        const indicators = document.getElementById('carouselIndicators');

        container.innerHTML = this.carouselImages.map((image, index) => `
            <img src="${image}" alt="图书图片 ${index + 1}"
                 class="carousel-image ${index === this.currentImageIndex ? 'active' : '' } object-contain w-full h-full">
        `).join('');

        indicators.innerHTML = this.carouselImages.map((_, index) => `
            <button class="carousel-indicator ${index === this.currentImageIndex ? 'active' : ''} object-contain w-full h-full"
                    onclick="bookSystem.goToImage(${index})"></button>
        `).join('');
    }

    // 切换到指定图片
    goToImage(index) {
        this.currentImageIndex = index;
        this.renderCarousel();
    }

    // 上一张图片
    previousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
        this.renderCarousel();
    }

    // 下一张图片
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
        this.renderCarousel();
    }

    // 渲染图书详情
    renderBookDetails(book) {
        const container = document.getElementById('bookDetails');

        container.innerHTML = `
            <div class="flex flex-row gap-4">
                <button onclick="window.open('${book.xiaohongshu}', '_blank')"
                        class="flex-1 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
                    <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>前往小红书查看</span>
                </button>
                <button onclick="window.open('${book.wxmp}', '_blank')"
                        class="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap">
                    <svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.5 2C13.5 2 13.5 2 13.5 2L13.5 2C13.5 2 13.5 2 13.5 2zM13.5 2C13.5 2 13.5 2 13.5 2L13.5 2C13.5 2 13.5 2 13.5 2z"/>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                    </svg>
                    <span>前往公众号查看</span>
                </button>
            </div>
        `;
    }

    // 显示模态框
    showModal() {
        const modal = document.getElementById('bookModal');
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }

    // 关闭模态框
    closeModal() {
        const modal = document.getElementById('bookModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
        document.body.style.overflow = 'auto';
    }

    // wxmp字段现在是普通URL，直接通过window.open打开

    // 统计信息功能已移除

    // 隐藏加载状态
    hideLoading() {
        document.getElementById('loadingState').classList.add('hidden');
    }

    // 显示图片不可用提示
    showImageNotAvailableMessage() {
        // 创建提示弹框
        const alertDiv = document.createElement('div');
        alertDiv.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50';
        alertDiv.innerHTML = `
            <div class="bg-white rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl transform">
                <div class="text-6xl mb-4">📚</div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">图片正在完善中</h3>
                <p class="text-gray-600 mb-6">书籍图片正在完善，敬请期待~</p>
                <button class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" onclick="this.closest('.fixed').remove()">
                    知道了
                </button>
            </div>
        `;

        document.body.appendChild(alertDiv);

        // 3秒后自动关闭
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }

    // 显示错误信息
    showError(message) {
        const loadingState = document.getElementById('loadingState');
        loadingState.innerHTML = `
            <div class="text-center py-12">
                <div class="text-6xl text-red-300 mb-4">⚠️</div>
                <h3 class="text-xl font-semibold text-red-600 mb-2">加载失败</h3>
                <p class="text-red-500">${message}</p>
                <button onclick="location.reload()" class="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    重新加载
                </button>
            </div>
        `;
    }
}

// 初始化系统
let bookSystem;
document.addEventListener('DOMContentLoaded', () => {
    bookSystem = new BookRecommendationSystem();
});

// 全局函数供HTML调用
window.bookSystem = bookSystem;