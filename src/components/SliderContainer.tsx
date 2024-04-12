import React, { MouseEvent } from "react";
import styles from "../styles/chat.module.scss";

interface SliderProps {
  obj: string;
  className: string;
  title: string;
  content: string;
  onSlideClick: (e: MouseEvent<HTMLDivElement>) => void;
  isActive: string;
  normal: boolean;
}
function SliderContainer({
  obj,
  className,
  title,
  content,
  onSlideClick,
  isActive,
  normal,
}: SliderProps) {
  // 특정글을 선택하면 active처리, 그 외에 것들은 nonActive(검은색 화면)
  // 글 영역 이외인 부분을 클릭 시 -> normal은 true가 되고, active와 nonActive 모두 풀림.
  return (
    <div
      role="button"
      id={obj}
      tabIndex={parseInt(obj, 10)}
      onClick={onSlideClick}
      onKeyDown={() => onSlideClick}
      className={
        normal === true
          ? `${className}`
          : `${obj}` === isActive
          ? `${className} ${styles.active}`
          : `${className} ${styles.nonActive}`
      }
    >
      <h3 id={String(obj)}>{title}</h3>
      <div
        id={String(obj)}
        className={
          normal === true
            ? styles.sharetext
            : `${obj}` === isActive
            ? styles.sharetext
            : styles.nonsharetext
        }
      >
        <p id={String(obj)}>{content}</p>
      </div>
    </div>
  );
}

export default SliderContainer;
