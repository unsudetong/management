window.onload = () => {
  // 기본적인 설정을 위해서 body에 style을 적용했다.
  const body = document.getElementsByTagName('body')[0];
  // body.style.margin = '0px';
  // body.style.overflow = 'hidden';

  // 마찬가지로 canvas에 옵션을 주었다.
  const myCanvas = document.getElementById('myCanvas');
  const ctx = myCanvas.getContext('2d');
  let width = (myCanvas.width = screen.width);
  let height = (myCanvas.height = screen.height);

  let arr = [];
  const maxNum = 100;
  const tsc = 1;
  const speed = 0.3;
  const sc = 1.3;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = 0;
  const mv = 20;
  const min = 1;

  // 눈송이를 클래스 형태로 만들었다.
  class Flake {
    constructor(x, y, sz, t, sp) {
      this.g; // 그라데이션
      this.x = x; // x좌표
      this.y = y; // y좌표
      this.sz = sz; // size
      this.t = t; // 흔들림
      this.sp = sp; // 스피드
    }

    draw = () => {
      this.g = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.sz,
      ); // 원형 그라데이션을 저장
      this.g.addColorStop(0, 'rgba(255,192,203,1)');
      this.g.addColorStop(1, 'rgba(255,192,203,0)');
      ctx.moveTo(this.x, this.y);
      ctx.fillStyle = this.g;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true);
      ctx.fill();
    };
  }

  const go = () => {
    window.requestAnimationFrame(go);
    // window.requestIdleCallback(go);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, width, height);
    ctx.fill();

    for (let i = 0; i < arr.length; i++) {
      const f = arr[i];
      f.t += 0.05;
      f.t = f.t >= Math.PI * 2 ? 0 : f.t;
      f.y += f.sp;
      f.x += Math.sin(f.t * tsc) * (f.sz * 0.3);
      if (f.y > height + 50) f.y = -10 - Math.random() * mv;
      if (f.x > width + mv) f.x = -mv;
      if (f.x < -mv) f.x = width + mv;
      f.draw();
    }
  };

  const snowy = () => {
    for (let i = 0; i < maxNum; i++) {
      const x = Math.random() * width; // width 안에서 랜덤하게 x 좌표 설정
      const y = Math.random() * (height + 50); // height 안에서 랜덤하게 y 좌표 설정
      const sz = (100 / (10 + Math.random() * 100)) * sc; // size
      const t = Math.random() * (Math.PI * 2); // 주기
      let sp = Math.pow(sz * 0.8, 2) * 0.15 * speed;
      sp = sp < min ? min : sp;

      const snow = new Flake(x, y, sz, t, sp);
      arr.push(snow);
    }
    go();
  };

  snowy();
};
