import React from 'react';
import ReactDOM from 'react-dom';
import './svg/1.css'
// 在 DOM 中有两个容器是兄弟级 （siblings）
const appRoot = document.getElementById('app-root');

class CanvasDemo extends React.Component {
  constructor(props) {
    super(props)
    this.initCanvas = this.initCanvas.bind(this)
  }
  initCanvas() {
    const {
      x0,//原点坐标
      y0,
      r,// 半径
      lineWidth, // 画笔宽度
      strokeStyle, //画笔颜色
      LinearGradientColor1, //起始渐变颜色
      LinearGradientColor2, //结束渐变颜色
      Percentage,// 进度百分比
    } = this.props
    let ele = document.getElementById("time_graph_canvas")
    let circle = ele.getContext("2d");
    //创建背景圆
    circle.lineWidth = lineWidth;
    circle.strokeStyle = strokeStyle;
    circle.lineCap = 'round';
    circle.beginPath();//开始一个新的路径
    circle.arc(x0, y0, r, 0, 2 * Math.PI, false);///用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    circle.stroke();//对当前路径进行描边
    //创建渐变圆环
    let g = circle.createLinearGradient(x0, 0, x0 + r * Math.cos(Percentage * (Math.PI * 2)), y0 + r * Math.sin(this.props.Percentage * (Math.PI * 2)));  //创建渐变对象  渐变开始点和渐变结束点
    g.addColorStop(0, LinearGradientColor1); //添加颜色点
    g.addColorStop(1, LinearGradientColor2);
    circle.lineWidth = lineWidth //设置线条宽度
    circle.lineCap = 'round';
    circle.strokeStyle = g;
    circle.beginPath();//开始一个新的路径
    circle.arc(x0, y0, r, -Math.PI / 2, -Math.PI / 2 - Percentage * (Math.PI * 2), true);
    circle.stroke();//对当前路径进行描边
    var cnt = document.getElementById("count");
    var water = document.getElementById("water");
    var percent = cnt.innerText;
    var interval;
    interval = setInterval(function () {
      percent++;
      cnt.innerHTML = percent;
      water.style.transform = 'translate(0' + ',' + (100 - percent) + '%)';
      if (percent == 61) {
        clearInterval(interval);
      }
    }, 50);
  }

  componentDidMount() {
    this.initCanvas()
  }
  componentDidUpdate() {
    this.initCanvas()
  }
  static defaultProps = {
    canvaswidth: 160,// 画布宽度
    canvasheight: 160,// 画布高度
    x0: 80,
    y0: 80,
    r: 72,
    lineWidth: 16,
    strokeStyle: 'rgba(248, 248, 248, 1)',
    LinearGradientColor1: '#C1D4DE',
    LinearGradientColor2: '#44718E',
    Percentage: 1
  }
  render() {
    const { canvaswidth, canvasheight } = this.props
    return (
      <div className='container'>
        {/* <div style={{ width: '100px', height: '100px', padding: 10 }}> */}
        <canvas id="time_graph_canvas" width={canvaswidth} height={canvasheight}>

        </canvas>
        {/* </div> */}
        <div id="loader-container">
          
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              style={{ display: 'none' }}
              style={{ width: '100%', marginBottom: '0', paddingBottom: '0', bottom: '0' }}
            >
              <symbol id="wave">
                <path d="M440,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                <path d="M440,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
              </symbol>
              
            </svg>
            <div className="loader-box" style={{ position: 'relative' }}>
              <div className="percent">
                <div className="percentNum" id="count">
                  0
                      </div>
                <div className="percentB">%</div>
              </div>
              <div id="water" className="water">
                <svg viewBox="0 0 540 40" className="water_wave water_wave_back">
                  <use xlinkHref="#wave"></use>
                </svg>
                <svg viewBox="0 0 540 40" className="water_wave water_wave_front">
                  <use xlinkHref="#wave"></use>
                </svg>
                {/* <svg viewBox="0 0 540 40" style={{position:'absolute',left:'0%',top:'-20%'}}>
                  <use xlinkHref="#v"></use>
                </svg> */}
              </div>
            </div>
          </div>
        
      </div>

    )
  }
}

ReactDOM.render(<CanvasDemo />, appRoot);