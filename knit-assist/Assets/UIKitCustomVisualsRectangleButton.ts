import { RectangleButton } from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/RectangleButton';
import {
  RoundedRectangleVisual,
  RoundedRectangleVisualState,
} from 'SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangleVisual';
import { StateName } from 'SpectaclesUIKit.lspkg/Scripts/Components/Element';

// Liquid glass palette
const INACTIVE_FILL   = new vec4(1.0,  1.0,  1.0,  0.20);
const HOVER_FILL      = new vec4(0.282,0.529,0.922, 0.20);
const ACTIVE_FILL     = new vec4(0.282,0.529,0.922, 0.70);
const BORDER          = new vec4(1.0,  1.0,  1.0,  1.0);
const BORDER_H        = new vec4(0.282,0.529,0.922, 1.0);
const ACTIVE_BORDER   = new vec4(0.282,0.529,0.922, 1.0);

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
      if (!vis) return;

      // Pill shape — keep same as original, just slightly rounder
      vis.cornerRadius = 3.0;

      // Flat colors only
      vis.defaultBaseType   = 'Color';
      vis.hoveredBaseType   = 'Color';
      vis.triggeredBaseType = 'Color';

      vis.baseDefaultColor   = INACTIVE_FILL;
      vis.baseHoveredColor   = HOVER_FILL;
      vis.baseTriggeredColor = ACTIVE_FILL;

      vis.defaultHasBorder   = true;
      vis.hoveredHasBorder   = true;
      vis.triggeredHasBorder = true;

      // Thinner borders — more refined than original
      vis.defaultBorderSize   = 0.04;
      vis.hoveredBorderSize   = 0.04;
      vis.triggeredBorderSize = 0.05;

      vis.borderDefaultColor   = BORDER;
      vis.borderHoveredColor   = BORDER_H;
      vis.borderTriggeredColor = ACTIVE_BORDER;
    });
  }
}