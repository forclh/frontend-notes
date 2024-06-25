// 数据处理

// 单件商品需要的数据
class UIGoods {
  constructor(g) {
    this.data = g;
    this.choose = 0;
    // totalPrice可以由其他属性计算出来，定义totalPrice属性会造成数据冗余，但是效率相对函数会提高
    // this.totalPrice = 0;
  }
  // 获取当前商品的总价
  getTotalPrice = function () {
    return this.data.price * this.choose;
  }

  // 是否选中了当前商品
  isChoose = function () {
    return this.choose > 0;
  }
  // 下面这两个函数的意义在于以后考虑库存和起购数量时逻辑能够在这里处理
  // 选择的数量+1
  increase() {
    this.choose++;
  }
  // 选择的数量-1
  decrease() {
    if (this.choose > 0) {
      this.choose--;
    }
  }
}

// 整个界面需要的数据和逻辑（以后只需要操作这一个对象）
class UIData {
  constructor() {
    this.uiGoods = [];
    for (let i = 0; i < goods.length; i++) {
      let uig = new UIGoods(goods[i]);
      this.uiGoods.push(uig);
    }
    this.deliveryThreshold = 30;  // 起送
    this.deliveryPrice = 5;  // 配送费
  }
  // 获取总价
  getTotalPrice() {
    return this.uiGoods.reduce((accumulator, currentValue) => accumulator + currentValue.getTotalPrice(), 0);
  }

  // 增加某一件商品的选中数量
  increase(index) {
    this.uiGoods[index].increase();
  }

  // 减少某一件商品的选中数量
  decrease(index) {
    this.uiGoods[index].decrease();
  }

  // 购物车数量
  getTotalChooseNumber() {
    return this.uiGoods.reduce((accumulator, currentValue) => accumulator + currentValue.choose, 0)
  }

  // 购物车是否存在商品
  hasGoodsInCar() {
    return this.getTotalChooseNumber() > 0;
  }

  // 是否可以起送
  isCrossDeliveryThreshold() {
    return this.getTotalPrice() >= this.deliveryThreshold;
  }

  isChoose(index) {
    return this.uiGoods[index].isChoose();
  }

}

// 整个界面
class UI {
  constructor() {
    this.uiData = new UIData();
    this.doms = {
      goodsContainer: document.querySelector('.goods-list'),
      deliveryPrice: document.querySelector('.footer-car-tip'),
      footerPay: document.querySelector('.footer-pay'),
      footerPayInnerSpan: document.querySelector('.footer-pay span'),
      footerCarTotal: document.querySelector('.footer-car-total'),
      footerCar: document.querySelector('.footer-car'),
      badge: document.querySelector('.footer-car-badge'),
    };
    // 拿到购物车相对于视口的坐标位置
    let carRect = this.doms.footerCar.getBoundingClientRect();
    let target = {
      x: carRect.left + carRect.width / 2,
      y: carRect.top + carRect.height / 5,
    }
    // 购物车添加效果的终点位置
    this.target = target;
    this.createHTML();
    this.updateFooter();
    this.listenEvent();

  }
  // 监听各种事件
  listenEvent() {
    // 购物车效果时间
    this.doms.footerCar.addEventListener('animationend', function () {
      // this指向发生变化
      this.classList.remove('animate');
    })
  }

  // 根据商品数据生成商品列表
  createHTML() {
    // 1. 生成html字符串（执行效率低，开发效率高）
    let html = '';
    for (let i = 0; i < this.uiData.uiGoods.length; i++) {
      let g = this.uiData.uiGoods[i];
      html += `<div class="goods-item">
      <img src="${g.data.pic}" alt="" class="goods-pic" />
      <div class="goods-info">
        <h2 class="goods-title">${g.data.title}</h2>
        <p class="goods-desc">
          ${g.data.desc}
        </p>
        <p class="goods-sell">
          <span>月售 ${g.data.sellNumber}</span>
          <span>好评率${g.data.favorRate}</span>
        </p>
        <div class="goods-confirm">
          <p class="goods-price">
            <span class="goods-price-unit">￥</span>
            <span>${g.data.price}</span>
          </p>
          <div class="goods-btns">
            <i index=${i} class="iconfont i-jianhao"></i>
            <span>${g.choose}</span>
            <i index=${i} class="iconfont i-jiajianzujianjiahao"></i>
          </div>
        </div>
      </div>
    </div>`
    }
    this.doms.goodsContainer.innerHTML = html;
    // 2. 一个一个的创建元素（执行效率高，开发效率低）
  }

