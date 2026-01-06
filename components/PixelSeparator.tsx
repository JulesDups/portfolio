"use client";

export const PixelSeparator = () => {
  return (
    <div className="w-full h-8 relative overflow-hidden bg-foreground/5 dark:bg-foreground/10">
      <div className="absolute inset-x-0 bottom-0 h-2">
        <svg
          className="w-full h-full text-foreground/20 dark:text-foreground/30"
          preserveAspectRatio="none"
          viewBox="0 0 1200 10"
        >
          <path
            d="M0 10 Q15 0 30 10 Q45 0 60 10 Q75 0 90 10 Q105 0 120 10 Q135 0 150 10 Q165 0 180 10 Q195 0 210 10 Q225 0 240 10 Q255 0 270 10 Q285 0 300 10 Q315 0 330 10 Q345 0 360 10 Q375 0 390 10 Q405 0 420 10 Q435 0 450 10 Q465 0 480 10 Q495 0 510 10 Q525 0 540 10 Q555 0 570 10 Q585 0 600 10 Q615 0 630 10 Q645 0 660 10 Q675 0 690 10 Q705 0 720 10 Q735 0 750 10 Q765 0 780 10 Q795 0 810 10 Q825 0 840 10 Q855 0 870 10 Q885 0 900 10 Q915 0 930 10 Q945 0 960 10 Q975 0 990 10 Q1005 0 1020 10 Q1035 0 1050 10 Q1065 0 1080 10 Q1095 0 1110 10 Q1125 0 1140 10 Q1155 0 1170 10 Q1185 0 1200 10"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};
