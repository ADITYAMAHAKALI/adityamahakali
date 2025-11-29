import { IconType } from "react-icons";

export type Skill = {
  name: string;
  icon: IconType;
};

type SkillCardProps = {
  title: string;
  skills: Skill[];
};

const SkillCard = ({ title, skills }: SkillCardProps) => {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur-sm transition-transform transition-shadow duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-blue-100">{title}</h3>
        <span className="h-1 w-14 rounded-full bg-gradient-to-r from-indigo-200 via-blue-200 to-cyan-200" />
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <span
              key={`${title}-${skill.name}`}
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-200 group-hover:bg-white/30"
            >
              <Icon
                aria-label={`${skill.name} icon`}
                role="img"
                className="text-lg drop-shadow"
              />
              <span>{skill.name}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default SkillCard;
