---
title: memo、useMemo、useCallback 你真的用明白了吗
author: willes
author_title: 前端工程师
tags: [前端]
---
在对 React 项目做性能优化的时候，memeo、useMemo、useCallback 三个API总是形影不离。但对于我们是否正确的使用它们，值得我们深入思考。本文就这三个API进行深入解析

# memo
## memo 的作用
在 React 的渲染流程中，一般来说，**父组件的某个状态发生改变**，那么父组件会重新渲染，**父组件所使用的所有子组件，都会强制渲染**。而在某些场景中，子组件并没有使用父组件传入的没有发生更改的状态时，子组件重新渲染是没有必要的。因此有了 React.memo

## memo 的使用
memo 是个`高阶组件`， 结合了 `PurComponent` 和 `shouldComponentUpdate` 功能，会对传入的 props 进行`浅比较`，来决定是否更新被包裹的组件

memo 接受两个参数：

- **WrapComponent**：你要优化的组件
- **(prev, next) => boolean**：通过对比 `prev（旧 props`），`next（新 props）`是否一致，返回 `true（不更新`）、`false（更新）`

注意：memo 只针对 `props` 来决定是否渲染，且是`浅比较`

**现在我们来看一个的例子：**

```js
import { Button } from "antd";
import React, { useState } from "react";

const Child = () => <div>{console.log("子组件又渲染")}</div>;

const Parent = () => {
  const [number, setNumber] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Child />
      <Button type='primary' onClick={() => setFlag(!flag)}>
        {flag ? "显示" : "隐藏"}
      </Button>
    </>
  );
};

export default Parent;
```

**运行结果如下：**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4de3818dc08c4a3b8e003e82e3de0d09~tplv-k3u1fbpfcp-watermark.image?)

在上面的例子中，父组件中的两个状态 `number`、`flag` 都和 Child 组件没有关系，当我点击按钮时，`flag 发生改变`，`此时父组件重新渲染`，按钮文案变为显示，`控制台却打印出 "子组件又渲染" 的信息`，`说明子组件也跟着重新渲染了`。而这肯定是不合理的，我们不希望子组件做无关的刷新，此时我们可以给子组件加上 React.memo

```js
import { Button } from "antd";
import React, { useState } from "react";

const Child = React.memo(() => <div>{console.log("子组件又渲染")}</div>);

const Parent = () => {
  const [number, setNumber] = useState(0);
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Child />
      <Button type='primary' onClick={() => setFlag(!flag)}>
        {flag ? "显示" : "隐藏"}
      </Button>
    </>
  );
};

export default Parent;
```

**运行结果如下：**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af942717e756499a8893b19ce322bb9a~tplv-k3u1fbpfcp-watermark.image?)

在给子组件加上 memo 包裹后，再次点击按钮，`flag 发生改变`，`此时控制台并没有打印 "子组件又渲染" 的信息`，`说明此时子组件不会做无关的刷新`，从而达到了性能优化的目的。

**总而言之，如果组件被 memo 包裹，那么组件的 props 不发生改变时，组件不会重新渲染。这样，我们合理的使用 memo 就可以为我们的项目带来很大的性能优化。**

## memo 的注意事项

虽然，memo 可以帮助我们避免组件无意义的重新渲染，达到性能优化的目的，但是你还是得注意一下 memo 的一些注意事项

### memo 对 props 是浅比较
上文我们也说了，`memo 对于新旧 props 的比较是浅比较`，当一个引用类型的 props 改变时，只要它的`地址没有发生改变`，那么就算 props 中某一项数据发生了改变，那么被 memo 包裹的组件是不会重新渲染的。