  increase(index) {
    this.uiData.increase(index);
    this.updateGoodsItem(index);
    this.updateFooter();
    this.addEffect(index);
  }
  decrease(index) {
    this.uiData.decrease(index);
    this.updateGoodsItem(index);
    this.updateFooter();
  }
  // 更新某个商品元素的显示状态
  updateGoodsItem(index) {
    let goodsDom = this.doms.goodsContainer.children[index]
    if (this.uiData.isChoose(index)) {
      goodsDom.classList.add('active');
    } else {
      goodsDom.classList.remove('active');
    }
    let span = goodsDom.querySelector('.goods-btns span');
    span.textContent = this.uiData.uiGoods[index].choose;
  }

  // 更新页脚购物车
  updateFooter() {
    // 总价
    let total = this.uiData.getTotalPrice();
    // 设置配送费
    this.doms.deliveryPrice.textContent = `配送费￥${this.uiData.deliveryPrice}`;
    if (this.uiData.isCrossDeliveryThreshold()) {
      // 可以起送
      this.doms.footerPay.classList.add('active');
    } else {
      this.doms.footerPay.classList.remove('active');
      // 设置起送费还差多少
      let dis = Math.round(this.uiData.deliveryThreshold - total);
      this.doms.footerPayInnerSpan.textContent = `还差￥${dis}元起送`;
    }
    // 设置总价
    this.doms.footerCarTotal.textContent = total.toFixed(2);
    // 设置购物车的样式状态
    if (this.uiData.hasGoodsInCar()) {
      this.doms.footerCar.classList.add('active');
    } else {
      this.doms.footerCar.classList.remove('active');
    }
    // 设置购物车中的数量
    this.doms.badge.textContent = this.uiData.getTotalChooseNumber();
  }

  // 购物车动画
  carAnimate() {
    this.doms.footerCar.classList.add('animate');
  }

  // 添加购物车是抛物线跳跃的元素效果
  addEffect(index) {
    // 找到对应商品的添加按钮
    let btnAdd = this.doms.goodsContainer.children[index].querySelector('.i-jiajianzujianjiahao');
    let rect = btnAdd.getBoundingClientRect();
    // 起始坐标
    let start = {
      x: rect.left,
      y: rect.top
    };

    // 跳
    let div = document.createElement('div')
    div.classList.add('add-to-car');
    let i = document.createElement('i');
    i.className = 'iconfont i-jiajianzujianjiahao';
    // 设置初始位置(使得div元素在X方向匀速运动，i元素在Y方向变速运动来达到抛物线的效果)
    div.style.transform = `translateX(${start.x}px)`;
    i.style.transform = `translateY(${start.y}px)`;
    div.appendChild(i);
    document.body.appendChild(div);

    // 由于连续的js修改cssom树，只会在js执行完后，渲染最后一次修改的结果
    // 因此这里需要强行渲染（reflow），对任何一个布局属性的操作都会导致reflow
    // 或者使用H5的requestAnimationFrame
    div.clientHeight;

    // 设置目标位置
    div.style.transform = `translateX(${this.target.x}px)`;
    i.style.transform = `translateY(${this.target.y}px)`;

    // 
    div.addEventListener('transitionend', () => {
      //  删除div
      div.remove();
      // 购物车动画
      this.carAnimate();  // 箭头函数保证this指向正确
    }, { once: true })

  }

}

let ui = new UI();

// 事件委托
ui.doms.goodsContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('i-jiajianzujianjiahao')) {
    // 采用自定义属性来得到index
    let index = +e.target.getAttribute('index');
    ui.increase(index);

  } else if (e.target.classList.contains('i-jianhao')) {
    let index = +e.target.getAttribute('index');
    ui.decrease(index);
  }
})
