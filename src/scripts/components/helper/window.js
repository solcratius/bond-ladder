/*
    User agent checker module
 */

const HTML = document.documentElement;

export const UserAgent = {
  isTouch: false,
  isWindow: false,
  isIE: false,
  set: () => {
    if (HTML.classList.contains('touch')) {
      HTML.classList.remove('touch');
    }

    if (navigator.appVersion.indexOf('Win') !== -1) {
      HTML.classList.add('osWin');
      UserAgent.isWindow = true;
    }
    if (
      navigator.appName === 'Microsoft Internet Explorer' ||
      /MSIE 10/i.test(navigator.userAgent) ||
      /MSIE 9/i.test(navigator.userAgent) ||
      /rv:11.0/i.test(navigator.userAgent)
    ) {
      HTML.classList.add('browserIE');
      UserAgent.isIE = true;
    }

    if ('ontouchstart' in window || navigator.maxTouchPoints) {
      UserAgent.isTouch = true;
      HTML.classList.remove('no-touch');
      document.addEventListener('touchstart', () => {}, true);
    } else {
      HTML.classList.add('no-touch');
    }
  }
};

/*
    Window resize listener module
 */

let curWidth = 0,
  curHeight = 0;
//   time = null,
//   timeout = false;

// const delta = 50,
// callbackOptions = () => {
//   if (curHeight >= 700) {
//     HTML.classList.remove('short');
//   } else {
//     HTML.classList.add('short');
//   }
// },
const findWinW = () => Math.max(HTML.clientWidth, window.innerWidth || 0),
  findWinH = () => Math.max(HTML.clientHeight, window.innerHeight || 0);
// endResize = () => {
//   if (new Date() - time < delta) {
//     setTimeout(endResize, delta);
//   } else {
//     timeout = false;
//     curWidth = findWinW();
//     curHeight = findWinH();

//     callbackOptions();
//     HTML.classList.remove('no-anim');
//     console.log(`WindowSize: ${curWidth} x ${curHeight}`);
//   }
// },
// startResize = () => {
//   time = new Date();

//   if (timeout === false) {
//     timeout = true;
//     HTML.classList.add('no-anim');

//     setTimeout(endResize, delta);
//   }
// };

export const WindowSize = {
  init: () => {
    curWidth = findWinW();
    curHeight = findWinH();

    // if (!UserAgent.isTouch) {
    //   window.addEventListener('resize', startResize);
    // } else {
    //   window.addEventListener('orientationchange', startResize);
    // }
  },
  getWidth: () => curWidth,
  getHeight: () => curHeight,
  getSize: () => [curWidth, curHeight]
};

/*
	Window scroll listener module
 */

let winPos = 0,
  lastWinPos = 0;

const getScrollPos = () => {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  },
  scrollHandler = () => {
    winPos = getScrollPos();
    // triggerMethods(WinScroll.methods);
    console.log(`Y: ${winPos}`);
    lastWinPos = winPos;
  };

export const WindowScroll = {
  // methods: {
  // 	'initFunction': () => { null; }//console.log("Window's scrollTop position is at: " + WinScroll.getPos()); }
  // },

  init: () => {
    winPos = getScrollPos();
    window.addEventListener('scroll', scrollHandler);
  },

  getPos: () => winPos,
  getLastPos: () => lastWinPos,
  getLivePos: () => getScrollPos()
};

// export default class WinScroll {
// 	constructor(winPos) {
// 		// super(prop);
// 		this.userMethod = {
// 			'init': () => { console.log("Window's scrollTop position is at: " + this.getPos()); }
// 		};

// 		this.scrollHandler = this.scrollHandler.bind(this);
// 		this.getPos = this.getPos.bind(this);
// 		this.getLastPos = this.getLastPos.bind(this);

// 		winPos = getScrollPos();
// 		window.addEventListener('scroll', this.scrollHandler);
// 	}

// 	scrollHandler() {
// 		winPos = getScrollPos();
// 		triggerUserMethod(this.userMethod);
// 		lastWinPos = winPos;
// 	}

// 	getPos() { return winPos; }
// 	getLastPos() { return lastWinPos; }
// }
