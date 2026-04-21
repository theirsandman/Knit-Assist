import { RectangleButton } from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/RectangleButton';
import {
  RoundedRectangleVisual,
  RoundedRectangleVisualState,
} from 'SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangleVisual';
import { StateName } from 'SpectaclesUIKit.lspkg/Scripts/Components/Element';

// Knit Assist toolbar colors
const INACTIVE_FILL = new vec4(1.0, 1.0, 1.0, 0.20);        // white 20%
const HOVER_FILL    = new vec4(0.282, 0.529, 0.922, 0.20);  // blue 20%
const ACTIVE_FILL   = new vec4(0.282, 0.529, 0.922, 0.70);  // blue 70%

const BORDER        = new vec4(1.0, 1.0, 1.0, 1.0);         // white
const BORDER_H      = new vec4(0.282, 0.529, 0.922, 1.0);   // blue
const ACTIVE_BORDER = new vec4(0.282, 0.529, 0.922, 1.0);   // blue

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
        hasBorder: true,
        borderSize: 0.08,
        borderType: 'Color',
        borderColor: BORDER,
        baseColor: INACTIVE_FILL,
      },
      hovered: {
        hasBorder: true,
        borderSize: 0.08,
        borderType: 'Color',
        borderColor: BORDER_H,
        baseColor: HOVER_FILL,
      },
      triggered: {
        hasBorder: true,
        borderSize: 0.10,
        borderType: 'Color',
        borderColor: ACTIVE_BORDER,
        baseColor: ACTIVE_FILL,
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
      if (!vis) {
        return;
      }

      // Make the button more pill-shaped
      vis.cornerRadius = 3.0;

      // Use flat colors, not gradients
      vis.defaultBaseType = 'Color';
      vis.hoveredBaseType = 'Color';
      vis.triggeredBaseType = 'Color';

      vis.baseDefaultColor = INACTIVE_FILL;
      vis.baseHoveredColor = HOVER_FILL;
      vis.baseTriggeredColor = ACTIVE_FILL;

      vis.defaultHasBorder = true;
      vis.hoveredHasBorder = true;
      vis.triggeredHasBorder = true;

      vis.defaultBorderSize = 0.08;
      vis.hoveredBorderSize = 0.08;
      vis.triggeredBorderSize = 0.10;

      vis.borderDefaultColor = BORDER;
      vis.borderHoveredColor = BORDER_H;
      vis.borderTriggeredColor = ACTIVE_BORDER;
    });
  }
}