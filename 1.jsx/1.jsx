// import React from 'react'
// import ToolBarButton from '../../components/ToolBarButton/ToolBarButton'

// const StaticAnalysisButton = () => {
//   const startScan = () => {}
//   return <ToolBarButton onClick={startScan} type="jingtaifenxix" name="scan" title="静态分析" />
// }

// export default StaticAnalysisButton
import React from 'react'
import PropTypes from 'prop-types'
import ToolBarButton from '../../components/ToolBarButton/ToolBarButton'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  usePrecheck,
  //提前检查文件是否选中 等
  useCheckCompilerVersion,
  //检查编译版本
  useCompileResult,
  //文件处展示
  useSetAnalysisRes
  //验证结果展示
} from '../../hooks/constract'
import { checkDefaultFileSafety, checkFileSafety } from '../../apis'
import { getNodeByKey } from '../../utils/file'
const ProcessWorker = require('../../wokers/process.worker.js')

let processWk = new ProcessWorker()
const showProcessPercent = (cb, startIndex = 0, endIndex = 101) =>
  new Promise((resolve) => {
    processWk.onmessage = ({ data }) => {
      if (data === 'end') {
        resolve()
      } else {
        cb(data)
      }
    }

    processWk.postMessage({ command: 'start', startIndex, endIndex })
  })

const FormalVerificationButton = (props) => {
  const { currentFile } = useSelector((state) => state.fileModel)

  const { fileTree } = useSelector((state) => state.fileModel)
  const { currentTab: fileKey } = useSelector((state) => state.tabModel)
  const file = getNodeByKey(fileTree, fileKey)

  const preCheck = usePrecheck()
  const compilerVersionCkeck = useCheckCompilerVersion()
  const dispatch = useDispatch()
  const compileRes = useCompileResult()

  const setAnalysisRes = useSetAnalysisRes()
  const bugType = window.bugTypeFromMessage
  if (bugType) {
    window.bugTypeFromMessage = undefined
  }
  const onStaticAnylysis = async () => {
    let timer
    try {
      dispatch({
        type: 'SET_IS_ANALYSISING',
        payload: { isAnalysising: true }
      })
      //提前验证
      await preCheck(currentFile)

      dispatch({
        type: 'SET_CIRCLE_STATUS',
        payload: 1
      })
      //检查编译版本
      compilerVersionCkeck(currentFile)
      const { name, content } = currentFile
      dispatch({
        type: 'SET_PERCENT',
        payload: {
          percent: 0
        }
      })
      dispatch({
        type: 'HIDE_SETTING'
      })

      dispatch({
        type: 'HIDDEN_WORKFLOW'
      })

      dispatch({
        type: 'SHOW_ANALYZE_PANL',
        payload: {
          title: '静态分析结果'
        }
      })

      dispatch({
        type: 'RESET_ERRORS'
      })
      dispatch({
        type: 'RESET_MARKERS'
      })
      //静态分析结果注入灵魂
      dispatch({
        type: 'RESET_STATIC_RES'
      })

      dispatch({
        type: 'SET_CONSOLE_INFO',
        payload: {
          info: {
            step: 0,
            state: 0,
            message: 'Compiling...'
          }
        }
      })

      const target = name
      const sources = {}
      sources[target] = { content }
      console.log('content', content)
      if (window.compiler.loaded) {
        timer = setTimeout(() => {
          //为啥setTimeout里面执行window.compiler.compile
          //每个await是为啥和setTimeout执行顺序是啥？？？
          window.compiler.compile(sources, target)
        }, 5000)
      }
      await showProcessPercent(
        //每次最后的percent通过onmessage的endIndex拿到
        (percent) => {
          dispatch({
            type: 'SET_PERCENT',
            payload: {
              percent
            }
          })
        },
        0,
        20
      )

      const res = await Promise.all([
        showProcessPercent(
          (percent) => {
            dispatch({
              type: 'SET_PERCENT',
              payload: {
                percent
              }
            })
          },
          20,
          46
        ),
        window.compiler.compile(sources, target)
      ])
      //20-46正式编译
      const solcResult = res[1]
      if (window.compiler.loaded) {
        clearTimeout(timer)
      }
      //拿出编译错误，在编译下方展示
      if (solcResult.errors && solcResult.errors.length > 0) {
        dispatch({
          type: 'SET_ERRORS',
          payload: {
            errors: solcResult.errors
          }
        })
      }
      //感觉没触发console区？？？什么时候触发和展示？
      dispatch({
        type: 'SET_CONSOLE_INFO',
        payload: {
          info: {
            step: 0,
            state: 2,
            message: 'Compile finish!'
          }
        }
      })
      dispatch({
        type: 'SET_REEXECUTE',
        payload: {
          title: '重新分析',
          cb: window.accountModel.isLogin ? checkFileSafety : checkDefaultFileSafety
        }
      })
      //编译结果文件处展示
      compileRes({ name, solcResult })

      let anylysisRes = []
      if (window.accountModel.isLogin) {
        anylysisRes = await Promise.all([
          checkFileSafety({
            fileId: fileKey
          }),
          showProcessPercent(
            (percent) => {
              dispatch({
                type: 'SET_PERCENT',
                payload: {
                  percent
                }
              })
            },
            46,
            89
          )
        ])
      } else {
        anylysisRes = await Promise.all([
          checkDefaultFileSafety({
            content: file.content
          }),
          showProcessPercent(
            (percent) => {
              dispatch({
                type: 'SET_PERCENT',
                payload: {
                  percent
                }
              })
            },
            46,
            89
          )
        ])
      }
      await showProcessPercent(
        (percent) => {
          dispatch({
            type: 'SET_PERCENT',
            payload: {
              percent
            }
          })
        },
        89,
        101
      )
      const data = anylysisRes[0]
      dispatch({
        type: 'SET_CIRCLE_STATUS',
        payload: 2
      })
      let gradeInfo = data.data.data.gradeModel
      let bugList = data.data.data.result
      let bugFileKey = fileKey
      const { code } = data.data

      dispatch({
        type: 'SET_CIRCLE_STATUS',
        payload: 2
      })

      if (code === 'SUCCESS') {
        setAnalysisRes(bugFileKey, bugList, bugType, gradeInfo)
      } else {
        message.error('未知错误')
      }
    } catch (formError) {
      console.log('formError', formError)
      if (
        formError &&
        formError.err !== '网络有异常，请检查网络后再试' &&
        formError.err !== '请选择一个文件' &&
        formError.err !== '请检查编译器版本'
      ) {
        message.warning(
          <span>
            当前合约不符合形式验证
            <a
              href="https://filoop.com/document/detail?type=7&id=68"
              target="_blank"
              style={{ textDecoration: 'underline', color: '#fff' }}
              rel="noopener noreferrer"
            >
              语法规范
            </a>
            !
          </span>
        )
      }
      if (
        formError &&
        formError.err !== '网络有异常，请检查网络后再试' &&
        formError.err !== '请检查编译器版本'
      ) {
        dispatch({
          type: 'SET_CIRCLE_STATUS',
          payload: 4
        })
      }
    } finally {
      dispatch({
        type: 'SET_IS_ANALYSISING',
        payload: {
          isAnalysising: false
        }
      })
    }
  }
  return (
    <ToolBarButton
      title="静态分析"
      type="xingshixiaoyanx"
      name="formalVer"
      onClick={onStaticAnylysis}
    />
  )
}

