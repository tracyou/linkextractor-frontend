import React, {useState, useCallback, useEffect} from 'react';
import ReactFlow, {
    Controls,
    Background,
    addEdge,
    EdgeTypes,
    useNodesState,
    useEdgesState,
    Connection,
    Edge,
    Node, MarkerType, useReactFlow, ReactFlowProvider, ReactFlowInstance, NodeChange, useNodesInitialized, Panel,
} from 'reactflow';
import './RelationSchemaDetail.css';
import 'reactflow/dist/style.css';
import clsx from 'clsx';

import CustomEdge from './Edges/CustomEdge';
import {
    MatterRelationEnum,
    MatterRelationSchemaDocument,
    MatterRelationSchemaQuery,
    MatterRelationTypesDocument,
    MatterRelationTypesQuery,
    MattersDocument,
    MattersQuery,
    RelationSchemaDocument,
    RelationSchemaQuery, SaveMatterRelationSchemaDocument, SaveMatterRelationSchemaMutation
} from "../../../graphql/api-schema";
import {Button, Input, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useMutation, useQuery} from "@apollo/client";
import {useParams} from "react-router-dom";
import {Black} from "../../../stylesheets/Colors";

const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};

const RelationSchemaDetail = () => {

    // ======================================================================
    // Declare state variables
    // ======================================================================

    const [relationSchemaId, setRelationSchemaId] = useState<string | undefined>();
    const [selectedMatterId, setSelectedMatterId] = useState<string | null>(null);

    const [rfInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
    const {setViewport} = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);

    const [selectedMatter, setSelectedMatter] = useState<string>('none');
    const [showMatterPlaceholder, setShowMatterPlaceholder] = useState(selectedMatter === "none");
    const [selectedRelation, setSelectedRelation] = useState<string>('none');
    const [showRelationPlaceholder, setShowRelationPlaceholder] = useState(selectedRelation === "none");
    const [selectedDescription, setSelectedDescription] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    // ======================================================================


    // ======================================================================
    // ReactFlow properties and functions
    // ======================================================================

    const edgeRelationStyleMapper = (edge: Edge, relation: MatterRelationEnum) => {
        switch (relation) {
            case MatterRelationEnum.RequiresOne:
                return {
                    ...edge,
                    animated: false,
                    style: {
                        stroke: Black,
                        strokeWidth: 2,
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 13,
                        height: 13,
                        color: Black,
                    },
                };
            case MatterRelationEnum.RequiresZeroOrOne:
                return {
                    ...edge,
                    animated: false,
                    style: {
                        stroke: '#FF0000',
                        strokeWidth: 2,
                        strokeDasharray: '5 5',
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 13,
                        height: 13,
                        color: '#FF0000',
                    },
                };
            case MatterRelationEnum.RequiresOneOrMore:
                return {
                    ...edge,
                    animated: false,
                    style: {
                        stroke: Black,
                        strokeWidth: 2,
                        strokeDasharray: '10 4',
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 13,
                        height: 13,
                        color: Black,
                    },
                };
            case MatterRelationEnum.RequiresZeroOrMore:
                return {
                    ...edge,
                    animated: false,
                    style: {
                        stroke: Black,
                        strokeWidth: 2,
                        strokeDasharray: '2 2',
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 13,
                        height: 13,
                        color: Black,
                    },
                };
            default:
                return {
                    ...edge,
                    animated: false,
                    style: {
                        stroke: Black,
                        strokeWidth: 2,
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 13,
                        height: 13,
                        color: Black,
                    },
                };
        }
    }

    // ======================================================================


    // ======================================================================
    // URL parameter handling
    // ======================================================================

    // Get the relation schema id from the url
    const {id} = useParams();

    // Get the matter id from the url path parameters
    const urlParams = new URLSearchParams(window.location.search);
    const matterId = urlParams.get('matter');

    useEffect(() => {
        setRelationSchemaId(id);
    }, [id]);

    useEffect(() => {
        setSelectedMatterId(matterId);
        onLoadMatterRelationSchema();
    }, [matterId]);

    // ======================================================================


    // ======================================================================
    // GraphQL queries and data handling
    // ======================================================================

    const {
        data: relationSchema,
        loading: loadingRelationSchema,
        refetch: refetchRelationSchema,
        error: errorRelationSchema
    } = useQuery<RelationSchemaQuery>(RelationSchemaDocument, {
        variables: {
            id: relationSchemaId,
        },
    })

    const {
        data: matterRelationSchema,
        loading: loadingMatterRelationSchema
    } = useQuery<MatterRelationSchemaQuery>(MatterRelationSchemaDocument, {
        variables: {
            input: {
                relationSchemaId: relationSchemaId,
                matterId: matterId,
            }
        },
        fetchPolicy: "network-only"
    })

    const {
        data: matterRelationTypes,
        loading: loadingMatterRelationTypes
    } = useQuery<MatterRelationTypesQuery>(MatterRelationTypesDocument)

    const {data: matters, loading: loadingMatters} = useQuery<MattersQuery>(MattersDocument)

    const [saveMatterRelation, {loading, error}] = useMutation<SaveMatterRelationSchemaMutation>(
        SaveMatterRelationSchemaDocument
    );

    const onLoadMatterRelationSchema = useCallback(() => {
        const loadMatterRelationSchema = async () => {
            if (!matterRelationSchema?.matterRelationSchema || !matterRelationSchema?.matterRelationSchema?.schemaLayout) {
                const matter = matters?.matters.find((matter) => matter.id === selectedMatterId);
                if (!matter) return;

                setNodes([{
                    id: '1',
                    type: 'input',
                    style: {
                        backgroundColor: matter?.color,
                        color: Black,
                        border: '1px solid #ABABAB',
                    },
                    data: {
                        label: matter?.name ?? 'Nieuw',
                        matterId: matter?.id ?? null,
                        deletable: false,
                    },
                    position: {x: 0, y: 0},
                }]);
                setEdges([]);
                setViewport({x: 148, y: 266.5, zoom: 2});
            } else {
                const flow = JSON.parse(matterRelationSchema.matterRelationSchema.schemaLayout);

                if (flow) {
                    const {x, y, zoom} = flow.viewport;
                    setNodes(flow.nodes || []);
                    setEdges(flow.edges || []);
                    setViewport({x, y, zoom});
                }
            }
        }

        loadMatterRelationSchema();
    }, [matters, matterRelationSchema, selectedMatterId, nodes, edges]);

    useEffect(() => {
        refetchRelationSchema();
    }, [relationSchemaId]);

    useEffect(() => {
        if (errorRelationSchema) {
            if (errorRelationSchema.graphQLErrors.some((error) => {
                if (!error.extensions.validation) return false;

                // @ts-ignore
                return error.extensions.validation.id.includes('The selected id is invalid.')
            })) {
                window.location.href = '/relation-schemas';
            }
        }
    }, [errorRelationSchema]);

    // ======================================================================


    // ======================================================================
    // ReactFlow Callbacks
    // ======================================================================

    useEffect(() => {
        onLoadMatterRelationSchema();
    }, [loadingMatterRelationSchema, loadingMatters, selectedMatterId]);

    const onInit = useCallback(
        (instance: ReactFlowInstance) => {
            setRfInstance(instance);
        },
        [setRfInstance]
    );

    const onConnect = useCallback(
        (params: Connection | Edge) => {
            const newEdges = addEdge(
                {
                    ...params,
                    type: 'custom',
                    data: {
                        label: '',
                        relation: null,
                    },
                    animated: true,
                    style: {
                        stroke: '#9d9d9d',
                        strokeWidth: 2,
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        width: 13,
                        height: 13,
                        color: Black,
                    },
                },
                edges
            );

            const newEdge: Edge = newEdges.find((edge) => edge.source === params.source && edge.target === params.target)!;

            setSelectedNode(null);
            setSelectedEdge(newEdge);
            setSelectedRelation('none');
            setSelectedDescription('');
            setEdges(newEdges);
        },
        [edges, setEdges]
    );

    const onNodesDelete = useCallback(
        (nodes: Node[]) => {
            if (selectedNode) {
                if (nodes.some((node) => node.id === selectedNode.id)) {
                    setSelectedNode(null);
                }
            }
        },
        [nodes, edges, selectedNode, setSelectedNode]
    );

    /**
     * When an edge is deleted, the right panel should be cleared and hidden.
     */
    const onEdgesDelete = useCallback(
        (edges: Edge[]) => {
            if (selectedEdge && edges.some((edge) => edge.id === selectedEdge.id)) {
                setSelectedEdge(null);
            }
        },
        [nodes, edges, selectedEdge, setSelectedEdge]
    );

    const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
        setSelectedNode(null);
        setSelectedEdge(edge);

        const edgeRelation = matterRelationTypes?.matterRelationTypes.find((relationType) => relationType.key === edge.data.relation);
        if (!edgeRelation) return;
        setSelectedRelation(edgeRelation.value);
        setSelectedDescription(edge.data.label);
    }

    const onPaneClick = () => {
        setSelectedNode(null);
        setSelectedEdge(null);
    }

    const onNodeClick = (event: React.MouseEvent, node: Node) => {
        setSelectedNode(node);
        setSelectedEdge(null);

        if (!node.data.matterId) {
            setSelectedMatter('none');
            return;
        }
        setSelectedMatter(node.data.matterId);
    };

    // ======================================================================


    // ======================================================================
    // ReactFlow state handling
    // ======================================================================

    /**
     * When the matter of a node is changed, the node should be updated.
     */
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === selectedNode?.id) {
                    const matter = matters?.matters.find((matter) => matter.id === selectedMatter);
                    if (!matter) return node;

                    node = {
                        ...node,
                        style: {
                            backgroundColor: matter.color,
                            color: Black,
                            border: '1px solid #ABABAB',
                        },
                        data: {
                            ...node.data,
                            label: matter.name,
                            matterId: matter.id
                        }
                    };
                }

                return node;
            })
        );
    }, [selectedMatter, setNodes]);

    /**
     * When the relation of an edge is changed, the edge should be updated.
     */
    useEffect(() => {
        if (!selectedEdge || !selectedRelation) return;
        setEdges((nds) =>
            nds.map((edge) => {
                if (edge.id === selectedEdge?.id) {
                    const selectedMatterRelationType = matterRelationTypes?.matterRelationTypes.find((relationType) => relationType.value === selectedRelation);
                    if (!selectedMatterRelationType) return edge;
                    edge = {
                        ...edgeRelationStyleMapper(edge, selectedMatterRelationType.key),
                        data: {
                            ...edge.data,
                            label: selectedDescription,
                            relation: selectedMatterRelationType.key,
                        },
                    };
                }

                return edge;
            })
        );
    }, [selectedRelation, setEdges]);

    /**
     * When the description of an edge is changed, the edge should be updated.
     */
    useEffect(() => {
        if (!selectedEdge) return;
        setEdges((nds) =>
            nds.map((edge) => {
                if (edge.id === selectedEdge?.id) {
                    edge.data = {
                        ...edge.data,
                        label: selectedDescription,
                    };
                }

                return edge;
            })
        );
    }, [selectedDescription, setEdges]);

    // ======================================================================


    // ======================================================================
    // Custom buttons and input handlers
    // ======================================================================

    const onNodeCreateClick = () => {
        const newNode: Node = {
            id: (nodes.length + 1).toString(),
            type: 'output',
            data: {
                label: 'Nieuw',
                matterId: null,
                deletable: true,
            },
            position: {x: 0, y: 0},
        };

        setNodes([...nodes, newNode]);
        setSelectedMatter('none');
        setSelectedNode(newNode);
        setSelectedEdge(null);
    }

    const onSaveClick = () => {
        if (rfInstance) {
            // Check if all nodes have a matter
            const missingMatters = nodes.filter((node) => !node.data.matterId);
            if (missingMatters.length > 0) {
                setErrorMessage('Niet alle containers hebben een begrip geselecteerd.');
                return;
            }

            // Check if all edges have a relation
            const missingRelations = edges.filter((edge) => !edge.data.relation);
            if (missingRelations.length > 0) {
                setErrorMessage('Niet alle connecties hebben een relatie geselecteerd.');
                return;
            }

            // Check if all nodes are connected
            const unconnectedNodes = nodes.filter((node) => !edges.some((edge) => edge.source === node.id || edge.target === node.id));
            if (unconnectedNodes.length > 0) {
                setErrorMessage('Niet alle containers zijn verbonden.');
                return;
            }

            setErrorMessage('');

            const schemaLayout = JSON.stringify(rfInstance.toObject());
            const relations = edges.map((edge) => {
                return {
                    relation: edge.data.relation,
                    description: edge.data.label,
                    relatedMatterId: nodes.find((node) => node.id === edge.target)?.data.matterId,
                }
            });

            saveMatterRelation({
                variables: {
                    input: {
                        matterRelationSchemaId: matterRelationSchema?.matterRelationSchema?.id,
                        relationSchemaId: relationSchemaId,
                        matterId: selectedMatterId,
                        schemaLayout: schemaLayout,
                        relations: relations,
                    },
                },
            }).then((result) => {
                if (result.data?.saveMatterRelationSchema?.relationSchema.id !== relationSchemaId) {
                    setRelationSchemaId(result.data?.saveMatterRelationSchema?.relationSchema.id)
                    const newUrl = window.location.protocol + "//" + window.location.host + `/relation-schemas/${result.data?.saveMatterRelationSchema?.relationSchema.id}?matter=${selectedMatterId}`;
                    window.history.pushState({path: newUrl}, '', newUrl);
                }

                rfInstance.setNodes(nodes);
                rfInstance.setEdges(edges);

                setSuccessMessage('Relatie schema opgeslagen voor begrip: ' + result.data?.saveMatterRelationSchema.matter.name);

                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            });
        }
    };

    const handleMatterSelection = (e: SelectChangeEvent) => {
        setSelectedMatter(e.target.value as string)
    }

    const handleRelationSelection = (e: SelectChangeEvent) => {
        setSelectedRelation(e.target.value as MatterRelationEnum)
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelectedDescription(e.target.value)
    }

    // ======================================================================


    // ======================================================================
    // Render
    // ======================================================================

    return (
        <div className={clsx("d-flex", "flex-column")}>
            <div className={clsx(successMessage ? "d-flex" : "d-none", "flex-row")}>
                <div className={clsx("d-flex", "w-25")}></div>
                <div className={clsx("d-flex", "message-container", "success-container", "w-50", "align-items-center")}>
                    <span>{successMessage}</span>
                </div>
                <div className={clsx("d-flex", "w-25")}></div>
            </div>
            <div className={clsx(errorMessage ? "d-flex" : "d-none", "flex-row")}>
                <div className={clsx("d-flex", "w-25")}></div>
                <div className={clsx("d-flex", "flex-row", "justify-content-between", "message-container", "warning-container", "w-50", "align-items-center")}>
                    <span>{errorMessage}</span>
                    <Button variant={"text"}
                            color={"warning"}
                            style={{fontSize: '16px', borderWidth: '3px', height: '30px', width: '10px'}}
                            onClick={() => setErrorMessage('')}
                    >X
                    </Button>
                </div>
                <div className={clsx("d-flex", "w-25")}></div>
            </div>
            <div className={clsx("d-flex", "flex-row")}>
                <div className={clsx("d-flex", "w-25")}></div>
                <div className={clsx("d-flex", "flex-row", "w-50", "justify-content-between", "align-items-center")}>
                    {
                        loadingRelationSchema ? <p>Loading...</p> : (
                            <div>
                                <h2 style={{display: relationSchemaId ? 'none' : 'd-flex'}}>Nieuw relatie schema</h2>
                                <h2 style={{display: relationSchemaId ? 'block' : 'none'}}>
                                    {relationSchema?.relationSchema.updatedAt} - {relationSchema?.relationSchema.expiredAt ?? 'Now'} {relationSchema?.relationSchema.expiredAt ? '(verlopen)' : relationSchema?.relationSchema.isPublished ? '(gepubliceerd)' : '(concept)'}
                                </h2>
                            </div>
                        )
                    }
                    <div className={clsx("d-flex", "flex-row", "gap-2")}>
                        <Button variant={"contained"}
                                color={"success"}
                                style={{fontSize: '16px', borderWidth: '3px', height: '40px'}}
                                onClick={() => onSaveClick()}
                        >Opslaan
                        </Button>
                    </div>
                </div>
                <div className={clsx("d-flex", "w-25")}></div>
            </div>
            <div className={clsx("d-flex", "flex-row", "w-100")}>
                <div className={clsx("d-flex", "flex-column", "w-25")}>
                    <h3>Begrippen</h3>
                    <div className={clsx("d-flex", "flex-column")}>
                        {loadingMatters ? <p>Loading...</p> : (
                            matters?.matters.map((matter) => (
                                <div key={matter.id} className={clsx("d-flex", "flex-row")}>
                                    <Button
                                        variant={"text"}
                                        size={"medium"}
                                        style={{textAlign: 'left'}}
                                        onClick={() => {
                                            setSelectedMatterId(matter.id);
                                            const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?matter=${matter.id}`;
                                            window.history.pushState({path: newUrl}, '', newUrl);
                                        }}
                                        className={clsx("d-flex justify-content-start")}
                                    >{matter.name}</Button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className={clsx("d-flex", "flex-column", "w-50")}>
                    {!selectedMatterId ? <p>Selecteer een begrip</p> : (
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onInit={onInit}
                            onConnect={onConnect}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onEdgeClick={onEdgeClick}
                            onEdgesDelete={onEdgesDelete}
                            onNodeClick={onNodeClick}
                            onNodesDelete={onNodesDelete}
                            onPaneClick={onPaneClick}
                            edgeTypes={edgeTypes}
                            fitView
                        >
                            <Panel position="top-right" style={{margin: '40px 20px'}}>
                                <Button variant={"contained"}
                                        color={"primary"}
                                        style={{fontSize: '30px', borderWidth: '3px', height: '40px'}}
                                        onClick={() => onNodeCreateClick()}
                                >+
                                </Button>
                            </Panel>
                            <Background/>
                        </ReactFlow>
                    )}
                </div>

                {/* Node detail container */}
                <div className={clsx("flex-column", "w-25", selectedNode ? "d-flex" : "d-none")}>
                    <h3>Container instellingen</h3>
                    <div className={clsx("d-flex", "flex-column", "gap-3")}>
                        <div className={clsx("d-flex", "flex-row")}>
                            <Select
                                style={{fontSize: '12px', height: '30px'}}
                                fullWidth
                                value={selectedMatter}
                                defaultValue="none"
                                onFocus={() => setShowMatterPlaceholder(false)}
                                onChange={(e) => handleMatterSelection(e)}
                                className={clsx("select", selectedMatter === "none" ? "select-disabled" : null)}
                            >
                                <MenuItem className={clsx(!showMatterPlaceholder ? "menu-item-hidden" : null)} key="0"
                                          disabled value="none">Selecteer begrip</MenuItem>
                                {matters?.matters.map((matter) => (
                                    <MenuItem key={matter.id} value={matter.id}>
                                        {matter.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Edge detail container */}
                <div className={clsx("flex-column", "w-25", selectedEdge ? "d-flex" : "d-none")}>
                    <h3>Connectie instellingen</h3>
                    <div className={clsx("d-flex", "flex-column", "gap-3")}>
                        <div className={clsx("d-flex", "flex-row")}>
                            <Select
                                style={{fontSize: '12px', height: '30px'}}
                                fullWidth
                                value={selectedRelation}
                                defaultValue="none"
                                onFocus={() => setShowRelationPlaceholder(false)}
                                onChange={(e) => handleRelationSelection(e)}
                                className={clsx("select", selectedRelation === "none" ? "select-disabled" : null)}
                            >
                                <MenuItem className={clsx(!showRelationPlaceholder ? "menu-item-hidden" : null)}
                                          key="0" disabled value="none">Selecteer relatie</MenuItem>
                                {matterRelationTypes?.matterRelationTypes.map((relationType) => (
                                    <MenuItem key={relationType.key} value={relationType.value}>
                                        {relationType.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={clsx("d-flex", "flex-row")}>
                            <Input
                                style={{fontSize: '12px', padding: ' 0 10px'}}
                                value={selectedDescription}
                                placeholder={'Beschrijving'}
                                fullWidth
                                onChange={(e) => handleDescriptionChange(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // ======================================================================
};

// eslint-disable-next-line react/display-name
export default () => (
    <ReactFlowProvider>
        <RelationSchemaDetail/>
    </ReactFlowProvider>
);
