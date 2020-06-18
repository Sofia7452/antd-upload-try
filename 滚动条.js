import React, { Component } from 'react'
// import ContractImg from '../../static/img/contract.svg'
import './index.less'
import { Anchor } from 'antd'

const { Link } = Anchor
class NoFilePage extends Component {
  state = {
    allArticles: null,
    container: null,
    onClick: false,
    targetOffset: undefined
  }

  isClick = false
  componentDidMount() {
    window.location.hash = '#034'
    this.setState({
      targetOffset: 340
    })
    // this.scrollAction()
    // this.versionClick()
  }
  onScroll = () => {
    if (this.isClick) return
    const { allArticles, container } = this.state
    let scrollTop = container.scrollTop
    for (let i = 0; i < allArticles.length; i++) {
      console.log('scrollTop', scrollTop) //整个页面移动的位置
      console.log('allArticles[0].offsetTop', allArticles[0].offsetTop) //距离顶部的位置

      if (scrollTop + 100 >= allArticles[i].offsetTop) {
        console.log('22', allArticles[i].scrollTop)
        for (let j = 0; j < allArticles.length; j++) {
          let fromVersion =
            '#from' +
            allArticles[j].id
              .slice(2, allArticles[i].id.length)
              .split('.')
              .join('')
          document.querySelector(fromVersion) !== null &&
            // document.querySelector(fromVersion) !== versionClick &&
            (document.querySelector(fromVersion).style.color = 'rgba(211, 220, 245, 0.35)') &&
            (document.querySelector(fromVersion).style.borderLeft =
              '2px solid rgba(211, 220, 245, 0.75)')
        }
        const toId = allArticles[i].id
          .slice(2, allArticles[i].id.length)
          .split('.')
          .join('')
        // const { clickId } = this.state
        // if (clickId === toId) {
        let fromVersion = '#from' + toId
        console.log(fromVersion)
        document.querySelector(fromVersion).style.color = 'rgba(68, 138, 255, 1)'
        document.querySelector(fromVersion).style.borderLeft = '2px solid rgba(68, 138, 255, 1)'
        // }
      }
      // }
    }
  }
  scrollAction = () => {
    let allArticles = document.getElementsByTagName('article')
    let container = document.getElementsByClassName('containerStyle')[0]
    this.setState({ allArticles, container })
    // console.log('containerOffsetTop', containerOffsetTop)
    container.addEventListener('scroll', this.onScroll)
  }
  versionClick = () => {
    let versionClick = document.getElementsByClassName('versionNumber')[0]
    versionClick.addEventListener('click', (e) => {
      this.isClick = true
      versionClick.childNodes.forEach((ele) => {
        ele.style.borderLeft = '2px solid rgba(211,220,245,0.75)'
        ele.style.color = 'rgba(211,220,245,0.35)'
      })
      if (e.target !== versionClick) {
        const clickId = e.target.innerHTML
          .slice(1, e.target.innerHTML.length)
          .split('.')
          .join('')
        this.setState({ clickId })
        let trueTarget = '#to' + clickId
        document.querySelector(trueTarget).scrollIntoView({
          block: 'start',
          behavior: 'instant'
        })
        e.target.style.borderLeft = '2px solid rgba(68,138,255,1)'
        e.target.style.color = 'rgba(68,138,255,1)'
      }
      this.isClick = false
    })
  }

