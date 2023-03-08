import cornerstoneTools, {
  getToolState,
  addToolState
} from "cornerstone-tools";
const BaseAnnotationTool = cornerstoneTools.importInternal(
  "base/BaseAnnotationTool"
);

const drawTextBox = cornerstoneTools.importInternal("drawing/drawTextBox");
const getNewContext = cornerstoneTools.importInternal("drawing/getNewContext");

export default class MyCustomTool extends BaseAnnotationTool {
  constructor(name = "MyCustom") {
    super({
      name,
      supportedInteractionTypes: ["Mouse"],
      mixins: ["activeOrDisabledBinaryTool"]
    });
  }
  createNewMeasurement(eventData) {
    const goodEventData =
      eventData && eventData.currentPoints && eventData.currentPoints.image;

    if (!goodEventData) {
      console.error(
        `required eventData not supplied to tool ${this.name}'s createNewMeasurement`
      );
      return;
    }
    const measurementData = {
      visible: true,
      active: true,
      invalidated: true,
      color: undefined,
      handles: {
        points: []
      }
    };

    measurementData.handles.textBox = {
      active: false,
      hasMoved: false,
      movesIndependently: false,
      drawnIndependently: true,
      allowedOutsideImage: true,
      hasBoundingBox: true
    };

    return measurementData;
  }
  pointNearTool(element, data, coords) {
    const validParameters = data && data.handles && data.handles.points;
    console.log("pointneartool called");
    console.log(data);
    if (!validParameters) {
      throw new Error(
        `invalid parameters supplied to tool ${this.name}'s pointNearTool`
      );
    }

    if (!validParameters || data.visible === false) {
      return false;
    }
    return false;
  }
  preMouseDownCallback(evt) {
    const eventData = evt.detail;
    console.log("premousecallback");
    console.log(eventData);
    //  preventPropagation(evt);
    const nearby = this._pointNearHandleAllTools(eventData);
    console.log(nearby);
    if (eventData.event.ctrlKey) {
      if (nearby !== undefined && nearby.handleNearby.hasBoundingBox) {
        // Ctrl + clicked textBox, do nothing but still consume event.
      } else {
        insertOrDelete(evt, nearby);
      }

      preventPropagation(evt);

      return true;
    }
    preventPropagation(evt);
    return false;
  }
  _pointNearHandleAllTools(eventData) {
    const { currentPoints, element } = eventData;
    const coords = currentPoints.canvas;
    const measurementData = this.createNewMeasurement(eventData);
    addToolState(element, this.name, measurementData);
    const toolState = getToolState(element, this.name);
    console.log("_pointNearHandleAllTools");
    console.log(element);
    console.log(this.name);
    console.log(toolState);
    console.log(coords);
    if (!toolState) {
      return;
    }
  }
  activeCallback(element) {
    console.log(`Hello element ${element.uuid}!`);
  }

  disabledCallback(element) {
    console.log(`Goodbye element ${element.uuid}!`);
  }
  renderToolData(evt) {
    const eventData = evt.detail;
    console.log("rendertooldata");
    console.log(evt);
    const toolState = getToolState(evt.currentTarget, this.name);

    console.log(toolState);

    if (!toolState) {
      return;
    }
    const config = this.configuration;
    console.log(config);
  }
}

function defaultFreehandConfiguration() {
  return {
    mouseLocation: {
      handles: {
        start: {
          highlight: true,
          active: true
        }
      }
    },
    spacing: 1,
    activeHandleRadius: 3,
    completeHandleRadius: 6,
    completeHandleRadiusTouch: 28,
    alwaysShowHandles: false,
    invalidColor: "crimson",
    currentHandle: 0,
    currentTool: -1,
    drawHandles: true,
    renderDashed: false
  };
}

class FreehandHandleData {
  /**
   * Constructs a a single handle for the freehand tool
   *
   * @param {Object} position - The position of the handle.
   * @param {boolean} highlight - whether the handle should be rendered as the highlighted color.
   * @param {boolean} active - whether the handle is active.
   */
  constructor(position, highlight = true, active = true) {
    this.x = position.x;
    this.y = position.y;
    this.highlight = highlight;
    this.active = active;
    this.lines = [];
  }
}

function insertOrDelete(evt, nearby) {
  const eventData = evt.detail;
  console.log("insertordelete called");
  if (nearby && nearby.handleNearby !== null) {
    const deleteInfo = {
      toolIndex: nearby.toolIndex,
      handleIndex: nearby.handleNearby
    };

    // _deletePoint.call(this, eventData, deleteInfo);
  } else {
    // const freehandLineFinder = new FreehandLineFinder(eventData, this.name);
    // const insertInfo = freehandLineFinder.findLine();
    // if (insertInfo) {
    //   _insertPoint.call(this, eventData, insertInfo);
    // }
  }
}
function preventPropagation(evt) {
  evt.stopImmediatePropagation();
  evt.stopPropagation();
  evt.preventDefault();
}
