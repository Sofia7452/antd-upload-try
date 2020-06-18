import React, { useState, useEffect } from 'react';
import { message } from 'antd';


export default function HookDemo() {
  const [count, changeCount] = useState(0);
  const [count1, changeCount1] = useState(0);
  // 创建初始值为空对象的prestate
  const preState = useRef({});
  // 依赖preState进行判断时可以先判断，最后保存最新的state数据
  useEffect(() => {
    const { ... } = preState.current;
    if (// 条件判断) {
      // 逻辑
    }
    // 保存最新的state
    preState.current = {
      count,
      count1,
    }
  });
  
  return (
    <div>
      <button onClick={() => { changeCount1 }}>
        改变count1
      </button>
      <button onClick={() => { changeCount2}}>
        改变count2
      </button>
    </div>
  );
}