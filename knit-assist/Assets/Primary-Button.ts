import { RectangleButton } from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/RectangleButton';
import {
  RoundedRectangleVisual,
  RoundedRectangleVisualState,
} from 'SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangleVisual';
import { StateName } from 'SpectaclesUIKit.lspkg/Scripts/Components/Element';

// Primary blue palette
const DEFAULT_FILL  = new vec4(0.173, 0.357, 0.769, 0.60);
const HOVER_FILL    = new vec4(0.173, 0.357, 0.769, 0.80);
const ACTIVE_FILL   = new vec4(0.173, 0.357, 0.769, 1.00);
const BORDER        = new vec4(0.282, 0.529, 0.922, 1.00);
const BORDER_H      = new vec4(0.400, 0.650, 1.000, 1.00);

@component
export class UIKitCustomVisualsRectangleButton extends BaseScriptComponent {
  onAwake() {
    const button = this.sceneObject.getComponent(
      RectangleButton.getTypeName()
    ) as RectangleButton;

    if (!button) {
      print('UIKitCustomVisualsRectangleButton: RectangleButton not found');
      return;
    }

    const style: Partial<Record<StateName, RoundedRectangleVisualState>> = {
      default: {
        hasBorder:   true,
        borderSize:  0.04,
        borderType:  'Color',
        borderColor: BORDER,
        baseColor:   DEFAULT_FILL,
      },
      hovered: {
        hasBorder:   true,
        borderSize:  0.04,
        borderType:  'Color',
        borderColor: BORDER_H,
        baseColor:   HOVER_FILL,
      },
      triggered: {
        hasBorder:   true,
        borderSize:  0.05,
        borderType:  'Color',
        borderColor: BORDER_H,
        baseColor:   ACTIVE_FILL,
      },
    };

    const customVisual = new RoundedRectangleVisual({
      sceneObject: button.sceneObject,
      style,
    });

    button.visual = customVisual;
    button.initialize();

    this.createEvent('OnStartEvent').bind(() => {
      const vis = button.visual as RoundedRectangleVisual;
      if (!vis) return;

      vis.cornerRadius = 3.0;

      vis.defaultBaseType   = 'Color';
      vis.hoveredBaseType   = 'Color';
      vis.triggeredBaseType = 'Color';

      vis.baseDefaultColor   = DEFAULT_FILL;
      vis.baseHoveredColor   = HOVER_FILL;
      vis.baseTriggeredColor = ACTIVE_FILL;

      vis.defaultHasBorder   = true;
      vis.hoveredHasBorder   = true;
      vis.triggeredHasBorder = true;

      vis.defaultBorderSize   = 0.04;
      vis.hoveredBorderSize   = 0.04;
      vis.triggeredBorderSize = 0.05;

      vis.borderDefaultColor   = BORDER;
      vis.borderHoveredColor   = BORDER_H;
      vis.borderTriggeredColor = BORDER_H;
    });
  }
}