比如下面的例子：
```js
import { Button, Divider } from "antd";
import React, { useState } from "react";

const Child = React.memo((props) => (
  <div>
    {props.list.map((item) => (
      <div style={{marginLeft: '20px'}}> {item} </div>
    ))}
  </div>
));

const Parent = () => {
  const [list, setList] = useState([1, 2, 3]);

  return (
    <>
      <Child list={list} />
      <Divider />
      <Button
        type='primary'
        onClick={() => {
          list.push(4);
          console.log('list', list)
        }}
      >
        点击改变 list
      </Button>
    </>
  );
};

export default Parent;
```
上面的代码，当我们点击按钮后，**运行结果如下**：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64c2e47cb04a49668c241359853b4846~tplv-k3u1fbpfcp-watermark.image?)

我们可以看见，虽然点击了按钮改变了 list，但此时子组件渲染的只有初始的 `1 2 3`，并没有重新渲染，这是因为虽然 list 内容改变了，但是 list 是引用类型的数据，memo 对新旧 list 进行浅比较，`发现地址没变`，就不重新渲染。

那这种情况怎么办呢？很简单，返回一个新的数组即可
```js
onClick={() => {
 setList([...list, 4])
}}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f354ad431b134edcb4ffb5c53d6cc78b~tplv-k3u1fbpfcp-watermark.image?)
此时，再次点击按钮更新 setList，子组件重新渲染

### memo 是否用的越多越好
既然 memo 可以对组件进行性能优化，那能不能所有组件都用 memo 包裹呢？

答案肯定是否定的。

`因为缓存本身也是需要开销的`。如果每一个组件都用 memo 去包裹一下，那么对浏览器的开销就会很大，本末倒置了。

所以我们应该选择性的用 memo 包裹组件，而不是滥用。

**在项目中，一般如果一个子组件经常被重新渲染，那需要根据具体情况具体分析，有目的性的去缓存它。**

# useMemo

## useMemo 的作用
useMemo 它可以缓存一个结果，当这个缓存结果不变时，可以借此来进行性能优化。

举个例子：
```js
import { Button, Divider } from "antd";
import React, { useState } from "react";

const Parent = () => {
  const [num, setNum] = useState(0);

  const clickHadler = () => {
    setNum(num + 1)
  }

  const computeResult = () => {
    // 模拟需要花费时间的大量计算
    for(let i = 0; i < 10000; i++) {
      
    }
    
    console.log('进行了大量计算')
  }

  return (
    <>
      {computeResult()}
      number值: {num}
      <Divider />
      <Button
        type='primary'
        onClick={() => clickHadler()}
      >
        点击计算
      </Button>
    </>
  );
};

export default Parent;
```
在上面的代码中，当我们点击了按钮后，会更改状态 `num`，导致组件重新渲染，这个时候 computeResult 又会重新执行一遍，`又进行依次大量的计算`，这样就会`增加性能开销`，因此，我们可以使用 `useMemo` 来优化一下。

## useMemo 的使用
useMemo 接受两个参数：

- **callback**：计算结果的执行函数
- **deps**：相关依赖项数组

最终 useMemo 在执行了 callback 后，返回一个结果，这个结果就会被缓存起来。当 deps 依赖发生改变的时候，会重新执行 callback 计算并返回最新的结果，否则就使用缓存的结果

我们来把上面的例子用 useMemo 改造一下

```js
import { Button, Divider } from "antd";
import React, { useState, useMemo } from "react";

const Parent = () => {
  const [num, setNum] = useState(0);

  const clickHadler = () => {
    setNum(num + 1)
  }

  // 使用 useMemo 缓存计算的结果
  const computeResult = useMemo(() => {
    for(let i = 0; i < 10000; i++) {
      
    }

    console.log('进行了大量计算')
  }, [])

  return (
    <>
      {computeResult}
      number值: {num}
      <Divider />
      <Button
        type='primary'
        onClick={() => clickHadler()}
      >
        点击计算
      </Button>
    </>
  );
};

export default Parent;
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/52ae3ae999414c8e8770aedf56575f80~tplv-k3u1fbpfcp-watermark.image?)

这样就达到了性能优化的目的

## useMemo 的注意事项
### useMemo 是不是用的越多越好？
useMemo 并不是用的越多越好，`缓存本身也需要开销`

