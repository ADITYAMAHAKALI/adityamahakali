"use client";

import { Skill } from "./SkillCard";

export type SkillsCarouselBucket = {
  title: string;
  skills: Skill[];
};

type CarouselRowProps = {
  buckets: SkillsCarouselBucket[];
  direction: "left" | "right";
  speed?: "slow" | "normal";
};

type SkillsCarouselProps = {
  buckets: SkillsCarouselBucket[];
};

function CarouselRow({ buckets, direction, speed = "normal" }: CarouselRowProps) {
  const loopBuckets = [...buckets, ...buckets];

  return (
    <div className="carousel-row-wrap">
      <div className={`carousel-row ${direction} ${speed}`}>
        {loopBuckets.map((bucket, index) => (
          <article
            key={`${bucket.title}-${index}`}
            className="skill-bucket"
            aria-label={bucket.title}
          >
            <h3>{bucket.title}</h3>
            <div className="skill-chip-wrap">
              {bucket.skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <span key={`${bucket.title}-${skill.name}`} className="skill-chip">
                    <Icon aria-hidden="true" />
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function SkillsCarousel({ buckets }: SkillsCarouselProps) {
  const firstRow = buckets.filter((_, index) => index % 2 === 0);
  const secondRow = buckets.filter((_, index) => index % 2 !== 0);

  return (
    <section className="skills-carousel" aria-label="Skills and expertise carousel">
      <CarouselRow buckets={firstRow} direction="left" speed="normal" />
      <CarouselRow buckets={secondRow} direction="right" speed="slow" />
    </section>
  );
}