FormalVerificationButton.propTypes = {}

export default FormalVerificationButton



export const useSetAnalysisRes = () => {
  const dispatch = useDispatch()
  const BugLevel = {
    LOW_RISK_BUG: '低危',
    MIDDLE_RISK_BUG: '中危',
    HIGH_RISK_BUG: '高危',
    SEVERE_RISK_BUG: '严重'
  }

  // const setBugList = (bugFileKey, bugList, bugType, gradeInfo) => {
  const groupBugs = (bugList) => {
    const groupedbugList = []
    for (const bug of bugList) {
      let category // 大类
      let smallCategory // 小类

      try {
        category = /【(.*?)】/.exec(bug.info)[1]
      } catch (e) {
        category = '解析大类出错'
      }

      try {
        smallCategory = /【.*?】.*?(【.*?)\n/.exec(bug.info)[1]
      } catch (e) {
        smallCategory = '解析小类出错'
      }

      const bugBox = groupedbugList.find((bugBox) => {
        return bugBox.smallCategory === smallCategory
      })

      if (bugBox === undefined) {
        const res = smallCategory.replace(/【(.*?)】/, `【${BugLevel[bug.safeRank]}】`)
        groupedbugList.push({
          category,
          smallCategoryTitle: `${res.split('】')[0]}】`,
          smallCategoryContent: res.split('】')[1],
          smallCategory,
          safeRank: bug.safeRank,
          bugs: [bug]
        })
      } else {
        bugBox.bugs.push(bug)
      }
    }

    // groupedbugList = groupedbugList.sort((a, b) => {
    //     const riskMap = {
    //         'LOW_RISK_BUG': 0,
    //         'MIDDLE_RISK_BUG': 1,
    //         'HIGH_RISK_BUG': 2,
    //         'SEVERE_RISK_BUG': 3
    //     }
    //     return riskMap[a.safeRank] > riskMap[b.safeRank]
    // })
    return groupedbugList
  }

  return async (bugFileKey, bugList, bugType, gradeInfo) => {
    bugList = groupBugs(bugList)
    dispatch({
      type: 'SET_STATIC_RES',
      payload: { bugFileKey, bugList, bugDetail: {}, activeKey: [], gradeInfo }
    })
    if (bugType) {
      const activeKey = []
      for (let i = 0; i < bugList.length; i += 1) {
        const bugBox = bugList[i]
        if (bugBox.category === bugType) {
          activeKey.push(i.toString())
        }
      }
      dispatch({
        type: 'SET_STATIC_RES',
        payload: { bugFileKey, bugList, bugDetail: {}, activeKey, gradeInfo }
      })
      await sleep(1000)
      const activeItem = document.querySelector('.ant-collapse-item-active')
      activeItem.scrollIntoView()
    }
  }
}
