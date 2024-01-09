import Tree from "react-d3-tree";
import dummies from "./dummies/small.json";
import { useCallback, useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import { Stack } from "@mui/material";
import { $User } from "./services";

const textLayout = {
  vertical: {
    title: {
      textAnchor: "start",
      x: 40,
    },
    attributes: {},
    attribute: {
      x: 40,
      dy: "1.2em",
    },
  },
  horizontal: {
    title: {
      textAnchor: "start",
      y: 40,
    },
    attributes: {
      x: 0,
      y: 40,
    },
    attribute: {
      x: 0,
      dy: "1.2em",
    },
  },
};

const PureSvgNodeElement = ({ nodeDatum, orientation, toggleNode, onNodeClick }) => {
  return (
    <>
      <circle r={20} onClick={toggleNode}></circle>
      <g className="rd3t-label">
        <text className="rd3t-label__title" {...textLayout[orientation].title} onClick={onNodeClick}>
          {nodeDatum.name}
        </text>
        <text className="rd3t-label__attributes" {...textLayout[orientation].attributes}>
          {nodeDatum.attributes && (
            <>
              <tspan {...textLayout[orientation].attribute}>Email: {nodeDatum.attributes.EmailAddress}</tspan>
              <tspan {...textLayout[orientation].attribute}>Title: {nodeDatum.attributes.Title}</tspan>
            </>
          )}
        </text>
      </g>
    </>
  );
};

function App() {
  const treeContainer = useRef();
  const [users, setUsers] = useState({});
  const [state, setState] = useState({
    orientation: "horizontal",
    dimensions: undefined,
    translateX: 200,
    translateY: 300,
    depthFactor: undefined,
    zoomable: true,
    draggable: true,
    zoom: 1,
    scaleExtent: { min: 0.1, max: 1 },
    separation: { siblings: 1, nonSiblings: 1 },
    nodeSize: { x: 300, y: 200 },
    enableLegacyTransitions: false,
    transitionDuration: 500,
    styles: {
      nodes: {
        node: {
          circle: {
            fill: "#52e2c5",
          },
          attributes: {
            stroke: "#000",
          },
        },
        leafNode: {
          circle: {
            fill: "transparent",
          },
          attributes: {
            stroke: "#000",
          },
        },
      },
    },
  });
  const renderCustomNodeElement = useCallback(
    ({ nodeDatum, toggleNode }, appState) => (
      <PureSvgNodeElement
        nodeDatum={nodeDatum}
        toggleNode={async () => {
          const data = await $User.collapse({ manager: `${nodeDatum.attributes.FirstName} ${nodeDatum.attributes.LastName}`, path: nodeDatum.attributes.path });

          if (data.length > 0) {
            const newUsers = { ...users };

            const node = nodeDatum.attributes.path.reduce((a, c) => a.children[c], newUsers);

            node.children = data;

            setUsers(newUsers);
          }

          toggleNode();
        }}
        orientation={appState.orientation}
      />
    ),
    [users]
  );

  const handleSuggestionClick = async (user) => {
    const data = await $User.get({ id: user.WWID });
    setUsers(data.get());
  };

  useEffect(() => {
    (async () => {
      const dimensions = treeContainer.current.getBoundingClientRect();
      setState((prev) => ({ ...prev, translateX: dimensions.width / 4, translateY: dimensions.height / 2 }));

      const data = await $User.get();

      if (data) {
        setUsers(data.get());
      }
    })();
  }, []);

  return (
    <Stack direction="row" minHeight="100vh">
      <Stack position="absolute" top={8} right={0} left={0} alignItems="center">
        <SearchBar onClick={handleSuggestionClick} />
      </Stack>
      <Stack ref={treeContainer} flex={1}>
        <Tree
          hasInteractiveNodes
          collapsible
          shouldCollapseNeighborNodes={false}
          data={users}
          pathFunc="step"
          renderCustomNodeElement={(rd3tProps) => renderCustomNodeElement(rd3tProps, state)}
          orientation={state.orientation}
          dimensions={state.dimensions}
          centeringTransitionDuration={800}
          translate={{ x: state.translateX, y: state.translateY }}
          zoomable={state.zoomable}
          draggable={state.draggable}
          zoom={state.zoom}
          scaleExtent={state.scaleExtent}
          nodeSize={state.nodeSize}
          separation={state.separation}
          enableLegacyTransitions={state.enableLegacyTransitions}
          transitionDuration={state.transitionDuration}
          depthFactor={state.depthFactor}
          styles={state.styles}
        />
      </Stack>
    </Stack>
  );
}

export default App;
