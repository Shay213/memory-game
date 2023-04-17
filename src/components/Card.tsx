import React, { useRef } from "react";

export default ({name, handleClick, id}: {name: string, handleClick: (current: HTMLDivElement | null) => void, id: number}) => {
    const imgSrc = `/${name}.svg`;
    const cardRef = useRef<HTMLDivElement>(null);
    return (
      <div onClick={() => handleClick(cardRef.current)} ref={cardRef} id={id+''}>
        <img src={imgSrc} alt="card" style={{width: '70%'}}/>
      </div>
    );
}