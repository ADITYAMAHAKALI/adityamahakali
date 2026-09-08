"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function LinkedInFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="sk-ww-linkedin-profile-post" data-embed-id="25711991" />
      {shouldLoad && (
        <Script
          src="https://widgets.sociablekit.com/linkedin-profile-posts/widget.js"
          strategy="lazyOnload"
        />
      )}
    </div>
  );
}
