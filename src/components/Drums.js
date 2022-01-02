import { useState } from "react";
import styles from "./Drum.module.css";
import { bankOne, bankTwo } from "./banks";
import { useEffect } from "react/cjs/react.development";

const Drums = (props) => {
  const [cur, setCur] = useState("");
  const [nextBank, setNextBank] = useState(true);
  const [curBank, setCurBank] = useState(bankOne);
  const keyTriggers = curBank.map(ob => ob.keyTrigger)
  const handleButton = (e) => {
    setNextBank(!nextBank);
    nextBank ? setCurBank(bankTwo) : setCurBank(bankOne);
  };
  const handleClick = (e) => {
    if (keyTriggers.includes(e)) {
      document.getElementById(e).currentTime=0
      document.getElementById(e).play()
    }
  }
  useEffect(() => {
    // const codeScript = document.createElement('script')
    // codeScript.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'
    // document.body.appendChild(codeScript)
    document.addEventListener("keydown", (e) => {
      if (keyTriggers.includes(e.key.toUpperCase())) {
        document.getElementById(e.key.toUpperCase()).currentTime=0;
        document.getElementById(e.key.toUpperCase()).play();
        const filter = curBank.filter(ob => ob.keyTrigger === e.key.toUpperCase())
        setCur(filter[0].id)
      }
    })
  },[curBank, keyTriggers]);
  return (
    <div id="drum-machine" className={styles.drumMachine}>
      <div className={styles.drumMachinePad}>
        {curBank.map(ob => (
              <button key={ob.id} onClick={e => {handleClick(ob.keyTrigger); setCur(ob.id)}} className="drum-pad" id={ob.id}>
              {ob.keyTrigger}
              <audio id={ob.keyTrigger} className="clip" src={ob.url} />
            </button>
        ))}
      </div>
      <div id="display" className={styles.display}>
        {cur}
      </div>
      <button onClick={(e) => handleButton(e)} className={styles.button}>
        Change
      </button>
    </div>
  );
};

export default Drums;
