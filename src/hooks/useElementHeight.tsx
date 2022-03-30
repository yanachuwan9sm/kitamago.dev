import React, { useEffect, useRef, useState } from "react";

export const useElementHeight = () => {
  // memo :
  // 返り値としてRefObjectを受け取る。
  // (条件)初期値が null で型定義に null を含まない場合
  // 以下のref => RefObject<HTMLDivElement>
  //              .current は readonly 。
  //
  // 返り値として MutableRefObject<T>を受け取ると、.currentが書き込み可能になってしまう
  // useRef をDOMにアクセスする手段に徹しさせる場合は Bad Method
  // => .current を更新するのはReactのランタイムだけであるべき
  const heightInspectedElm = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<Number>(0);

  useEffect(() => {
    if (heightInspectedElm?.current) {
      const { height } = heightInspectedElm.current.getBoundingClientRect();
      setHeight(height);
    }
  }, [heightInspectedElm]);

  return [heightInspectedElm, height];
};
