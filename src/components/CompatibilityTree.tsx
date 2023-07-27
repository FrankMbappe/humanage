import ReactFlow, { type XYPosition, type Edge, type Node } from "reactflow";
import { type Composition } from "@/models";
import { Box, Flex, type FlexProps } from "@chakra-ui/react";
import Legend from "./Legend";
import "reactflow/dist/style.css";
import { useMemo } from "react";
import { formatAsPercentage, getSpectrumValue } from "@/utils";

type Props = FlexProps & {
  composition: Composition;
};

function getElementPosition(size: number, index: number): XYPosition {
  return (
    [
      undefined, // 0
      undefined, // 1
      [
        { x: 0, y: 0 },
        { x: 0, y: 100 },
      ], // 2
      [
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 200, y: 100 },
      ], // 3
      [
        { x: 0, y: 0 },
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 100, y: 100 },
      ], // 4
      [
        { x: 100, y: 0 },
        { x: 0, y: 100 },
        { x: 50, y: 200 },
        { x: 150, y: 200 },
        { x: 200, y: 100 },
      ], // 5
    ][size]?.[index] || { x: 0, y: 0 }
  );
}

const CompatibilityTree = ({ composition, ...props }: Props) => {
  const nodes = useMemo<Node[]>(
    () =>
      composition.members.map((member, index, array) => ({
        id: member.id,
        style: {
          borderRadius: "50%",
          width: "4rem",
          height: "4rem",
          borderWidth: "0px",
          backgroundImage: `url("${member?.picUrl || ""}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        },
        position: getElementPosition(array.length, index),
        data: {
          ...member,
        },
      })),
    [composition]
  );
  const edges = useMemo<Edge[]>(
    () =>
      composition.relationships.map(({ from, to, compatibility }) => ({
        id: `e${from.id}-${to.id}`,
        source: from.id,
        target: to.id,
        label: formatAsPercentage(compatibility),
        style: {
          stroke: getSpectrumValue(compatibility * 100, [
            "#389AF6", // blue
            "#00A307", // green
            "#FFB800", // orange
            "#FF0808", // red
          ]),
          strokeWidth: "0.125rem",
        },
      })),
    [composition]
  );

  return (
    <Flex direction="column" {...props}>
      <Box w="full" h="sm">
        <ReactFlow nodes={nodes} edges={edges} fitView />
      </Box>
      <Legend />
    </Flex>
  );
};

export default CompatibilityTree;
