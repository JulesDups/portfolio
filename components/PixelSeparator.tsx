"use client";

export const PixelSeparator = () => {
  return (
    <div className="w-full h-8 relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='10' viewBox='0 0 20 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10H5V5H10V0H15V5H20V10H0Z' fill='%231f4045' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundPosition: "bottom",
          backgroundSize: "20px 10px",
        }}
      ></div>
    </div>
  );
};