比如下面的例子：
```js
const App = () => {
    
    //这种就是完全没必要被 useMemo 缓存的，计算过程一共也就一个创建变量
     const caculateCallback1 = () => {
        let number = 0;
        number = numebr +1;
        return number;
    }

    //这个就需要缓存一下了，毕竟他每次计算的计算量还是蛮大的。
    const caculateCallback2 = () => {
        let number =  0;
        for(let i=0;i<100000;++i){
            number = number +i-(number-i*1.1);
        }
        return number;
    }
    
    return <div>
        不需要缓存：{caculateCallback1()} 
        需要缓存：{caculateCallback2()} 
    </div>
}
```

### useMemo 配合 memo 使用
看下面的例子：
```js
import {useMemo, memo} from 'react';

const Child = React.memo(() => {
  console.log("子组件刷新")
  return <div>子组件</div>
})

const Parent = () => {
  const [num,setNum] = useState(0);
  
  const caculateResult = () => {
      console.log("需要传入子组件的计算属性");
      return 1000;
  }
  
  return (<div>
        <Button 
          type='primary'
          onClick={() => setNum(num + 1)}
        >
           点击更改 num
        </Button>
        <Child result={caculateResult}></Child>
  </div>)
}
```

**运行结果如下：**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d51a31b447384f80be32fb6723453046~tplv-k3u1fbpfcp-watermark.image?)

在上面的代码中，caculateResult 执行计算结果的函数传入了子组件，当点击按钮时，更改了 num，**此时虽然子组件被 memo 包裹了，但是子组件也会重新渲染**，控制台会打印 "子组件刷新"

这是因为，父组件重新渲染时，又创建了一个函数（或者说又`开辟了一个内存地址`）赋值给 caculateResult，而 memo 只做浅比较，发现地址改变了，所以子组件重新渲染，这个时候就需要使用 useMemo 来进行优化

```js
import {useMemo, memo} from 'react';

const Child = React.memo(() => {
  console.log("子组件刷新")
  return <div>子组件</div>
})

const Parent = () => {
  const [num,setNum] = useState(0);
  
  const caculateResult = useMemo(() => {
      console.log("需要传入子组件的计算属性");
      return 1000;
  }, [])
  
  return (<div>
        <Button onClick={() => setNum(num + 1)}>
           点击更改 num
        </Button>
        <Child result={caculateResult}></Child>
  </div>)
}
```

**运行结果如下：**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be1583f9d83148d49b9745d02348a126~tplv-k3u1fbpfcp-watermark.image?)

**此时，再次点击按钮修改 num 后，子组件不会重新更新，达到了性能优化的目的**

# useCallback
## useCallback 的作用
useCallback 类似于 useMemo，只不过 useCallback 用于缓存函数罢了，同样可以防止无关的刷新，对组件做出性能优化

同样也来举个例子：
```js
import { Button, Divider } from "antd";
import React, { useState } from "react";

const Child = (props) => (
  <>
    {props.add()}
  </>
)

const Parent = () => {
  const [num, setNum] = useState(0);

  const add = () => {
    console.log("传入子组件的函数")
  };

  return (
    <div>
      num：{num}
      <Divider />
      <Button type='primary' onClick={() => setNum(num + 1)}>点击更改 num</Button>
      <Child add={add}></Child>
    </div>
  );
};

export default Parent;
```

**运行结果如下：**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3304ed0a9dd54db69664fe9076057a2f~tplv-k3u1fbpfcp-watermark.image?)

当我们点击按钮，更改了父组件的 `num` 状态后，父组件重新渲染，但此时控制台打印 "传入子组件的函数" 这一信息，说明了此时`子组件也重新渲染了`，但是传入子组件的 add 方法和 num 这个状态没有任何关系，我们肯定不希望它做无关的渲染，因此可以使用 `useCallback` 对函数进行缓存对组件进行性能优化

## useCallback 的使用
useCallback 同样接受两个参数：

- **callback**：传入子组件的函数
- **deps**：相关依赖项数组

