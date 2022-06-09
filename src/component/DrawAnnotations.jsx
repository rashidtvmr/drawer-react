import { Stage, Layer, Rect } from "react-konva";
import { useState } from "react";

const DrawAnnotations = ({ annotations = [], setAnnotations, type = "view" }) => {

    const [newAnnotation, setNewAnnotation] = useState([]);

    const handleMouseDown = event => {
        if (newAnnotation.length === 0) {
            const { x, y } = event.target.getStage().getPointerPosition();
            setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
        }
    };

    const handleMouseUp = event => {
        if (newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = event.target.getStage().getPointerPosition();
            const annotationToAdd = {
                x: sx,
                y: sy,
                width: x - sx,
                height: y - sy,
                key: annotations.length + 1
            };
            setNewAnnotation([]);
            setAnnotations(annotations => {
                annotations.push(annotationToAdd);
                return [...annotations]
            });
        }
    };

    const handleMouseMove = event => {
        if (newAnnotation.length === 1) {
            const sx = newAnnotation[0].x;
            const sy = newAnnotation[0].y;
            const { x, y } = event.target.getStage().getPointerPosition();
            setNewAnnotation([
                {
                    x: sx,
                    y: sy,
                    width: x - sx,
                    height: y - sy,
                    key: "0"
                }
            ]);
        }
    };

    const annotationsToDraw = [...annotations, ...newAnnotation];
    return (
        <div className="card text-center">
            <Stage
                className="canvaa"
                onMouseDown={type === 'view' ? undefined : handleMouseDown}
                onMouseUp={type === 'view' ? undefined : handleMouseUp}
                onMouseMove={type === 'view' ? undefined : handleMouseMove}
                width={window.innerWidth/2}
                height={700}
            >
                <Layer>
                    {annotationsToDraw.map(value => {
                        return (
                            <Rect
                                x={value.x}
                                y={value.y}
                                width={value.width}
                                height={value.height}
                                fill="transparent"
                                stroke="black"
                            />
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
};

export default DrawAnnotations;