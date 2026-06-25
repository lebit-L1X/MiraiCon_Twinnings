import { Sprite, Text, useTick } from "@pixi/react";
import { useRef, useState } from "react";
export const Floatable = ({
    canvasSize,
    type = "image",
    content,
    size = 50,
    style = {},
    incrementCounter,
}) => {
    const [, setTick] = useState(0);
    const [collected, setCollected] = useState(false);



    const item = useRef(
        type === "image"
            ? {
                x: canvasSize.width + Math.random() * 200,
                y: Math.random() * (canvasSize.height * (2 / 3)),
                vx: 0.3 + Math.random() * 0.8,
                t: Math.random() * 1000,
            }
            : {
                x: canvasSize.width + Math.random() * 300,
                y: Math.random() * (canvasSize.height * (2 / 3)),
                speed: 2 + Math.random() * 3,
            }
    );

    useTick(() => {
        if (type !== "image") {
            item.current.x -= item.current.speed;

            if (item.current.x < -100) {
                item.current.x = canvasSize.width + Math.random() * 300;
                item.current.y = Math.random() * (canvasSize.height * (2 / 3));
            }
        }

        if (type === "image") {
            item.current.t += 0.02;
            item.current.x -= 0.8;
            item.current.y += Math.sin(item.current.t) * 0.4;

            if (item.current.y < 0) item.current.y = 0;

            if (item.current.x < -100) {
                item.current.x = canvasSize.width + Math.random() * 200;
                item.current.y = Math.random() * (canvasSize.height * (2 / 3));
            }
        }

        setTick((v) => v + 1);

    });
    if (collected) {
        return null;
    }
    if (type === "image") {
        return (
            <Sprite
                image={content}
                x={item.current.x}
                y={item.current.y}
                anchor={0.5}
                width={size}
                height={size}
                eventMode="dynamic"
                cursor="pointer"
                pointertap={() => {
                    incrementCounter?.();
                }}
            />
        );
    }

    return (
        <Text
            text={content}
            x={item.current.x}
            y={item.current.y}
            anchor={0.5}
            style={{
                fill: "white",
                fontSize: 24,
                ...style,
            }}
        />
    );
};