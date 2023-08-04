import { Square } from "./Square";
import { TURNS } from "../constants";
export const TurnIndicator = ({ turn }) => {
    return (
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          <img src="/x.svg" alt="" />
        </Square>
        <Square isSelected={turn === TURNS.O}>
          <img src="/o.svg" alt="" />
        </Square>
      </section>
    );
  }
  