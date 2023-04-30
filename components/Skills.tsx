import { SkillBarProps } from "@/Types";
import { useEffect, useRef, useState } from "react";

export default function Skills({ skills }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [progress, setProgress] = useState<number[]>(skills.map(() => 0));
  const [animatedProgress, setAnimatedProgress] = useState<number[]>(
    skills.map(() => 0)
  );
  useEffect(() => {
    function onScroll() {
      if (ref.current) {
        const { top, bottom } = ref.current.getBoundingClientRect();
        const isVisible = top < window.innerHeight && bottom >= 0;
        if (isVisible && !visible) {
          setVisible(true);
          setProgress(skills.map((skill) => skill.level));
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [skills, visible]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimatedProgress((prevProgress) =>
        prevProgress.map((value, index) => {
          const diff = progress[index] - value;
          const step = Math.ceil(diff / 10);
          return value + step;
        })
      );
    }, 100);
    return () => {
        clearInterval(intervalId)
    }
  }, [progress]);
  return (
    <div>
      <div className="text-WhiteGray font-semibold uppercase text-sm text-center">
        - Skills
      </div>
      <div className="font-semibold text-3xl mt-4 text-center text-White">
        What I Expert
      </div>
      <div ref={ref} className="grid md:grid-cols-2 gap-4 p-10">
        {skills.map((skill, index) => (
          <div key={skill.name} className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-White">{skill.name}</span>
              <span className="font-bold text-WhiteGray text-sm">{animatedProgress[index]}%</span>
            </div>
            <div className="relative w-full h-2 bg-WhiteGray rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-Orange rounded-full" style={{width: `${visible ? animatedProgress[index] : 0}%`, transition: "width 1s"}}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
