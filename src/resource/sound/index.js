import UIfx from "uifx";
import notifyMp3 from "./notify.mp3";

const configSound = {
  volume: 0.9, // value must be between 0.0 ⇔ 1.0
  throttleMs: 50,
};

const notifySound = new UIfx(notifyMp3, configSound);

export const playNotifySound = () => {
  notifySound.play();
};
