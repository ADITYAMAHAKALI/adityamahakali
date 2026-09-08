"use client";

import Script from "next/script";

export default function LinkedInFeed() {
  return (
    <>
      <div className="sk-ww-linkedin-profile-post" data-embed-id="25711991" />
      <Script
        src="https://widgets.sociablekit.com/linkedin-profile-posts/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
