import React, {FC} from 'react';
import {
    EdgeProps,
    getBezierPath,
    EdgeLabelRenderer,
    BaseEdge,
    getStraightPath,
    getSmoothStepPath,
    Position, getSimpleBezierPath
} from 'reactflow';

const CustomEdge: FC<EdgeProps> = ({
                                       id,
                                       sourceX,
                                       sourceY,
                                       targetX,
                                       targetY,
                                       sourcePosition,
                                       targetPosition,
                                       data,
                                       style,
                                       markerEnd
                                   }) => {
    const [edgePath, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
        sourceX: sourceX,
        sourceY: sourceY,
        sourcePosition: sourcePosition,
        targetX: targetX,
        targetY: targetY,
        targetPosition: targetPosition,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd}/>
            <EdgeLabelRenderer>
                <div
                    style={{
                        display: data.label ? 'block' : 'none',
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        background: '#ffffff',
                        border: '1px solid #222222',
                        borderRadius: '3px',
                        padding: '0 4px',
                        fontSize: 11,
                    }}
                    className="nodrag nopan"
                >
                    {data.label}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

export default CustomEdge;