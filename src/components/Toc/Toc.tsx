import React from "react";
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
                  <li className={"list " + toc.name} key={toc.id}>
                    <a href={"#" + toc.id}>{toc.text}</a>
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