  render = () => {
    return (
      <div className="containerStyle">
        <a href="#035" id="035" className="nofile-anchor" style={{ marginTop: '-140px' }}>
          #
        </a>
        <div className="dragTipImgStyle">
          <div className="nofile-header">MeshSec发布说明</div>
          <hr />
          <article id="to035" name="035">
            <div className="version">V0.3.5</div>
            <div className="time">上线时间：2019年11月15日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>默认页面显示发布说明</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>首页展示统计数据</span> 
                </li>
              </ul>
              <div className="funcTitle2">优化功能</div>
              <ul className="betterFunc">
                <li>
                  <span className="betterFuncDot"></span>
                  <span>覆盖网络异常的提示</span>
                </li>
                <li>
                  <span className="betterFuncDot"></span>
                  <span>选中合约代码片段再单击后不再闪跳</span>
                </li>
                <li>
                  <span className="betterFuncDot"></span>
                  <span>完善静态分析规则点L4001、S4002-S4004</span>
                </li>
              </ul>
            </div>
          </article>
          <article id="to034" name="034">
            <div className="version">
              V0.3.4{' '}
              <a href="#034" id="034" className="nofile-anchor">
                #
              </a>
            </div>
            <div className="time">上线时间：2019年10月29日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>增加新建合约文件按钮</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>新增合约安全证书，合约检测通过可申请平台颁发的证书</span> 
                </li>
              </ul>
              <div className="funcTitle2">优化功能</div>
              <ul className="betterFunc">
                <li>
                  <span className="betterFuncDot"></span>
                  <span>默认关闭自动编译</span>
                </li>
              </ul>
            </div>
          </article>
          <article id="to033" name="033">
            <div className="version">
              V0.3.3{' '}
              <a href="#033" id="033" className="nofile-anchor">
                #
              </a>
            </div>
            <div className="time">上线时间：2019年10月16日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>项目名、文件名命名规范支持中文</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>支持合约拖拽导入至左侧项目</span> 
                </li>
              </ul>
            </div>
          </article>
          <article id="to032" name="032">
            <div className="version">
              V0.3.2{' '}
              <a href="#032" id="032" className="nofile-anchor">
                #
              </a>
            </div>
            <div className="time">上线时间：2019年9月24日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>新增新手引导</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>首页增加反馈入口，欢迎用户提出建议和意见</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>自动保存用户设置</span> 
                </li>
              </ul>
              <div className="funcTitle2">优化功能</div>
              <ul className="betterFunc">
                <li>
                  <span className="betterFuncDot"></span>
                  <span>形式验证：优化错误提醒标识</span>
                </li>
              </ul>
            </div>
          </article>
          <article id="to031" name="031">
            <div className="version">
              V0.3.1{' '}
              <a href="#031" id="031" className="nofile-anchor">
                #
              </a>
            </div>
            <div className="time">上线时间：2019年9月5日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>新增文件上传功能</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>合约编辑器的debug</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>在页面上增加版本说明</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>
                    飞洛官网
                    <a href="https://filoop.com/document/overview?type=7" target="_blank">
                      开发者文档
                    </a>
                    内容完善
                  </span>
                </li>
              </ul>
              <div className="funcTitle2">优化功能</div>
              <ul className="betterFunc">
                <li>
                  <span className="betterFuncDot"></span>
                  <span>编译器下载优化，提升编译器下载速度和用户体验</span>
                </li>
              </ul>
            </div>
          </article>
          <article id="to02" name="02">
            <div className="version">
              V0.2{' '}
              <a href="#02" id="02" className="nofile-anchor">
                #
              </a>
            </div>
            <div className="time">上线时间：2019年6月14日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>对接飞洛统一账户登陆MeshSec</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>用户可下载智能合约安全审计报告</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>增加代码运行功能</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>合约实时保存、主动保存、本地缓存、服务器缓存</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>支持基于Boogie内存模型的形式验证</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>
                    上线飞洛官网
                    <a href="https://filoop.com/document/overview?type=7" target="_blank">
                      开发者文档
                    </a>
                    内容
                  </span>
                   
                </li>
              </ul>
            </div>
          </article>
          <article id="to01" name="01" className="to01">
            <div className="version">
              V0.1{' '}
              <a href="#01" id="01" className="nofile-anchor">
                #
              </a>
            </div>
            <div className="time">上线时间：2019年4月30日</div>
            <div className="func">
              <div className="funcTitle1">新增功能</div>
              <ul className="newFunc">
                <li>
                  <span className="newFuncDot"></span>
                  <span>用户注册、登陆</span>
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>项目增加、删除、重命名</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>合约增加、删除、重命名、下载</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>支持20+种漏洞类型的静态分析、基于Boogie指针模型的形式验证</span> 
                </li>
                <li>
                  <span className="newFuncDot"></span>
                  <span>格式化、编译、设置、代码高亮</span> 
                </li>
              </ul>
            </div>
          </article>
        </div>
        <div className="versionNumber">
          <Anchor
            getCurrentAnchor={() => '#035'}
            targetOffset={this.state.targetOffset}
            getContainer={() => document.getElementsByClassName('containerStyle')[0]}
          >
            <Link href="#035" title="v0.3.5" />
            <Link href="#034" title="v0.3.4" />
            <Link href="#033" title="v0.3.3" />
            <Link href="#032" title="v0.3.2" />
            <Link href="#031" title="v0.3.1" />
            <Link href="#02" title="v0.2" />
            <Link href="#01" title="v0.1" />
          </Anchor>
          {/* <div id="from034" className="v034">
            V0.3.4
          </div>
          <div id="from033" className="noHoverStyle">
            V0.3.3
          </div>
          <div id="from032" className="noHoverStyle">
            V0.3.2
          </div>
          <div id="from031" className="noHoverStyle">
            V0.3.1
          </div>
          <div id="from02" className="noHoverStyle">
            V0.2
          </div>
          <div id="from01" className="noHoverStyle">
            V0.1
          </div> */}
        </div>
      </div>
    )
  }
}

export default NoFilePage
