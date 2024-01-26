"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useRef } from "react";

export default function Home() {
  const parentRef = useRef(null);
  const data = Array.from({ length: 10000 }, (_) => Math.random());

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 55,
  });

  return (
    <main>
      <>
        {/* The scrollable element for your list */}
        <div
          ref={parentRef}
          style={{
            height: `400px`,
            overflow: "auto", // Make it scroll!
          }}
        >
          {/* The large inner element to hold all of the items */}
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {/* Only the visible items in the virtualizer, manually positioned to be in view */}
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                  border: "1px solid white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Row {virtualItem.index} {data[virtualItem.index]}
              </div>
            ))}
          </div>
        </div>
      </>
    </main>
  );
}
