import React, { Component } from 'react'
import outterImg_l from '../../static/img/circle_low.svg'
import innerImg_l from '../../static/img/circle_inner_low.svg'
import waveIn_l from '../../static/img/wave_in_low.svg'
import waveOut_l from '../../static/img/wave_out_low.svg'

import outterImg_m from '../../static/img/circle_middle.svg'
import innerImg_m from '../../static/img/circle_inner_middle.svg'
import waveIn_m from '../../static/img/wave_in_middle.svg'
import waveOut_m from '../../static/img/wave_out_middle.svg'

import outterImg_h from '../../static/img/circle_high.svg'
import innerImg_h from '../../static/img/circle_inner_high.svg'
import waveIn_h from '../../static/img/wave_in_high.svg'
import waveOut_h from '../../static/img/wave_out_high.svg'

import './index.less'
const stopColor1 = { '1': '#BDFFF3' }
const stopColor2 = { '1': '#4AC299' }
const circleImage = [
  {
    outterImg: outterImg_l,
    innerImg: innerImg_l,
    waveIn: waveIn_l,
    waveOut: waveOut_l
  },
  {
    outterImg: outterImg_m,
    innerImg: innerImg_m,
    waveIn: waveIn_m,
    waveOut: waveOut_m
  },
  {
    outterImg: outterImg_h,
    innerImg: innerImg_h,
    waveIn: waveIn_h,
    waveOut: waveOut_h
  }
]

const maxCircleHight = 136

export default class ProcessCircle extends Component {
  state = {
    level: 1,
    waveHeight: 0
  }

  // eslint-disable-next-line
  UNSAFE_componentWillReceiveProps(nextProps) {
    switch (nextProps.circleStatus) {
      case 1: {
        // 显示进度
        this.setState({
          waveHeight: 0,
          level: 1
        })
        break
      }
      case 2: {
        // 静态分析
        const { grade } = nextProps.gradeInfo
        let level = 0
        if (grade <= 4.5) {
          level = 0
        } else if (grade > 4.5 < 10) {
          level = 1
        } else {
          level = 2
        }

        const waveHight = grade * 0.01 * maxCircleHight
        this.setState({
          waveHeight: waveHight,
          level
        })
        break
      }
      case 3: {
        // 显示形式验证
        const verifyRes = nextProps.verifyRes
        let level = 0
        if (verifyRes.verifyList.length === 0) {
          level = 2
        } else {
          level = 0
        }

        const verifyPercent =
          verifyRes.totalCount > 0 ? verifyRes.verifiedCount / verifyRes.totalCount : 1

        const waveHight = verifyPercent * maxCircleHight

        this.setState({
          waveHeight: waveHight,
          level
        })
        break
      }
      case 4: {
        // 解析失败
        this.setState({
          waveHeight: 35,
          level: 0
        })
        break
      }
      default: {
        this.setState({
          waveHeight: 35,
          level: 0
        })
      }
    }
  }

