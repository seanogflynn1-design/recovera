import { Composition } from "remotion";
import { RecoveraPitch } from "./components/RecoveraPitch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RecoveraPitch"
        component={RecoveraPitch}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
