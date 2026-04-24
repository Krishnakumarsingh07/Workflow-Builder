import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
app.get('/automations', (req, res) => {
    res.json([
        { id: "send_email", label: "Send Email", params: ["to", "subject"] },
        { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
        { id: "update_db", label: "Update Database", params: ["table", "recordId"] },
        { id: "notify_slack", label: "Notify Slack", params: ["channel", "message"] }
    ]);
});
app.post('/simulate', (req, res) => {
    const { nodes, edges } = req.body;
    const logs = [];
    try {
        const nodeMap = new Map();
        nodes.forEach((n) => nodeMap.set(n.id, n));
        const adjList = new Map();
        nodes.forEach((n) => adjList.set(n.id, []));
        edges.forEach((e) => {
            if (adjList.has(e.source)) {
                adjList.get(e.source).push(e.target);
            }
        });
        const startNode = nodes.find((n) => n.type === 'start');
        if (!startNode) {
            throw new Error("No start node found");
        }
        const queue = [startNode.id];
        const visited = new Set();
        while (queue.length > 0) {
            const currentId = queue.shift();
            if (visited.has(currentId))
                continue;
            visited.add(currentId);
            const node = nodeMap.get(currentId);
            switch (node.type) {
                case 'start':
                    logs.push(`Start node triggered: ${node.data.title || 'Start'}`);
                    break;
                case 'task':
                    logs.push(`Task assigned to ${node.data.assignee || 'Unassigned'}: ${node.data.title || 'Task'}`);
                    break;
                case 'approval':
                    logs.push(`Approval requested from ${node.data.approverRole || 'Manager'} for: ${node.data.title || 'Approval'}`);
                    break;
                case 'automated':
                    logs.push(`Automated action executed: ${node.data.action || 'Unknown'} - ${node.data.title || 'Automated Step'}`);
                    break;
                case 'end':
                    logs.push(`Workflow ended: ${node.data.message || 'Termination'} - ${node.data.title || 'End'}`);
                    if (node.data.summaryFlag) {
                        logs.push(`Summary generated for workflow execution.`);
                    }
                    break;
            }
            const neighbors = adjList.get(currentId) || [];
            for (const neighbor of neighbors) {
                queue.push(neighbor);
            }
        }
        res.json(logs);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.listen(PORT, () => {
    console.log(`Mock API Server running on http://localhost:${PORT}`);
});