  render() {
    const { level, waveHeight } = this.state
    const { percent, circleStatus, verifyRes, gradeInfo } = this.props

    const infoStyle = {
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden',
      textAlign: 'center',
      lineHeight: '136px',
      color: 'white'
    }

    return (
      <div
        className="circle-outter"
        style={{ backgroundImage: `url(${circleImage[level].outterImg})` }}
      >
        <div
          className="circle-inner"
          style={{ backgroundImage: `url(${circleImage[level].innerImg})` }}
        >
          {circleStatus === 1 && (
            <React.Fragment>
              <div style={{ position: 'absolute', width: '100%', display: 'table', height: 150 }}>
                <div className="ripple" />
              </div>
              <div style={infoStyle}>
                <span style={{ fontSize: '52px', marginRight: 2, fontFamily: 'Helvetica Neue' }}>
                  {percent}
                </span>
                <span style={{ fontSize: '40px', fontFamily: 'YanoneKaffeesatz-Regular' }}>%</span>
              </div>
            </React.Fragment>
          )}
          {circleStatus === 2 && (
            <div className="circle-info">
              <span className="access" style={{ fontSize: 40 }}>
                {gradeInfo.grade}
              </span>
              <span className="feng">分</span>
              <div className="contractName">
                {level === 0 ? '安全等级低' : level === 1 ? '安全等级中' : '安全等级高'}
              </div>
            </div>
          )}
          {circleStatus === 4 && (
            <React.Fragment>
              <div style={{ ...infoStyle, lineHeight: '1.3' }}>
                <div style={{ marginTop: 27 }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>解析</span>
                  <br />
                  <span style={{ fontSize: '36px', color: 'white' }}>失败</span>
                </div>
              </div>
            </React.Fragment>
          )}
          {circleStatus === 3 && (
            <div className="circle-info">
              <span className="access">{verifyRes.verifiedCount}</span>
              <span className="total-grade">/ {verifyRes.totalCount}</span>
              <div className="contractName">{level === 0 ? '验证未通过' : '验证通过'}</div>
            </div>
          )}
          <div className="wave-wrap">
            <div className="wave-in svgStyle" style={{ height: waveHeight }}>
              <div className="inlineStyle" style={{ marginRight: '-11px' }}>
                <svg
                  width="748px"
                  height="228px"
                  viewBox="0 0 748 228"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>wave_in</title>
                  <desc>Created with Sketch.</desc>
                  <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                      <stop stopColor="#BDFFF3" offset="0%"></stop>
                      <stop stopColor="#4AC299" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    opacity="0.371372768"
                  >
                    <g id="wave_in" fill="url(#linearGradient-1)" fillRule="nonzero">
                      <g id="Page-1">
                        <g>
                          <path
                            d="M527.115889,31.1699575 C567.115889,49.1699575 586.445986,55.9809736 633.280937,35.5754655 C664.504238,21.9717935 702.743926,22.7799717 748,38 L748,228 L0,228 L0,38 C20.7930533,44.7378131 43.1263866,48.7433493 67,50.0166087 C142,54.0166087 187,-8.92153663 246,1.07846337 C305,11.0784634 325.115889,50.1699575 394.115889,23.1699575 C463.115889,-3.83004251 487.115889,13.1699575 527.115889,31.1699575 Z"
                            id="Combined-Shape-Copy"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="inlineStyle">
                <svg
                  width="748px"
                  height="228px"
                  viewBox="0 0 748 228"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>wave_in</title>
                  <desc>Created with Sketch.</desc>
                  <defs>
                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                      <stop stopColor="#BDFFF3" offset="0%"></stop>
                      {/* {stopColor1[circleStatus]} */}
                      <stop stopColor="#4AC299" offset="100%"></stop>
                      {/* stopColor={stopColor2[circleStatus]} */}
                    </linearGradient>
                  </defs>
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    opacity="0.371372768"
                  >
                    <g id="wave_in" fill="url(#linearGradient-1)" fillRule="nonzero">
                      <g id="Page-1">
                        <g>
                          <path
                            d="M527.115889,31.1699575 C567.115889,49.1699575 586.445986,55.9809736 633.280937,35.5754655 C664.504238,21.9717935 702.743926,22.7799717 748,38 L748,228 L0,228 L0,38 C20.7930533,44.7378131 43.1263866,48.7433493 67,50.0166087 C142,54.0166087 187,-8.92153663 246,1.07846337 C305,11.0784634 325.115889,50.1699575 394.115889,23.1699575 C463.115889,-3.83004251 487.115889,13.1699575 527.115889,31.1699575 Z"
                            id="Combined-Shape-Copy"
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              {/* <img src={circleImage[level].waveIn} alt="" style={{ marginRight: '-12px' }} />
              <img src={circleImage[level].waveIn} alt="" /> */}
            </div>
            <div className="wave-out svgStyle" style={{ height: waveHeight }}>
              <div style={{ marginRight: '-0.4px' }}>
                <svg
                  width="784px"
                  height="233px"
                  viewBox="0 0 784 233"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>wave_out_middle</title>
                  <desc>Created with Sketch.</desc>
                  <defs>
                    <linearGradient
                      x1="57.4129352%"
                      y1="100%"
                      x2="57.4129352%"
                      y2="0%"
                      id="linearGradient-1"
                    >
                      <stop stopColor="#1D92D1" offset="0%"></stop>
                      <stop stopColor="#F2FCFE" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="页面-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    opacity="0.69765625"
                  >
                    <g
                      id="Apple-TV"
                      transform="translate(-602.000000, -379.000000)"
                      fill="url(#linearGradient-1)"
                      fillRule="nonzero"
                    >
                      <g id="wave_out_middle" transform="translate(602.000000, 379.000000)">
                        <g id="wave_out-copy">
                          <g id="wave_out">
                            <g id="Page-1">
                              <g id="Group-54-Copy">
                                <path
                                  d="M0,233 L0,19.2488943 C38.6538049,5.78178096 68.0643087,-0.618830048 88.2315113,0.0470612473 C145.728919,1.94554088 162.617363,47.0522524 248.308682,18.0261262 C334,-11 366.790997,31.0110065 446.199357,31.0110065 C525.607717,31.0110065 565.942122,-7.94363429 636.527331,21.022637 C683.584137,40.3334846 732.741693,39.742237 784,19.2488943 L784,233 L0,233 Z"
                                  id="Combined-Shape-Copy-2"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="inlineStyle">
                <svg
                  width="784px"
                  height="233px"
                  viewBox="0 0 784 233"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <title>wave_out_middle</title>
                  <desc>Created with Sketch.</desc>
                  <defs>
                    <linearGradient
                      x1="57.4129352%"
                      y1="100%"
                      x2="57.4129352%"
                      y2="0%"
                      id="linearGradient-1"
                    >
                      <stop stopColor="#1D92D1" offset="0%"></stop>
                      <stop stopColor="#F2FCFE" offset="100%"></stop>
                    </linearGradient>
                  </defs>
                  <g
                    id="页面-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                    opacity="0.69765625"
                  >
                    <g
                      id="Apple-TV"
                      transform="translate(-602.000000, -379.000000)"
                      fill="url(#linearGradient-1)"
                      fillRule="nonzero"
                    >
                      <g id="wave_out_middle" transform="translate(602.000000, 379.000000)">
                        <g id="wave_out-copy">
                          <g id="wave_out">
                            <g id="Page-1">
                              <g id="Group-54-Copy">
                                <path
                                  d="M0,233 L0,19.2488943 C38.6538049,5.78178096 68.0643087,-0.618830048 88.2315113,0.0470612473 C145.728919,1.94554088 162.617363,47.0522524 248.308682,18.0261262 C334,-11 366.790997,31.0110065 446.199357,31.0110065 C525.607717,31.0110065 565.942122,-7.94363429 636.527331,21.022637 C683.584137,40.3334846 732.741693,39.742237 784,19.2488943 L784,233 L0,233 Z"
                                  id="Combined-Shape-Copy-2"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              {/* <img src={circleImage[level].waveOut} alt="" />
              <img src={circleImage[level].waveOut} alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
