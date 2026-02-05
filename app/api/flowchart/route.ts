import { streamText } from 'ai';
import { createLLMProvider } from '@/lib/ai/provider';
import type { LLMSettings } from '@/lib/ai/settings';

// Universal diagram generation system prompt
const DIAGRAM_SYSTEM_PROMPT = `You are an expert diagram creation assistant specializing in draw.io XML generation.
Your task is to convert user's natural language description into professional diagrams in draw.io XML format.

You can create ANY type of diagram including:
- Flowcharts (流程图) - Process flows, decision trees, workflows
- Sequence Diagrams (时序图) - API interactions, authentication flows
- Class Diagrams (类图) - UML, inheritance hierarchies
- Architecture Diagrams (架构图) - AWS, microservices, network topology
- Organization Charts (组织架构图) - Company hierarchies, team structures
- Entity Relationship Diagrams (ER图) - Database schemas
- State Diagrams (状态图) - State machines, lifecycle diagrams
- Gantt Charts (甘特图) - Project timelines
- Network Diagrams (网络图) - Infrastructure, topology

CRITICAL RULES:
1. Generate ONLY mxCell elements - NO wrapper tags (<mxfile>, <mxGraphModel>, <root>)
2. Do NOT include root cells (id="0" or id="1") - they are added automatically
3. ALL mxCell elements must be siblings - NEVER nest mxCell inside another mxCell
4. Use unique sequential IDs starting from "2"
5. Set parent="1" for all shapes
6. Do NOT wrap output in markdown code blocks

SHAPE STYLES:
- Rectangle: rounded=1;whiteSpace=wrap;html=1;
- Ellipse: ellipse;whiteSpace=wrap;html=1;
- Diamond: rhombus;whiteSpace=wrap;html=1;
- Cylinder (DB): shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;
- Cloud: ellipse;shape=cloud;whiteSpace=wrap;html=1;
- Person: shape=umlActor;html=1;verticalLabelPosition=bottom;
- Document: shape=document;whiteSpace=wrap;html=1;
- Hexagon: shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;

COLOR PALETTE:
- Blue: fillColor=#dae8fc;strokeColor=#6c8ebf;
- Green: fillColor=#d5e8d4;strokeColor=#82b366;
- Yellow: fillColor=#fff2cc;strokeColor=#d6b656;
- Orange: fillColor=#ffe6cc;strokeColor=#d79b00;
- Red: fillColor=#f8cecc;strokeColor=#b85450;
- Purple: fillColor=#e1d5e7;strokeColor=#9673a6;
- Gray: fillColor=#f5f5f5;strokeColor=#666666;

CONNECTOR STYLES:
- Arrow: edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;
- Dashed: dashed=1;edgeStyle=orthogonalEdgeStyle;endArrow=classic;html=1;
- No arrow: edgeStyle=orthogonalEdgeStyle;endArrow=none;html=1;

LAYOUT GUIDELINES:
- Keep all elements within x: 0-800, y: 0-800
- Use consistent spacing (80-120px between elements)
- Align elements in clear rows/columns
- Center the diagram around x=400
- For hierarchical diagrams, use top-down or left-right flow
- For org charts, parent at top, children below
- Use containers/groups for related elements when appropriate

EXAMPLE OUTPUT (flowchart):
<mxCell id="2" value="Start" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;" vertex="1" parent="1">
  <mxGeometry x="340" y="40" width="120" height="60" as="geometry"/>
</mxCell>
<mxCell id="3" value="Process" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;" vertex="1" parent="1">
  <mxGeometry x="340" y="140" width="120" height="60" as="geometry"/>
</mxCell>
<mxCell id="4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=classic;" edge="1" parent="1" source="2" target="3">
  <mxGeometry relative="1" as="geometry"/>
</mxCell>

RESPOND IN THE SAME LANGUAGE AS THE USER'S INPUT.
Output ONLY the mxCell XML elements directly, no explanation or markdown.`;

export async function POST(request: Request) {
    const startTime = Date.now();
    console.log('[Diagram API] === Request Started ===');

    try {
        const { prompt, settings } = await request.json() as {
            prompt: string;
            settings: LLMSettings;
        };

        console.log('[Diagram API] Config:', {
            baseURL: settings?.baseURL ? `${settings.baseURL.slice(0, 30)}...` : 'not set',
            model: settings?.model || 'not set',
            hasApiKey: !!settings?.apiKey,
        });
        console.log('[Diagram API] Prompt preview:', prompt?.slice(0, 100) + (prompt?.length > 100 ? '...' : ''));

        if (!prompt) {
            console.log('[Diagram API] Error: Prompt is empty');
            return Response.json({ error: 'Prompt is required' }, { status: 400 });
        }

        if (!settings?.baseURL || !settings?.apiKey) {
            console.log('[Diagram API] Error: LLM not configured');
            return Response.json({
                error: 'LLM not configured. Please configure in Settings page.'
            }, { status: 400 });
        }

        console.log('[Diagram API] Creating provider and model...');
        const provider = createLLMProvider(settings);
        const model = provider(settings.model);

        console.log('[Diagram API] Starting stream generation...');
        const result = streamText({
            model,
            system: DIAGRAM_SYSTEM_PROMPT,
            prompt: `Create a diagram based on the following description:\n\n${prompt}`,
        });

        console.log(`[Diagram API] Stream started (${Date.now() - startTime}ms)`);
        return result.toTextStreamResponse();
    } catch (error) {
        console.error('[Diagram API] Error:', error);
        console.error('[Diagram API] Error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : String(error),
            duration: `${Date.now() - startTime}ms`,
        });
        return Response.json({
            error: error instanceof Error ? error.message : 'Failed to generate diagram'
        }, { status: 500 });
    }
}
