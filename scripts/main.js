document.addEventListener('DOMContentLoaded', function () {
//  const hero = new HeroSlider('.swiper-container')
//  hero.start();

//  const cb = function (el, inview) {
//      if(inview) {
//          const ta = new TweenTextAnimation(el);
//          ta.animate();
//      }
//  }

//  const so = new ScrollObserver('.tween-animate-title', cb);

//  const _inviewAnimation = function(el, inview) {
//    if(inview) {
//      el.classList.add('inview');
//    }else {
//      el.classList.remove('inview');
//    }

//  } 

//  const so2 = new ScrollObserver('.cover-slide', this._inviewAnimation);

//  const header = document.querySelector('.header');
//  const _navAnimation = function(el, inview) {
//   if(inview) {
//   header.classList.remove('triggered'); //画面の中に入ったらtriggerdを削除
//    }else {
//   header.classList.add('triggered'); //画面の外に出たらtriggered付ける
//   }

//} 

//const so3 = new ScrollObserver('.nav-trigger', _navAnimation, {once: false});
//once: false→２回目以降のスクロールで解除しないように。

// new MobileMenu();  //ハンバーガー

const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.sides = document.querySelectorAll('.side');
    this._observers = []; //配列
    this._init();
  }

  set observers(val) { //val→setする値（push）を引数として渡す
    this._observers.push(val);
  }

  get observers() { //get→値を取得するメソッド
    return this._observers;
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    Pace.on('done', this._paceDone.bind(this));
    //done→ローダーが完了した時点で呼び出される
    
  }

  _paceDone() {
    this._scrollInit();
  } //画面が更新し終わったあとにAnimationが開始される

  


  _inviewAnimation(el, inview) {
    if(inview) {
      el.classList.add('inview');
    }else {
      el.classList.remove('inview');
    }

  } 

  _navAnimation(el, inview) {
    if(inview) {
      this.header.classList.remove('triggered'); //画面の中に入ったらtriggerdを削除
    }else {
      this.header.classList.add('triggered'); //画面の外に出たらtriggered付ける
    }
  
  }

  _sideAnimation(el, inview) {
    if(inview) {
      this.sides.forEach(side => side.classList.add('inview'));
      //画面内に入った時inviewを繰り返す

    }else {
      this.sides.forEach(side => side.classList.remove('inview'));
      //画面を出た時にクラスを除去
     
    }
  
  }
  
  _textAnimation(el, inview) {
    if(inview) {
        const ta = new TweenTextAnimation(el);
        ta.animate();
    }
}
    //toggleSlideAnimation→画面上に表示されない時はAnimationを無効化→重くならないように

  _toggleSlideAnimation(el, inview) { //inview→画面内に入る
        if(inview) {
          this.hero.start();
        }else {
          this.hero.stop(); //画面の外に出たらストップ
        }
      
      }
    
    _scrollInit() {
      this._observers= new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {once: false});
        //once: false→２回目以降のスクロールで解除しないように。
        //右辺はsetメソッドのvalに渡る
        this._observers= new ScrollObserver('.cover-slide', this._inviewAnimation, {rootMargin: "-200px 0px"});
        this._observers= new ScrollObserver('.appear', this._inviewAnimation);
        this._observers= new ScrollObserver('.tween-animate-title', this._textAnimation);
        this._observers= new ScrollObserver('.swiper-container', this._toggleSlideAnimation.bind(this), {once: false});
        this._observers= new ScrollObserver('#main-content', this._sideAnimation.bind(this), {once: false, rootMargin: "-300px 0px"});
        //#contents→監視対象 _sideAnimation→コールバック関数 rootMargin→発火するタイミングを制御できる。300px経った頃に発火。

    
  }
  
}