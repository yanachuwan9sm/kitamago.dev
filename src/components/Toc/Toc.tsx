import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

import cheerio from "cheerio";

import style from "./Toc.module.scss";

export type TocTypes = {
  text: string;
  id: string;
  name: string;
};

interface Props {
  htmlString: string;
}

const Toc: React.VFC<Props> = ({ htmlString }) => {
  // bodyデータを読込
  const $ = cheerio.load(htmlString);
  // h1,h2,h3タグを抽出し配列化する
  const toc = $("h1, h2, h3")
    .toArray()
    .map((data: any) => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name,
    }));

  return (
    <>
      {toc.length ? (
        <div className={style.container}>
          <h4>目次</h4>
          <div>
            <ul className={style.toclists}>
              {toc.map((toc, index) => {
                return (
                  <li
                    className={
                      toc.name === "h2"
                        ? style.h2
                        : toc.name === "h3"
                        ? style.h3
                        : toc.name === "h4"
                        ? style.h4
                        : style.none
                    }
                    key={toc.id}
                  >
                    {/* <a href={"#" + toc.id}>{toc.text}</a> */}
                    <AnchorLink href={"#" + toc.id}>{toc.text}</AnchorLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Toc;
