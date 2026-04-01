# Instructions for the AI Agent

## Temporary Screenshots Analysis

**Folder**: `temporary screenshots/`

**Purpose**: This folder is strictly used for storing generated Puppeteer screenshots so I (the AI) can see and analyze the images directly.

### Strict UI Comparison Rules
When comparing screenshots generated here against a reference image, I must be highly precise and specific. Vague feedback is not allowed. 

I must check and explicitly point out differences using exact pixel approximations, including but not limited to:

1. **Spacing & Padding**: 
   - Report exact differences.
   - *Example: "card gap is 16px but should be 24px"*
2. **Typography**:
   - Check font size, font weight, and line-height.
   - *Example: "heading is 32px but reference shows ~24px"*
3. **Colors**:
   - Verify specific hex codes and shades against the reference.
4. **Alignment**:
   - Verify center, left/right alignments, flex/grid layouts, and text alignment.
5. **Shapes**:
   - Check border-radius exactly (e.g., *8px* vs *12px*).
   - Verify box-shadow intensity, spread, and color exactly.
6. **Images & Proportions**:
   - Check image sizing (width/height dimensions).
   - Check aspect ratios and object-fit properties.

*Adhere strictly to this review protocol when requested to compare UI.*
