function SolomonFlag() {
  return (
    <svg
      className="govbanner__flag"
      viewBox="0 0 36 18"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="18" fill="#0051ba" />
      <polygon points="0,18 36,18 36,4" fill="#215b33" />
      <polygon points="0,16 0,18 4,18 36,6 36,4" fill="#fce300" />
      <g fill="#ffffff">
        {[
          [6, 4],
          [12, 4],
          [6, 10],
          [9, 7],
          [12, 10],
        ].map(([cx, cy]) => (
          <Star key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.3} />
        ))}
      </g>
    </svg>
  );
}

function Star({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r / 2.5;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  return <polygon points={points} />;
}

export function GovBanner() {
  return (
    <div className="govbanner" role="region" aria-label="Government website notice">
      <div className="govbanner__inner">
        <SolomonFlag />
        <span className="govbanner__text">
          Official Site of Solomon Islands Government
        </span>
      </div>
    </div>
  );
}
