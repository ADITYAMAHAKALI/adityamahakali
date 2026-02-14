"use client";

import { Skill } from "./SkillCard";

type SkillsStripsProps = {
  ml: Skill[];
  fullstack: Skill[];
};

function Strip({ label, skills, direction }: { label: string; skills: Skill[]; direction: "left" | "right" }) {
  const loop = [...skills, ...skills, ...skills];
  return (
    <section className="skill-strip" aria-label={label}>
      <div className={`skill-strip-track ${direction}`}>
        {loop.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <span key={`${label}-${skill.name}-${index}`} className="skill-strip-chip">
              <Icon aria-hidden="true" />
              <span>{skill.name}</span>
            </span>
          );
        })}
      </div>
    </section>
  );
}

export default function SkillsStrips({ ml, fullstack }: SkillsStripsProps) {
  return (
    <div className="skills-strips">
      <Strip label="Machine learning strip" skills={ml} direction="left" />
      <Strip label="Full-stack software development strip" skills={fullstack} direction="right" />
    </div>
  );
}