最终 useCallback 会把传入的 callback 缓存起来。当 deps 依赖发生改变的时候，会重新缓存最新的 callback ，否则就使用缓存的结果

我们来把上面的例子用 useCallback 改造一下

```js
import { Button, Divider } from "antd";
import React, { useState, useCallback } from "react";

const Child = (props) => (
  <>
    {props.add()}
  </>
)

const Parent = () => {
  const [num, setNum] = useState(0);
  const [age, setAge] = useState(22);

  // add 用 useCallback 缓存
  const add = useCallback(() => {
    console.log("传入子组件的函数")
  }, [age]);

  return (
    <div>
      num：{num}
      <Divider />
      <Button type='primary' onClick={() => setNum(num + 1)}>点击更改 num</Button>
      <Child add={add}></Child>
    </div>
  );
};

export default Parent;
```

**运行结果如下：**

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e5a56c9e4274166a8dc47327c5ab525~tplv-k3u1fbpfcp-watermark.image?)

我们发现，虽然我们使用了 `useCallback` 对 `add` 进行了缓存，且依赖项是不会改变的 `age`，但是当点击按钮更改 `num` 后，控制台同样会打印出信息，此时`子组件同样重新渲染了`，这是为什么呢？

**原来，单独使用 useCallback 起不到优化的作用，反而会增加性能消耗，需要和 memo 一起使用**

```js
import { Button, Divider } from "antd";
import React, { useState, useCallback } from "react";

//子组件用 memo 包裹
const Child = React.memo((props) => (
  <>
    {props.add()}
  </>
))

const Parent = () => {
  const [num, setNum] = useState(0);
  const [age, setAge] = useState(22);

  // add 用 useCallback 缓存
  const add = useCallback(() => {
    console.log("传入子组件的函数")
  }, [age]);

  return (
    <div>
      num：{num}
      <Divider />
      <Button type='primary' onClick={() => setNum(num + 1)}>点击更改 num</Button>
      <Child add={add}></Child>
    </div>
  );
};

export default Parent;
```

**再次运行：**


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c140a689e09424e98d061b2488f03f4~tplv-k3u1fbpfcp-watermark.image?)

**此时父组件更改 num 后，子组件不会重新渲染，达到了性能优化的目的。**

# 总结

**memo：**

 - **父组件重新渲染，没有被 memo 包裹的子组件也会重新渲染**
 - **被 memo 包裹的组件只有在 props 改变后，才会重新渲染**
 - **memo 只会对新旧 props 做浅比较，所以对于引用类型的数据如果发生了更改，需要返回一个新的地址**
 - **memo 并不是用的越多越好，因为缓存本身也是需要开销的。如果每一个组件都用 memo 去包裹一下，那么对浏览器的开销就会很大，本末倒置了**
 - **项目中可以针对刷新频率高的组件，根据实际情况，使用 memo 进行优化**

**useMemo：**

- **useMemo 是对计算的结果进行缓存，当缓存结果不变时，会使用缓存结果**
- **useMemo 并不是用的越多越好，对于耗时长、性能开销大的地方，可以使用 useMemo 来优化，但大多数情况下，计算结果的开销还没有使用 useMemo 的开销大，应视情况而定**
- **当父组件传了一个引用类型的结果 result 给子组件，且子组件用 memo 包裹时，需要使用 useMemo 对 result 进行缓存，因为 memo 只对 props 做浅比较，当父组件重新渲染时，会重新在内存中开辟一个地址赋值给 result，此时地址发生改变，子组件会重新渲染**

**useCallback：**

- **useCallback 与 useMemo 类似，只不过是对函数进行缓存**
- **useCallback 可以单独使用，但是单独使用的使用对性能优化并没有实质的提升，且父组件此时重新渲染，子组件同样会渲染**
- **useCallback 需要配合 memo 一起使用，这样当父组件重新渲染时，缓存的函数的地址不会发生改变，memo 浅比较会认为 props 没有改变，因此子组件不会重新渲染**

